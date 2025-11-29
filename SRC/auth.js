import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { 
    getFirestore, 
    doc, 
    setDoc, 
    getDoc, 
    updateDoc, 
    arrayUnion, 
    arrayRemove 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDDip-kFRL9FUnlvZLY74uFBlZ6fnOOzDA",
    authDomain: "shd-ccp-website.firebaseapp.com",
    projectId: "shd-ccp-website",
    storageBucket: "shd-ccp-website.firebasestorage.app",
    messagingSenderId: "970296691372",
    appId: "1:970296691372:web:412f0f3ae0af4e0e082d09",
    measurementId: "G-YNESPHGBBD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// --- Auth Functions ---

export async function login() {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        // Create user document if it doesn't exist
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            lastLogin: new Date()
        }, { merge: true });
        console.log("User signed in:", user.email);
    } catch (error) {
        console.error("Login failed:", error);
        alert("Login failed: " + error.message);
    }
}

export async function logout() {
    try {
        await signOut(auth);
        console.log("User signed out");
        // Reload to reset UI state
        window.location.reload();
    } catch (error) {
        console.error("Logout failed:", error);
    }
}

// --- Tutorial Tracking Functions ---

export async function toggleTutorialComplete(tutorialId) {
    const user = auth.currentUser;
    if (!user) {
        alert("Please sign in to track your progress.");
        return null;
    }

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    let completed = [];

    if (userSnap.exists() && userSnap.data().completedTutorials) {
        completed = userSnap.data().completedTutorials;
    }

    if (completed.includes(tutorialId)) {
        // Remove if already there (toggle off)
        await updateDoc(userRef, {
            completedTutorials: arrayRemove(tutorialId)
        });
        return false; // Now incomplete
    } else {
        // Add if not there (toggle on)
        await updateDoc(userRef, {
            completedTutorials: arrayUnion(tutorialId)
        });
        return true; // Now complete
    }
}

export async function getCompletedTutorials() {
    const user = auth.currentUser;
    if (!user) return [];
    
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists() && userSnap.data().completedTutorials) {
        return userSnap.data().completedTutorials;
    }
    return [];
}

// --- UI Management ---

function updateAuthButton(user) {
    const authBtns = document.querySelectorAll('.auth-btn-container'); 
    
    authBtns.forEach(container => {
        if (user) {
            container.innerHTML = `
                <div class="flex items-center space-x-3">
                    <img src="${user.photoURL}" class="w-8 h-8 rounded-full border border-green-500" alt="Avatar">
                    <button id="logout-btn" class="text-sm font-medium text-gray-300 hover:text-white">Sign Out</button>
                </div>
            `;
            // Re-attach listener since we replaced HTML
            const btn = container.querySelector('#logout-btn');
            if(btn) btn.addEventListener('click', logout);
        } else {
            container.innerHTML = `
                <button id="login-btn" class="bg-green-600 hover:bg-green-700 text-white text-sm font-bold py-2 px-4 rounded transition-colors">
                    Sign In
                </button>
            `;
            const btn = container.querySelector('#login-btn');
            if(btn) btn.addEventListener('click', login);
        }
    });
}

// Initialize Auth Listener
onAuthStateChanged(auth, async (user) => {
    updateAuthButton(user);
    // Dispatch a custom event so other scripts know auth is ready
    const event = new CustomEvent('authChanged', { detail: { user } });
    window.dispatchEvent(event);
});
