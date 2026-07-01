// --- Level 4: Add to Cart Interactivity ---
let cartCount = 0;
const cartCountDisplay = document.getElementById('cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

addToCartButtons.forEach(button => {
    button.addEventListener('click', function () {
        if (!this.classList.contains('added')) {
            cartCount++;
            cartCountDisplay.textContent = cartCount;

            this.textContent = '✓ Added to Cart';
            this.classList.add('added');
        }
    });
});

// --- Level 4: Show / Hide Product Details (ROBUST VERSION) ---
const toggleButtons = document.querySelectorAll('.toggle-details-btn');

toggleButtons.forEach(button => {
    button.addEventListener('click', function () {
        // Pehle button ke parent (product-card) par jao, fir uske andar .extra-details dhoondho
        const card = this.closest('.product-card') || this.parentElement;
        // const extraDetails = card.querySelector('.extra-details');

        if (extraDetails) {
            extraDetails.classList.toggle('hidden');

            // Button ka text update karein
            if (extraDetails.classList.contains('hidden')) {
                this.textContent = 'Show Details';
            } else {
                this.textContent = 'Hide Details';
            }
        } else {
            console.error("Error: .extra-details class is card ke andar nahi mili!");
        }
    });
});

// --- Level 4: Contact Form Submission Alert ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault(); 
        const name = document.getElementById('name').value;
        alert(`Thank you, ${name}! Your message has been sent successfully.`);
        contactForm.reset(); 
    });
}

// --- Mobile Menu Toggle Functionality ---
const menuToggle = document.getElementById('menu-toggle');
const navbar = document.getElementById('navbar');

if (menuToggle && navbar) {
    menuToggle.addEventListener('click', function () {
        // Dropdown open/close toggle logic
        navbar.classList.toggle('active');

        // Button icon transition (☰ to ✖)
        if (navbar.classList.contains('active')) {
            menuToggle.textContent = '✖';
        } else {
            menuToggle.textContent = '☰';
        }
    });
}

// Jab poora page load ho jaye
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. UPDATE CART COUNT ON NAVIGATION
    updateCartCount();

    // 2. TOGGLE DETAILS BUTTON (Show/Hide functionality)
    const detailButtons = document.querySelectorAll('.toggle-details-btn');
    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const extraDetails = this.nextElementSibling;
            if (extraDetails.classList.contains('hidden')) {
                extraDetails.classList.remove('hidden');
                this.innerText = "Hide Details";
            } else {
                extraDetails.classList.add('hidden');
                this.innerText = "Show Details";
            }
        });
    });

    // 3. ADD TO CART LOGIC
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Jis card par click hua, uske andar se image, title aur price nikalna
            const card = this.parentElement;
            const productName = card.querySelector('h3').innerText;
            const productImage = card.querySelector('img').src;
            
            // Price text se sirf numbers nikalna (e.g., "Price: ₹1,499" -> 1499)
            const priceText = card.querySelector('.price').innerText;
            const productPrice = parseInt(priceText.replace(/[^0-9]/g, ''));

            // Object banana
            const product = {
                name: productName,
                image: productImage,
                price: productPrice
            };

            // Pehle se saved cart nikalna ya khali array lena
            let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
            
            // Naya product jorna
            cart.push(product);
            
            // Wapas memory mein save karna
            localStorage.setItem('shoppingCart', JSON.stringify(cart));

            // Counter update karna
            updateCartCount();

            alert(`${productName} has been added to your cart!`);
        });
    });
});

// Header mein cart ka number realtime update karne ka function
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    const cartCountSpan = document.getElementById('cart-count');
    if (cartCountSpan) {
        cartCountSpan.innerText = cart.length;
    }
}