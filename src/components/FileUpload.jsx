import './FileUpload.css'
import PropTypes from "prop-types";
import {useEffect} from "react";
import axios from "axios";

export default function FileUpload({uploadURL}) {

    useEffect(() => {
        document.getElementById('scriptUpload').addEventListener('input', function(event) {

            const fileInput = document.getElementById('scriptUpload');

            const uploadData = new FormData();

            for (let file of fileInput.files) {
                console.log('Uploading file: ')
                console.log(file)
                uploadData.append('file', file);

                // if (file instanceof File) {
                //     formData.append(file.name, file);
                // } else {
                //     alert('Error reading file: ' + file.name);
                // }
            }

            console.log('Sending data:')
            console.log(uploadData.getAll('file'))

            axios.post(uploadURL, uploadData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    console.log(`Upload Progress: ${percentCompleted}%`);
                }
            }).then(() => {
                alert('Files uploaded successfully.')
            }).catch(() => {
                alert('There was an error uploading your files. Please try again.')
            })
        });
    }, []);

    return (
        <>
            <input type="file" id="scriptUpload" className="custom-script-input" accept=".js" multiple="multiple"/>
            <label htmlFor="scriptUpload" className="custom-script-label"></label>
        </>
    )
}
FileUpload.propTypes = {
    uploadURL: PropTypes.string.isRequired,
}

