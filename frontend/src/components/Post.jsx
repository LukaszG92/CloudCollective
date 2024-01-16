import PropTypes from 'prop-types';
import { FiMoreVertical } from "react-icons/fi";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import {formatDistance} from "date-fns";
import {AiFillHeart} from "react-icons/ai";

export default function Post( content ) {

    // components
    // -> header, image, actions (like & comment icons), footer, comments
    return (
        <PostContainer>
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={"/profile/" + content.username}>
                        <img
                            src={'http://localhost:3000/images/defaultavatar.png'}
                            alt=""
                            className="postProfileImg"
                        />
                    </Link>
                    <Link
                        style={{ textDecoration: "none", color: "#000000" }}
                        to={"/profile/" + content.username}
                    >
                        <span className="postUsername">{content.username}</span>
                    </Link>
                </div>
                <div className="postTopright">
                    <span className="postDate"> {formatDistance(content.dateCreated, new Date())} ago</span>
                    <FiMoreVertical/>
                    <div className="topRightPanel">
                        Delete
                    </div>
                </div>
            </div>
            <hr className="hrh" />
            <div className="postCenter">
                <div className="postImgWrapper">
                    <img
                        src={content.imageSrc}
                        alt=""
                        className="postImg"
                    />
                </div>
                <p className="postText">{content.caption}</p>
            </div>
            <hr className="hrh" />
            <div className="postBottom">
                <div className="postBottomLeft">
                    <AiFillHeart
                        className="likeIcon"
                        color={"red"}
                    />
                    <span
                        className="postLikeCounter"
                    >
              0 Likes 0 Comments
            </span>
                </div>
            </div>
        </PostContainer>
    );
}

const PostContainer = styled.div`
    width: 99%;
    border-radius: 10px;
    border: 1px solid rgb(211, 211, 211);
    -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
    box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
    margin-top: 10px;
    margin-bottom: 50px;
    .postTop {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px;
    }
    .postTopright {
        position: relative;
    }
    .topRightPanel {
        position: absolute;
        background-color: #eaeaea;
        width: 80px;
        height: 30px;
        right: 5px;
        z-index: 60;
        border-radius: 5px;
        border: 1px solid rgb(211, 211, 211);
        -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
        box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
        padding-top: 10px;
        text-align: center;
        &:hover {
            cursor: pointer;
        }
    }
    .postTopLeft {
        display: flex;
        align-items: center;
    }
    .postProfileImg {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
    }
    .postUsername {
        font-size: 15px;
        font-weight: 500;
        padding: 0 10px;
    }
    .postDate {
        font-size: 10px;
        font-weight: 500;
    }
    .postImgWrapper {
        padding-right: 3px;
        padding-left: 3px;
    }
    .postImg {
        padding-top: 5px;
        width: 100%;
        object-fit: contain;
    }
    .postCenter {
        display: flex;
        flex-direction: column;
    }
    .postText {
        padding-top: 5px;
        padding-bottom: 3px;
        font-weight: 400;
        font-size: 15px;
        padding-left: 4px;
    }
    .postBottom {
        padding-top: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 4px;
    }
    .postBottomLeft {
        display: flex;
        align-items: center;
        &:hover {
            cursor: pointer;
        }
    }
    .likeIcon {
        font-size: 30px;
        padding-right: 5px;
        cursor: pointer;
    }
    .postLikeCounter {
        font-size: 15px;
    }
    .hrh {
        opacity: 0.4;
    }
`;

Post.propTypes = {
    content: PropTypes.shape({
        username: PropTypes.string.isRequired,
        imageSrc: PropTypes.string.isRequired,
        caption: PropTypes.string.isRequired,
        comments: PropTypes.array.isRequired,
        dateCreated: PropTypes.number.isRequired
    })
};