import react from 'react';

class MiComponente extends React.Component {

    render() {
        let receta = {
            nombre='Pizza',
            ingredientes=['Tomate', 'Queso', 'Jamon cocido'],
            calorias=400

        };
        return (
            <react.Fragment>
                <h2>Hola soy el componente llamado: MiComponente</h2>
                <h2>{receta.nombre}</h2>
                <h3>Estoy probando cosas</h3>
            </react.Fragment>
        );
    }
}

export default MiComponente;