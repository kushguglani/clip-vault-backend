Absolutely, Kush! Here are the **cURL commands** for all the backend API requests for your ClipVault app.

Replace:

* `{{BASE_URL}}` → with your API URL (`http://localhost:5000` for local)
* `{{TOKEN}}` → with the JWT token you get after login
* `{{ENTRY_ID}}` → with the `_id` of a specific entry

---

## 🔐 AUTH APIs

### ✅ Register

```bash
curl -X POST {{BASE_URL}}/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "kush@example.com",
    "password": "123456"
}'
```

---

### ✅ Login

```bash
curl -X POST {{BASE_URL}}/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "kush@example.com",
    "password": "123456"
}'
```

> ✅ Copy the `"token"` from response and use it in next requests as Bearer Token

---

## 📦 ENTRY APIs

### ✅ Get All Entries

```bash
curl -X GET {{BASE_URL}}/api/entries \
  -H "Authorization: Bearer {{TOKEN}}"
```

---

### ✅ Create a New Entry

```bash
curl -X POST {{BASE_URL}}/api/entries \
  -H "Authorization: Bearer {{TOKEN}}" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "B.Tech Project",
    "value": "Smart AI Traffic Management",
    "tag": "Project"
}'
```

---

### ✅ Update an Entry

```bash
curl -X PUT {{BASE_URL}}/api/entries/{{ENTRY_ID}} \
  -H "Authorization: Bearer {{TOKEN}}" \
  -H "Content-Type: application/json" \
  -d '{
    "value": "Updated project value",
    "tag": "UpdatedTag"
}'
```

---

### ✅ Delete an Entry

```bash
curl -X DELETE {{BASE_URL}}/api/entries/{{ENTRY_ID}} \
  -H "Authorization: Bearer {{TOKEN}}"
```

---

