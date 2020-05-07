import React, { Component } from "react";
import jsonTojsonLD from "./jsonTojsonLD.jsx";
import { Point } from "./Clases.js";

import SolidAuth from "solid-auth-client";
import ldflex from "@solid/query-ldflex";

import { Map, GoogleApiWrapper, Marker, Polyline, InfoWindow } from "google-maps-react";
import ImageComponent from '../Imagen/imagen.component';


export class MapComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url: false,
            load: false,
            loadCompartidas: false,
            rutas: [{
                locations: [],
                nombre: '',
                descripcion: ''
            }],
            rutasCompartidas: [],
            selectedPoint: null,
            selectedRoute: {
                locations: [],
                nombre: '',
                descripcion: ''
            }
        };

        this.handleMapClick = this.handleMapClick.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.updateLocations = this.updateLocations.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

    async setUrlFromStorage() {
        if (this.props.webId && !this.state.url) {
            const storageRoot = await ldflex[this.props.webId]["pim:storage"];
            if (storageRoot) {
                const exampleUrl = new URL(
                    "/share/",
                    storageRoot.value
                );
                this.setState(prevState => ({
                    ...prevState,
                    url: exampleUrl
                }));
            }
        }
    }

    //Cargar el json
    handleLoad() {
        this.setUrlFromStorage();
    }

    async recuperarRutasCompartidas() {
        if (this.state.url && !this.state.loadCompartidas) {
            this.setState(prevState => ({
                ...prevState,
                loadCompartidas: true
            }))
            var url = this.state.url.toString().replace('/share','');
            const response = await SolidAuth.fetch(new URL('inbox', url));
            console.log('COMPARTIDAS');
            if (response.ok) {
                const text = await response.text();
                console.log(text);
                const notificaciones = text.match(/<.*>\n/g).map(n => n.replace(/[<>\n]/g,''));
                console.log(notificaciones);
                notificaciones.forEach(async n => {
                    const response = await SolidAuth.fetch(new URL('inbox/'+n, url));
                    const json = await response.json();
                    this.setState(prevState => ({
                        ...prevState,
                        rutasCompartidas: [
                            ...prevState.rutasCompartidas,
                            json
                        ]
                    }))
                    console.log('RUTA ' + n);
                    console.log(json);
                })
            }
            else {
                console.log(response);
            }
        }
    }

    componentDidUpdate(prevProps) {
        this.recuperarRutasCompartidas();
        if (this.state.url && !this.state.load) {

            const doc = SolidAuth.fetch(new URL('rutaEjemplo.json', this.state.url));

            doc.then(async response => {
                if (response.status == 200) {
                    const json = await response.text();

                    const jsonParse = JSON.parse(json);

                    if (jsonParse.rutas) {
                        const lista = jsonParse.rutas.map(ruta => ({
                            ...ruta,
                            locations: ruta.locations.map(
                                eleinterno => ({
                                    lat: eleinterno["schema:latitude"],
                                    lng: eleinterno["schema:longitude"],
                                    images: eleinterno["viade:images"]
                                })
                            )
                        }));
    
                        this.setState(prevState => ({
                            ...prevState,
                            load: true,
                            rutas: lista
                        }));
    
                    }

                } else if (response.status == 404) {
                    console.log("Documento no encontrado");
                    this.setState(prevState => ({
                        ...prevState,
                        load: true
                    }));
                } else {
                    console.log("Error indeterminado");
                    this.setState(prevState => ({
                        ...prevState,
                        load: true
                    }));
                }
            });
        }
        console.log(this.state.locations);
    }

    // Guarda los puntos en el POD
    async updateLocations(rutas) {
        const result = await SolidAuth.fetch(new URL('rutaEjemplo.json', this.state.url), {
            method: "PUT",
            body: JSON.stringify(jsonTojsonLD(rutas, this.state.url)),
            headers: {
                Accept: "application/ld+json"
            }
        });
        console.log(result);
        this.setState(prevState => ({
            ...prevState,
            rutas: rutas
        }));
    }

    async handleClear() {
        await this.updateLocations([{
            locations: [],
            nombre: '',
            descripcion: ''
        }]);
    }

    async handleSave() {

        var rutas = [...this.state.rutas, {
            locations: [],
            nombre: '',
            descripcion: ''
        }];
        await this.updateLocations(rutas);
    }

    //Añadir los marcadores
    handleMapClick = (ref, map, ev) => {
        const location = ev.latLng;

        const location2 = location + "";
        const listaDivida = location2.split(",");
        const parte1 = listaDivida[0].slice(1, -1);
        const parte2 = listaDivida[1].substring(0, listaDivida[1].length - 1);
        const punto = new Point(parseFloat(parte1), parseFloat(parte2));

        this.setState(prevState => {
            var lastRoute = this.getLastRoute(prevState);
            prevState.rutas[prevState.rutas.length - 1] = {
                ...lastRoute,
                locations: [...lastRoute.locations, punto]
            };

            return {
                ...prevState
            };
        });
        map.panTo(punto);
    };

    getLastRoute(state = undefined) {
        var prevState = state ? state : this.state;
        return prevState.rutas[prevState.rutas.length - 1];
    }

    getLastPoint(state = undefined) {
        var lastRoute = this.getLastRoute(state);
        var lastPoint = lastRoute.locations[lastRoute.locations.length - 1];
        return lastPoint;
    }

    addImageToLastPoint(image) {
        this.setState(prevState => {
            var lastPoint = this.getLastPoint();
            if (lastPoint) {
                lastPoint.images = lastPoint.images ? lastPoint.images : [];
                lastPoint.images.push(image);
                console.log(lastPoint);
                return {
                    ...prevState
                };
            }
            else {
                return prevState;
            }
        })
    }

    render() {
        console.log(this.state.rutas);
        return (
            <div className="map-container">
                <span>
                    <p></p>
                </span>
<div class = "rutas">
                
                <div>
                {
                    this.state.url ?
                        <>
                            
                            <form>
                                <label class = "nombre">
                                     Nombre:
                                     <input type="text" value={this.getLastRoute().nombre} onChange={(e) => {
                                         var value = e.target.value;
                                         this.setState(prevState => {
                                            var lastRoute = this.getLastRoute(prevState);
                                            console.log(e)
                                            prevState.rutas[prevState.rutas.length - 1] = {
                                                ...lastRoute,
                                                nombre: value
                                            };

                                            return {
                                                ...prevState
                                            };                                                                                        
                                        })}}/>

                                    </label>
                                <label class = "descripcion">
                                     Descripción:
                                     <input type="text" value={this.getLastRoute().descripcion} onChange={(e) => {
                                         var value = e.target.value;
                                         this.setState(prevState => {
                                            var lastRoute = this.getLastRoute(prevState);
                                            console.log(e)
                                            prevState.rutas[prevState.rutas.length - 1] = {
                                                ...lastRoute,
                                                descripcion: value
                                            };

                                            return {
                                                ...prevState
                                            };                                                                                        
                                        })}}/>
                                </label>
                            </form>
                            <button onClick={this.handleSave} className="btn btn-secondary">
                                Guardar ruta
                            </button>
                            <button onClick={this.handleClear} className="btn btn-secondary">
                                Borrar rutas almacenadas
                            </button>
                            <span>
                                <p></p>
                            </span>
                          
                            {
                                this.getLastPoint() && (
                                    <ImageComponent url={this.state.url} addImage={this.addImageToLastPoint.bind(this)} />
                                )
                            }
                        </>
                        :
                        <p class = "cargando">Cargando...</p>

                       
                }
                  </div>
             

                  
                  <dl>
                  
                    {
                       
                        [...this.state.rutas.slice(0,-1), ...this.state.rutasCompartidas].map((route,i) => (
                            <React.Fragment key={`route_${i}`}>
                               
                                <dt>
                                    <a class = "anombre" href="#" onClick={(e) => {
                                        e.preventDefault();
                                        this.setState((prevState) => ({
                                            ...prevState,
                                            selectedRoute: route
                                        }))
                                    }}>
                                        {route.nombre}
                                    </a>
                                </dt>
                                <dd>{route.descripcion}</dd>
                                
                            </React.Fragment>
                        ))
                        
                    }
                   
                </dl>
                
                 </div>
                <Map
                    google={this.props.google}
                    className={"map"}
                    zoom={this.props.zoom}
                    initialCenter={this.props.center}
                    onReady={this.handleLoad}
                    onClick={this.handleMapClick}
                >

                    <Polyline
                        path={this.state.selectedRoute.locations}
                        options={{
                            strokeColor: "#00ffff",
                            strokeOpacity: 1,
                            strokeWeight: 2,
                            icons: [
                                {
                                    icon: "hello",
                                    offset: "0",
                                    repeat: "10px"
                                }
                            ]
                        }}
                    />

                    <Polyline
                        path={this.getLastRoute().locations}
                        options={{
                            strokeColor: "#ff00ff",
                            strokeOpacity: 1,
                            strokeWeight: 2,
                            icons: [
                                {
                                    icon: "hello",
                                    offset: "0",
                                    repeat: "10px"
                                }
                            ]
                        }}
                    />

                    {this.state.selectedRoute.locations.map((location, i) =>
                        <Marker key={`marker1_${i}`} position={location} onClick={(props, marker) => this.setState(prevState => ({ ...prevState, selectedPoint: location }))} />
                    )}

                    {this.getLastRoute().locations.map((location, i) =>
                        <Marker key={`marker1_${i}`} position={location} onClick={(props, marker) => this.setState(prevState => ({ ...prevState, selectedPoint: location }))} />
                    )}

                    {
                        <InfoWindow visible={this.state.selectedPoint != null} position={this.state.selectedPoint}>
                            <div>
                                <h1>Imágenes</h1>
                                {
                                    this.state.selectedPoint && this.state.selectedPoint.images && this.state.selectedPoint.images.map((image, j) => (
                                        <img key={`img_${j}`} src={new URL(image, this.state.url)} />
                                    ))
                                }
                            </div>
                        </InfoWindow>
                    }


                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyDwZUjR7_j6100CdDHxmCvi_Hi7Z681wS8"
})(MapComponent);