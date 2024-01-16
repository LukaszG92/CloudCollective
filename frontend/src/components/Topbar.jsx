import styled from "styled-components";
import { Link } from "react-router-dom";

function Topbar() {
    return (
        <>
            <TopbarContainer>
                <div className="logoContainer">
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <img src="http://localhost:3000/images/logo.png" alt="CloudCollectiveLogo"/>
                    </Link>
                </div>
            </TopbarContainer>
        </>
    )
}


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
    .logoContainer {
        position: relative;
        margin: auto;
        padding-left: 10px;
        display: flex;
        @media (max-width: 655px) {
            padding-right: 0;
        }
    }
`;

export default Topbar;
