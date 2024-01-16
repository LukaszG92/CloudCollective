import styled from "styled-components";
import NavbarElement from "./NavbarElement";

function Navbar() {

    return (
        <NavbarContainer>
            <div className="navbarWrapper">
                <div className="navbarButtons">
                    <NavbarElement img="http://localhost:3000/images/home.png" name="Home"/>
                    <NavbarElement img="http://localhost:3000/images/search.png" name="Cerca"/>
                    <NavbarElement img="http://localhost:3000/images/explore.png" name="Esplora"/>
                    <NavbarElement img="http://localhost:3000/images/chat.png" name="Messaggi"/>
                    <NavbarElement img="http://localhost:3000/images/create.png" name="Crea"/>
                    <div className="navbarProfile">
                        <NavbarElement img="http://localhost:3000/images/defaultavatar.png" name="Username"/>
                    </div>
                </div>
            </div>
        </NavbarContainer>
    );
}

const NavbarContainer = styled.div`
    width: 20%;
    position: sticky;
    top: 51px;
    .navbarWrapper {
        height: 100%;
        border-right: solid gray 1px;
    }
    .navbarButtons {
        display: flex;
        padding-top: 5px;
        flex-direction: column;
    }
    .navbarButton {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 30px;
        padding-bottom: 30px;
        border-bottom: 1px solid gray;
        box-shadow: -2px 10px 9px -7px rgba(0, 0, 0, 0.34);
    }
    .navbarButtonName {
        text-align: start;
        font-size: 22px;
        font-weight: bold;
        padding-right: 20px;
    }
    .navbarButtonIcon {
        padding-left: 50px;
        width: 40px;
        height: 40px;
        object-fit: cover;
    }
    .navbarProfile {
        position: fixed;
        bottom: 0;
        width: 20%;
    }
`;
export default Navbar;