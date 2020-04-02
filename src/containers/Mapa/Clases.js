export class Point {
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

export class Route {
    constructor(params) {
        if (params.itinerary) {
            this.itinerary = params.itinerary;
        }
    }
}