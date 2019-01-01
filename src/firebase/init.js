import firebase from "firebase";
import firestore from "firebase/firestore";

var config = {
  apiKey: "AIzaSyBgRofYlNmV-hSxkuqvpGgIZwWUif-aQwM",
  authDomain: "church-families.firebaseapp.com",
  databaseURL: "https://church-families.firebaseio.com",
  projectId: "church-families",
  storageBucket: "church-families.appspot.com",
  messagingSenderId: "978034056654"
};

const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true });

export default firebaseApp.firestore();
