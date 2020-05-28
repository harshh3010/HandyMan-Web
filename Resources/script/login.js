var firebaseConfig = {
    apiKey: "AIzaSyCL2v8R6NdJIIXraLLrpIpISbn-xUv5pCo",
    authDomain: "handyman-1742c.firebaseapp.com",
    databaseURL: "https://handyman-1742c.firebaseio.com",
    projectId: "handyman-1742c",
    storageBucket: "handyman-1742c.appspot.com",
    messagingSenderId: "728193362142",
    appId: "1:728193362142:web:869f65da06657aabe8ba4f",
    measurementId: "G-05H9TCD39M"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();
const id = localStorage.getItem("user_id");

function signOut() {
    auth.signOut().then(function() {
        localStorage.clear();
        window.location.href = "index.html";
    }, function(error) {
        alert("An error occured\n" + error);
    });
}

displayData();
loadBookings();

function displayData() {
    document.getElementById('label-name').innerHTML = localStorage.getItem('user_name');
    document.getElementById('label-email').innerHTML = localStorage.getItem('user_email');
    document.getElementById('label-address').innerHTML = "Address: " + localStorage.getItem('user_address');
    document.getElementById('label-pincode').innerHTML = "Pincode: " + localStorage.getItem('user_pincode');
    document.getElementById('label-contact').innerHTML = "Contact: " + localStorage.getItem('user_contact');
}

function updateData() {
    var address = document.getElementById('edit-address').value;
    var pincode = document.getElementById('edit-pincode').value;
    var contact = document.getElementById('edit-contact').value;

    var data = {
        address: address,
        pincode: pincode,
        contact: contact
    };

    db.collection('Users').doc(id).update(data).then(function() {
        alert("Data updated successfully!");
        localStorage.setItem("user_address", address);
        localStorage.setItem("user_pincode", pincode);
        localStorage.setItem("user_contact", contact);
        displayData();
    }).catch(function(error) {
        alert(error);
    });
}

db.collection('Cities').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        document.getElementById('list-cities').innerHTML += "<option value = " + doc.id + ">" + doc.id + "</option>";
    });
});

function loadCategories() {
    var cities = document.getElementById('list-cities');
    var city = cities.options[cities.selectedIndex].value;

    document.getElementById('service-category-box').innerHTML = "";

    db.collection('Cities').doc(city).collection('Services').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            document.getElementById('service-category-box').innerHTML += "<div class=\"service-category\">" +
                "<label onclick=\"loadServices(this,\'" + city + "\')\">" + doc.id + "</label>" +
                "</div>";
        });
    });
}

function loadServices(el, city) {
    var category = el.textContent;

    document.getElementById("category-name-h2").innerHTML = category;
    document.getElementById("service-box").innerHTML = "";

    document.querySelector(".handyman-home").style.display = "none";
    document.querySelector(".handyman-bookings").style.display = "none";
    document.querySelector(".handyman-profile").style.display = "none";
    document.querySelector(".handyman-service-category").style.display = "block";

    db.collection("Cities").doc(city).collection("Services").doc(category).collection('Service').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            document.getElementById("service-box").innerHTML += "<div class=\"service\" onclick=\"bookService(" +
                "\'" + doc.data().name + "\'," +
                "\'" + city + "\'," +
                "\'" + category + "\'," +
                "\'" + doc.data().cost + "\'" +
                ")\">" +
                "<label id=\"service-name\">" + doc.data().name + "</label>" +
                "<label id=\"service-desc\">" + doc.data().desc + "</label>" +
                "<label id=\"service-cost\">" + "Rs. " + doc.data().cost + "</label>" +
                "</div>";
        });
    });
}

function bookService(name, city, category, cost) {

    document.querySelector(".booking-popup").style.display = "flex";

    document.getElementById('confirm-booking-btn').addEventListener('click', function() {

        var time = document.getElementById('booking-time').value;
        var date = document.getElementById('booking-date').value;
        var booking = {
            name: name,
            city: city,
            category: category,
            cost: cost,
            date: date,
            time: time
        };
        if (!date || !time) {
            alert("Please enter date and time.");
        } else {

            db.collection("Users").doc(id).collection("Bookings").doc().set(booking).then(function() {
                alert("Booking confirmed");
                location.reload();
            }).catch(e => {
                alert(e.message);
            });
        }

    });
}

function loadBookings() {
    db.collection('Users').doc(id).collection("Bookings").get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            document.getElementById('bookings-box').innerHTML += "<div class=\"booking-div\">" +
                "<label class=\"booking-service-name\">" + doc.data().name + "</label>" +
                "<label class=\"booking-service-date\">" + "Date: " + doc.data().date + "</label>" +
                "<label class=\"booking-service-time\">" + "Time: " + doc.data().time + "</label>" +
                "<label class=\"booking-service-cost\">" + "Rs. " + doc.data().cost + "</label>" +
                "<button class=\"booking-cancel-btn\" onclick=\"cancelBooking(\'" + doc.id + "\')\">Cancel</button>";
        });
    });
}

function cancelBooking(booking_id) {
    db.collection("Users").doc(id).collection("Bookings").doc(booking_id).delete().then(function() {
        alert("Booking cancelled!");
        location.reload();
    });
}