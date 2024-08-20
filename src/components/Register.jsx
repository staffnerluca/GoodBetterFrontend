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
                E-Mail:
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                /> <br /><br />
                Username:
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                /> <br /><br />
                Password:
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    required
                /> <br /><br />
                The password for the second time:
                <input
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    type="password"
                    required
                /> <br /><br />
                Do you want to become vegetarian?
                <input
                    name="wants_to_become_vegetarian"
                    type="checkbox"
                    checked={wantsToBecomeVegetarian}
                    onChange={(e) => setWantsToBecomeVegetarian(e.target.checked)}
                /> <br /><br />
                <button type="submit">Next</button>
            </form>
        </div>
    ), [email, username, password, password2, wantsToBecomeVegetarian]);

    const OptionalInformation = useMemo(() => (
        <div>
            <form onSubmit={handleSubmit}>
                <h3>These fields are optional but we would love to get more information about you!</h3>
                First Name:
                <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                /> <br /> <br />
                Second Name:
                <input
                    value={secondName}
                    onChange={(e) => setSecondName(e.target.value)}
                /> <br /> <br />
                Country:
                <input
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                /> <br /> <br />
                Birth date:
                <input
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    type="date"
                /> <br /><br />
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
