import {useContext, useState, useRef, useEffect} from "react";
import styled from "styled-components";
import { MdPermMedia } from "react-icons/md";
import {AuthContext} from "../../context/auth-context";

function Share(props) {
    const auth = useContext(AuthContext);
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState("");
    const [previewUrl, setPreviewUrl] = useState("");

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


    const shareHandler = async e => {
        e.preventDefault();
        let response = await fetch('http://localhost:8000/api/posts/new', {
            method:'POST',
            headers: {
                'Content-Type':'application/json',
                Authorization: auth.username,
            },
            body: JSON.stringify({
                description
            })
        })
        let responseData = await response.json();
        console.log(responseData)
    }

    const pickedHandler = event => {
        let pickedFile;
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            setFile(pickedFile);
        }
    };

    return (
        <ShareContainer>
            <div className="shareWrapper">
                <div className="shareTop">
                    <img
                        src={previewUrl ? previewUrl : "http://localhost:3000/images/defaultavatar.png"}
                        alt=""
                        className="postPreview"
                    />
                </div>
                <div>
                    <input
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                        value={description}
                        required
                        type="textarea"
                        className="BoxInput"
                        placeholder="Description..."
                    />
                </div>
                <hr className="shareHr"/>
                <form className="shareBottom">
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <MdPermMedia className="shareIcon"/>
                            <span className="shareOptionText">Photo or Video</span>
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
                    <button className="shareButton" type="submit" onClick={shareHandler}>
                        Share
                    </button>
                </form>
            </div>
        </ShareContainer>
    );
}

const ShareContainer = styled.div`
    width: 100%;
    border-radius: 10px;
    -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
    box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);

    .postPreview {
        max-height: 450px;
        max-width: 450px;
        margin: auto;
        display: block;
    }
    .BoxInput {
        width: 100%;
        height: 30px;
        border-radius: 5px;
        border: 1px solid gray;
        font-size: 18px;
        margin-top: 20px;
    }
    .shareWrapper {
        padding: 10px;
        /* border: solid #5b6dcd 1px; */
    margin: 10px;
  }
  .shareTop {
    display: flex;
    align-items: center;
  }
  .shareInput {
    border: none;
    width: 100%;
  }
  .shareInput:focus {
    outline: none;
  }
  .shareHr {
    margin: 20px;
  }
  .shareBottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .shareOptions {
    display: flex;
    margin-left: 20px;
  }
  .shareOption {
    display: flex;
    align-items: center;
    margin-right: 15px;
    cursor: pointer;
  }
  .shareIcon {
    font-size: 18px;
    margin-right: 3px;
  }
  .shareOptionText {
    font-size: 14px;
    font-weight: 500;
  }
  .shareButton {
    border: none;
    padding: 7px;
    border-radius: 5px;
    background-color: #1872f2;
    font-weight: 500;
    margin-right: 20px;
    cursor: pointer;
    color: white;
  }
`;

export default Share;