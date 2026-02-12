let cart = [];
let total = 0;

// Load cart from localStorage on page load
function loadCart() {
    const savedCart = localStorage.getItem('shopCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        total = parseFloat(localStorage.getItem('shopTotal')) || 0;
        renderCart();
    }
    updateCartBadge();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('shopCart', JSON.stringify(cart));
    localStorage.setItem('shopTotal', total.toFixed(2));
    updateCartBadge();
}

// Update badge on cart button
function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    const cartBtn = document.querySelector('.cart-button');
    if (badge) {
        if (cart.length > 0) {
            badge.textContent = cart.length;
            badge.style.display = 'flex';
            if (cartBtn) cartBtn.style.display = 'block';
        } else {
            badge.style.display = 'none';
            if (cartBtn) cartBtn.style.display = 'none';
        }
    }
    updateCartDisplay();
}

// Update cart display on home page
function updateCartDisplay() {
    const container = document.getElementById('cart-display-container');
    const checkoutSection = document.getElementById('cart-checkout-section');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    if (cart.length === 0) {
        container.innerHTML = `<div class="cart-empty-message">Your cart is empty. Start shopping!</div>`;
        if (checkoutSection) checkoutSection.style.display = 'none';
    } else {
        // Display cart items as cards
        cart.forEach((item, index) => {
            const cartItemCard = document.createElement('div');
            cartItemCard.className = 'cart-item-card';
            
            cartItemCard.innerHTML = `
                <button class="remove-btn" onclick="removeFromCart(${index})">×</button>
                <strong>${item.name}</strong>
                <span>$${item.price.toFixed(2)}</span>
            `;
            container.appendChild(cartItemCard);
        });
        
        // Update total and show checkout section
        const totalAmount = document.querySelector('#cart-checkout-section .cart-total-display span');
        if (totalAmount) {
            totalAmount.textContent = '$' + total.toFixed(2);
        }
        if (checkoutSection) checkoutSection.style.display = 'block';
    }
}

// Render cart on product pages
function renderCart() {
    const cartItems = document.getElementById('cart-items');
    if (!cartItems) return;
    
    cartItems.innerHTML = '';
    if (cart.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'text-center py-8 text-gray-500';
        emptyState.innerHTML = '<p>Your cart is empty</p>';
        cartItems.appendChild(emptyState);
    } else {
        const itemsGrid = document.createElement('div');
        itemsGrid.className = 'space-y-2';
        
        cart.forEach((item, index) => {
            const cartItemCard = document.createElement('div');
            cartItemCard.className = 'bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-lg p-3 flex items-center justify-between hover:shadow-md transition-all duration-200';
            
            cartItemCard.innerHTML = `
                <div class="flex items-center gap-3 flex-1">
                    <div class="w-10 h-10 rounded bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center text-white text-sm font-bold">
                        ☕
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="font-semibold text-gray-800 text-sm">${item.name}</p>
                        <p class="text-orange-600 font-bold">$${item.price.toFixed(2)}</p>
                    </div>
                </div>
                <button onclick="removeFromCart(${index})" class="ml-2 px-3 py-1 rounded bg-red-100 text-red-600 hover:bg-red-200 text-xs font-medium transition-colors">Remove</button>
            `;
            itemsGrid.appendChild(cartItemCard);
        });
        
        cartItems.appendChild(itemsGrid);
    }
    document.getElementById('cart-total').textContent = total.toFixed(2);
}

// Render cart in modal (home page)
function renderCartModal() {
    const modalCartItems = document.getElementById('modal-cart-items');
    if (!modalCartItems) return;
    
    modalCartItems.innerHTML = '';
    if (cart.length === 0) {
        modalCartItems.innerHTML = `
            <div class="flex flex-col items-center justify-center py-16 text-center">
                <i data-lucide="coffee" class="w-20 h-20 mx-auto mb-4 text-gray-300"></i>
                <p class="text-lg font-semibold text-gray-600">Your cart is empty</p>
                <p class="text-sm text-gray-400 mt-2">Add some delicious items to get started!</p>
            </div>
        `;
        lucide.createIcons();
    } else {
        const itemsGrid = document.createElement('div');
        itemsGrid.className = 'grid grid-cols-1 gap-3';
        
        cart.forEach((item, index) => {
            const cartItemCard = document.createElement('div');
            cartItemCard.className = 'bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-all duration-200 group';
            
            cartItemCard.innerHTML = `
                <div class="flex items-center gap-4 flex-1">
                    <div class="w-14 h-14 rounded-lg bg-gradient-to-br from-orange-300 to-amber-300 flex items-center justify-center text-white shadow-md flex-shrink-0">
                        <i data-lucide="coffee" class="w-7 h-7"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <h4 class="font-semibold text-gray-800 text-sm leading-tight">${item.name}</h4>
                        <p class="text-orange-600 font-bold text-lg mt-1">$${item.price.toFixed(2)}</p>
                    </div>
                </div>
                <button onclick="removeFromCart(${index})" class="ml-2 p-2 rounded-lg text-red-500 hover:bg-red-100 transition-colors flex-shrink-0 group-hover:scale-110 duration-200">
                    <i data-lucide="trash-2" class="w-5 h-5"></i>
                </button>
            `;
            itemsGrid.appendChild(cartItemCard);
        });
        
        modalCartItems.appendChild(itemsGrid);
        lucide.createIcons();
    }
    document.getElementById('modal-cart-total').innerHTML = total.toFixed(2);
}

// Open cart modal
// openCartModal removed — no trigger exists in markup; modal is still closable via closeCartModal()

// Close cart modal
function closeCartModal() {
    document.getElementById('cartModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('cartModal');
    if (modal && event.target === modal) {
        modal.style.display = 'none';
    }
}

function addToCart(ProductName, price) {
    cart.push({ name: ProductName, price: parseFloat(price) });
    total += parseFloat(price);
    saveCart();
    renderCart();
    updateCartDisplay();
}

function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    saveCart();
    renderCart();
    renderCartModal();
    updateCartDisplay();
}

function placeOrder() {
    if(total == 0){
        var output = document.getElementById("returnMessage") || document.getElementById("modal-order-message");
        if(output) {
            output.innerHTML = "You didn't add anything to the cart.";
            output.style.color = "red"; 
        }
    }
    else {
        const userResponse = confirm("Your order has been placed! Total: $" + total.toFixed(2));
        if(userResponse){
            var output = document.getElementById("returnMessage") || document.getElementById("modal-order-message");
            if(output) {
                output.innerHTML = "You ordered Successfully.";
                output.style.color = "green";
                output.style.fontSize = "xx-large";
            }
            // Clear cart after successful order
            cart = [];
            total = 0;
            saveCart();
            renderCart();
            renderCartModal();
            // Close modal after successful order
            setTimeout(closeCartModal, 100);
        }else{
            var output = document.getElementById("returnMessage") || document.getElementById("modal-order-message");
            if(output) {
                output.innerHTML = "You Canceled The Order.";
                output.style.color = "red";
                output.style.fontSize = "xx-large";
            }
        }
    }
}

// Load cart when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    updateCartDisplay();
});