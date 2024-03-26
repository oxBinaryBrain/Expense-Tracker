document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    const totalAmountDisplay = document.getElementById('total-amount');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const expenseInput = document.getElementById('expense');
        const amountInput = document.getElementById('amount');

        const expenseText = expenseInput.value.trim();
        const amountValue = parseFloat(amountInput.value);

        if (!expenseText || isNaN(amountValue) || amountValue <= 0) {
            showError("Please enter a valid expense and amount.");
            return;
        }

        addExpense(expenseText, amountValue);
        updateTotal();

        expenseInput.value = '';
        amountInput.value = '';
        expenseInput.focus();
    });

    expenseList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete')) {
            event.target.parentElement.remove();
            updateTotal();
        }
    });

    function addExpense(expenseText, amountValue) {
        const expenseItem = document.createElement('li');
        expenseItem.innerHTML = `
            <span>${expenseText}</span>
            <span>$${amountValue.toFixed(2)}</span>
            <button class="delete">Delete</button>
        `;
        expenseList.appendChild(expenseItem);
    }

    function updateTotal() {
        const amounts = document.querySelectorAll('#expense-list span:nth-child(2)');
        let total = 0;
        amounts.forEach(amount => {
            total += parseFloat(amount.textContent.slice(1));
        });
        totalAmountDisplay.textContent = `Total: $${total.toFixed(2)}`;
    }

    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.textContent = message;

        const header = document.querySelector('.container > header');
        header.insertAdjacentElement('afterend', errorDiv);

        setTimeout(function() {
            errorDiv.remove();
        }, 3000);
    }
});
