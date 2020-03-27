import React, { Component } from 'react';
import './perfil.style'
import { Value, Image, List } from '@solid/react';

class Perfil extends Component {

    state = {
        activeProfile: ''
      };

    componentDidMount(){
        const { userId } = this.props
        if ( userId )
            this.setState({ activeProfile: userId});
    }

    render() {
        // TODO
        const { activeProfile } = this.state;

        return (
            <div>
                <h1>Perfil de : <Value src={activeProfile} /></h1>
                <h2> Rutas </h2>
            </div>
        )
    }
}

export default Perfil;