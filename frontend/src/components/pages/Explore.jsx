import React, {useContext, useEffect, useState} from "react";
import styled from "styled-components";
import Topbar from "../Topbar/Topbar";
import {AuthContext} from "../../context/auth-context";
import Modal from "../UI/Modal";
import Post from "../Post";

function Explore() {

    const auth = useContext( AuthContext)
    const [posts, setPosts] = useState([]);
    const [showPost, setShowPosts] = useState(false);
    const [showPostData, setShowPostData] = useState({});

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch('http://localhost:8000/api/posts/explore', {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: auth.username,
                }
            });
            const responseData = await response.json();
            console.log(responseData.data.posts)
            setPosts(responseData.data.posts)
        };
        fetchPost();
    }, []);

    return(
    <>
        <Topbar/>
        <PostsContainer>
            {showPost && (
                <Modal onClose={() => setShowPosts(false)}>
                    <Post
                        post={showPostData}
                    />
                </Modal>
            )}
            <div className="postsWrapper">
                {posts.map( (post) => (
                    <div key={post.id} className="profilePostWrapper" onClick={() =>{
                        setShowPostData(post);
                        setShowPosts(true);
                    }}>
                        <div className="profilePost">
                            <img
                                src={post.image}
                                alt=""
                                className="profilePostImg"
                            />
                        </div>
                    </div>
                ))}
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
        max-height: 100%;
        max-width: 100%;
        margin: auto;
        display: block;
    }
`;