export class Point {
    constructor(latitude, longitude) {
        this.lat = latitude;
        this.lng = longitude;
    }
}

export class Route {
    constructor(parametros) {
        if (parametros.points) {
            this.points = parametros.points;
        }
    }
}