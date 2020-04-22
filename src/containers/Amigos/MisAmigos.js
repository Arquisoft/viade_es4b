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
          <p>Amigos de <div class="usuario"> <Value src="user.name"/> </div>.</p>
          <div class="amigos">
          <List src="user.friends">{friend =>    
                 
            <li key={friend}> + 
            <Value src={friend} /> 
            
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