import styled from "styled-components";
import {useContext, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import { AuthContext } from "../context/auth-context";

function EditProfile(props) {
    const auth = useContext(AuthContext)
    const navigate = useNavigate();
    const [nome, setNome] = useState(props.user.nome);
    const [cognome, setCognome] = useState(props.user.cognome)
    const [bio, setBio] = useState(props.user.bio);
    const [mail, setMail] = useState(props.user.email);
    const [profilePic, setProfilePic] = useState(props.user.profilePic)
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
        const response = await fetch('http://localhost:8000/api/users/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: auth.username,
            },
            body: JSON.stringify({
                nome,
                cognome,
                bio,
                mail,
                profilePic
            })
        });
        let responseData = await response.json();
        props.onClose();
        props.setUserData(responseData.data.user)
    }

    return (
        <EditProfileContainer>
            <div className="editProfileWrapper">
                <div className="editProfileLeft">
                    <label className="fileupload" htmlFor="file">
                        <img
                          src={previewUrl ? previewUrl : profilePic }
                          alt=""
                          className="editProfileLeftImg"
                        />
                        <span className="shareOptionText">Choose Picture</span>
                        <input
                          style={{ display: "none" }}
                          type="file"
                          id="file"
                          accept=".png,.jpeg,.jpg"
                          onChange={pickedHandler}
                          ref={filePickerRef}
                        />
                    </label>
                </div>
                <div className="editProfileRight">
                    <form className="editProfileBox">
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
                                required
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
                            <button className="editProfileButton"
                                    onClick={editProfileHandler}>
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
        width: 150px;
        height: 150px;
        display: block;
        border-radius: 50%;
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
