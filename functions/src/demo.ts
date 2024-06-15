import * as functions from 'firebase-functions';

export const helloWorld = functions.https.onRequest(async (req, res) => {
  try {
    // Perform any necessary operations
    functions.logger.info('Hello logs!!', { structuredData: true });

    // Send a response
    res.status(200).json({ message: 'Hello from Firebase!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});
