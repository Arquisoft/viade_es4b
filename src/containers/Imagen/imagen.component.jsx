import React from "react";
import SolidAuth from "solid-auth-client";
import FileUploader from "./FileUploader";

 
class ImageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
     
    async onClick(e) {
        e.preventDefault();

        var file = this.refs.uploader.getFileObject();

        var data = await file.arrayBuffer();
        console.log(this.props.url);
        var imageName = new Date().valueOf() + '.png';
        var url = new URL(imageName, this.props.url);
        console.log(url);
        const result = await SolidAuth.fetch(url, {
            method: "PUT",
            body: data,
            headers: {
                Accept: "application/ld+json"
            }
        });
        this.props.addImage(imageName);
        console.log(result);
        /*
        this.setState(prevState => ({
            ...prevState,
            locations: locations
        }));

         
        var url = 'http://nowhere.com',
            fileObject = this.refs.uploader.getFileObject(),
            formData = new FormData(document.getElementById('form'));
             
        if (undefined === fileObject) return;
         
        formData.append('file', fileObject);
        fetch(url, {
            method: 'POST',
            body: formData
        });
        */
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
 
 

export default ImageComponent;