/*global google*/

import React from "react";
import { compose, withProps, lifecycle } from "recompose";
import {
    withScriptjs,
    GoogleApiWrapper,
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer
} from "react-google-maps";

 class MyMapRuta extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const DirectionsComponent = compose(
            withProps({
                googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDwZUjR7_j6100CdDHxmCvi_Hi7Z681wS8",
                loadingElement: <div style={{ height: `400px` }} />,
                containerElement: <div style={{ width: `100%` }} />,
                mapElement: <div style={{ height: `600px`, width: `600px` }} />
            }),
            withScriptjs,
            withGoogleMap,
            lifecycle({
                componentDidMount() {
                    const DirectionsService = new google.maps.DirectionsService();
                    DirectionsService.route(
                        {
                            origin: new google.maps.LatLng(41.85073, -87.65126),
                            destination: new google.maps.LatLng(41.85258, -87.65141),
                            travelMode: google.maps.TravelMode.DRIVING
                        },
                        (result, status) => {
                            if (status === google.maps.DirectionsStatus.OK) {
                                this.setState({
                                    directions: { ...result },
                                    markers: true
                                });
                            } else {
                                console.error(`error fetching directions ${result}`);
                            }
                        }
                    );
                }
            })
        )(props => (
            <GoogleMap defaultZoom={3}>
                {props.directions && (
                    <DirectionsRenderer
                        directions={props.directions}
                        suppressMarkers={props.markers}
                    />
                )}
            </GoogleMap>
        ));
        return <DirectionsComponent />;
    }
}
 