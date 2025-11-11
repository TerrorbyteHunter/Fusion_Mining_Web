// Placeholder CJS entry for /api root to avoid importing full Express server in Vercel.
module.exports = function handler(_req, res) {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ message: 'Use individual /api/* serverless functions. Full Express not supported here.' }));
};
