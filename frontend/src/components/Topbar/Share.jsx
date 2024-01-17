import { useContext, useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { MdPermMedia } from "react-icons/md";
import { NotificationManager } from "react-notifications";

function Share(props) {
    const navigate = useNavigate();
    const desc = useRef();
    const [file, setFile] = useState(null);

    return (
        <ShareContainer>
            <div className="shareWrapper">
                <div className="shareTop">
                    <input
                        placeholder={"What's in your mind ?"}
                        className="shareInput"
                        ref={desc}
                        required
                    />
                </div>
                <hr className="shareHr" />
                <form className="shareBottom">
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <MdPermMedia className="shareIcon" />
                            <span className="shareOptionText">Photo or Video</span>
                            <input
                                style={{ display: "none" }}
                                type="file"
                                id="file"
                                accept=".png,.jpeg,.jpg"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>
                    </div>
                    <button className="shareButton"  type="submit">
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