import React, { useState, Component } from "react";



import SolidAuth from 'solid-auth-client';
import ldflex from '@solid/query-ldflex';


import {
    Map,
    GoogleApiWrapper,
    Marker,
    Polyline

} from "google-maps-react";
//import * as parkData from "./marcadores.json";




export class MapComponent extends Component {
    constructor(props) {
        super(props);

        console.log(props.webId);

        this.state = {

            url: false,
            load: false,

            parkData: {
                features: []
            },
            locations: [],
        };




        this.handleMapClick = this.handleMapClick.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
        this.handleSave=this.handleSave.bind(this);
    }

    //Recarga la pagina
    reload = () => {


        window.location.replace('');
    }

    async setUrlFromStorage() {
        if (this.props.webId && !this.state.url) {
            const storageRoot = await ldflex[this.props.webId]['pim:storage'];
            if (storageRoot) {
                const exampleUrl = new URL('/share/rutaEjemplo.json', storageRoot.value);
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

            doc

                .then(async response => {
                    const json = await response.json();

                    this.setState(prevState => ({
                        ...prevState,
                        load: true,
                
                        parkData: json
                    }));


                })

        }

    }

    async handleSave(event) {
    
//Funciona si lo pongo en el onclik pero en un boton no
   console.log('holaaaaaaa');
    const result =  await SolidAuth.fetch(this.state.url, {
        
        method: 'PUT',
        body: JSON.stringify({
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
              },
              {
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -75.3372987731628,
                    45.383321536272049,
                    -75.468561642270757,
                    45.23032561834377
                  ]
                }
              },
              {
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -75.898610599532319,
                    45.295014379864874,
                    -75.468561642270757,
                    45.23032561834377
                  ]
                }
              },
              {
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -75.926651366520872,
                    45.260659774950561,
                    -75.760933332842754,
                    45.345566668964558
                  ]
                }
              }
            ]
          }),
        headers: {
            'Accept': 'application/json'
        }
    });
}


//Añadir los marcadores
handleMapClick = (ref, map, ev) => {
    const location = ev.latLng;
    this.setState(prevState => ({
        ...prevState,
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
                onClick={() => this.handleSave}

                className="btn btn-secondary"
            >
                Ver marcadores guardados
                </button>
            <button
                onClick={() => this.handleSave, this.reload}

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
                onReady={this.handleLoad}
                onClick={this.handleMapClick}
            >
                {this.state.parkData.features.map(park => (
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

                {this.state.parkData.features.map(park => (
                    <Marker

                        position={{
                            lat: park.geometry.coordinates[1],
                            lng: park.geometry.coordinates[0]
                        }}


                    />


                ))}
                {this.state.parkData.features.map(park => (
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