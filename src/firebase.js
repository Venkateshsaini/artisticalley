
import firebase from 'firebase/compat/app';
// import  { GoogleAuthProvider,signInWithPopup, signInWithEmailAndPassword,createUserWithEmailAndPassword,sendPasswordResetEmail } from 'firebase/compat/auth';
// import { query,getDocs,collection,where ,addDoc} from 'firebase/compat/firestore'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import 'firebase/compat/auth'
const firebaseConfig = {
  apiKey: "AIzaSyDxIj19T0_Zz3tD-cvJWzZIHT_NCy9gt7I",
  authDomain: "artistic-alley-official.firebaseapp.com",
  projectId: "artistic-alley-official",
  storageBucket: "artistic-alley-official.appspot.com",
  messagingSenderId: "491116990371",
  appId: "1:491116990371:web:f22fc4b06bd1c68177d416",
  measurementId: "G-9PSJ1TDPKK"
};


// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);
// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
 
const googleProvider = new firebase.auth.GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup( googleProvider);
    const user = res.user;
    const q = db.query(db.collection("users"), db.where("uid", "==", user.uid));
    const docs = await db.getDocs(q);
    if (docs.docs.length === 0) {
      await db.addDoc(db.collection( "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


// const registerWithEmailAndPassword = async (name, email, password) => {
//   try {
//     const res = await createUserWithEmailAndPassword(auth, email, password);
//     const user = res.user;
//     await addDoc(collection(db, "users"), {
//       uid: user.uid,
//       name,
//       authProvider: "local",
//       email,
//     });
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };
const sendPasswordReset = async (email) => {
  try {
    await auth.sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export {db,auth,storage,signInWithGoogle,
  sendPasswordReset} ;

