import React, { Component } from "react";
import Lista from './Lista';


class MisAmigosComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
          data : [
            {
              imagen : "",
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
            <ul className="lista">
                {this.state.data.map(
                    (item,index) =>
                            <Lista data={item} key={index} onRemove={ () => this._remove(index)} />
               )
                }
</ul>
</div>
        );
    }
}

export default MisAmigosComponent;