import admin from 'firebase-admin';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Firebase Admin with your service account key
admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)),
});

// Middleware to verify Firebase token
const verifyFirebaseToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Expecting "Bearer <token>"
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
  
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = decodedToken; // Store user info for further use if needed
      next(); // Token is valid, proceed to the next middleware
    } catch (error) {
      return res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
    }
  };

export { verifyFirebaseToken };