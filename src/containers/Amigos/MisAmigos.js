import React, { Component } from "react";
import './MisAmigos.css';
import SolidAuth from "solid-auth-client";
import ldflex from "@solid/query-ldflex";
import { Value, List } from '@solid/react';




class MisAmigosComponent extends Component {
    state = {
      profileInput: '',
      activeProfile: '',
      rutas: [],
      url: null,
      load: false,
      selectedRoute: null
    };

    componentDidMount() {
      const { webId} = this.props;
      if ( webId )
        this.setState({ profileInput: webId});
      this.setUrlFromStorage()
    };

    async setUrlFromStorage() {
      if (this.props.webId && !this.state.url) {
          const storageRoot = await ldflex[this.props.webId]["pim:storage"];
          if (storageRoot) {
              const exampleUrl = new URL(
                  "/share/",
                  storageRoot.value
              );
              this.setState(prevState => ({
                  ...prevState,
                  url: exampleUrl
              }));
          }
      }
  }

    componentDidUpdate(prevProps) {
      if (this.state.url && !this.state.load) {
          const doc = SolidAuth.fetch(new URL('rutaEjemplo.json', this.state.url));

          doc.then(async response => {
              if (response.status == 200) {
                  const json = await response.text();

                  const jsonParse = JSON.parse(json);

                  if (jsonParse.rutas) {
                      const lista = jsonParse.rutas.map(ruta => ({
                          ...ruta,
                          locations: ruta.locations.map(
                              eleinterno => ({
                                  lat: eleinterno["schema:latitude"],
                                  lng: eleinterno["schema:longitude"],
                                  images: eleinterno["viade:images"]
                              })
                          )
                      }));
  
                      this.setState(prevState => ({
                          ...prevState,
                          load: true,
                          rutas: lista
                      }));
  
                  }

              } else if (response.status == 404) {
                  console.log("Documento no encontrado");
                  this.setState(prevState => ({
                      ...prevState,
                      load: true
                  }));
              } else {
                  console.log("Error indeterminado");
                  this.setState(prevState => ({
                      ...prevState,
                      load: true
                  }));
              }
          });
      }
      console.log(this.state.locations);
  }

  async compartir(url) {
    if (this.state.selectedRoute) {
      url = url.replace('/profile/card#me', '');
      const result = await SolidAuth.fetch(new URL('inbox', url), {
        method: "POST",
        body: JSON.stringify(this.state.selectedRoute),
        headers: {
            Accept: "application/json"
        }
      });
      alert('Ruta compartida');
    }
    else {
      alert('Selecciona una ruta primero');
    }

  }


    render() {
        return (

    <div className="app">
        <h1 class="friends">Mis Rutas</h1>       
          <p>Rutas de <div class="usuario"> <Value src="user.name"/> </div>.</p>
          <div>
          <dl>
                  
                  {
                     
                      this.state.rutas.map((route,i) => (
                          <React.Fragment key={`route_${i}`}>
                             
                              <dt>
                                  <a href="#" style={{fontWeight: this.state.selectedRoute == route ? 'bold': 'normal'}} onClick={(e) => {
                                      e.preventDefault();
                                      this.setState((prevState) => ({
                                          ...prevState,
                                          selectedRoute: route
                                      }))
                                  }}>
                                      {route.nombre}
                                  </a>
                              </dt>
                              <dd style={{color: 'black'}} >{route.descripcion}</dd>
                              
                          </React.Fragment>
                      )).slice(0,-1)
                      
                  }
                 
              </dl>

          </div>
          <div class="amigos">


          <List src="user.friends">{friend =>    
                 
            <li  key={friend}> 
            <a href={friend}> + 
            <Value  src={friend} /> 
            </a>
            {
              this.state.selectedRoute && (
            <ul style={{listStyle: 'circle', paddingLeft: '40px'}}>
              <li>
              <a href="#" onClick={(e) => {
              e.preventDefault();
              this.compartir(friend.toString());
            }}> 
              Compartir {this.state.selectedRoute.nombre} con este usuario
            </a>

              </li>
            </ul>)
            }
            
            </li>
                   
          }
          </List>
          </div>
            
    </div>
        );
    }
}

export default MisAmigosComponent;