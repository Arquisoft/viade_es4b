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
            locations: [[]],
            rutas: [],
            selectedPoint: null
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

    componentDidUpdate(prevProps) {
        if (this.state.url && !this.state.load) {
            const doc = SolidAuth.fetch(new URL('rutaEjemplo.json', this.state.url));

            doc.then(async response => {
                if (response.status == 200) {
                    const json = await response.text();

                    const jsonParse = JSON.parse(json);

                    const lista = jsonParse.points.map(ele =>
                        ele.map(
                            eleinterno => ({
                                lat: eleinterno["schema:latitude"],
                                lng: eleinterno["schema:longitude"],
                                images: eleinterno["viade:images"]
                            })
                        )
                    );

                    this.setState(prevState => ({
                        ...prevState,
                        load: true,
                        locations: lista
                    }));
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
    async updateLocations(locations) {
        const result = await SolidAuth.fetch(new URL('rutaEjemplo.json', this.state.url), {
            method: "PUT",
            body: JSON.stringify(jsonTojsonLD(locations, this.state.url)),
            headers: {
                Accept: "application/ld+json"
            }
        });
        console.log(result);
        this.setState(prevState => ({
            ...prevState,
            locations: locations
        }));
    }

    async handleClear() {
        await this.updateLocations([[]]);
    }

    async handleSave() {

        var locations = [...this.state.locations, []];
        await this.updateLocations(locations);
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
            var lastPath = prevState.locations[prevState.locations.length - 1];
            prevState.locations[prevState.locations.length - 1] = [
                ...lastPath,
                punto
            ];

            return {
                ...prevState
            };
        });
        map.panTo(punto);
    };

    getLastPoint(state = undefined) {
        var prevState = state ? state : this.state;
        var lastPath = prevState.locations[prevState.locations.length - 1];
        var lastPoint = lastPath[lastPath.length - 1];
        return lastPoint;
    }

    addImageToLastPoint(image) {
        this.setState(prevState => {
            var lastPoint = this.getLastPoint();
            if (lastPoint) {
                lastPoint.images = lastPoint.images ? lastPoint.images : [];
                lastPoint.images.push(image);
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
        return (
            <div className="map-container">
                <span>
                    <p></p>
                </span>
                {
                    this.state.url ?
                        <>
                            <button onClick={this.handleSave} className="btn btn-secondary">
                                Marcar ruta
                            </button>
                            <button onClick={this.handleClear} className="btn btn-secondary">
                                Borrar rutas
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
                        <p>Cargando...</p>
                }
                <Map
                    google={this.props.google}
                    className={"map"}
                    zoom={this.props.zoom}
                    initialCenter={this.props.center}
                    onReady={this.handleLoad}
                    onClick={this.handleMapClick}
                >
                    {this.state.locations.map((path, i) => (
                        <Polyline
                            key={`polyline_${i}`}
                            path={path}
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
                    ))}

                    {this.state.locations.map((path, i) =>
                        path.map((location, i) => (
                            <Marker key={`marker1_${i}`} position={location} onClick={(props, marker) => this.setState(prevState => ({ ...prevState, selectedPoint: location }))} />
                        ))
                    )}

                    {
                        <InfoWindow visible={this.state.selectedPoint != null} position={this.state.selectedPoint}>
                            <div>
                                <h1>Imagenes</h1>
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