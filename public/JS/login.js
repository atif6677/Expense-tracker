function login(event) {
    event.preventDefault();
    
    const loginEmail = document.querySelector('#email');
    const loginPassword = document.querySelector('#password');
    
    const email = loginEmail.value.trim();
    const password = loginPassword.value.trim();

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, password })
    })
    .then(async res => {
        const data = await res.json();
        if(res.ok){
            alert(data.message || "Login successful!");
        } else {
            alert(data.error || "Login failed!");
        }
    })
    .catch(err => {
        console.error("Error:", err);
        alert("Something went wrong!");
    });

    loginEmail.value = "";
    loginPassword.value = "";
}

// redirect to signup page
document.addEventListener("DOMContentLoaded", () => {
    const signupBtn = document.getElementById("signup-btn");
    if(signupBtn){
        signupBtn.addEventListener("click", () => {
            window.location.href = "signup.html";  // change path if needed
        });
    }
});
