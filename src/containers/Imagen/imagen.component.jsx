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
        
    }
     
    render() {
        return (
            <div id='app'>
                <FileUploader ref="uploader" />
                <button onClick={this.onClick}>Subir foto</button>
            </div>
        );
    }
}
 
 

export default ImageComponent;