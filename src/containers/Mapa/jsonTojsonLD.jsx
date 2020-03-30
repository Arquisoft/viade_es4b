import React from "react";

export default function jsonTojsonLD(coordinates) {
    const data = `{
        "@context": {
            "@version": 1.1,
            "schema": "http://schema.org/",

            "coordinates": {
                "@id": "schema:name",
                "@type": "xs:string"
            }

        },
        "coordinates": "${coordinates}"
    }`;
    return data;
}