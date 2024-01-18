import React from "react";
import styled from "styled-components";
import Topbar from "../Topbar/Topbar";
import {useLocation} from 'react-router-dom';

function Explore() {
    let location = useLocation();
    console.log(location.state.username);
    return(
    <>
        <Topbar/>
        <PostsContainer>
            <div className="postsWrapper">
                <div className="profilePostWrapper">
                    <div className="profilePost">
                        <img
                            src={"http://localhost:3000/images/defaultpost.jpg"}
                            alt=""
                            className="profilePostImg"
                        />
                    </div>
                </div>
                <div className="profilePostWrapper">
                    <div className="profilePost">
                        <img
                            src={"http://localhost:3000/images/defaultpost.jpg"}
                            alt=""
                            className="profilePostImg"
                        />
                    </div>
                </div>
                <div className="profilePostWrapper">
                    <div className="profilePost">
                        <img
                            src={"http://localhost:3000/images/defaultpost.jpg"}
                            alt=""
                            className="profilePostImg"
                        />
                    </div>
                </div>
                <div className="profilePostWrapper">
                    <div className="profilePost">
                        <img
                            src={"http://localhost:3000/images/defaultpost.jpg"}
                            alt=""
                            className="profilePostImg"
                        />
                    </div>
                </div>
                <div className="profilePostWrapper">
                    <div className="profilePost">
                        <img
                            src={"http://localhost:3000/images/defaultpost.jpg"}
                            alt=""
                            className="profilePostImg"
                        />
                    </div>
                </div>
                <div className="profilePostWrapper">
                    <div className="profilePost">
                        <img
                            src={"http://localhost:3000/images/defaultpost.jpg"}
                            alt=""
                            className="profilePostImg"
                        />
                    </div>
                </div>
                <div className="profilePostWrapper">
                    <div className="profilePost">
                        <img
                            src={"http://localhost:3000/images/defaultpost.jpg"}
                            alt=""
                            className="profilePostImg"
                        />
                    </div>
                </div>
                <div className="profilePostWrapper">
                    <div className="profilePost">
                        <img
                            src={"http://localhost:3000/images/defaultpost.jpg"}
                            alt=""
                            className="profilePostImg"
                        />
                    </div>
                </div>
                <div className="profilePostWrapper">
                    <div className="profilePost">
                        <img
                            src={"http://localhost:3000/images/defaultpost.jpg"}
                            alt=""
                            className="profilePostImg"
                        />
                    </div>
                </div>
                <div className="profilePostWrapper">
                    <div className="profilePost">
                        <img
                            src={"http://localhost:3000/images/defaultpost.jpg"}
                            alt=""
                            className="profilePostImg"
                        />
                    </div>
                </div>
                <div className="profilePostWrapper">
                    <div className="profilePost">
                        <img
                            src={"http://localhost:3000/images/defaultpost.jpg"}
                            alt=""
                            className="profilePostImg"
                        />
                    </div>
                </div>
                <div className="profilePostWrapper">
                    <div className="profilePost">
                        <img
                            src={"http://localhost:3000/images/defaultpost.jpg"}
                            alt=""
                            className="profilePostImg"
                        />
                    </div>
                </div>
                <div className="profilePostWrapper">
                    <div className="profilePost">
                        <img
                            src={"http://localhost:3000/images/defaultpost.jpg"}
                            alt=""
                            className="profilePostImg"
                        />
                    </div>
                </div>
                <div className="profilePostWrapper">
                    <div className="profilePost">
                        <img
                            src={"http://localhost:3000/images/defaultpost.jpg"}
                            alt=""
                            className="profilePostImg"
                        />
                    </div>
                </div>
                <div className="profilePostWrapper">
                    <div className="profilePost">
                        <img
                            src={"http://localhost:3000/images/defaultpost.jpg"}
                            alt=""
                            className="profilePostImg"
                        />
                    </div>
                </div>
                <div className="profilePostWrapper">
                    <div className="profilePost">
                        <img
                            src={"http://localhost:3000/images/defaultpost.jpg"}
                            alt=""
                            className="profilePostImg"
                        />
                    </div>
                </div>
                <div className="profilePostWrapper">
                    <div className="profilePost">
                        <img
                            src={"http://localhost:3000/images/defaultpost.jpg"}
                            alt=""
                            className="profilePostImg"
                        />
                    </div>
                </div>
                <div className="profilePostWrapper">
                    <div className="profilePost">
                        <img
                            src={"http://localhost:3000/images/defaultpost.jpg"}
                            alt=""
                            className="profilePostImg"
                        />
                    </div>
                </div>
            </div>
        </PostsContainer>
    </>
    );
}

export default Explore;

const PostsContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 10px;
    .postsWrapper {
        display: flex;
        width: 999px;
        flex-wrap: wrap;
    }
    .profilePostWrapper {
        padding: 1%;
        aspect-ratio: 1 / 1;
        flex-grow: 1;
        width: 23%;
        max-width: 23%;
        display: flex;
    }
    .profilePost {
        width: 100%;
        height: 100%;
        padding: 1%;
        justify-content: center;
    }
    .profilePostImg {
        width: 100%;
        height: 100%;
        object-fit: fill;
        display: block;
    }
`;