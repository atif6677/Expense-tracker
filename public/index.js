const API_BASE_URL = 'http://localhost:3000/users';


function handleFormSubmit(event) {
    event.preventDefault();

    const expenseAmount = event.target.choseExpence.value;
    const description = event.target.choseDes.value;
    const category = event.target.category.value;

    const userDetails = {
        expenceAmount: expenseAmount,
        description: description,
        category: category
    };


    fetch(`${API_BASE_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
    })
    .then(response => response.json())
    .then(data => {
        showUserOnScreen(data);  // show the newly added expense
    })
    .catch(err => console.error('Error:', err));

    
    event.target.choseExpence.value = "";
    event.target.choseDes.value = "";
    event.target.category.value = "";
}

window.addEventListener('DOMContentLoaded', () => {
    fetch(API_BASE_URL)
        .then(response => response.json())
        .then(data => {
            data.forEach(expense => {
                showUserOnScreen(expense);
            });
        })
        .catch(err => console.error('Error loading data:', err));
});



function showUserOnScreen(userDetails) {
    const parentElem = document.getElementById("listOfitems");

    
    if (document.getElementById(userDetails.id)) {
        return;
    }

    const childElem = document.createElement("li");
    childElem.id = `expense-${userDetails.id}`;
    childElem.textContent = `${userDetails.expenceAmount} - ${userDetails.description} - ${userDetails.category}`;


    
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => {
       
        fetch(`${API_BASE_URL}/${userDetails.id}`, {
            method: 'DELETE',
        })
        .then(() => parentElem.removeChild(childElem))
        .catch(err => console.error('Delete failed:', err));

    };

    
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.onclick = () => {
        
         fetch(`${API_BASE_URL}/${userDetails.id}`, {
            method: 'DELETE',
        })
        .then(() => {
            parentElem.removeChild(childElem);
            document.querySelector("[name='choseExpence']").value = userDetails.expenceAmount;
            document.querySelector("[name='choseDes']").value = userDetails.description;
            document.querySelector("[name='category']").value = userDetails.category;

        });

    };

   
    childElem.appendChild(deleteButton);
    childElem.appendChild(editButton);

    
    parentElem.appendChild(childElem);
}


