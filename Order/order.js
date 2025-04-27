function showNext() {
  const services = ['digital', 'binding', 'laminating', 'cutting'];
  services.forEach(service => {
    const checkbox = document.querySelector(`input[type="checkbox"][value="${service}"]`);
    const section = document.getElementById(service);
    if (checkbox.checked) {
      section.classList.add('active');
    } else {
      section.classList.remove('active');
    }
  });
}
 
function showMenu() {
  const menuItems = ['Warm Drinks', 'Cold Drinks', 'Sandwiches'];
  menuItems.forEach(item => {
    const checkbox = document.querySelector(`input[type="checkbox"][value="${item}"]`);
    const section = document.getElementById(item);
    if (checkbox.checked) {
      section.classList.add('active');
    } else {
      section.classList.remove('active');
    }
  });
}
 
// Highlight selected option boxes
document.querySelectorAll('.option-box input').forEach(input => {
  input.addEventListener('change', () => {
    input.parentElement.classList.toggle('selected', input.checked);
  });
});
 
document.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem("vitalyCart")) || {};

  // 🔥 START: Disable submit button if no option selected
  const submitBtn = document.querySelector(".submit-btn");
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  function updateButtonState() {
    let anyChecked = false;
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        anyChecked = true;
      }
    });
    submitBtn.disabled = !anyChecked;
  }

  // Initialize button state
  updateButtonState();

  // Listen to all checkbox changes
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", updateButtonState);
  });
  // 🔥 END
 
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      const itemDiv = btn.closest(".item");
      const name = itemDiv.dataset.name;
 
      // Find the corresponding checkbox
      const checkbox = itemDiv.querySelector('input[type="checkbox"]');
 
      if (checkbox && checkbox.checked) {
        // If checked, add or update the cart
        if (!cart[name]) {
          cart[name] = 1;
        }
 
        const qtyDisplay = itemDiv.querySelector(".quantity");
        qtyDisplay.innerHTML = `
          Quantity:
          <button class="qty-btn" data-dir="down">−</button>
          <span class="qty-num">${cart[name]}</span>
          <button class="qty-btn" data-dir="up">+</button>
        `;
        qtyDisplay.style.display = "block";
 
        qtyDisplay.querySelectorAll(".qty-btn").forEach(qtyBtn => {
          qtyBtn.addEventListener("click", () => {
            const dir = qtyBtn.dataset.dir;
            if (dir === "up") cart[name]++;
            else if (dir === "down" && cart[name] > 1) cart[name]--;
            qtyDisplay.querySelector(".qty-num").textContent = cart[name];
            localStorage.setItem("vitalyCart", JSON.stringify(cart));
          });
        });
 
      } else {
        // If NOT checked, remove it
        delete cart[name];
        const qtyDisplay = itemDiv.querySelector(".quantity");
        if (qtyDisplay) {
          qtyDisplay.innerHTML = "";
          qtyDisplay.style.display = "none";
        }
      }
 
      localStorage.setItem("vitalyCart", JSON.stringify(cart));
    });
  });
 
  document.querySelector(".submit-btn").addEventListener("click", () => {
    const services = [
      { key: 'digital', label: 'Digital Printing', inputName: 'digital-copies', price: 5 },
      { key: 'binding', label: 'Binding', inputName: 'binding-copies', price: 50 },
      { key: 'laminating', label: 'Laminating', inputName: 'laminating-copies', price: 30 },
      { key: 'cutting', label: 'Cutting', inputName: 'cutting-copies', price: 50 }
    ];
 
    services.forEach(service => {
      const checkbox = document.querySelector(`input[type="checkbox"][value="${service.key}"]`);
      if (checkbox && checkbox.checked) {
        const qtyInput = document.querySelector(`input[name="${service.inputName}"]`);
        const qty = parseInt(qtyInput?.value) || 1;
        if (qty > 0) {
          cart[service.label] = (cart[service.label] || 0) + qty;
        }
      } else {
        // REMOVE if unchecked
        delete cart[service.label];
      }
    });
 
    localStorage.setItem("vitalyCart", JSON.stringify(cart));
    window.location.href = "checkout.html";
  });  
});
 
function refreshCart() {
  cart = JSON.parse(localStorage.getItem("vitalyCart")) || {};
}
