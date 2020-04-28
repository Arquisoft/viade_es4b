import React from "react";

import FileUploader from "./FileUploader";

 
class AppComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
     
    onClick(e) {
        e.preventDefault();
         
        var url = 'http://nowhere.com',
            fileObject = this.refs.uploader.getFileObject(),
            formData = new FormData(document.getElementById('form'));
             
        if (undefined === fileObject) return;
         
        formData.append('file', fileObject);
        fetch(url, {
            method: 'POST',
            body: formData
        });
    }
     
    render() {
        return (
            <div id='app'>
                <FileUploader ref="uploader" />
                <button onClick={this.onClick}>Enviar</button>
            </div>
        );
    }
}
 
 

export default AppComponent;