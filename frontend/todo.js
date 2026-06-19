const input = document.querySelector("#enter");
const ol = document.querySelector("#list");
const addBtn = document.querySelector("#add");

const userId = localStorage.getItem("userId");

// Agar login nahi hua hai to login page par bhej do
if (!userId) {
    window.location.href = "login.html";
}

// Add Todo
addBtn.addEventListener("click", async (e) => {

    e.preventDefault();

    const task = input.value;

    if (task === "") {
        alert("Please enter a task");
        return;
    }

    await fetch("http://localhost:5000/addTodo", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            task,
            userId
        })

    });

    input.value = "";

    loadTodos();

});

// Load Todos
async function loadTodos() {

    const response = await fetch(
        `http://localhost:5000/todos/${userId}`
    );

    const data = await response.json();

    ol.innerHTML = "";

    data.forEach((todo) => {

        const li = document.createElement("li");

        li.textContent = todo.task;

        const removeBtn = document.createElement("button");

        removeBtn.textContent = "Remove";

        removeBtn.addEventListener("click", async () => {

            await fetch(
                `http://localhost:5000/deleteTodo/${todo.id}`,
                {
                    method: "DELETE"
                }
            );

            loadTodos();

        });

        li.appendChild(removeBtn);
        ol.appendChild(li);

    });

}

loadTodos();


// Logout
const logoutBtn = document.getElementById("logout");

logoutBtn.addEventListener("click", () => {

    localStorage.removeItem("userId");
    localStorage.removeItem("username");

    window.location.href = "login.html";

});