import styled from "styled-components";
import Post from './Post'
import { useState, useRef, useEffect} from "react";

function Feed(props) {
    const [currPage, setCurrPage] = useState(1);
    const [Posts, setPosts] = useState([]);
    const listInnerRef = useRef();

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch('http://localhost:8000/api/posts/feed');
            const responseData = await response.json();
            console.log(responseData.data.followings);
            setPosts(responseData.data.followings)
        };
        fetchPost();
    }, []);


    const onScroll = () => {
        if (listInnerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
            if (scrollTop + clientHeight === scrollHeight) {
                setCurrPage(currPage + 1);
            }
        }
    };

    return(
        <>
            <FeedContainer>
                <div onScroll={onScroll} className="FeedWrapper">
                    {Posts.map((post) => (
                        <Post
                            username={post.username}
                            imageSrc={post.imageSrc}
                            caption={post.caption}
                            comments={post.comments}
                            dateCreated={post.dateCreated}
                        ></Post>
                    ))}
                </div>
            </FeedContainer>
        </>
    );
}

const FeedContainer = styled.div`
  width: 500px;
  .FeedWrapper {
    height: calc(100vh - 63px);
    overflow-y: auto;
    padding: 5px;
    ::-webkit-scrollbar {
      width: 0px;
    }
    ::-webkit-scrollbar-track {
      background-color: #f1f1f1;
    }
    ::-webkit-scrollbar-thumb {
      background-color: rgb(192, 192, 192);
    }
  }
`;

export default Feed