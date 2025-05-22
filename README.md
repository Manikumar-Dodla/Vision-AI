# 🚀 Vision AI

Vision AI is a full-stack project integrating image processing, AI analysis, and user interaction. This README will help you get up and running quickly.

---

## 🛠️ Prerequisites

* **MongoDB** instance with a `Users` collection inside a `Login` folder.
* **Node.js & npm**
* **Python 3.8+**
* Make sure `pip` and `virtualenv` (optional) are installed.

---

## ⚙️ Setup Instructions

### 1. 📁 Clone the Repository

```bash
git clone https://github.com/Manikumar-Dodla/Vision-AI.git
cd Vision-AI
```

---

### 2. 📦 Install Dependencies

#### Node modules:

```bash
npm install
```

#### Python packages:

```bash
cd server
pip install -r requirements.txt
```

---

### 3. 🔌 Start the Backend

Place your API Key in server/.env
Navigate to the backend model handler and run:

```bash
cd server
node index.js
```

---

### 4. 💻 Start the Frontend

In a **separate terminal**, run:

```bash
npm run dev
```

This will launch the frontend development server.

---

## 🧠 Notes

* Ensure MongoDB is running and your environment variables are configured correctly (you can use `.env` for this).
* `node_modules/` is ignored via `.gitignore`, so always run `npm install` after cloning.
* Don't forget to add your API key to the `.env` file.
* The `server` folder contains the backend code and the `src` folder contains the frontend code.

---

## What should .env contain?

GOOGLE_API_KEY=YOUR_API_KEY
MONGODB_URI=mongodb://localhost:27017/
JWT_SECRET=YOUR_JWT_SECRET

---
## 📂 Project Structure

```
The entire Project Structure is in the structure.txt folder
```

---

```
Hint : You can get Gemini API Key for free from [Link Text](https://aistudio.google.com)
For JWT_SECRET you can run : **`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`**

```