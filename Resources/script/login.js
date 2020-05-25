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

const id = null;

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

function signOut() {
    auth.signOut().then(function() {
        window.location.href = "index.html";
    }, function(error) {
        alert("An error occured\n" + error);
    });
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        id = user.uid;
    }
});

document.getElementById('label-name').innerHTML = id;