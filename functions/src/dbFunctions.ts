import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Request, Response } from 'express';

admin.initializeApp();

const firestore = admin.firestore();

// Cloud Function to add an item to Firestore
export const addItem = functions.https.onRequest(async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body as { name: string; description: string };
    const newItem = { name, description };
    const docRef = await firestore.collection('items').add(newItem);
    res.status(201).json({ message: 'Item added successfully', id: docRef.id });
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Cloud Function to fetch all items from Firestore
export const getItems = functions.https.onRequest(async (req: Request, res: Response) => {
  try {
    const snapshot = await firestore.collection('items').get();
    const items: any[] = [];
    snapshot.forEach(doc => {
      items.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(items);
  } catch (error) {
    console.error('Error getting items:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});
