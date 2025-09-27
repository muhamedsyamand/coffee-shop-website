let total = 0;

    function addToCart(ProductName, price) {
        const cartItems = document.getElementById('cart-items');
        
        // Create a new div element for the cart item
        const cartItem = document.createElement('div');

        cartItem.innerHTML = ProductName + " - $" + price;
        
        // Append the new div to the cart items container
        cartItems.appendChild(cartItem);

        // Update the total price
        total += price;
        document.getElementById('cart-total').innerHTML = total;
    }

    function placeOrder() {
        const userResponse = confirm("Your order has been placed! Total: $" + total);
        var output = document.getElementById("returnMessage")
        if(total == 0){
            output.innerHTML = "You didn't add anything to the cart.";
            output.style.color = "red"; 
        }
        else if(userResponse){
            output.innerHTML = "You ordered Successfully.";
            output.style.color = "green";
            output.style.fontSize = "xx-large";
        }else{
            output.innerHTML = "You Canceled The Order.";
            output.style.color = "red";
            output.style.fontSize = "xx-large";
        }

        document.getElementById('cart-items').innerHTML = null;
        document.getElementById('cart-total').textContent = '0';
        total = 0;
 }