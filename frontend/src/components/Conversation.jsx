import ScrollToBottom from "react-scroll-to-bottom";
import ReactEmoji from "react-emoji";
import React, {useState} from "react";
import styled from "styled-components";

function Conversation() {

    const [message, setMessage] = useState("");

    return (
        <ChatContainer>
            <div className="chatTitle">
                <div className="infoBar">
                    <div className="leftInnerContainer">
                        <img
                            src="http://localhost:3000/images/defaultavatar.png"
                            alt=""
                            className="chatListUserImg"
                        />
                        <h3>Username Chat</h3>
                    </div>
                </div>
            </div>

            <ScrollToBottom className="chatMessageList">
                <div className="messages">
                    <div className="messageContainer justifyEnd">
                    <div className="messageBox backgroundBlue">
                            <p className="messageText colorWhite">{ReactEmoji.emojify("text")}</p>
                        </div>
                    </div>
                </div>
            </ScrollToBottom>

            <div className="chatForm">
                <form className="form">
                    <input
                        className="input"
                        type="text"
                        placeholder="Type message ..."
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                    />
                    <button className="sendButton">
                        Send Message
                    </button>
                </form>
            </div>
        </ChatContainer>
    );

}

export default Conversation;


const ChatContainer = styled.div`
    z-index: -1;
    display: grid;
    grid:
      'search-container chat-title' 71px
      'conversation-list chat-message-list' 1fr
      'new-message-container chat-form' 78px
      / 275px 1fr;
    width: 88.6%;
    height: 95vh;
    position: fixed;
    right: 0;
    .chatListUserImg {
        padding: 0 10px;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        object-fit: cover;
        cursor: pointer;
    }
    .chatTitle {
        background-color: white;
        display: grid;
        grid: 36px / 1fr 36px;
        align-content: center;
        align-items: center;
        grid-area: chat-title;
        color: #0048AA;
        font-weight: bold;
        font-size: 0.2rem;
        border-radius: 0 10px 0 0;
        box-shadow: 0 1px 3px -1px rgba(0,0,0,0.75);
        padding: 0 20px;
    }
    .infoBar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 4px 4px 0 0;
        height: 60px;
        width: 100%;
    }
    .leftInnerContainer {
        flex: 0.5;
        display: flex;
        align-items: center;
        margin-left: 2%;
        color: black;
        font-size: 1.4rem;
    }
    .chatMessageList{
        grid-area: chat-message-list;
        overflow-y:hidden;

    }
    .messages {
        padding: 5% 0;
        overflow: auto;
        flex: auto;
    }
    .messageContainer {
        display: flex;
        justify-content: flex-end;
        padding: 0 5%;
        margin-top: 3px;
    }

    .justifyStart {
        justify-content: flex-start;
    }

    .justifyEnd {
        justify-content: flex-end;
    }
    .messageBox {
        background: #F3F3F3;
        border-radius: 20px;
        padding: 5px 20px;
        color: white;
        display: inline-block;
        max-width: 80%;
    }
    .backgroundBlue {
        background: #2979FF;
    }

    .backgroundLight {
        background: #F3F3F3;
    }
    .messageText {
        width: 100%;
        letter-spacing: 0;
        float: left;
        font-size: 1.1em;
        word-wrap: break-word;
    }
    .colorWhite {
        color: white;
    }

    .colorDark {
        color: #353535;
    }
    .chatForm{
        background: #eee;
        grid-area:chat-form;
        border-radius: 0 0 10px 0;
        border-top: 1px solid rgba(0,0,0,0.25);
        border-bottom: 1px solid rgba(0,0,0,0.25);
    }
    .form {
        display: flex;
    }
    .input {
        border: none;
        border-radius: 0;
        padding-left: 5%;
        width: 80%;
        height: 77px;
        font-size: 1.2em;
    }
    input:focus, textarea:focus, select:focus{
        outline: none;
    }
    .sendButton {
        color: #fff !important;
        text-transform: uppercase;
        text-decoration: none;
        background: #2979FF;

        display: inline-block;
        border: none;
        width: 20%;
        height: 77px;
        border-bottom-right-radius: 8px;
        font-size: 1.0rem;
    }
`;