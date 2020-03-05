import React, { Component } from "react";
import Lista from './Lista';
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
        <button type ="button" class="btn btn-primary">Añadir amigo:</button>
        <form>
          <div class="add-friend">
            <label class ="form-label" for="url">Url:</label>
            <input type ="text" name="url" 
                placeholder= "Ejemplo: https://ejemplo.solid.community/profile/card#me" required="true"/>
            <label class ="form-label" for="name">Nombre:</label>
            <input type ="text" name="name" 
                placeholder="Ejemplo: Juan Rutas" required="true"/>
            <button type ="submit"class="btn btn-primary">Añadir</button>
          </div>  
        </form>      
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