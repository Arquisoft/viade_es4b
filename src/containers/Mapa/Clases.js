export class Point {
    constructor(latitude, longitude) {
        this.lat = latitude;
        this.lng = longitude;
    }
}

export class Route {
    constructor(params) {
        if (params.itinerary) {
            this.itinerary = params.itinerary;
        }
    }
}