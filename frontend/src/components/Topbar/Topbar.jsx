import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { BsPlusSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Modal from "../UI/Modal";
import Share from "./Share";
import Backdrop from "../UI/Backdrop";
import SearchUser from "./SearchUser";
import { AuthContext } from "../../context/auth-context";

function Topbar() {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [showAddPost, setShowAddPost] = useState(false);
    const [showSearch, setshowSearch] = useState(false);
    const [usersSearch, setusersSearch] = useState([]);
    const [searchquery, setSearchquery] = useState("");
    const [showBarSearchMobile, setShowBarSearchMobile] = useState(false);

    const showBarSearchMobileHandler = () => {
        setShowBarSearchMobile(true);
    };
    const hideAddPostHandler = () => {
        setShowAddPost(false);
    };
    const hideAddPostWithBackdropHandler = () => {
        setShowAddPost(false);
    };
    const hideBarSearchMobileHandler = () => {
        setShowBarSearchMobile(false);
        setshowSearch(false);
    };
    const searchHandler = async (e) => {
        setSearchquery(e.target.value)
        if (e.target.value.length < 1) {
            setshowSearch(false);
        } else {
            setshowSearch(true);
            let response = await fetch("http://localhost:8000/api/users/search/"+e.target.value)
            let responseData = await response.json();
            setusersSearch(responseData.data.users);
        }
    };

    return (
        <>
            {showBarSearchMobile && (
                <SearchBarMobileContainer>
                    <div className="searchbar">
                        <AiOutlineSearch className="SearchIcon" />
                        <input
                            onChange={searchHandler}
                            type="text"
                            className="searchInput"
                            placeholder="Search"
                        />
                    </div>
                </SearchBarMobileContainer>
            )}
            {showSearch && <Backdrop onClose={hideBarSearchMobileHandler} />}
            {showAddPost && (
                <Modal onClose={hideAddPostWithBackdropHandler}>
                    <Share hideAddPostHandler={hideAddPostHandler}></Share>
                </Modal>
            )}
            <TopbarContainer>
                <div className="TopbarLeft">
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <span className="Logo">instagram</span>
                    </Link>
                </div>
                <div className="TopbarCenter">
                    <div className="Searchbar">
                        <AiOutlineSearchStyled />
                        <input
                            onChange={searchHandler}
                            type="text"
                            className="SearchInput"
                            placeholder="Search"
                        />
                    </div>
                    {showSearch && (
                        <>
                            <SearchContainer onClose={hideBarSearchMobileHandler}>
                                <div className="searchWrapper">
                                    {usersSearch.map( (user) => (
                                        <SearchUser
                                            onClose={hideBarSearchMobileHandler}
                                            user = {user}
                                        />
                                    ))}
                                </div>
                            </SearchContainer>
                        </>
                    )}
                </div>
                <div className="TopbarRight">
                    <div className="TopbarIcons">
                        <div className="TopbarIconItem">
                            <FiSearchStyled
                                onClick={showBarSearchMobileHandler}
                            ></FiSearchStyled>
                        </div>
                        <div className="TopbarIconItem">
                            <img
                                className="TopbarIcon"
                                onClick={() => {
                                    navigate("/");
                                }}
                                alt=""
                                src="http://localhost:3000/images/home.png"
                            />
                        </div>
                        <div className="TopbarIconItem">
                            <img
                                className="TopbarIcon"
                                onClick={() => {
                                    navigate("/explore", { state: {'username':'username'} });
                                }}
                                alt=""
                                src="http://localhost:3000/images/explore.png"
                            />
                        </div>
                        <div className="TopbarIconItem">
                            <img
                                className="TopbarIcon"
                                onClick={() => {
                                    navigate("/messages")
                                }}
                                alt=""
                                src="http://localhost:3000/images/send.png"
                            />
                        </div>
                        <div className="TopbarIconItem">
                            <BsPlusSquareStyled
                                onClick={() => {
                                    setShowAddPost(true);
                                }}
                            />
                        </div>

                        <img
                            className="TopbarImg"
                            onClick={() => {
                                setShowMenu(!showMenu);
                            }}
                            alt=""
                            src="http://localhost:3000/images/defaultavatar.png"
                        />
                        {showMenu && (
                            <div className="TopbarMenu">
                                <span
                                    className="menuItems"
                                    onClick={() => {
                                        navigate(`/profile/${auth.username}`);
                                    }}
                                > Profilo </span>
                                <span className="menuItems"
                                      onClick={() => {
                                          auth.logout();
                                          navigate(`/login`);
                                      }}
                                > Logout </span>
                            </div>
                        )}
                    </div>
                </div>
            </TopbarContainer>
        </>
    );
}

const SearchBarMobileContainer = styled.div`
  display: flex;
  background-color: aliceblue;
  height: 50px;
  width: 100%;
  top: 0;
  z-index: 30;
  position: fixed;
  .searchbar {
    width: 100%;
    height: 100%;
    background-color: rgb(218, 218, 218);
    border-radius: 10px;
    display: flex;
    align-items: center;
  }
  .searchInput {
    border: none;
    width: 70%;
    background-color: rgb(218, 218, 218);

    &:focus {
      outline: none;
    }
  }
`;
const SearchContainer = styled.div`
  position: fixed;
  width: 100vw;
  top: 51px;
  display: flex;
  justify-content: center;

  @media (max-width: 655px) {
    left: -4px;
  }
  .searchWrapper {
    z-index: 3033;
    width: 400px;
    background-color: rgb(243, 243, 243);
    position: relative;
    border-radius: 0px 0px 13px 13px;
    -webkit-border-radius: 0px 0px 13px 13px;
    -moz-border-radius: 0px 0px 13px 13px;
    border: 3px solid #ebebeb;
    box-shadow: 0px 24px 41px -7px rgba(28, 28, 28, 0.41);
    -webkit-box-shadow: 0px 24px 41px -7px rgba(28, 28, 28, 0.41);
    -moz-box-shadow: 0px 24px 41px -7px rgba(28, 28, 28, 0.41);
  }
  .users {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .user {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .userRight {
    width: 20%;
  }
  .userLeft {
    width: 100%;
    > span {
      color: black;
    }
  }
  .searchImg {
    display: block;
    padding: 5px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
`;
const FiSearchStyled = styled(FiSearch)`
  font-size: 20px;
  margin-right: 10px;
  display: none;
  @media (max-width: 655px) {
    display: block;
  }
`;
const BsPlusSquareStyled = styled(BsPlusSquare)`
  font-size: 20px;
  margin-right: 10px;
`;
const AiOutlineSearchStyled = styled(AiOutlineSearch)`
  font-size: 20px !important;
  margin-left: 10px;
`;
const TopbarContainer = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: rgb(255, 255, 255);
  justify-content: center;
  border-bottom: 1px solid gray;
  box-shadow: -2px 10px 9px -7px rgba(0, 0, 0, 0.34);
  -webkit-box-shadow: -2px 10px 9px -7px rgba(0, 0, 0, 0.34);
  -moz-box-shadow: -2px 10px 9px -7px rgba(0, 0, 0, 0.34);
  @media (max-width: 655px) {
    justify-content: space-between;
  }
  .TopbarLeft {
    padding-right: 130px;
    display: flex;
    @media (max-width: 655px) {
      padding-right: 0px;
    }
  }
  .Logo {
    font-size: 32px;
    padding-right: 20px;
    padding-left: 20px;
    font-weight: bold;
    color: black;
    cursor: pointer;
    font-family: "Dancing Script", cursive;
  }
  .Searchbar {
    width: 100%;
    height: 30px;
    background-color: rgb(218, 218, 218);
    border-radius: 10px;
    display: flex;
    align-items: center;
    @media (max-width: 655px) {
      display: none;
    }
  }
  .TopbarCenter {
    display: flex;
    width: 400px;
    justify-content: center;
    margin: 0 20px;
    z-index: 2;
  }
  .SearchInput {
    border: none;
    width: 70%;
    background-color: rgb(218, 218, 218);

    &:focus {
      outline: none;
    }
  }
  .TopbarRight {
    margin-right: 10px;
    padding-left: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 655px) {
      padding-left: 0px;
    }
  }
  .TopbarIcons {
    display: flex;
    position: relative;
  }
  .TopbarMenu {
    position: absolute;
    top: 42px;
    width: 120px;
    right: -4px;
    background-color: #f1f1f1;
    display: flex;
    flex-direction: column;
    -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
    box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  }
  .menuItems {
    margin: 7px;
    border-bottom: 1px solid #e1e1e1;
    color: black;
    cursor: pointer;
  }
  .TopbarIconItem {
    padding: 0 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
    .TopbarIcon {
    width: 28px;
    height: 28px;
    object-fit: cover;
    cursor: pointer;
  }
  .TopbarImg {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
  }
`;

export default Topbar;