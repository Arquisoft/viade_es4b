import React from "react";
export default function jsonTojsonLD(name, coordinates) {
    const data = `{
      "@context": "http://schema.org/",
      "@type": "Coordinates",
      "author": {
        "@type": "Person",
        "name": "${name}"
      },
      "coordinates": "${coordinates}"
    }`;
    return data;
}