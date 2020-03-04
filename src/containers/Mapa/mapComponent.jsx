import React, { useState, Component } from "react";


import { useTranslation } from 'react-i18next';
import SolidAuth from 'solid-auth-client';
import { successToaster, errorToaster } from '@utils';
import ldflex from '@solid/query-ldflex';
import { AccessControlList } from '@inrupt/solid-react-components';

import {
    Map,
    GoogleApiWrapper,
    Marker,
    GoogleMap,
    DirectionsRenderer,
    withScriptjs,
    withGoogleMap
} from "google-maps-react";
import * as parkData from "./marcadores.json";
//import SolidAuth from "solid-auth-client";
//import ldflex from "@solid/query-ldflex";
//import { AccessControlList } from "@inrupt/solid-react-components";



export class MapComponent extends Component {
    constructor(props) {
        super(props);
        this.text = {"type": "FeatureCollection",
        "crs": {
          "type": "name",
          "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" }
        },
        "features": [
          {
            "type": "Feature",
            "properties": {
              "PARK_ID": 960,
              "FACILITYID": 28014,
              "NAME": "Bearbrook Skateboard Park",
              "NAME_FR": "Planchodrome Bearbrook",
              "ADDRESS": "8720 Russell Road",
              "ADDRESS_FR": "8720, chemin Russell",
              "FACILITY_T": "flat",
              "FACILITY_1": "plat",
              "ACCESSCTRL": "no/non",
              "ACCESSIBLE": "no/non",
              "OPEN": null,
              "NOTES": "Outdoor",
              "MODIFIED_D": "2018/01/18",
              "CREATED_DA": null,
              "FACILITY": "Neighbourhood : smaller size facility to service population of 10,000 or less",
              "FACILITY_F": "De voisinage : petite installation assurant des services à 10 000 résidents ou moins.",
              "DESCRIPTIO": "Flat asphalt surface, 5 components",
              "DESCRIPT_1": "Surface d'asphalte plane, 5 modules",
              "PICTURE_LI": null,
              "PICTURE_DE": null,
              "PICTURE__1": null
            },
            "geometry": {
              "type": "Point",
              "coordinates": [-75.3372987731628, 45.383321536272049]
            }
          }]
          };
        this.state = {
            locations: []
        };

        this.handleMapClick = this.handleMapClick.bind(this);
        this.handleLoad=this.handleLoad.bind(this);
    }
    //Recarga la pagina
    reload = () => {
        window.location.replace('');
    }
    //Meter el parametro en el this.text
    pasar(texto) {
        this.text = texto;
    }

    //Cargar el json
    handleLoad(event) {
        event.preventDefault();
        const doc = SolidAuth.fetch('https://pabloglez1997.solid.community/share/rutajemplo.json');
        doc
            .then(async response => {
                const text = await response.text();
                this.pasar(text);


            })
           

    }

    //Añadir los marcadores
    handleMapClick = (ref, map, ev) => {
        const location = ev.latLng;
        this.setState(prevState => ({
            locations: [...prevState.locations, location]
        }));
        map.panTo(location);
    };/*
    handleMarcadores = myZoom => {
        console.log("Pulsado ver marcadores guardados:", this.state.user);
        this.setState({ lat: 43.5, lng: -5.5, zoom: myZoom });
    };*/

    render() {
        const position = [this.state.lat, this.state.lng];
        return (
            <div className="map-container">
                <h1>Map</h1>

                <button
                    onClick={() => this.handleLoad,this.reload}
                    className="btn btn-secondary"
                >
                    Ver marcadores guardados
                </button>
                <span>
                    <p></p>
                </span>
                <Map
                    google={this.props.google}
                    className={"map"}
                    zoom={this.props.zoom}
                    initialCenter={this.props.center}
                    onClick={this.handleMapClick}
                >
                    {this.text.features.map(park => (
                        <Marker
                            key={park.properties.PARK_ID}
                            position={{
                                lat: park.geometry.coordinates[1],
                                lng: park.geometry.coordinates[0]
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