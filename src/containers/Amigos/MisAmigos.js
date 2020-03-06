import React, { Component } from "react";
import Lista from './Lista';
import FormAdd from './MisAmigos.formulario';
import './MisAmigos.css';

class MisAmigosComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
          data : [
            {
              nombreUsuario  : "Andrés Fernández González",
              usuario : "UO264699",
              
            }
          ]
        }
      }


    render() {
        return (
         
        <div className="app">
            <h1>Mis Amigos</h1>
            <FormAdd/>             
                <ul className="lista">
                    {this.state.data.map(
                        (item,index) =>
                                <Lista data={item} key={index}  />
                  )
                    }
                </ul>
        </div>
        );
    }
}

export default MisAmigosComponent;