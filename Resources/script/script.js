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

function signUp() {
    var email = document.getElementById('signup-email');
    var pass = document.getElementById('signup-password');
    var cnfpass = document.getElementById('signup-cnfpassword');

    if (pass.value == cnfpass.value) {
        const promise = auth.createUserWithEmailAndPassword(email.value, pass.value);
        promise.then((cred) => {
            console.log(cred);
            afterSignUp();
        });
        promise.catch(e => alert(e.message));
    } else {
        alert("The confirmation password doesn't match with the chosen one.");
    }
}

function afterSignUp() {
    var name = document.getElementById('signup-name').value;
    var email = document.getElementById('signup-email').value;
    var address = document.getElementById('signup-address').value;
    var pincode = document.getElementById('signup-pincode').value;
    var contact = document.getElementById('signup-contact').value;
    var id = auth.currentUser.uid;

    var data = {
        id: id,
        name: name,
        email: email,
        address: address,
        pincode: pincode,
        contact: contact
    };

    db.collection('Users').doc(id).set(data).then(function() {
        console.log("Registered Successfully!");
        alert("Registered Successfully!");
    }).catch(function(error) {
        console.error("Error writing document: ", error);
        alert(error);
    });
}

function signIn() {
    var email = document.getElementById('login-email');
    var pass = document.getElementById('login-password');

    auth.signInWithEmailAndPassword(email.value, pass.value).then(function() {

    }).catch(e => alert(e.message));
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var id = auth.currentUser.uid;
        db.collection("Users").doc(id).get().then(function(doc) {
            if (doc.exists) {
                localStorage.setItem("user_name", doc.data().name);
                localStorage.setItem("user_email", doc.data().email);
                localStorage.setItem("user_address", doc.data().address);
                localStorage.setItem("user_pincode", doc.data().pincode);
                localStorage.setItem("user_contact", doc.data().contact);
                window.location.replace('main.html');
            } else {
                alert("Unable to fetch user data!");
            }
        });
    } else {
        alert('Not Signed In');
    }
});