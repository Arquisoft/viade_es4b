import React, { useState, Component } from "react";
import jsonTojsonLD from "./jsonTojsonLD.jsx";
import { Point } from "./Clases.js";

import SolidAuth from "solid-auth-client";
import ldflex from "@solid/query-ldflex";

import { Map, GoogleApiWrapper, Marker, Polyline } from "google-maps-react";

export class MapComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url: false,
            load: false,
            locations: [[]]
        };

        this.handleMapClick = this.handleMapClick.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.updateLocations = this.updateLocations.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

    //Recarga la pagina
    reload = () => {
        window.location.replace("");
    };

    async setUrlFromStorage() {
        if (this.props.webId && !this.state.url) {
            const storageRoot = await ldflex[this.props.webId]["pim:storage"];
            if (storageRoot) {
                const exampleUrl = new URL(
                    "/share/rutaEjemplo.json",
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
    handleLoad(event) {
        this.setUrlFromStorage();
    }

    componentDidUpdate(prevProps) {
        if (this.state.url && !this.state.load) {
            const doc = SolidAuth.fetch(this.state.url);

            doc.then(async response => {
                if (response.status == 200) {
                    const json = await response.text();
                    console.log("JSON:" + json);

                    const jsonParse = JSON.parse(json);

                    const lista = jsonParse.points.map(ele =>
                        ele.map(
                            eleinterno =>
                                new Point(
                                    eleinterno["schema:latitude"],
                                    eleinterno["schema:longitude"]
                                )
                        )
                    );

                    console.log("Contenido:" + lista);

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
        const result = await SolidAuth.fetch(this.state.url, {
            method: "PUT",
            //body: jsonTojsonLD(JSON.stringify(locations)),
            body: JSON.stringify(jsonTojsonLD(locations)),
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

    async handleClear(event) {
        await this.updateLocations([[]]);
    }

    async handleSave(event) {
        //Funciona si lo pongo en el onclik pero en un boton no
        var locations = [...this.state.locations, []];
        await this.updateLocations(locations);
    }

    //Añadir los marcadores
    handleMapClick = (ref, map, ev) => {
        const location = ev.latLng;
        console.log("Aqui esta la localizacion al tocar la pantalla" + location);

        this.setState(prevState => {
            var lastPath = prevState.locations[prevState.locations.length - 1];
            prevState.locations[prevState.locations.length - 1] = [
                ...lastPath,
                location
            ];

            return {
                ...prevState
            };
        });
        map.panTo(location);
    };

    render() {
        return (
            <div className="map-container">
                <span>
                    <p></p>
                </span>

                <button onClick={this.handleSave} className="btn btn-secondary">
                    Marcar ruta
        </button>
                <button onClick={this.handleClear} className="btn btn-secondary">
                    Borrar rutas
        </button>
                <span>
                    <p></p>
                </span>
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
                            <Marker key={`marker1_${i}`} position={location} />
                        ))
                    )}
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyDwZUjR7_j6100CdDHxmCvi_Hi7Z681wS8"
})(MapComponent);