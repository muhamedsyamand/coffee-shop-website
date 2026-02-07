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
}

// Render cart on product pages
function renderCart() {
    const cartItems = document.getElementById('cart-items');
    if (!cartItems) return;
    
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.style.marginBottom = '8px';
        cartItem.innerHTML = item.name + " - $" + item.price.toFixed(2) + 
            ' <button onclick="removeFromCart(' + index + ')" style="margin-left:8px; padding:4px 8px; cursor:pointer;">Remove</button>';
        cartItems.appendChild(cartItem);
    });
    document.getElementById('cart-total').innerHTML = total.toFixed(2);
}

// Render cart in modal (home page)
function renderCartModal() {
    const modalCartItems = document.getElementById('modal-cart-items');
    if (!modalCartItems) return;
    
    modalCartItems.innerHTML = '';
    if (cart.length === 0) {
        modalCartItems.innerHTML = '<p style="text-align:center; padding:20px;">Your cart is empty</p>';
    } else {
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item-row';
            cartItem.innerHTML = '<span>' + item.name + ' - $' + item.price.toFixed(2) + '</span>' +
                '<button onclick="removeFromCart(' + index + ')" style="padding:4px 8px; cursor:pointer; background-color:#e74c3c; color:white; border:none; border-radius:3px;">Remove</button>';
            modalCartItems.appendChild(cartItem);
        });
    }
    document.getElementById('modal-cart-total').innerHTML = total.toFixed(2);
}

// Open cart modal
function openCartModal() {
    document.getElementById('cartModal').style.display = 'block';
    renderCartModal();
}

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
}

function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    saveCart();
    renderCart();
    renderCartModal();
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
document.addEventListener('DOMContentLoaded', loadCart);