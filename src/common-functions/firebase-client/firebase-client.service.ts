import { Injectable } from '@nestjs/common'
import { FirebaseApp, initializeApp } from 'firebase/app'

@Injectable()
export class FirebaseClientService {
  private firebaseApp: FirebaseApp
  private firebaseConfigData = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MESUREMENT_ID,
  }

  constructor() {
    this.firebaseApp = initializeApp(this.firebaseConfigData)
  }

  get app(): FirebaseApp {
    return this.firebaseApp
  }

  get firebaseConfig() {
    return this.firebaseConfigData
  }
}
