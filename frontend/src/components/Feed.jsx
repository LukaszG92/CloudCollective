import styled from "styled-components"
import Post from './Post'
import {useState, useRef, useEffect, useContext} from "react"
import { AuthContext } from "../context/auth-context"
import {NotificationManager, NotificationContainer } from "react-notifications"

function Feed() {
    const auth = useContext(AuthContext)
    const [currPage, setCurrPage] = useState(1)
    const [Posts, setPosts] = useState([])
    const listInnerRef = useRef()

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`/api/posts/feed`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: auth.username,
                }
            })
            const responseData = await response.json()
            if(response.status === 200)
                setPosts(responseData.data.posts)
            if(response.status === 500)
                NotificationManager.error(responseData.message, 'Internal server error.', 2000)
        }
        fetchPost()
    }, [auth.username])


    const onScroll = () => {
        if (listInnerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current
            if (scrollTop + clientHeight === scrollHeight) {
                setCurrPage(currPage + 1)
            }
        }
    }

    return(
        <>
            <FeedContainer>
                <NotificationContainer/>
                <div onScroll={onScroll} className="FeedWrapper">
                    {Posts.map((post) => (
                        <Post
                            key={post.id}
                            post={post}
                        ></Post>
                    ))}
                </div>
            </FeedContainer>
        </>
    )
}

const FeedContainer = styled.div`
    width: 50%; 
    padding: 0 70px;
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
`

export default Feed