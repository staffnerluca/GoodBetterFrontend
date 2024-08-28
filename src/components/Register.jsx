import React, { useState, useMemo } from "react";

function Register() {
    const [currentPage, setCurrentPage] = useState("br");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [wantsToBecomeVegetarian, setWantsToBecomeVegetarian] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [country, setCountry] = useState("");
    const [birthDate, setBirthDate] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== password2) {
            alert("Passwords do not match!");
            return;
        }

        const userData = {
            email,
            username,
            password,
            wants_to_become_vegetarian: wantsToBecomeVegetarian,
            first_name: firstName,
            second_name: secondName,
            country,
            birth_date: birthDate,
        };

        try {
            const response = await fetch("http://127.0.0.1:8000/api/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                alert("Registration successful!");
            } else {
                const errorData = await response.json();
                alert(`Registration failed: ${errorData.error}`);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("An error occurred. Please try again later.");
        }
        localStorage.setItem("mail", email);
        localStorage.setItem("username", username);
    };

    const BasicRegisterForm = useMemo(() => (
        <div>
            <h1>Start your journey to do good now!</h1> <br />
            <form onSubmit={(e) => { e.preventDefault(); setCurrentPage("oi"); }}>
                <div className="form-group">
                    <label htmlFor="email">E-Mail:</label>
                    <input
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Password (again ):</label>
                    <input
                        id="password2"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        type="password"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="wants_to_become_vegetarian">Do you want to become vegetarian?</label>
                    <input
                        id="wants_to_become_vegetarian"
                        name="wants_to_become_vegetarian"
                        type="checkbox"
                        checked={wantsToBecomeVegetarian}
                        onChange={(e) => setWantsToBecomeVegetarian(e.target.checked)}
                    />
                </div>
                <button type="submit">Next</button>
            </form>
        </div>
    ), [email, username, password, password2, wantsToBecomeVegetarian]);

    const OptionalInformation = useMemo(() => (
        <div>
            <form onSubmit={handleSubmit}>
                <h3>These fields are optional but we would love to get more information about you!</h3>
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="secondName">Second Name:</label>
                    <input
                        id="secondName"
                        value={secondName}
                        onChange={(e) => setSecondName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="country">Country:</label>
                    <input
                        id="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="birthDate">Birth date:</label>
                    <input
                        id="birthDate"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        type="date"
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    ), [firstName, secondName, country, birthDate]);

    return (
        <div>
            {currentPage === "br" ? BasicRegisterForm : OptionalInformation}
        </div>
    );
}

export default Register;
