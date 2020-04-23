import React, { Component } from "react";
import './MisAmigos.css';

import { Value, List } from '@solid/react';




class MisAmigosComponent extends Component {

    state = {
      profileInput: '',
      activeProfile: ''
    };

    componentDidMount() {
      const { webId} = this.props;
      if ( webId )
        this.setState({ profileInput: webId});
    };


    render() {
        return (

    <div className="app">
        <h1 class="friends">Mis Amigos</h1>       
          <p>Amigos de <div class="usuario"> <Value src="user.name"/> </div>.</p>
          <div class="amigos">
          <List src="user.friends">{friend =>    
                 
            <li  key={friend}> 
            <a href={friend}> + 
            <Value  src={friend} /> 
            </a>
            </li>
                   
          }
          </List>
          </div>
            
    </div>
        );
    }
}

export default MisAmigosComponent;