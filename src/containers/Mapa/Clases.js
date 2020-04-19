export class Point {
    constructor(latitude, longitude) {
        this.lat = latitude;
        this.lng = longitude;
    }
}

export class Route {
    constructor(puntos, autor, comentario, nombreRuta, fecha, descripcion) {
        this.points = puntos;
        this.autor = autor;
        this.comentario = comentario;
        this.nombreRuta = nombreRuta;
        this.date = fecha;
        this.descripcion = descripcion;
    }
}