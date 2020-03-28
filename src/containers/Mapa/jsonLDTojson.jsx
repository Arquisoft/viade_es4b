import React from "react";
export default function jsonLDTojson(jsonld) {
    console.log("ROD -----:" + jsonld.split(",")[4]);
    return jsonld.split(",")[4].split(":")[1];
}
