//home.js
async function home(event) {
    event.preventDefault();

    const amountInput = document.querySelector("#amount");
    const descriptionInput = document.querySelector("#description");
    const categoryInput = document.querySelector("#category");

    const amount = Number(amountInput.value);
    const description = descriptionInput.value.trim();
    const category = categoryInput.value;

    const token = localStorage.getItem("token"); // 🔑 get token

    try {
        const res = await fetch("http://localhost:3000/home", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // ✅ send token
            },
            body: JSON.stringify({ amount, description, category })
        });

        const data = await res.json();

        if (res.ok) {
            alert("Expense added successfully");
        } else {
            alert(data.error || "Failed to add expense.");
        }
    } catch (err) {
        console.error("Error:", err);
        alert("Something went wrong!");
    }

    amountInput.value = "";
    descriptionInput.value = "";
    categoryInput.value = "";

    display();
}




async function display() {
    const token = localStorage.getItem("token");

    try {
        const res = await fetch("http://localhost:3000/home", {
            headers: { "Authorization": `Bearer ${token}` } // ✅ send token
        });

        const data = await res.json();

        if (res.ok) {
            const parentNode = document.querySelector("#expenseList");
            parentNode.innerHTML = "";

            data.expenses.forEach(expense => {
                const li = document.createElement("li");
                li.textContent = `${expense.amount} | ${expense.description} | ${expense.category} `;

                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Delete Expense";
                
                deleteBtn.onclick = async () => {
                    if (!confirm("Are you sure you want to delete this expense?")) return;

                    try {
                        const result = await fetch(`http://localhost:3000/home/${expense.id}`, {
                            method:"DELETE",
                            headers: { "Authorization": `Bearer ${token}` } // ✅ send token
                        });

                        if (result.ok) {
                            li.remove();
                        }
                    } catch(err) {
                        console.error("Error:", err);
                        alert("Something went wrong!");
                    }
                }

                li.appendChild(deleteBtn);
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