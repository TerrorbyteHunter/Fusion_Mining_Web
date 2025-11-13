// Vercel Serverless Function Entry Point
// This wraps the Express app to run as a Vercel serverless function

// Import the built server bundle
// @ts-ignore: import of built JS bundle without types
import app from '../dist/index.js';

export default app;
