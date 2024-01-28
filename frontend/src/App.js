import Login from './components/pages/Login'
import Signup from './components/pages/Signup'
import Home from './components/pages/Home'
import GlobalStyles from "./components/GlobalStyle";
import {BrowserRouter, Routes, Route, useNavigate, Navigate} from "react-router-dom";
import Profile from "./components/pages/Profile";
import Explore from "./components/pages/Explore";
import {useCallback, useEffect, useState} from "react";
import { AuthContext } from "./context/auth-context"

function App(callback, deps) {

    const [username, setUsername] = useState(false);

    const login = useCallback((uid) => {
        setUsername(uid);
        localStorage.setItem('username', uid)
    }, []);

    const logout = useCallback(() => {
        setUsername(null);
        localStorage.removeItem('username');
    }, []);

    useEffect(() => {
        const storedData = localStorage.getItem('username');
        if (storedData) {
            login(storedData);
        }
    }, [login]);

    let routes;

    if(username) {
        routes = (
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/explore" element={<Explore/>} />
                <Route path="/profile/:username" element={<Profile/>} />
                <Route path='*' element={<Navigate to='/home' />} />
            </Routes>
        )
    } else {
        routes = (
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path='/signup' element={<Signup/>} />
                <Route path='*' element={<Navigate to='/login' />} />
            </Routes>
        )
    }

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
              {routes}
          </BrowserRouter>
      </AuthContext.Provider>
    );
}

export default App;