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

                if (file instanceof File) {
                    uploadData.append(file.name, file);
                } else {
                    alert('Error reading file: ' + file.name);
                }
            }

            axios.post(uploadURL, uploadData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    console.log(`Upload Progress: ${percentCompleted}%`);
                }
            }).then(() => {
                console.log('Files uploaded successfully.')
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

