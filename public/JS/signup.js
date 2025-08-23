
function signup(event) {
    event.preventDefault();

    const nameInput = document.querySelector("#name");
    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#password");

    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    })
    .then(res => res.json())
    .then(data => {
        console.log("Response:", data);
        alert("Signup successful!");
    })
    .catch(err => {
        console.error("Error:", err);
        alert("Signup failed!");
    });

    nameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
}
