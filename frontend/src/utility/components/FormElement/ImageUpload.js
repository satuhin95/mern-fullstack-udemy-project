import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import "./ImageUpload.css";
const ImageUpload =(props)=> {
    const [file, setFile] = useState();
    const [previewUrl , setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);

    const filePickerRef = useRef();

    useEffect(()=>{
        if(!file){
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = ()=>{
            setPreviewUrl(fileReader.result)
        }
        fileReader.readAsDataURL(file);
    },[file])

    const uploadHandler = (e)=>{
        let imageFile;
        let fileIsValid = isValid;
       if (e.target.files && e.target.files.length === 1) {
         imageFile = e.target.files[0];
        setFile(imageFile);
        setIsValid(true);
        fileIsValid= true;
       }else{
        setIsValid(false)
        fileIsValid = false
       }
       props.onInput(props.id,imageFile,fileIsValid )
    }
    const uploadImageHandler =()=>{
        filePickerRef.current.click()
    }
  return (
    <div className="form-control">
      <input
        type="file"
        ref={filePickerRef}
        style={{ display: "none" }}
        id={props.id}
        accept=".jpg,.png,.jpeg"
        onChange={uploadHandler}
      />
      <div className={`image-upload ${props.center && 'center'}`}>
        <div className="image-upload__preview ">
            {previewUrl && <img src={previewUrl} alt="preview"/>}
            {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <Button type="button" onClick={uploadImageHandler}>Upload</Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
}
export default  ImageUpload;