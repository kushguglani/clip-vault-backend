    const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const entryRoutes = require('./routes/entryRoutes');
const tagRoutes = require('./routes/tagRoutes');
const requestLogger = require('./middleware/requestLogger');
const logger = require('./utils/logger');
const app = express();
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/api/auth', authRoutes);
app.use('/api/entries', entryRoutes);
app.use('/api/tags', tagRoutes);
if (process.env.ENABLE_ADMIN_ROUTES === 'true') {
    const adminRoutes = require('./routes/adminRoutes');
    app.use('/api/admin', adminRoutes);
}
cors({
    origin: ["https://clip-vault-fe.vercel.app/login"],
    credentials: true,
  });
app.use((err, req, res, next) => {
    logger.error({
        message: err.message,
        stack: err.stack,
        url: req.originalUrl,
        ip: req.ip,
        method: req.method,
        user: req.user ? req.user.email : 'Unauthenticated',
        time: new Date().toISOString()
    });

    res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
    .then((conn) => {
        app.locals.db = conn.connection.db;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error(err));
