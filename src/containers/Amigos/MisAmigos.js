import React, { Component } from "react";
import Lista from './Lista';
import FormAdd from './MisAmigos.formulario';
import './MisAmigos.css';


const $rdf = require('rdflib')

class MisAmigosComponent extends Component {
  
    constructor(props){
        super(props);
        this.state = {
          data : [],
          isLoaded: false,
        }
    }

    componentDidMount(){
      fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          data: json,
        })
      })
    }
     
    render() {
        var {isLoaded, data} = this.state;

        if(!isLoaded){
          return <div>Cargando ....</div>
        }else{

        return (
         
        <div className="app">
            <ul>
              {data.map(item => (
                <li key={item.id}>
                  Name: {item.className} | Email: {item.email}
                </li>
              ))};
            </ul>
        </div>
        );
          
      }
    }
}

export default MisAmigosComponent;
//<h1>Mis Amigos</h1>
 ///           <FormAdd/>             
    //            <ul className="lista">
      //              {this.state.data.map(
        //                (item,index) =>
          //                      <Lista data={item} key={index}  />
            //      )
              //      }
                //</ul>