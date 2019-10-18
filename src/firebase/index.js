
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDrMhonnRSFzmfNUKH5XI6f0qrxJsGYwfI",
  authDomain: "meal-prep-69653.firebaseapp.com",
  databaseURL: "https://meal-prep-69653.firebaseio.com",
  projectId: "meal-prep-69653",
  storageBucket: "",
  messagingSenderId: "781591724973",
  appId: "1:781591724973:web:96795365e10aa523615724"
};

export const initializeApp = () =>{
  firebase.initializeApp(firebaseConfig)
} 

navigator.serviceWorker
.register('/firebase-messaging-sw.js')
.then(registration =>{
  firebase.messaging().useServiceWorker(registration)
})

export const askForPermissioToReceiveNotifications = async () =>{
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('user token: ', token);
    return token;
  } catch (error) {
    console.error(error);
  }
}