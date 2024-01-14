import { useState } from 'react';
import './Signup.css'

function Signup() {

// States for registration
    const [nome, setNome] = useState('');
    const [cognome, setCognome] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

// Handling the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!(nome === '' || email === '' || password === '')) {
            fetch('http://localhost:8000/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome,
                    cognome,
                    username,
                    password,
                    email
                })
            })
        }
    };

    return (
        <div className="signupContainer">
            <div className="signupWrapper">
                <div className="signupRight">
                    <div className="signupRightTop">
                        <div className="signupRightTopTop">
                            <span className="signupRightTopLogo">instagram</span>
                        </div>
                        <div className="signupRightTopForm">
                            <form action="frontend/src/components/pages/Signup/Signup.jsx" className="signupBox" onSubmit={handleSubmit}>

                                <input
                                    onChange={(e) => {
                                        setNome(e.target.value);
                                    }}
                                    placeholder="Nome"
                                    type = "text"
                                    required
                                    className="signupInput"
                                />
                                <input
                                    onChange={(e) => {
                                        setCognome(e.target.value);
                                    }}
                                    placeholder="Cognome"
                                    type = "text"
                                    required
                                    className="signupInput"
                                />
                                <input
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                    }}
                                    placeholder="Username"
                                    type = "text"
                                    required
                                    className="signupInput"
                                />
                                <input
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    placeholder="Email"
                                    type = "email"
                                    required
                                    className="signupInput"
                                />
                                <input
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    placeholder="Password"
                                    type = "password"
                                    required
                                    className="signupInput"
                                />

                                <button className="signupButton">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;