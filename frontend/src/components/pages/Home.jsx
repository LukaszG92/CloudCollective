import React, {useContext} from "react";
import styled from "styled-components";
import Feed from "../Feed";
import Rightbar from "../Rightbar/Rightbar";
import "react-notifications/lib/notifications.css";
import Topbar from "../Topbar/Topbar";
import {AuthContext} from "../../context/auth-context";

function Home() {
    const auth = useContext(AuthContext);
    console.log(auth.username)
    return (
        <>
            <Topbar />
            <HomeContainer>
                <Feed />
                <Rightbar />
            </HomeContainer>
        </>
    )
}

export default Home;

const HomeContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;