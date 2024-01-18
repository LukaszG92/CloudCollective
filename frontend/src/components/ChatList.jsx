import React from "react";
import {Link} from "react-router-dom";
import Topbar from "./Topbar/Topbar";
import RightbarUser from "./Rightbar/RightbarUser";
import styled from "styled-components";

function ChatList() {
    return (
        <RightbarContainer>
            <div className="chatListContainer">
                <div className="chatListUsers">
                    <span className="chatListTitle">Messaggi</span>
                    <div className="chatListUser">
                        <div className="chatListUserLeft">
                            <img
                                src="http://localhost:3000/images/defaultavatar.png"
                                alt=""
                                className="chatListUserImg"
                            />
                            <span className="chatListUserName">Username</span>
                            <img className="chatListUserIcon" alt="Online Icon"
                                 src="http://localhost:3000/images/onlineIcon.png"/>
                        </div>
                    </div>
                </div>
            </div>
        </RightbarContainer>
    )
}


const RightbarContainer = styled.div`
    width: 30%;
    height: 100%;
    overflow: scroll;
    position: fixed;
    left: 0;
    top: 51px;
    overflow-x: hidden;

    ::-webkit-scrollbar {
        width: 3px;
    }

    ::-webkit-scrollbar-track {
        background-color: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
        background-color: rgb(192, 192, 192);
    }

    .chatListContainer {
        height: 100%;
        border-right: gray solid 1px;
    }

    .chatListTitle {
        position: sticky;
        margin: auto;
        padding: 10px;
        font-size: 18px;
        font-weight: bold;
    }

    .chatListUsers {
        display: flex;
        padding-top: 5px;
        flex-direction: column;

    }

    .chatListUser {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px;
        border-bottom: 1px solid gray;
        box-shadow: -2px 10px 9px -7px rgba(0, 0, 0, 0.34);
        -webkit-box-shadow: -2px 10px 9px -7px rgba(0, 0, 0, 0.34);
        -moz-box-shadow: -2px 10px 9px -7px rgba(0, 0, 0, 0.34);
    }

    .chatListUserLeft {
        display: flex;
        align-items: center;
    }

    .chatListUserImg {
        padding-left: 5px;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        object-fit: cover;
        cursor: pointer;
    }

    .chatListUserName {
        padding-left: 10px;
        font-size: 15px;
        font-weight: bold;
    }
    
    .chatListUserIcon {
        padding-left: 10px;
    }
    
    @media (max-width: 780px) {
        display: none;
    }
`;

export default ChatList;