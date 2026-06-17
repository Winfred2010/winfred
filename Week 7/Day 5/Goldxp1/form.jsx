import React, { useState } from 'react';

const Forms = () => {
    // Setting up our state variables
    const [username, setUsername] = useState("");
    const [age, setAge] = useState(null);
    const [errormessage, setErrormessage] = useState("");
    const [description, setDescription] = useState("The content of a textarea goes in the value attribute");
    const [myCar, setMyCar] = useState("Volvo");

    // Handling the form submission
    const mySubmitHandler = (event) => {
        event.preventDefault();
        alert("You are submitting " + username);
    };

    // Main change handler for inputs
    const handleValueChange = (event) => {
        let name = event.target.name;
        let val = event.target.value;

        // Validation for the age field
        if (name === "age") {
            if (val !== "" && !Number(val)) {
                setErrormessage("Your age must be a number");
            } else {
                setErrormessage("");
                setAge(val);
            }
        }

        if (name === "username") {
            setUsername(val);
        }
    };

    // Part II: Conditional Rendering for the header
    let header = "";
    if (username && age) {
        header = <h1>Hello {username} {age}</h1>;
    } else if (username) {
        header = <h1>Hello {username}</h1>;
    } else {
        header = <h1>Hello</h1>;
    }

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            {/* Displaying the dynamic header */}
            {header}

            <form onSubmit={mySubmitHandler}>
                <p>Enter your name:</p>
                <input 
                    type="text" 
                    name="username" 
                    onChange={handleValueChange} 
                />

                <p>Enter your age:</p>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <input 
                        type="text" 
                        name="age" 
                        onChange={handleValueChange} 
                    />
                    {/* Error message appears right next to the input */}
                    <strong style={{ marginLeft: '10px' }}>{errormessage}</strong>
                </div>

                <br />
                <input type="submit" value="Submit" />
            </form>

            <hr style={{ margin: '30px 0' }} />

            {/* Part VI: Controlled Textarea */}
            <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                rows="4"
                cols="30"
            />

            <hr style={{ margin: '30px 0' }} />

            {/* Part VII: Controlled Select Box */}
            <select value={myCar} onChange={(e) => setMyCar(e.target.value)}>
                <option value="Ford">Ford</option>
                <option value="Volvo">Volvo</option>
                <option value="Fiat">Fiat</option>
            </select>
        </div>
    );
};

export default Forms;
