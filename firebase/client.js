import * as firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC69tDMKEu7C-hBCW804NTd0zpc54smv5Y",
  authDomain: "twity-a8129.firebaseapp.com",
  databaseURL: "https://twity-a8129.firebaseio.com",
  projectId: "twity-a8129",
  storageBucket: "twity-a8129.appspot.com",
  messagingSenderId: "44164140144",
  appId: "1:44164140144:web:d9c485d6fa0346093978b5",
  measurementId: "G-68FP26DZWR",
};

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

const mapUserFromFirebaseAuthToUser = (user) => {
  const { email, photoURL, displayName, uid } = user;
  //   const { username, profile } = additionalUserInfo;
  //   const { avatar_url, blog } = profile;
  return {
    avatar: photoURL,
    userName: displayName,
    email,
    uid,
  };
};

const db = firebase.firestore();

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null;
    onChange(normalizedUser);
  });
};

export const loginWithGitHub = () => {
  const gitHubProvider = new firebase.auth.GithubAuthProvider();
  return firebase.auth().signInWithPopup(gitHubProvider);
};

export const addDevit = ({ img, avatar, content, userId, userName }) => {
  return db.collection("tweets").add({
    avatar,
    content,
    userId,
    userName,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    shareCount: 0,
    img,
  });
};

export const fetchLatestTweets = () => {
  return db
    .collection("tweets")
    .orderBy("createdAt", "desc")
    .get()
    .then((snapshot) => {
      return snapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        const { createdAt } = data;

        return {
          ...data,
          id,
          createdAt: +createdAt.toDate(),
        };
      });
    });
};

export const uploadImage = (file) => {
  const ref = firebase.storage().ref(`images/${file.name}`);
  const task = ref.put(file);
  return task;
};
