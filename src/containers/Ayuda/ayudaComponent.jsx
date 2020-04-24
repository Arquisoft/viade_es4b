import { rende, } from "react-testing-library";
import React, { useState, Component } from "react";

export default class AyudaComponent extends Component {
    render() {
        return (
            <div className="ayuda-Component">
                <h1>Guía de la aplicación</h1>
                <h2>Como añadir un nueva ruta</h2>
                Para añadir un nueva ruta el usuario deberá ir a la pestaña mapa, una vez ahi deberá pinchar en el mapa para indicar el primer punto de la ruta, para seguir marcandos puntos de la ruta el usuario deberá pinchar nuevamente en el mapa creando puntos intermedios.
                <p></p>
                Cuando el cliente termine de marcar todos los puntos deberá pulsar el botón "Marcar ruta"
                <p></p>
                Aquí dejo un pequeño video que muestra como añadir varias rutas
                <div align="left">
                    <video src="./img/videoNuevaRuta_Trim.mp4" controls width="500" height="400"></video>
                </div>

                <h2>Como eliminar tus rutas guardadas</h2>
                Para eliminar las rutas que el usuario tiene guardadas deberá ir a la pestaña mapa, una vez ahi debera dar al botón borrar rutas
                <p></p>
                Aquí esta un pequeño video que muestra como eliminar las rutas
                <div align="left">
                    <video src="./img/videoEliminarRuta_Trim.mp4" controls width="500" height="400"></video>
                </div>
            </div>
        );
    }
}