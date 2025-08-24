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
    .then(async res => {
        const data = await res.json();

        if (res.ok) {
            alert(data.message || "Signup successful!");
        } else {
            alert(data.error || "Signup failed!");
        }
    })
    .catch(err => {
        console.error("Error:", err);
        alert("Something went wrong!");
    });

    // clear inputs
    nameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
}
