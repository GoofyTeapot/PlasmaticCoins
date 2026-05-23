import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBCk1kUcNl8-U1IW7jL_K3H_Wm2vhaZTCA",
  authDomain: "plasmaticcoins-server.firebaseapp.com",
  projectId: "plasmaticcoins-server",
  storageBucket: "plasmaticcoins-server.firebasestorage.app",
  messagingSenderId: "148763283032",
  appId: "1:148763283032:web:e547227225642fa226c42d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const userStatus = document.getElementById("userStatus");

onAuthStateChanged(auth, async (user) => {
  if (!userStatus) return;

  if (user) {
    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);

    let name = user.email;
    if (snap.exists() && snap.data().name) {
      name = snap.data().name;
    }

    userStatus.innerHTML = `<strong>${name}</strong>`;
  } else {
    userStatus.innerHTML = `<a href="/PlasmaticCoins/auth/signup/">Log in</a>`;
  }
});
