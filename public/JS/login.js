
//login.js
async function login(event) {
    event.preventDefault();
    
    const loginEmail = document.querySelector('#email');
    const loginPassword = document.querySelector('#password');
    
    const email = loginEmail.value.trim();
    const password = loginPassword.value.trim();

    try {
        const res = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();  //  grab backend response

        if (res.ok) {
            
            window.location.href = "../home.html"; // redirect to home page 

        } else {
            alert(data.error || "Login failed!");
        }
    } 
    catch (err) {
        console.error("Error:", err);
        alert("Something went wrong!");
    }

    loginEmail.value = "";
    loginPassword.value = "";
}
