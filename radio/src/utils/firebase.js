import firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyCXKVNQULe_EtbIl0f_GxVS5J3qDvfIR7Q",
authDomain: "radio4bttr.firebaseapp.com",
databaseURL: "https://radio4bttr-default-rtdb.europe-west1.firebasedatabase.app",
projectId: "radio4bttr",
storageBucket: "radio4bttr.appspot.com",
messagingSenderId: "489277060149",
appId: "1:489277060149:web:b608cb5b3e6fa6277f2d7c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;