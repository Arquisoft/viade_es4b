import React, { useState, Component } from "react";



import SolidAuth from 'solid-auth-client';



import {
    Map,
    GoogleApiWrapper,
    Marker,
    Polyline

} from "google-maps-react";
import * as parkData from "./marcadores.json";




export class MapComponent extends Component {
    constructor(props) {
        super(props);


        this.state = {


            parkData: {
                "type": "FeatureCollection",
                "crs": {
                    "type": "name",
                    "properties": {
                        "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
                    }
                },
                "features": [
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [
                                -75.3372987731628,
                                45.383321536272049,
                                -75.546518086577947,
                                45.467134581917357
                            ]
                        }
                    }
                ]
            },
            locations: [],
        };




        this.handleMapClick = this.handleMapClick.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
    }

    //Recarga la pagina
    reload = () => {


        window.location.replace('');
    }

    async componentDidMount() {
        const response =await SolidAuth.fetch('https://pabloglez1997.solid.community/share/rutaEjemplo.json')
        const text = await response.text();
        console.log(text)
        this.setState({ parkData: text });
        
            
    }

    //Cargar el json
    handleLoad(event) {


        const doc = SolidAuth.fetch('https://pabloglez1997.solid.community/share/rutaEjemplo.json');

        doc

            .then(async response => {
                const text = await response.json();
                console.log(text)
                console.log('hola1')
                console.log(this.state.parkData)
                console.log('hola2')
                this.state.parkData = text;
                console.log(this.state.parkData)

            })


    }


    //Añadir los marcadores
    handleMapClick = (ref, map, ev) => {
        const location = ev.latLng;
        this.setState(prevState => ({
            locations: [...prevState.locations, location]
        }));
        map.panTo(location);
    };

    render() {

        const position = [this.state.lat, this.state.lng];
        return (
            <div className="map-container">
                <span>
                    <p></p>
                </span>
                <button
                    onClick={() => this.componentDidMount, this.reload}

                    className="btn btn-secondary"
                >
                    Ver marcadores guardados
                </button>
                <button
                    onClick={() => this.handleLoad, this.reload}

                    className="btn btn-secondary"
                >
                    Marcar ruta
                </button>
                <span>
                    <p></p>
                </span>
                <Map
                    google={this.props.google}
                    className={"map"}
                    zoom={this.props.zoom}
                    initialCenter={this.props.center}

                    onClick={this.handleMapClick,this.componentDidMount}
                >
                    {parkData.features.map(park => (
                        <Polyline
                            path={[{ lat: park.geometry.coordinates[1], lng: park.geometry.coordinates[0] }, { lat: park.geometry.coordinates[3], lng: park.geometry.coordinates[2] }]}
                            options={{
                                strokeColor: '#00ffff',
                                strokeOpacity: 1,
                                strokeWeight: 2,
                                icons: [{
                                    icon: "hello",
                                    offset: '0',
                                    repeat: '10px'
                                }],
                            }}
                        />
                    ))}

                    {parkData.features.map(park => (
                        <Marker

                            position={{
                                lat: park.geometry.coordinates[1],
                                lng: park.geometry.coordinates[0]
                            }}


                        />


                    ))}
                    {parkData.features.map(park => (
                        <Marker

                            position={{
                                lat: park.geometry.coordinates[3],
                                lng: park.geometry.coordinates[2]
                            }}


                        />
                    ))}
                    {this.state.locations.map((location, i) => {
                        return (
                            <Marker
                                key={i}
                                position={{ lat: location.lat(), lng: location.lng() }}
                            />
                        );
                    })}
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyDwZUjR7_j6100CdDHxmCvi_Hi7Z681wS8"
})(MapComponent);