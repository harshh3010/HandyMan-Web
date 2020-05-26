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

function signOut() {
    auth.signOut().then(function() {
        localStorage.clear();
        window.location.href = "index.html";
    }, function(error) {
        alert("An error occured\n" + error);
    });
}

document.getElementById('label-name').innerHTML = localStorage.getItem('user_name');
document.getElementById('label-email').innerHTML = localStorage.getItem('user_email');
document.getElementById('label-address').innerHTML = "Address: " + localStorage.getItem('user_address');
document.getElementById('label-pincode').innerHTML = "Pincode: " + localStorage.getItem('user_pincode');
document.getElementById('label-contact').innerHTML = "Contact: " + localStorage.getItem('user_contact');