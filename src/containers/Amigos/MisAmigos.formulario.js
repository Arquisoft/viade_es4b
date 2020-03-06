import React, { Component } from "react";
import { thisExpression } from "@babel/types";

class FormAdd extends Component{
    constructor(props) {
        this.state = { showForm: false };
       }
     //  this.setState(prevState => ({
     //   check: !prevState.check
      //}));
    handleClick(){
        this.setState({ showForm: true }); 
    };

    render(){ 
        return ( 
            <div>
                <button type ="button" class="btn btn-primary" onClick={this.handleClick}>Añadir amigo:</button>
                {this.state.showForm? <Form/> : null}                
            </div>
        )


    }
}

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
        