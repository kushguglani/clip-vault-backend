# ClipVault Backend

A secure, scalable Node.js/Express/MongoDB backend for the ClipVault app. Provides JWT authentication, user and entry management, tagging, and robust API endpoints.

---

## 🚀 Features

- JWT-based authentication (register/login)
- Protected CRUD APIs for entries
- Tag support (CRUD, filtering)
- Role-based admin utilities (toggle via .env)
- Logging (requests, responses, errors, user/IP, response time)
- Environment-based config
- Organized folder structure (controllers, models, routes, middleware)
- Error handling middleware & global 404
- CORS enabled for frontend
- Consistent API response format

---

## 📁 Folder Structure

```
server/
├── controllers/
│   ├── authController.js
│   └── entryController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── User.js
│   └── Entry.js
├── routes/
│   ├── authRoutes.js
│   └── entryRoutes.js
├── .env
├── server.js
├── package.json
└── ...
```

---

## ⚙️ Setup & Installation

1. **Clone the repo:**
   ```bash
   git clone <repo-url>
   cd clipvault/server
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure environment:**
   Create a `.env` file:
   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/clipvault
   JWT_SECRET=your_super_secret_key
   PORT=5000
   ENABLE_ADMIN=true
   ```
4. **Start the server:**
   ```bash
   npm start
   # or
   node server.js
   ```

---

## 🔒 Authentication & Authorization
- JWT-based auth (register, login)
- Middleware to protect routes (`authMiddleware`)
- Role-based control (admin-only routes, togglable via .env)

---

## 🗂️ Core APIs
- User (register/login)
- Entry CRUD
- Tag CRUD (if implemented)
- Filters, sort, and search support

---

## 🧠 Logging & Observability
- All actions logged (requests, responses, users, IPs)
- `logs/app.log` and `logs/errors.log`
- Response time and status code logging

---

## 🔐 Environment Config
- `.env` with:
  - `PORT`
  - `MONGO_URI`
  - `JWT_SECRET`
  - `ENABLE_ADMIN`
- Uses `dotenv` in `server.js`

---

## 🧪 Testing
- All APIs tested via Postman or cURL
- (Optional) Add unit tests with `jest` or `supertest`

---

## 🌐 API Usage (cURL Examples)

Replace `{{BASE_URL}}` with your API URL (e.g., `http://localhost:5000`), `{{TOKEN}}` with your JWT token, and `{{ENTRY_ID}}` with an entry's `_id`.

### Register
```bash
curl -X POST {{BASE_URL}}/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{ "email": "user@example.com", "password": "123456" }'
```

### Login
```bash
curl -X POST {{BASE_URL}}/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{ "email": "user@example.com", "password": "123456" }'
```

> Copy the `token` from the response and use it as a Bearer token in subsequent requests.

### Get All Entries
```bash
curl -X GET {{BASE_URL}}/api/entries \
  -H "Authorization: Bearer {{TOKEN}}"
```

### Create a New Entry
```bash
curl -X POST {{BASE_URL}}/api/entries \
  -H "Authorization: Bearer {{TOKEN}}" \
  -H "Content-Type: application/json" \
  -d '{ "title": "B.Tech Project", "value": "Smart AI Traffic Management", "tag": "Project" }'
```

### Update an Entry
```bash
curl -X PUT {{BASE_URL}}/api/entries/{{ENTRY_ID}} \
  -H "Authorization: Bearer {{TOKEN}}" \
  -H "Content-Type: application/json" \
  -d '{ "value": "Updated project value", "tag": "UpdatedTag" }'
```

### Delete an Entry
```bash
curl -X DELETE {{BASE_URL}}/api/entries/{{ENTRY_ID}} \
  -H "Authorization: Bearer {{TOKEN}}"
```

---

## 🛡️ Security & Best Practices
- Use strong JWT secrets and keep them out of version control
- Enable admin routes only when needed
- Use HTTPS in production
- Regularly check logs for suspicious activity
- (Optional) Add rate limiting, helmet, compression, and API versioning

---

## ❓ Troubleshooting
- Ensure MongoDB is running and accessible
- Check `.env` values
- Review logs in `logs/` for errors
- Use Postman/cURL to test endpoints

---

## 📣 Contact
For questions or help, open an issue or contact the maintainer. 