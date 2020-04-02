import React from "react";
import { Route, Point } from "./Clases.js";
import FC from 'solid-file-client';
import auth from 'solid-auth-client';
const fc = new FC(auth);

export const retrieveJson = async (jsonUrl) => {
    if (await fc.itemExists(jsonUrl)) {
        return await fc.readFile(jsonUrl)
    }
}

export const retrieveAllRoutes = async (personWebId) => {
    var routeURI = personWebId
    var routeURIExtended = routeURI.substring(0, routeURI.length - 16) + '/viade/routes'
    var res = []
    if (await fc.itemExists(routeURIExtended)) {
        res = await fc.readFolder(routeURIExtended);
        return res
    } else {
        await fc.createFolder(routeURIExtended)
        return res
    }
}

export const loadMapInfo = async jsonUrl => {
    // Load JSON-LD from map

    var routeJson = ""

    await retrieveJson(jsonUrl).then(function (result) {
        routeJson = JSON.parse(result);
    })

    var trackPointList = [];

    for (var key in routeJson) {
        var value = routeJson[key]
        if (key === "points") {
            for (var latLong in value) {
                trackPointList.push(new Point(value[latLong]["schema:latitude"], value[latLong]["schema:longitude"]));
            }
        }
    }
    var route = new Route({ "itinerary": trackPointList });
    return route;
};

export const loadAllRoutes = async (personWebId) => {
    var filesObj = await retrieveAllRoutes(personWebId);
    if (filesObj.files)
        return filesObj.files.map(function (urlMap) {
            return urlMap.url
        });
    return filesObj;
}

