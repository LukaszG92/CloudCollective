import Login from './components/pages/Login'
import Signup from './components/pages/Signup'
import Home from './components/pages/Home'
import GlobalStyles from "./components/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./components/pages/Profile";

function App() {
    return (

      <>
          <GlobalStyles />
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/profile" element={<Profile/>} />
                  <Route path="/login" element={<Login/>} />
                  <Route path='/signup' element={<Signup/>} />
              </Routes>
          </BrowserRouter>
      </>
    );
}

export default App;