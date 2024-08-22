import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const loginData = {
            email: mail,
            password: password,
        };

        try {
            const response = await fetch("http://127.0.0.1/api/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                const responseData = await response.json();
                alert("Login successful!");
                console.log("Response Data:", responseData);
                localStorage.setItem('mail', mail);
                localStorage.setItem('username', responseData.username);
            } else {
                const errorData = await response.json();
                alert(`Login failed: ${errorData.error}`);
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred. Please try again later.");
        }
    }

    return (
        <div>
            <h1>Welcome to Be Good!</h1> <br />
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={mail} 
                        onChange={(e) => setMail(e.target.value)} 
                        required 
                    />
                </div> <br />
                <div>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div> <br />
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
            <br></br>
            <button onClick={() => navigate("/register")}>Register</button>
        </div>
    );
}

export default Login;