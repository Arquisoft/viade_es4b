/* eslint-disable constructor-super */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */

import React, { Component, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SolidAuth from 'solid-auth-client';
import { successToaster, errorToaster } from '@utils';
import ldflex from '@solid/query-ldflex';
import { AccessControlList } from '@inrupt/solid-react-components';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import "../../App.css";
import { Icon } from "leaflet";


class MapComponent extends Component {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13
  };

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <div style={{
        margin: 50,
        bottom: 30,
        width: 800
      }}>
        <h1>Mapa</h1>
        <Map center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </Map>
      </div>
    );
  }
}

export default MapComponent;
