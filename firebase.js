import admin from 'firebase-admin';
import dotenv from 'dotenv';

// Initialize Firebase Admin with your service account key
admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)),
});

// Load environment variables
dotenv.config();

export { verifyFirebaseToken };