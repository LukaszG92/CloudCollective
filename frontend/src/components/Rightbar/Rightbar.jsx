import styled from "styled-components"
import React, {useContext, useEffect, useState} from "react"
import RightbarUser from './RightbarUser'
import { AuthContext} from "../../context/auth-context"
import {NotificationManager, NotificationContainer } from "react-notifications"


function Rightbar() {
    const [Followings, setFollowings] = useState([])
    const auth = useContext(AuthContext)

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('http://localhost:8000/api/users/'+auth.username+'/followings')
            const responseData = await response.json()
            if(response.status === 200)
                setFollowings(responseData.data.followings)
            if(response.status === 500)
                NotificationManager.error(responseData.message, 'Internal server error.', 2000)
        }
        fetchUsers()
    }, [])

    return (
    <RightbarContainer>
        <NotificationContainer/>
        <div className="rightbarWrapper">
            <span className="rightbarFollowingTitle">Followings</span>
            <div className="rightbarFollowings">
                {Followings.map((f) => (
                    <RightbarUser
                        key={f}
                        username = {f}
                    />
                ))}
            </div>
        </div>
    </RightbarContainer>
    )
}

const RightbarContainer = styled.div`
  width: 30%;
  height: calc(100vh - 63px);
  overflow: scroll;
  position: sticky;
  top: 51px;
  padding-left: 10px;
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
  .rightbarWrapper {
    padding: 10px 10px;
  }
  .rightbarFollowingTitle {
    padding-left: 10px;
    font-size: 18px;
    font-weight: bold;
  }
  .rightbarFollowings {
    display: flex;
    padding-top: 5px;
    flex-direction: column;
  }
  .rightbarFollowing {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 5px;
  }
  .rightbarfollowingLeft {
    display: flex;
    align-items: center;
  }
  .rightbarFollowingImg {
    padding-left: 5px;
  }
  .rightbarFollowingName {
    padding-left: 10px;
  }
  .rightbarFollowingImg {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
  }
  .rightbarFollowingName {
    font-size: 15px;
    font-weight: bold;
  }
  .rightbarfollowingRight {
    display: flex;
  }
  .rightbarFollowingAction {
    font-size: 18px;
    color: rgb(0, 149, 246);
    cursor: pointer;
  }
  .rightbarFollowingAction:hover {
    font-size: 18px;
    font-weight: 500;
    color: rgb(0, 149, 246);
    cursor: pointer;
  }
  @media (max-width: 780px) {
    display: none;
  }

    .rightbarFollowButton {
        margin: auto;
        border: none;
        background-color: #1872f2;
        color: white;
        border-radius: 5px;
        padding: 5px 10px;
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
    }

    .rightbarFollowButton:focus {
        outline: none;
    }
`

export default Rightbar