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

    auth.signInWithEmailAndPassword(email, password).then(function() {
        alert('Login clicked');
    }).catch(e => alert(e.message));
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        alert('Signed in as ' + user.email);
    } else {
        alert('Not Signed In');
    }
});