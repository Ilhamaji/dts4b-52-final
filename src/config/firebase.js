import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDwWVbiCi69f6WJ5_LzMktRtSyqZqE6mT4',
  authDomain: 'crmmobile-3d8c2.firebaseapp.com',
  projectId: 'crmmobile-3d8c2',
  storageBucket: 'crmmobile-3d8c2.appspot.com',
  messagingSenderId: '159984028523',
  appId: '1: 159984028523: web: 34038786b237c86ee6da2e',
  measurementId: 'G-PRSR0XQTRG',
}
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)