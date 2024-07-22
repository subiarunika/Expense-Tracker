document.getElementById('expense-form').addEventListener('submit', addExpense);

let expenses = [];

function addExpense(e) {
  e.preventDefault();

  const amount = document.getElementById('amount').value;
  const category = document.getElementById('category').value;
  const date = document.getElementById('date').value;
  const description = document.getElementById('description').value;

  const expense = {
    amount: parseFloat(amount),
    category,
    date,
    description
  };

  expenses.push(expense);
  document.getElementById('expense-form').reset();
  displayExpenses();
  displaySummary();
}

function displayExpenses() {
  const expenseList = document.getElementById('expense-list');
  expenseList.innerHTML = '';

  expenses.forEach((expense, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div>
        <strong>${expense.amount.toFixed(2)}</strong> - ${expense.category} on ${expense.date}<br>
        ${expense.description}
      </div>
      <button onclick="deleteExpense(${index})">Delete</button>
    `;
    expenseList.appendChild(li);
  });
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  displayExpenses();
  displaySummary();
}

function displaySummary() {
  const summary = document.getElementById('summary');
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const categories = {};
  expenses.forEach(expense => {
    if (categories[expense.category]) {
      categories[expense.category] += expense.amount;
    } else {
      categories[expense.category] = expense.amount;
    }
  });

  summary.innerHTML = `
    <strong>Total Amount:</strong> ${totalAmount.toFixed(2)}<br>
    <strong>Category Breakdown:</strong>
    <ul>
      ${Object.keys(categories).map(category => `<li>${category}: ${categories[category].toFixed(2)}</li>`).join('')}
    </ul>
  `;
}
