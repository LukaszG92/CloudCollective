import { useState, useEffect } from 'react';
import './Login.css'
import { NotificationManager } from "react-notifications";


function Login() {
    const [show1, setshow1] = useState(1);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            if (show1 < 4) {
                setshow1(show1 + 1);
            } else {
                setshow1(1);
            }
        }, 3000);
        return () => {
            clearInterval(interval);
        };
    }, [show1]);
    const HandlerLoginForm = async (e) => {
        e.preventDefault();
        try {
            fetch('http://localhost:8000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password
                })
            })
        } catch (err) {
            console.log(err.message);
            NotificationManager.error(err, "Warning", 3000, () => {
                alert(err)
            });
        }
    };
    return (
        <div className="loginContainer">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <div className="frontImgWrapper">
                        <img
                            src={"http://localhost:3000/images/loginpage1.png"}
                            className={show1 === 1 ? "frontImg show" : "frontImg hide"}
                            alt=""
                        />
                        <img
                            src={"http://localhost:3000/images/loginpage2.png"}
                            className={show1 === 2 ? "frontImg show" : "frontImg hide"}
                            alt=""
                        />
                        <img
                            src={"http://localhost:3000/images/loginpage3.png"}
                            className={show1 === 3 ? "frontImg show" : "frontImg hide"}
                            alt=""
                        />
                        <img
                            src={"http://localhost:3000/images/loginpage4.png"}
                            className={show1 === 4 ? "frontImg show" : "frontImg hide"}
                            alt=""
                        />
                    </div>
                </div>
                <div className="loginRight">
                    <div className="loginRightWrapper">
                        <div className="loginRightTop">
                            <div className="loginRightTopTop">
                                <span className="loginRightTopLogo">instagram</span>
                            </div>
                            <div className="loginRightTopForm">
                                <form className="loginBox" onSubmit={HandlerLoginForm}>
                                    <input
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                        }}
                                        placeholder="Username"
                                        type = "text"
                                        required
                                        className="loginInput"
                                    />
                                    <input
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                        placeholder="Password"
                                        type = "password"
                                        required
                                        className="loginInput"
                                    />
                                    <button className="loginButton">Connect</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;