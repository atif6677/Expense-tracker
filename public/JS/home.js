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




// buy premium button

//  const cashfree = Cashfree({
//                 mode: "sandbox",
//             });
//             document.getElementById("renderBtn").addEventListener("click", async () => {

//                 try{
//                     //Fetch payment session id from backend
//                     const response = await fetch('http://localhost:3000/pay',{
//                         method:'POST',

//                     });
//                     const data = await response.json();
//                     const paymentSessionId = data.paymentSessionId;
                
//                 let checkoutOptions = {
//                     paymentSessionId: "paymentSessionId",
//                     redirectTarget: "_self",
//                 };
//                 cashfree.checkout(checkoutOptions);

//             }catch(err){
//                 console.log("Error in payment",err);
//             }
//             });

document.getElementById("renderBtn").addEventListener("click", async () => {
    const token = localStorage.getItem("token");

    try {
        // 1️⃣ Create order on backend
        const res = await fetch('http://localhost:3000/payment/premium', {
            method: 'GET',
            headers: { "Authorization": `Bearer ${token}` }
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to create order');

        // ✅ Get payment_session_id and orderId from backend
        const { payment_session_id, order } = data;
        if (!payment_session_id || !order?.orderId) throw new Error("Invalid order data from server");
        const orderId = order.orderId;

        // 2️⃣ Initialize Cashfree Drop-in
        const cashfree = new Cashfree({ mode: "sandbox" });

        cashfree.checkout({
            paymentSessionId: payment_session_id,
            onSuccess: async (result) => {
                console.log("Payment success data:", result);

                // ✅ Update backend for successful payment
                await fetch(`http://localhost:3000/payment/updateTransactionStatus?order_id=${orderId}`, {
                    method: 'GET'
                });

                alert("Transaction Successful ✅");
            },
            onFailure: async (err) => {
                console.error("Payment failed:", err);

                // ✅ Update backend to mark order as FAILED
                await fetch(`http://localhost:3000/payment/updateTransactionStatus`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ order_id: orderId })
                });

                alert("Transaction Failed ❌");
            }
        }).open();

    } catch (err) {
        console.error("Error starting payment:", err);
        alert("Error starting payment: " + err.message);
    }
});
