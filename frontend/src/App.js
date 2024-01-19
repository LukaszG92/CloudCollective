import Login from './components/pages/Login'
import Signup from './components/pages/Signup'
import Home from './components/pages/Home'
import GlobalStyles from "./components/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./components/pages/Profile";
import Explore from "./components/pages/Explore";
import Messages from "./components/pages/Messages";
import {useCallback, useEffect, useState} from "react";
import { AuthContext } from "./context/auth-context"

function App() {
    const [username, setUsername] = useState(false);


    const login = useCallback((uid) => {
        setUsername(uid);
        localStorage.setItem('username', uid);
    }, []);

    const logout = useCallback(() => {
        setUsername(null);
        localStorage.removeItem('username')
    }, []);

    useEffect(() => {
        let username = localStorage.getItem('username');
        if(username)
            login(username);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: !!username,
                username: username,
                login: login,
                logout: logout
            }}
        >
          <GlobalStyles />
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/messages" element={<Messages/>} />
                  <Route path="/explore" element={<Explore/>} />
                  <Route path="/profile" element={<Profile/>} />
                  <Route path="/login" element={<Login/>} />
                  <Route path='/signup' element={<Signup/>} />
              </Routes>
          </BrowserRouter>
      </AuthContext.Provider>
    );
}

export default App;