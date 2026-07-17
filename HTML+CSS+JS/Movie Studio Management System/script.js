//================ SELECT ELEMENTS ================//

const movieGrid = document.querySelector(".movie-grid");

const bookButtons = document.querySelectorAll(".book-btn");

const movieSelect = document.getElementById("movieSelect");

const ticketCount = document.getElementById("ticketCount");

const seatType = document.getElementById("seatType");

const customerName = document.getElementById("customerName");

const customerEmail = document.getElementById("customerEmail");

const bookTicket = document.getElementById("bookTicket");

const confirmBooking = document.getElementById("confirmBooking");

const searchMovie = document.getElementById("searchMovie");

const movieCategory = document.getElementById("movieFilter");

const themeToggle = document.getElementById("themeToggle");

//================ MOVIE DATA ================//

const movies = [

    {
        name:"Avengers",
        category:"Action",
        price:250
    },

    {
        name:"Interstellar",
        category:"Sci-Fi",
        price:300
    },

    {
        name:"Spider Man",
        category:"Action",
        price:280
    },

    {
        name:"Joker",
        category:"Drama",
        price:220
    },

    {
        name:"Inception",
        category:"Sci-Fi",
        price:270
    },

    {
        name:"Frozen",
        category:"Animation",
        price:180
    }

];

//================ GLOBAL VARIABLES ================//

let booking = {};

let subtotal = 0;

let gst = 0;

let discount = 0;

let grandTotal = 0;

bookTicket.addEventListener("click",bookMovie);

function bookMovie(){

    try{

        const movie = movieSelect.value;

        const tickets = Number(ticketCount.value);

        const seat = seatType.value;

        if(customerName.value==""){

            throw "Enter Customer Name";

        }

        if(movie=="Select Movie"){

            throw "Select Movie";

        }

        if(tickets<=0){

            throw "Invalid Ticket Quantity";

        }

        booking={

            movie,

            seat,

            tickets

        };

        updateSummary();

        alert("Movie Added Successfully");

    }

    catch(error){

        alert(error);

    }

}

//================ UPDATE SUMMARY ================//

function updateSummary(){

    const selectedMovie = movies.find(function(movie){

        return movie.name === booking.movie;

    });

    if(selectedMovie == undefined){

    alert("Movie Not Found");

    return;

}

    subtotal = selectedMovie.price * booking.tickets;

    gst = subtotal * 0.18;

    if(subtotal >= 500){

        discount = subtotal * 0.10;

    }
    else{

        discount = 0;

    }

    grandTotal = subtotal + gst - discount;

    document.getElementById("movieName").textContent = booking.movie;

    document.getElementById("seatName").textContent = booking.seat;

    document.getElementById("ticketQty").textContent = booking.tickets;

    document.getElementById("subtotal").textContent = "₹" + subtotal;

    document.getElementById("gst").textContent = "₹" + gst.toFixed(2);

    document.getElementById("discount").textContent = "₹" + discount.toFixed(2);

    document.getElementById("grandTotal").textContent = "₹" + grandTotal.toFixed(2);


}

//================ CONFIRM BOOKING ================//

confirmBooking.addEventListener("click", confirmTicket);

function confirmTicket() {

    if (grandTotal == 0) {

        alert("Please book a movie first.");

        return;

    }

    alert(
        "Booking Confirmed!\n\n" +
        "Movie : " + booking.movie +
        "\nTickets : " + booking.tickets +
        "\nTotal : ₹" + grandTotal.toFixed(2)
    );
    resetForm();

}

/*======================== RESET PROJECT =======================*/

const resetBooking = document.getElementById("resetBooking");

if(resetBooking){

    resetBooking.addEventListener("click", resetForm);

}

//================ RESET FUNCTION ================//

function resetForm(){

    booking = {};

    subtotal = 0;

    gst = 0;

    discount = 0;

    grandTotal = 0;

    customerName.value = "";

    customerEmail.value = "";

    movieSelect.selectedIndex = 0;

    seatType.selectedIndex = 0;

    ticketCount.value = 1;

    document.getElementById("movieName").textContent = "-";

    document.getElementById("seatName").textContent = "-";

    document.getElementById("ticketQty").textContent = "0";

    document.getElementById("subtotal").textContent = "₹0";

    document.getElementById("gst").textContent = "₹0";

    document.getElementById("discount").textContent = "₹0";

    document.getElementById("grandTotal").textContent = "₹0";

    alert("Form Reset Successfully");

}


//================ SEARCH MOVIES ================//

searchMovie.addEventListener("keyup", searchMovies);

function searchMovies() {

    const value = searchMovie.value.toLowerCase();

    const cards = document.querySelectorAll(".movie-card");

    cards.forEach(function(card) {

        const movieName = card.querySelector("h1").textContent.toLowerCase();

        if (movieName.includes(value)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}

//================ FILTER MOVIES ================//

movieCategory.addEventListener("change", filterMovies);

function filterMovies() {

    const category = movieCategory.value;

    const cards = document.querySelectorAll(".movie-card");

    cards.forEach(function(card) {

        const genre = card.querySelector(".genre").textContent;

        if (category == "All" || genre == category) {

            card.style.display = "block";

        }

        else {

            card.style.display = "none";

        }

    });

}

/*================================= TIMER ================================*/



let totalTime = 120;

const minute = document.getElementById("minutes");
const second = document.getElementById("seconds");

function startTimer(){

    let min = Math.floor(totalTime / 60);
    let sec = totalTime % 60;

    minute.textContent = String(min).padStart(2,"0");
    second.textContent = String(sec).padStart(2,"0");

    if(totalTime <= 0){

        clearInterval(timer);

        alert("Booking Time Expired!");

        return;
    }

    totalTime--;

}

startTimer(); // First display 02:00

const timer = setInterval(startTimer,1000);