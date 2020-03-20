import React, { Component } from "react";
import { thisExpression } from "@babel/types";

class FormAdd extends Component{
    constructor(props) {
        super();
        this.state = { showForm: true };
    }
    onClick() {
        this.setState({showForm: !this.state.showForm})
    }

    render(){ 
        return ( 
            <div>
                <button type ="button" class="btn btn-primary" onClick={this.onClick}>Añadir amigo:</button>
                { this.state.showForm? <label class ="form-label" for="url">Ejemplo</label> : null }                
            </div>
        )


    }
};

var Form = React.createElement({
    render: function () {
        return (
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
        );
    }
});
export default FormAdd;
        