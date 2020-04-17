import React from "react";
//import WelcomeComponent from "../Welcome/welcome.container.js";

export default function jsonTojsonLD(coordinates) {
    const points = coordinates.map(point =>
        point.map(eleinterno => ({
            "schema:latitude": eleinterno.lat,
            "schema:longitude": eleinterno.lng
        }))
    );

    //console.log(WelcomeComponent.name);

    const data = {
        "@context": {
            "@version": 1.1,
            viade: "http://arquisoft.github.io/viadeSpec/",
            schema: "http://schema.org/",
            rdfs: "http://www.w3.org/2000/01/rdf-schema#",
            rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
            xsd: "http://www.w3.org/2001/XMLSchema#",

            name: {
                "@id": "schema:name",
                "@type": "xs:string"
            },

            author: {
                "@id": "schema:author",
                "@type": "@id"
            },

            points: {
                "@id": "viade:points",
                "@container": "@list"
            }
        },
        name: "Nombre de prueba",
        points: points
    };

    return data;
}