import React, { Component } from "react";

class Lista extends Component{

    render(){

        return (
            <li>
                <div className="imagen">
                    <img src={require(`../images/${this.props.data.image}`)}  alt="user" />
                </div>
                <div className="nombre">
                    <span className="nombreUsuario">{this.props.data.nombre}</span>
                    <span className="usuario">{this.props.data.usuario}</span>
                </div>
                
                <button className="remove" onClick={this._remove.bind(this)}>
                    <i className="material-icons">close</i>
                </button>
            </li>
        )


    }
}
export default Lista;