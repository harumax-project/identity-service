import * as admin from 'firebase-admin'
import { Auth } from 'firebase-admin/lib/auth/auth'

export class FirebaseAdmin {
  private adminFirestore: admin.firestore.Firestore
  private adminFirebaseAuth: Auth

  constructor() {
    if (process.env.NODE_ENV === 'local') {
      process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080'
      process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099'

      admin.initializeApp({ projectId: process.env.GCLOUD_PROJECT })
      console.log(
        `Firebase admin SDK is Running on Firebase Emulator! project: ${process.env.FIREBASE_PROJECT}`,
      )
      this.adminFirestore = admin.firestore()
      this.adminFirebaseAuth = admin.auth()
    } else {
      admin.initializeApp({ credential: admin.credential.applicationDefault() })
      console.log(
        `Firebase admin SDK is running on Firebase Production! project: ${process.env.FIREBASE_PROJECT}`,
      )
      this.adminFirestore = admin.firestore()
      this.adminFirebaseAuth = admin.auth()
    }
  }

  get db(): admin.firestore.Firestore {
    return this.adminFirestore
  }

  get auth(): Auth {
    return this.adminFirebaseAuth
  }
}
