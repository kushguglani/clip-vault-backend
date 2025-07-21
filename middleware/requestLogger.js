const logger = require('../utils/logger');

const requestLogger = (req, res, next) => {
  const startTime = Date.now();
  const userEmail = req.user ? req.user.email : 'Unauthenticated';

  res.on('finish', () => {
    const duration = Date.now() - startTime;

    logger.info({
      message: 'Handled Request',
      method: req.method,
      url: req.originalUrl,
      user: userEmail,
      statusCode: res.statusCode,
      ip: req.ip,
      headers: req.headers,
      query: req.query,
      body: req.method === 'GET' ? undefined : req.body,
      duration: `${duration}ms`,
      time: new Date().toISOString()
    });
  });

  next();
};

module.exports = requestLogger;
