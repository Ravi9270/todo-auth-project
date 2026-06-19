document.querySelector("form").addEventListener("submit", async function (e) {

    e.preventDefault();

    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {

        const response = await fetch("http://localhost:5000/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const data = await response.json();

        console.log(data);

        if (data.success) {

            localStorage.setItem("userId", data.userId);
            localStorage.setItem("username", data.username);

            alert("Login Successful");

            window.location.href = "todo.html";

        }
        else {

            alert("Invalid Email or Password");

        }

    }
    catch (error) {

        console.log(error);
        alert("Something went wrong");

    }

});