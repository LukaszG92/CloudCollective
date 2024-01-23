import React, {useEffect, useState} from "react";
import Modal from "./UI/Modal";
import EditProfile from "./EditProfile";
import Post from "./Post";

function ProfilePost(props) {

    const [showPost, setShowPost] = useState(false);
    const [post, setPost] = useState({});

    const hideShowPostHandler = () => {
        setShowPost(false);
    };
    const showShowPostHandler = (e) => {
        e.preventDefault();
        setShowPost(true);
    };

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch('http://localhost:8000/api/posts/p/'+props.postId);
            const responseData = await response.json();
            setPost(responseData.data.post)
        };
        fetchPost();
    }, []);

    return (
    <>
        {showPost && (
            <Modal onClose={hideShowPostHandler}>
                <Post
                    post={post}
                />
            </Modal>
        )}
        <div key={post.id} className="profilePostWrapper" onClick={showShowPostHandler}>
            <div className="profilePost">
                <img
                    src={post.image}
                    alt=""
                    className="profilePostImg"
                />
            </div>
        </div>
    </>
    )
}

export default ProfilePost;