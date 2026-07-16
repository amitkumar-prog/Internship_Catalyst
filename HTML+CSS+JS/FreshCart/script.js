

//====================== NAVBAR ======================

const themeToggle = document.getElementById("themeToggle");
const cartCount = document.querySelector(".cart-count");

//====================== PRODUCTS ======================

const productCards = document.querySelectorAll(".product-card");
const addToCartButtons = document.querySelectorAll(".product-btn");

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

//====================== CART ======================

const cartBody = document.getElementById("cart-body");

let cart = [];

//====================== CUSTOMER ======================

const customerName = document.getElementById("customerName");
const customerPhone = document.getElementById("customerPhone");
const customerEmail = document.getElementById("customerEmail");
const customerAddress = document.getElementById("customerAddress");

const saveCustomerBtn = document.getElementById("saveCustomer");

let customer = {};

//====================== BILL ======================

const subtotal = document.getElementById("subtotal");
const gst = document.getElementById("gst");
const discount = document.getElementById("discount");
const grandTotal = document.getElementById("grandTotal");

const generateBill = document.getElementById("generateBill");

let subtotalAmount = 0;
let gstAmount = 0;
let discountAmount = 0;
let grandTotalAmount = 0;


//=================================================
//              DARK / LIGHT THEME
//==================================================

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        themeToggle.classList.remove("fa-moon");
        themeToggle.classList.add("fa-sun");

    }

    else {

        themeToggle.classList.remove("fa-sun");
        themeToggle.classList.add("fa-moon");

    }

});


//==================================================
//                 OFFER TIMER
//==================================================

let totalTime = 90;

const minute = document.getElementById("minutes");
const second = document.getElementById("seconds");

function startTimer() {

    let min = Math.floor(totalTime / 60);
    let sec = totalTime % 60;

    minute.textContent = String(min).padStart(2, "0");
    second.textContent = String(sec).padStart(2, "0");

    totalTime--;

    if (totalTime < 0) {

        clearInterval(timer);

        const offerBtn = document.getElementById("claimOffer");

        offerBtn.disabled = true;
        offerBtn.textContent = "Offer Expired";

    }

}

const timer = setInterval(startTimer, 1000);

startTimer();


//==================================================
//              PRODUCT SEARCH
//==================================================

searchInput.addEventListener("keyup", searchProduct);

function searchProduct() {

    const value = searchInput.value.toLowerCase();

    productCards.forEach((card) => {

        const productName = card.dataset.name.toLowerCase();

        if (productName.includes(value)) {

            card.style.display = "block";

        }

        else {

            card.style.display = "none";

        }

    });

}



//==================================================
//             CATEGORY FILTER
//==================================================

categoryFilter.addEventListener("change", filterCategory);

function filterCategory() {

    const selectedCategory = categoryFilter.value;

    productCards.forEach((card) => {

        const category = card.dataset.category;

        if (
            selectedCategory === "All" ||
            category === selectedCategory
        ) {

            card.style.display = "block";

        }

        else {

            card.style.display = "none";

        }

    });

}

//==================================================
//                 ADD TO CART
//==================================================

// Add click event on every Add To Cart button
addToCartButtons.forEach((button) => {

    button.addEventListener("click", addToCart);

});


//==================== ADD PRODUCT ====================

function addToCart(event) {

    try {

        const button = event.currentTarget;

        const productCard = button.closest(".product-card");

        if (!productCard) {

            throw new Error("Product Card Not Found!");

        }

        const name = productCard.dataset.name;
        const price = Number(productCard.dataset.price);

        // Check if product already exists
        const existingProduct = cart.find(item => item.name === name);

        if (existingProduct) {

            existingProduct.quantity++;

        }

        else {

            cart.push({

                name: name,
                price: price,
                quantity: 1

            });

        }

        cartCount.textContent = cart.length;

        displayCart();

    }

    catch (error) {

        alert(error.message);
        console.error(error);

    }

}


//==================================================
//              DISPLAY CART
//==================================================

function displayCart() {

    cartBody.innerHTML = "";

    if (cart.length === 0) {

        cartBody.innerHTML = `

        <tr>

            <td colspan="5" class="empty-cart">

                Your cart is empty.

            </td>

        </tr>

        `;

        calculateBill();

        return;

    }


    cart.forEach((item, index) => {

        cartBody.innerHTML += `

        <tr>

            <td>${item.name}</td>

            <td>₹${item.price}</td>

            <td>${item.quantity}</td>

            <td>₹${item.price * item.quantity}</td>

            <td>

                <button
                    class="remove-btn"
                    onclick="removeItem(${index})">

                    Remove

                </button>

            </td>

        </tr>

        `;

    });

    calculateBill();

}



//==================================================
//                REMOVE ITEM
//==================================================

function removeItem(index) {

    if (index < 0 || index >= cart.length) {

        return;

    }

    cart.splice(index, 1);

    cartCount.textContent = cart.length;

    displayCart();

}



//==================================================
//              CLEAR COMPLETE CART
//==================================================

function clearCart() {

    cart = [];

    cartCount.textContent = 0;

    displayCart();

}



//==================================================
//              BILL CALCULATION
//==================================================

function calculateBill() {

    subtotalAmount = 0;

    // Calculate subtotal
    cart.forEach((item) => {

        subtotalAmount += item.price * item.quantity;

    });

    // GST 18%
    gstAmount = subtotalAmount * 0.18;

    // Discount Logic
    if (subtotalAmount >= 1000) {

        discountAmount = subtotalAmount * 0.10;

    }

    else {

        discountAmount = 0;

    }

    // Grand Total
    grandTotalAmount =
        subtotalAmount +
        gstAmount -
        discountAmount;

    // Update UI
    subtotal.textContent =
        `₹${subtotalAmount.toFixed(2)}`;

    gst.textContent =
        `₹${gstAmount.toFixed(2)}`;

    discount.textContent =
        `₹${discountAmount.toFixed(2)}`;

    grandTotal.textContent =
        `₹${grandTotalAmount.toFixed(2)}`;

}



//==================================================
//          SAVE CUSTOMER DETAILS
//==================================================

saveCustomerBtn.addEventListener("click", saveCustomer);

function saveCustomer() {

    try {

        if (customerName.value.trim() === "") {

            throw new Error("Please Enter Customer Name");

        }

        if (customerPhone.value.length !== 10) {

            throw new Error("Mobile Number Must Be 10 Digits");

        }

        if (!customerEmail.value.includes("@")) {

            throw new Error("Enter Valid Email");

        }

        if (customerAddress.value.trim() === "") {

            throw new Error("Please Enter Address");

        }

        customer = {

            name: customerName.value.trim(),

            phone: customerPhone.value.trim(),

            email: customerEmail.value.trim(),

            address: customerAddress.value.trim()

        };

        alert("Customer Details Saved Successfully ✅");

        console.log(customer);

    }

    catch (error) {

        alert(error.message);

        console.error(error);

    }

    finally {

        console.log("Customer Validation Completed");

    }

}


//==================================================
//              GENERATE BILL
//==================================================

generateBill.addEventListener("click", generateInvoice);

function generateInvoice(){

    // Customer Details verify

    try{

        if(Object.keys(customer).length === 0){
            throw new Error("Please save customer details first.");
        
        }

    // cart check

        if(cart.length === 0){
            throw new Error("Your cart is empty");
            
        }

    

    // Bill Message

        let message = `
    
    ============= FRESHCART ==============
    Customer : ${customer.name}
    
    Phone    : ${customer.phone}
    
    ---------------------------------------
    Items : ${cart.length}
    
    Subtotal : ₹${subtotalAmount.toFixed(2)}
    
    GST      : ₹${gstAmount.toFixed(2)}
    
    Discount : ₹${discountAmount.toFixed(2)}
    
    ----------------------------------------
    Grant Total : ₹${grandTotalAmount.toFixed(2)}
    
    Thank You for Shopping 🧡
    `;

            alert(message);
            
            //reset project

            resetProject();

    }

    catch(error){

        alert(error.message);

        console.erroe(error);
    }

    finally{

        console.log("Generate Bill Function executed");
    }

}



//==================================================
//              RESET PROJECT
//==================================================

function resetProject() {

    cart = [];

    customer = {};

    cartCount.textContent = "0";

    displayCart();

    document.getElementById("customer-form").reset();

}
