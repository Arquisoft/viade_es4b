import React, { Component } from "react";
import './MisAmigos.css';

import { Value, Image, List } from '@solid/react';
import { Link } from "react-router-dom";




class MisAmigosComponent extends Component {

    state = {
      profileInput: '',
      activeProfile: ''
    };

    componentDidMount() {
      const { webId} = this.props;
      if ( webId )
        this.setState({ profileInput: webId});
    }
    saveFriend = (uri) => {
    };


    render() {
      const { profileInput, activeProfile } = this.state;
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
        <Image src="user.image" defaultSrc="profile.svg" className="profile"/>
          <p>Welcome back, <Value src="user.name"/>.</p>
          <h2>Friends</h2>
          <List src="user.friends">{friend =>   
                 
            <li key={friend}> + 
            <Value src={friend.name} /> --
            <Value src={friend.storage}/>  
            </li>    
                   
          }
          </List>
            
    </div>
        );
    }
}

export default MisAmigosComponent;