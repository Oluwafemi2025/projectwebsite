// Payment system constants
const TOTAL_FEES = 2565000; // ₦2,565,000
const MINIMUM_PAYMENT = 1282500; // 50% minimum

// DOM elements
const paymentForm = document.getElementById('paymentForm');
const paymentAmountInput = document.getElementById('paymentAmount');
const paymentMethodSelect = document.getElementById('paymentMethod');
const payBtn = document.getElementById('payBtn');
const totalFeesEl = document.getElementById('total-fees');
const amountPaidEl = document.getElementById('amount-paid');
const outstandingBalanceEl = document.getElementById('outstanding-balance');
const paymentHistoryBody = document.getElementById('paymentHistoryBody');
const quickBtns = document.querySelectorAll('.quick-btn');

// Initialize payment system
document.addEventListener('DOMContentLoaded', function() {
  loadPaymentData();
  setupEventListeners();
  updatePaymentSummary();
});

// Setup event listeners
function setupEventListeners() {
  // Quick amount buttons
  quickBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const amount = parseInt(this.dataset.amount);
      paymentAmountInput.value = amount;
    });
  });

  // Form submission
  paymentForm.addEventListener('submit', handlePayment);

  // Input validation
  paymentAmountInput.addEventListener('input', validatePaymentAmount);

  // Dropdown functionality
  const dropdownToggle = document.getElementById('dropdownToggle');
  const dropdownMenu = document.getElementById('dropdownMenu');

  if (dropdownToggle && dropdownMenu) {
    dropdownToggle.addEventListener('click', function() {
      dropdownMenu.classList.toggle('active');
    });

    document.addEventListener('click', function(event) {
      if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.remove('active');
      }
    });
  }
}

// Load payment data from localStorage
function loadPaymentData() {
  const paymentData = JSON.parse(localStorage.getItem('studentPaymentData')) || {
    totalPaid: 0,
    payments: []
  };

  return paymentData;
}

// Save payment data to localStorage
function savePaymentData(data) {
  localStorage.setItem('studentPaymentData', JSON.stringify(data));
}

// Update payment summary display
function updatePaymentSummary() {
  const paymentData = loadPaymentData();
  const outstanding = TOTAL_FEES - paymentData.totalPaid;

  totalFeesEl.textContent = formatCurrency(TOTAL_FEES);
  amountPaidEl.textContent = formatCurrency(paymentData.totalPaid);
  outstandingBalanceEl.textContent = formatCurrency(outstanding);

  // Update outstanding balance styling
  if (outstanding === 0) {
    outstandingBalanceEl.style.color = '#28a745';
    outstandingBalanceEl.textContent = 'Paid in Full';
  } else if (outstanding <= MINIMUM_PAYMENT) {
    outstandingBalanceEl.style.color = '#ffc107';
  } else {
    outstandingBalanceEl.style.color = '#dc3545';
  }

  updatePaymentHistory(paymentData.payments);
}

// Handle payment form submission
function handlePayment(e) {
  e.preventDefault();

  const amount = parseInt(paymentAmountInput.value);
  const method = paymentMethodSelect.value;

  if (!validatePayment(amount, method)) {
    return;
  }

  // Show loading state
  payBtn.disabled = true;
  payBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';

  // Simulate payment processing
  setTimeout(() => {
    processPayment(amount, method);
  }, 2000);
}

// Validate payment
function validatePayment(amount, method) {
  if (!amount || amount < 1) {
    alert('Please enter a valid payment amount.');
    return false;
  }

  if (amount > getOutstandingBalance()) {
    alert('Payment amount cannot exceed outstanding balance.');
    return false;
  }

  if (!method) {
    alert('Please select a payment method.');
    return false;
  }

  return true;
}

// Process payment
function processPayment(amount, method) {
  const paymentData = loadPaymentData();

  // Create payment record
  const payment = {
    id: Date.now(),
    amount: amount,
    method: method,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    status: 'Completed'
  };

  // Update payment data
  paymentData.totalPaid += amount;
  paymentData.payments.unshift(payment);

  // Save to localStorage
  savePaymentData(paymentData);

  // Update UI
  updatePaymentSummary();

  // Reset form
  paymentForm.reset();
  payBtn.disabled = false;
  payBtn.innerHTML = '<i class="fa-solid fa-credit-card"></i> Pay Now';

  // Show success message
  showSuccessMessage(amount);
}

// Show success message
function showSuccessMessage(amount) {
  const message = document.createElement('div');
  message.className = 'success-message';
  message.innerHTML = `
    <i class="fa-solid fa-check-circle"></i>
    Payment of ${formatCurrency(amount)} completed successfully!
  `;

  document.body.appendChild(message);

  setTimeout(() => {
    message.remove();
  }, 5000);
}

// Update payment history table
function updatePaymentHistory(payments) {
  paymentHistoryBody.innerHTML = '';

  if (payments.length === 0) {
    paymentHistoryBody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align: center; color: #7a4a13;">
          No payment history available
        </td>
      </tr>
    `;
    return;
  }

  payments.forEach(payment => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${payment.date} ${payment.time}</td>
      <td>${formatCurrency(payment.amount)}</td>
      <td>${formatPaymentMethod(payment.method)}</td>
      <td><span class="status ${payment.status.toLowerCase()}">${payment.status}</span></td>
    `;
    paymentHistoryBody.appendChild(row);
  });
}

// Validate payment amount input
function validatePaymentAmount() {
  const amount = parseInt(this.value);
  const outstanding = getOutstandingBalance();

  if (amount > outstanding) {
    this.value = outstanding;
  }
}

// Get outstanding balance
function getOutstandingBalance() {
  const paymentData = loadPaymentData();
  return TOTAL_FEES - paymentData.totalPaid;
}

// Toggle card details fields
function toggleCardFields() {
  const paymentMethod = document.getElementById('paymentMethod').value;
  const cardDetails = document.getElementById('cardDetails');

  if (paymentMethod === 'card') {
    cardDetails.style.display = 'block';
  } else {
    cardDetails.style.display = 'none';
  }
}

// Format card number input
document.getElementById('cardNumber').addEventListener('input', function(e) {
  let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
  e.target.value = formattedValue;
});

// Format expiry date input
document.getElementById('expiryDate').addEventListener('input', function(e) {
  let value = e.target.value.replace(/\D/g, '');
  if (value.length >= 2) {
    value = value.substring(0, 2) + '/' + value.substring(2, 4);
  }
  e.target.value = value;
});

// Format CVV input
document.getElementById('cvv').addEventListener('input', function(e) {
  e.target.value = e.target.value.replace(/\D/g, '');
});

// Format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0
  }).format(amount);
}

// Format payment method
function formatPaymentMethod(method) {
  const methods = {
    card: 'Credit/Debit Card',
    bank: 'Bank Transfer',
    quickteller: 'Quickteller',
    paydirect: 'Paydirect'
  };
  return methods[method] || method;
}