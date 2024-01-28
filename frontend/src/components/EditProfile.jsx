import styled from "styled-components";
import {useContext, useEffect, useRef, useState} from "react";
import { AuthContext } from "../context/auth-context";
import {NotificationContainer, NotificationManager} from "react-notifications";

function EditProfile(props) {
    const auth = useContext(AuthContext)

    const [nome, setNome] = useState(props.user.nome);
    const [cognome, setCognome] = useState(props.user.cognome)
    const [bio, setBio] = useState(props.user.bio);
    const [mail, setMail] = useState(props.user.email);
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();

    const filePickerRef = useRef();

    useEffect(() => {
        if (!file) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }, [file]);

    const pickedHandler = event => {
        let pickedFile;
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            setFile(pickedFile);
        }
    };

    const editProfileHandler = async (e) => {
        e.preventDefault();
        let formData = new FormData()
        formData.append('nome', nome)
        formData.append('cognome', cognome)
        formData.append('bio', bio)
        formData.append('email', mail)
        formData.append('profilePic', props.user.profilePic)
        if(file)
            formData.append('image', file)
        const response = await fetch('http://localhost:8000/api/users/update', {
            method: 'POST',
            headers: {
                Authorization: auth.username,
            },
            body:
                formData
        });
        const responseData = await response.json();
        if(response.status === 200)
            props.onClose();
        if(response.status === 422)
            NotificationManager.warning(responseData.message, 'Invalid data warning.', 2000)
        if(response.status === 500)
            NotificationManager.error(responseData.message, 'Internal server error.', 2000)
    }

    return (
        <EditProfileContainer>
            <NotificationContainer/>
            <div className="editProfileWrapper">
                <div className="editProfileLeft">
                    <label className="fileupload" htmlFor="file">
                        <div className="imgWrapper">
                            <img
                                src={previewUrl ? previewUrl : props.user.profilePic}
                                alt=""
                                className="editProfileLeftImg"
                            />
                        </div>
                        <span className="shareOptionText">Choose Picture</span>
                        <input
                            style={{display: "none"}}
                            type="file"
                          id="file"
                          accept=".png,.jpeg,.jpg"
                          onChange={pickedHandler}
                          ref={filePickerRef}
                        />
                    </label>
                </div>
                <div className="editProfileRight">
                    <form className="editProfileBox" onSubmit={editProfileHandler}>
                        <div className="editProfileBoxInput">
                            <input
                                onChange={(e) => {
                                    setNome(e.target.value);
                                }}
                                value={nome}
                                required
                                type="textarea"
                                className="BoxInput"
                                placeholder="Nome..."
                            />
                        </div>
                        <div className="editProfileBoxInput">
                            <input
                                onChange={(e) => {
                                    setCognome(e.target.value);
                                }}
                                value={cognome}
                                required
                                type="textarea"
                                className="BoxInput"
                                placeholder="Cognome..."
                            />
                        </div>
                        <div className="editProfileBoxInput">
                            <input
                                onChange={(e) => {
                                    setBio(e.target.value);
                                }}
                                value={bio}
                                type="textarea"
                                className="BoxInput"
                                placeholder="Bio..."
                            />
                        </div>
                        <div className="editProfileBoxInput">
                            <input
                                onChange={(e) => {
                                    setMail(e.target.value);
                                }}
                                value={mail}
                                required
                                type="email"
                                className="BoxInput"
                                placeholder="Email..."
                            />
                        </div>
                        <div className="editProfileBoxInput">
                            <button className="editProfileButton">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </EditProfileContainer>
    );
}

const EditProfileContainer = styled.div`
    padding: 9px;

    .editProfileLeftImg {
        max-height: 150px;
        max-width: 150px;
        margin: auto;
        display: block;
    }
    .editProfileWrapper {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        flex-direction: column;
    }

    .editProfileBox {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        background-color: white;
        padding: 20px;
    }
    .editProfileBoxInput {
        padding-bottom: 10px;
    }
    .BoxInput {
        height: 30px;
        border-radius: 5px;
        border: 1px solid gray;
        font-size: 18px;
        padding-left: 10px;
    }
    .editProfileButton {
        height: 30px;
        border-radius: 10px;
        border: none;
        background-color: black;
        color: white;
        font-size: 16px;
        padding: 0 20px;
        cursor: pointer;
    }
    .shareOptionText {
        height: 20px;
        border-radius: 10px;
        border: none;
        background-color: #3b3b3b;
        color: white;
        font-size: 16px;
        padding: 0 20px;
        cursor: pointer;
    }
    .fileupload {
        cursor: pointer;
        display: flex;
        flex-direction: column;
    } 
`;

export default EditProfile;
