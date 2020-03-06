import React, { Component } from "react";

class FormAdd extends Component{

    render(){

        return ( 
            <div>
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
            </div>
            
        )


    }
}
export default FormAdd;
        