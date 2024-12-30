
function handleFormSubmit(event) {
    event.preventDefault();

    const choseExpence = event.target.choseExpence.value;
    const choseDes = event.target.choseDes.value;
    const category = event.target.category.value;

    const userDetails = {
        choseDes,
        choseExpence,
        category,
    };

    
    localStorage.setItem(userDetails.choseDes, JSON.stringify(userDetails));

    
    showUserOnScreen(userDetails);

    
    event.target.choseExpence.value = "";
    event.target.choseDes.value = "";
    event.target.category.value = "";
}

function showUserOnScreen(userDetails) {
    const parentElem = document.getElementById("listOfitems");

    
    if (document.getElementById(userDetails.choseDes)) {
        alert("This choseDes is already in the list. Please use a different choseDes.");
        return;
    }

    const childElem = document.createElement("li");
    childElem.id = userDetails.choseDes; 
    childElem.textContent = `${userDetails.choseExpence} - ${userDetails.choseDes} - ${userDetails.category}`;

    
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => {
       
        localStorage.removeItem(userDetails.choseDes);

       
        parentElem.removeChild(childElem);
    };

    
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.onclick = () => {
        
        localStorage.removeItem(userDetails.choseDes);

       
        parentElem.removeChild(childElem);

        const choseExpenceInput = document.querySelector("[name='choseExpence']");
        const choseDesInput = document.querySelector("[name='choseDes']");
        const categoryInput = document.querySelector("[name='category']");

        choseExpenceInput.value = userDetails.choseExpence;
        choseDesInput.value = userDetails.choseDes;
        categoryInput.value = userDetails.category;
    };

   
    childElem.appendChild(deleteButton);
    childElem.appendChild(editButton);

    
    parentElem.appendChild(childElem);
}


module.exports = handleFormSubmit;
