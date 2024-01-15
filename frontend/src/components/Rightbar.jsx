import styled from "styled-components";
import {useEffect, useState} from "react";
import RightbarUser from './RighbarUser'
import {Link} from "react-router-dom";

function Rightbar() {
    const [Followings, setFollowings] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('http://localhost:8000/api/users/LG/followings');
            const responseData = await response.json();
            setFollowings(responseData.data.followings)
        };
        fetchUsers();
    }, []);

    return (
    <RightbarContainer>
        <div className="rightbarWrapper">
            <span className="rightbarFollowingTitle">Followings</span>
            <div className="rightbarFollowings">
                {Followings.map((f) => (
                    <RightbarUser
                        key = {f}
                        username = {f}
                    />
                ))}
            </div>
        </div>
    </RightbarContainer>
    );
}

const RightbarContainer = styled.div`
  width: 300px;
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
`;
export default Rightbar;