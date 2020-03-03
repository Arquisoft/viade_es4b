import React, { Component } from "react";
import MapComponent from "./mapComponent.jsx";

class MisMapasComponent extends Component {
    state = {};

    render() {
        return (
            <div>
                <h1>Mapa</h1>
                <MapComponent user={"Carlos"} />
            </div>
        );
    }
}

export default MisMapasComponent;