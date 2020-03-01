import React, { Component } from "react";
import {
    Map,
    GoogleApiWrapper,
    Marker,
    DirectionsRenderer,
    withScriptjs,
    withGoogleMap
} from "google-maps-react";
//import SolidAuth from "solid-auth-client";
//import ldflex from "@solid/query-ldflex";
//import { AccessControlList } from "@inrupt/solid-react-components";

const mapStyles = {
    width: "50%",
    height: "50%"
};

class MapComponent extends Component {
    state = {
        lat: 51.505,
        lng: -0.09,
        zoom: 13,
        user: this.props.user
    };

    handleMarcadores = myZoom => {
        console.log("Pulsado ver marcadores guardados:", this.state.user);
        this.setState({ lat: 43.5, lng: -5.5, zoom: myZoom });
    };

    render() {
        const position = [this.state.lat, this.state.lng];
        return (
            <div>
                <button
                    onClick={() => this.handleMarcadores(9)}
                    className="btn btn-secondary"
                >
                    Ver marcadores guardados
        </button>
                <span>
                    <p></p>
                </span>
                <Map
                    google={this.props.google}
                    zoom={this.state.zoom}
                    style={mapStyles}
                    center={{ lat: this.state.lat, lng: this.state.lng }}
                >
                    <Marker position={{ lat: this.state.lat, lng: this.state.lng }} />
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyDwZUjR7_j6100CdDHxmCvi_Hi7Z681wS8"
})(MapComponent);