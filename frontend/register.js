const month = document.getElementById("month");
const day = document.getElementById("day");
const year = document.getElementById("year");

const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
];

// Months
months.forEach((m) => {
    month.innerHTML += `<option>${m}</option>`;
});

// Days
for (let i = 1; i <= 31; i++) {
    day.innerHTML += `<option>${i}</option>`;
}

// Years
const currentYear = new Date().getFullYear();

for (let i = currentYear; i >= 1950; i--) {
    year.innerHTML += `<option>${i}</option>`;
}

// Register Form
document.getElementById("registerForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;
    const username = document.getElementById("username").value;

    // Birthday
    const birthday =
        `${day.value} ${month.value} ${year.value}`;

    try {

        const response = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password,
                name,
                username,
                birthday
            })
        });

        const data = await response.text();

        alert(data);

        if (data === "User Registered Successfully") {
            window.location.href = "login.html";
        }

    } catch (error) {
        console.log(error);
        alert("Something went wrong");
    }

});