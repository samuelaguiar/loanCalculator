// Listen for submit
document.querySelector('#loan-form').addEventListener('submit', function(e) {
    // Hide results
    document.querySelector('#results').style.display = 'none';
    document.querySelector('#submit').style.display = 'none';

    // Show loader
    document.querySelector('#loading').style.display = 'block';

    setTimeout(calculateResults, 500);
    e.preventDefault();
});

// Calculate Results
function calculateResults(e) {
    const amount = document.querySelector('#amount');
    const interest = document.querySelector('#interest');
    const years = document.querySelector('#years');
    const monthlyPayment = document.querySelector('#monthly-payment');
    const totalPayment = document.querySelector('#total-payment');
    const totalInterest = document.querySelector('#total-interest');
    const results = document.querySelector('#results');
    const submit = document.querySelector('#submit');
    const loading = document.querySelector('#loading');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute monthlyPayments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        results.style.display = 'block';
        submit.style.display = 'block';
        loading.style.display = 'none';
    } else {
        showError('Please check your numbers');
        results.style.display = 'none';
        submit.style.display = 'block';
        loading.style.display = 'none';
    }

    e.preventDefault();
}

// Show Error
function showError(error) {
    // Get elements
    const card = document.querySelector('.card');
    const loanForm = document.querySelector('#loan-form');
    
    // Create a div
    const errorDiv = document.createElement('div');

    // Add class
    errorDiv.className = 'alert alert-danger animated slideInDown';

    // Creat text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert error above heading
    card.insertBefore(errorDiv, loanForm);

    // Clear error after 3 seconds
    setTimeout(clearError, 3000);
}

// Clear error
function clearError() {
    document.querySelector('.alert').remove();
}