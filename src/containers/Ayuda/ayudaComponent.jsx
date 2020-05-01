
import React, { Component } from "react";

export default class AyudaComponent extends Component {
    render() {
        return (
            <div className="ayuda-Component">
                <h1 style={{ color: 'black', margin: 10 }}>Guía de la aplicación</h1>
                <h2 style={{ color: 'black', margin: 10 }}>Como añadir un nueva ruta</h2>


                <p style={{ color: 'white', margin: 30 }}>Para añadir un nueva ruta el usuario deberá ir a la pestaña mapa, una vez ahi deberá pinchar en el mapa para indicar el primer punto de la ruta. Para seguir marcando puntos de la ruta el usuario deberá pinchar nuevamente en el mapa creando así puntos intermedios. Una vez seleccionado el primer punto se le abrirá un menú con la posibilidad de asociar imagenes a ese punto como por ejemplo una fuente que se encontrase en el camino. Asocie tantas imagenes como quiera para eso deberá pulsar el botón "Seleccionar archivo". Una vez elegida la la imagen deberá pulsar el boton "Enviar", y repetir esta acción tantas veces como imagenes quierá asociar a dicho punto. Cuando haya finalizado de añadir imagenes y puntos a la ruta pulsé el botón "Marcar ruta" para guardarla. Si desease ver la imagen que añadió al punto solamente deberá pulsa sobre su marcador y se mostrará la imagen.</p>

                <p style={{ color: 'white', margin: 30 }}>Aquí dejo un pequeño video que muestra como añadir varias rutas.</p>

                <div align="left" style={{ margin: 30 }}>
                    <video src="./img/videoCrearRuta.mp4" controls width="500" height="400" className="video1"></video>
                </div>

                <h2 style={{ color: 'black', margin: 10 }}>Como eliminar tus rutas guardadas</h2>
                <p style={{ color: 'white', margin: 30 }}>Para eliminar las rutas que el usuario tiene guardadas deberá ir a la pestaña mapa, una vez ahi debera dar al botón borrar rutas.</p>

                <p style={{ color: 'white', margin: 30 }}> Aquí esta un pequeño video que muestra como eliminar las rutas.</p>

                <div align="left" style={{ margin: 30 }}>
                    <video src="./img/videoEliminarRuta_Trim.mp4" controls width="500" height="400" className="video2"></video>
                </div>
            </div>
        );
    }
}