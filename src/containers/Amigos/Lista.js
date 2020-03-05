import React, { Component } from "react";

class Lista extends Component{

    render(){

        return (
            <li>

                <div className="nombre">
                    <span className="nombreUsuario">{this.props.data.nombre}</span>
                    <span className="usuario">{this.props.data.usuario}</span>
                </div>
                
               
            </li>
        )


    }
}
export default Lista;