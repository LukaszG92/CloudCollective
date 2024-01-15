import { useContext, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function EditProfile(props) {
  const navigate = useNavigate();

  return (
    <EditProfileContainer>
      <div className="editProfileWrapper">
        <div className="editProfileLeft">
          <label className="fileupload" htmlFor="file">
            <img
              src={"http://localhost:3000/image/defaultavatar.png"
              }
              alt=""
              className="editProfileLeftImg"
            />
            <span className="shareOptionText">Choose Picture</span>
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              accept=".png,.jpeg,.jpg"
            />
          </label>
        </div>
        <div className="editProfileRight">
          <form className="editProfileBox">
            <div className="editProfileBoxInput">
              <input
                type="text"
                className="BoxInput"
                placeholder="Username"
              />
            </div>
            <div className="editProfileBoxInput">
              <input
                type="textarea"
                className="BoxInput"
                placeholder="Bio"
              />
            </div>
            <div className="editProfileBoxInput">
              <input
                type="email"
                className="BoxInput"
                placeholder="Email"
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
    width: 150px;
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
