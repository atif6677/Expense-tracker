
//home.js
async function home(event) {
    event.preventDefault();

    const amountInput = document.querySelector("#amount");
    const descriptionInput = document.querySelector("#description");
    const categoryInput = document.querySelector("#category");

    const amount = Number(amountInput.value);  // number input, no need trim
    const description = descriptionInput.value.trim(); // text input, trim useful
    const category = categoryInput.value; // select input, no need trim



    try {
        const res = await fetch("http://localhost:3000/home", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount, description, category })
        });

        const data = await res.json();

        if (res.ok) {
            alert(data.message || "Expense added successfully!");
        } else {
            alert(data.error || "Failed to add expense.");
        }
    } 
    catch (err) {
        console.error("Error:", err);
        alert("Something went wrong!");
    }

    // clear inputs
    amountInput.value = "";
    descriptionInput.value = "";
    categoryInput.value = "";

    display(); // refresh the expence list after adding new one 
};





async function display() {
    try {
        const res = await fetch("http://localhost:3000/home");
        const data = await res.json();

        if (res.ok) {
            const parentNode = document.querySelector("#expenseList");
            parentNode.innerHTML = ""; // clear old list before appending new

            data.expenses.forEach(expense => {
                const li = document.createElement("li");
                li.textContent = `${expense.amount} - ${expense.description} - ${expense.category}`;
                parentNode.appendChild(li);
            });
        } else {
            console.error("Failed to fetch expenses:", data.error || data.message);
        }
    } catch (error) {
        console.error("Unable to fetch data to display", error);
    }
}



display(); // initial call to display expenses