import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyC2m4EtLC8ta2CvbUW9Ku6WM76BlX4mWwE",

  authDomain: "dts4b-52-final.firebaseapp.com",

  projectId: "dts4b-52-final",

  storageBucket: "dts4b-52-final.appspot.com",

  messagingSenderId: "628491715926",

  appId: "1:628491715926:web:d0639cbb6ef1c4ca3682f7"

}
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)