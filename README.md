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
pip install -r requirements.txt
```

---

### 3. 🔌 Start the Backend

Navigate to the backend model handler and run:

```bash
cd server/models
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

---

## 📂 Project Structure

```
The entire Project Structure is in the structure.txt folder
```
