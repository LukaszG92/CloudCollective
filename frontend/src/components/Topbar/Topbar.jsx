import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { BsPlusSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Modal from "../UI/Modal";
import Share from "./Share";
import Search from "./Search";
import Backdrop from "../UI/Backdrop";
import SearchBarMobile from "./SearchBarMobile";


function Topbar() {
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
    const searchHandler = (e) => {
        if (searchquery.length < 1) {
            setshowSearch(false);
        } else {
            setshowSearch(true);
        }
        setSearchquery(e.target.value);
    };

    return (
        <>
            {showBarSearchMobile && (
                <SearchBarMobile
                    searchHandler={searchHandler}
                    hidebar={hideBarSearchMobileHandler}
                />
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
                            <Search
                                data={usersSearch}
                                hideSearch={() => {
                                    setshowSearch(false);
                                }}
                            />
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
                                    navigate("/explore");
                                }}
                                alt=""
                                src="http://localhost:3000/images/explore.png"
                            />
                        </div>
                        <div className="TopbarIconItem">
                            <img
                                className="TopbarIcon"
                                onClick={() => {
                                    setShowMenu(!showMenu);
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
                        navigate(`/profile`);
                    }}
                >
                  Profil
                </span>

                                <span className="menuItems">
                  Logout
                </span>
                            </div>
                        )}
                    </div>
                </div>
            </TopbarContainer>
        </>
    );
}

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