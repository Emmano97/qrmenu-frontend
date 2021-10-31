import React, { useCallback, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Dropzone from './Dropzone';
import {useDropzone} from 'react-dropzone';
import { uploadImage } from '../apis';


function ImageDropzone({ value, onChange }){

    const [loading, setLoading] = useState(false);

    const onDrop = useCallback((acceptedFiles) => {
        setLoading(true);
        uploadImage(acceptedFiles[0])
            .then((json) => onChange(json.url))
            .finally(() => setLoading(false));
    }, []);

    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        multiple: false,
        accept: 'image/*',
    });

    return (
        <Dropzone {...getRootProps()}>
            <input {...getInputProps()}/>
            {
                value ? (
                    <img src={value} />
                ) : 
                loading ? (
                    <Spinner variant="prrimary" animation="border" role="staus"></Spinner>
                ) : (
                    <span> Drag & Drop file here, or click to select file </span>
                )
            }
        </Dropzone>
    )
}

export default ImageDropzone;