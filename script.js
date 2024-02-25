document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const expenseInput = document.getElementById('expense');
        const amountInput = document.getElementById('amount');
        
        const expenseText = expenseInput.value;
        const amountValue = parseFloat(amountInput.value);
        
        if(expenseText === '' || isNaN(amountValue)) return;
        
        const expenseItem = document.createElement('li');
        expenseItem.innerHTML = `
            <span>${expenseText}</span>
            <span>$${amountValue.toFixed(2)}</span>
            <button class="delete">Delete</button>
        `;
        
        expenseList.appendChild(expenseItem);
        
        expenseInput.value = '';
        amountInput.value = '';
        
        updateTotal();
    });
    
    expenseList.addEventListener('click', function(event) {
        if(event.target.classList.contains('delete')) {
            event.target.parentElement.remove();
            updateTotal();
        }
    });
    
    function updateTotal() {
        const amounts = document.querySelectorAll('#expense-list span:last-child');
        
        let total = 0;
        amounts.forEach(amount => {
            total += parseFloat(amount.textContent.slice(1));
        });
        
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    }
});

