document.addEventListener("DOMContentLoaded", () => {
  // Add cash and change calculation script
  const cashInput = document.querySelector('input');
  const grandTotalElem = document.getElementById("grandTotal");
  const changeDisplay = document.getElementById("changeDisplay");

  // Cart handling script
  let cart = JSON.parse(localStorage.getItem("vitalyCart")) || {};
  const orderList = document.getElementById("order-list");
  const totalDisplay = document.getElementById("grandTotal");
  const confirmButton = document.querySelector(".btn.btn-primary");

  const priceMap = {
    "Digital Printing": 5,
    "Binding": 50,
    "Laminating": 30,
    "Cutting": 50,
    "Mocha": 150,
    "Vanilla": 140,
    "Caramel": 145,
    "Espresso": 120,
    "Americano": 160,
    "Iced Mocha": 150,
    "Iced Ube": 145,
    "Iced Caramel": 150,
    "Iced Matcha": 160,
    "Iced Strawberry": 150,
    "Cold Brew": 140,
    "Iced Vanilla": 150,
    "Spam Sandwich": 120,
    "Ham & Cheese": 110,
    "Cheesy Bacon": 130,
    "Pancake Delight": 100,
    "Tuna Sandwich": 110,
    "Grilled Salami": 120,
    "Turkey Sandwich": 110,
    "Cheese Delight": 100,
    "Baguette Chicken": 130,
    "Cheesy Beef": 120,
  };

  const renderCart = () => {
    orderList.innerHTML = "";
    let grandTotal = 0;

    for (const item in cart) {
      const quantity = cart[item];
      const price = priceMap[item] || 0;
      const itemTotal = price * quantity;
      grandTotal += itemTotal;

      const li = document.createElement("li");
      li.className = "mb-2";

      li.innerHTML = `
        <div class="d-flex justify-content-between align-items-center order-li">
          <div class="fw-bold cart-item">${item}</div>
          <div class="d-flex align-items-center order-li">
            <button class="btn btn-sm btn-outline-secondary quantity-btn me-1" data-action="decrease" data-item="${item}">−</button>
            <span class="px-2">${quantity}</span>
            <button class="btn btn-sm btn-outline-secondary quantity-btn ms-1" data-action="increase" data-item="${item}">+</button>
          </div>
          <div class="d-flex align-items-center order-li">
            <div class="fw-semibold mx-3">₱${itemTotal}</div>
            <button class="btn btn-sm remove-btn" data-action="remove" data-item="${item}">×</button>
          </div>
        </div>
      `;
      orderList.appendChild(li);
    }

    totalDisplay.textContent = grandTotal;
    localStorage.setItem("vitalyCart", JSON.stringify(cart));

    // Update the change display when cash input changes
    cashInput.addEventListener("input", () => {
      const cash = parseFloat(cashInput.value);
      const total = parseFloat(grandTotalElem.textContent);
      const change = cash - grandTotal; // use grandTotal directly

      const warning = document.getElementById("cashWarning");

      if (!isNaN(cash) && cash >= total) {
        const change = cash - grantTotal;
        changeDisplay.textContent = 'PHP ${change}';
        warning.textContent = "";
        confirmButton.disabled = false;
      } else {
        changeDisplay.textContent = "PHP 0";
        warning.textContent = "Insufficient payment.";
        confirmButton.disabled = true;
      }
    });
  };

  orderList.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if (!button) return;

    const action = button.dataset.action;
    const item = button.dataset.item;

    if (action === "increase") {
      cart[item]++;
    } else if (action === "decrease") {
      cart[item] = Math.max(1, cart[item] - 1);
    } else if (action === "remove") {
      delete cart[item];
    }

    renderCart();
  });

  confirmButton.addEventListener("click", () => {
    if (Object.keys(cart).length === 0) {
      alert("Your cart is empty! Please add items before confirming your order.");
      return;
    }

    const requiredFields = document.querySelectorAll("[required]");
    let allFilled = true;

    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        allFilled = false;
      }
    });

    if (!allFilled) {
      const popup = document.getElementById("popup-message");
      popup.style.display = "flex";

      setTimeout(() => {
        popup.style.display = "none";
      }, 2000);

      return;
    }

    // Email and Philippines phone validation
    const emailField = document.querySelector('input[name="email"]');
    const phoneField = document.querySelector('input[name="phone"]');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^(09\d{9}|\+639\d{9})$/; // PH format

    if (!emailPattern.test(emailField.value.trim())) {
      alert("Please enter a valid email address.");
      emailField.focus();
      return;
    }

    if (!phonePattern.test(phoneField.value.trim())) {
      alert("Please enter a valid phone number (e.g., 09171234567 or +639171234567).");
      phoneField.focus();
      return;
    }

    alert("Order confirmed! Thank you for ordering.");
    localStorage.removeItem("vitalyCart");
    window.location.href = "order.html";
  });

  document.getElementById("cancel-order").addEventListener("click", () => {
    window.location.href = "order.html";
  });

  renderCart(); // Initial render
});
