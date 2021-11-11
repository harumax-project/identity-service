import * as admin from 'firebase-admin'
export class Firebase {
  private firestore: admin.firestore.Firestore

  constructor() {
    if (process.env.NODE_ENV === 'local') {
      process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080'
      process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099'
      admin.initializeApp({ projectId: process.env.GCLOUD_PROJECT })
      console.log(
        `Running on Firebase Emulator! project: ${process.env.GCLOUD_PROJECT}`,
      )
      this.firestore = admin.firestore()
    } else {
      admin.initializeApp({ credential: admin.credential.applicationDefault() })
      console.log(
        `running on Firebase Production! project: ${process.env.GCLOUD_PROJECT}`,
      )
      this.firestore = admin.firestore()
    }
  }

  get db(): admin.firestore.Firestore {
    return this.firestore
  }
}
