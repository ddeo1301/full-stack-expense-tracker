function addNewExpense(e){
    e.preventDefault();

    const expenseDetails = {
        expenseamount: e.target.expenseamount.value,
        description: e.target.description.value,
        category: e.target.category.value,
    }
    console.log(expenseDetails);

    const token = localStorage.getItem('token');
    axios.post('http://localhost:3000/expense/addexpense',expenseDetails, {headers: {"Authorization" : token}})
        .then((response) => {
          addNewExpensetoUI(response.data.expense);
    }).catch(err => showError(err))
}

window.addEventListener('DOMContentLoaded', ()=> {
    
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3000/expense/getexpenses', {headers: {"Authorization": token}})
    .then(response => {
        console.log(response)
            response.data.expenses.forEach(expense => {
                console.log(expense)
                addNewExpensetoUI(expense);
            })
    })
    .catch(err => {
        console.log(err);
        showError(err)
    })
});

function showError(err){
    document.body.innerHTML += `<div style="color:red;"> ${err}</div>`
}

function addNewExpensetoUI(expense){
    const parentElement = document.getElementById('listOfExpenses');
    const expenseElemId = `expense - ${expense.id}`;
    parentElement.innerHTML += `
        <li id=${expenseElemId}>
            ${expense.expenseamount} - ${expense.category} - ${expense.description}
            <button onclick='deleteExpense(event, ${expense.id})'>
                Delete Expense
            </button>
        </li>`
}

function deleteExpense(e, expenseid) {
    const token = localStorage.getItem('token')
    axios.delete(`http://localhost:3000/expense/deleteexpense/${expenseid}`, {headers: {"Authorization": token}})
    .then((response) => {
            removeExpensefromUI(expenseid);
    }).catch((err => {
        showError(err);
    }))
}

function showError(err){
    document.body.innerHTML += `<div style="color:red;"> ${err}</div>`
}

function removeExpensefromUI(expenseid){
    const expenseElemId = `expense-${expenseid}`;
    document.getElementById(expenseElemId).remove();
}