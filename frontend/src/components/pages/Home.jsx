import React from "react";
import styled from "styled-components";
import Feed from "../Feed";
import Rightbar from "../Rightbar";
import "react-notifications/lib/notifications.css";

function Home() {
    return (
        <HomeContainer>
            <Feed />
            <Rightbar />
        </HomeContainer>
    )
}

export default Home;

const HomeContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;