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
        <h1 class="friends">Mis Amigos</h1>
      
        <form>
          <div class="add-friend">
            <div class = "label">   
            <label  for="url">Url:</label>
            </div>

            <div class = "campoTexto">
            <input  type ="text" name="url" 
                placeholder= "Ejemplo: https://ejemplo.solid.community/profile/card#me" />
            </div>

            
            <button type ="button" class="añadiramigo">Añadir amigo</button>
            

          </div>  
        </form> 
        <Image src="user.image" defaultSrc="profile.svg" className="profile"/>
          <p>Welcome Back, <div class="usuario"> <Value src="user.name"/> </div>.</p>
          <div class="amigos">
          <h2 class = "friends">Amigos</h2>
          <List src="user.friends">{friend =>    
                 
            <li key={friend}> + 
            <Value src={friend.name} /> --
            <Value src={friend.storage}/>  
            <Link to={{
              pathname: '/profile',
              state: {
                userId: friend
              }
              
            }} >
            Ver Perfil
            </Link>
            
        {this.props.children}
            </li>
                   
          }
          </List>
          </div>
            
    </div>
        );
    }
}

export default MisAmigosComponent;