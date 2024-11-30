import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAhE9QOuv0hfK-hEpeKSbjpDEQdMVAvQeI",
  authDomain: "login-2f143.firebaseapp.com",
  projectId: "login-2f143",
  storageBucket: "login-2f143.firebasestorage.app",
  messagingSenderId: "499899608418",
  appId: "1:499899608418:web:95eafada8c4687f21a903b"
};

// Firebase-ты инициализациялау
const app = initializeApp(firebaseConfig);

function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function() {
        messageDiv.style.opacity = 0;
    }, 5000);
}

const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;

    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        const userData = {
            email: email,
            firstName: firstName,
            lastName: lastName
        };
        showMessage('Аккаунт сәтті құрылды', 'signUpMessage');
        const docRef = doc(db, "users", user.uid);
        setDoc(docRef, userData)
        .then(() => {
            window.location.href = 'index.html';
        })
        .catch((error) => {
            console.error("Құжатты жазуда қате", error);
        });
    })
    .catch((error) => {
        const errorCode = error.code;
        if (errorCode == 'auth/email-already-in-use') {
            showMessage('Бұл электрондық пошта мекенжайы бар!', 'signUpMessage');
        } else {
            showMessage('Пайдаланушыны құру мүмкін болмады', 'signUpMessage');
        }
    })
});

const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        showMessage('Кіру сәтті орындалды', 'signInMessage');
        const user = userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href = 'index.html';
    })
    .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/invalid-credential') {
            showMessage('Қате электрондық пошта немесе құпия сөз', 'signInMessage');
        } else {
            showMessage('Аккаунт табылмады', 'signInMessage');
        }
    })
});






