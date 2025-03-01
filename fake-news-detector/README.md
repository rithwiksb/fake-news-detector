# 📰 Fake News Detector

A simple web application that uses Machine Learning to detect whether a given news article is real or fake. Built using **FastAPI** for the backend and **React (Material UI)** for the frontend.

## 🚀 Features

- 🌍 **FastAPI Backend** - ML-powered text classification
- 🎨 **React Frontend** - Clean UI with Material UI
- 🔥 **Real-Time Prediction** - Enter news text and get instant results
- ✅ **CORS Enabled** - Seamless API communication

## 🛠 Tech Stack

### Backend:

- **FastAPI** (Python)
- **Scikit-learn** (ML model)
- **Joblib** (Model storage)
- **Pandas** (Data handling)

### Frontend:

- **React.js**
- **Material UI** (MUI)
- **Axios** (API requests)

---

## 📂 Project Structure

```
Fake-News-Detector/
│── backend/               # FastAPI backend
│   ├── model/             # Trained ML model
│   ├── main.py            # FastAPI app
│── frontend/              # React frontend
│   ├── src/
│   │   ├── App.jsx        # Main React component
│   │   ├── App.css        # Styling
│   │   ├── index.js       # Entry point
│── dataset/               # News dataset (Fake.csv, True.csv)
│── README.md              # Project documentation
```

---

## 🔧 Setup Instructions

### 📌 1. Backend Setup (FastAPI)

#### Install dependencies

```sh
cd backend
pip install -r requirements.txt
```

#### Run FastAPI server

```sh
uvicorn app:app --reload
```

✅ Server runs at: `http://127.0.0.1:8000`

---

### 📌 2. Frontend Setup (React.js)

#### Install dependencies

```sh
cd frontend
npm install
```

#### Run React frontend

```sh
npm start
```

✅ React app runs at: `http://localhost:5173`

---

## 🎯 Usage

1. Start the **FastAPI backend** (`uvicorn app:app --reload`).
2. Start the **React frontend** (`npm run dev`).
3. Enter a news article in the text box.
4. Click **Analyze**.
5. Get **Real** (Green) or **Fake** (Red) results.

---

## 📊 Model Training (Optional)

The backend trains a **Naive Bayes classifier** on a dataset of fake and real news. To retrain the model:

```sh
python train.py
```

It generates and saves:

- `model/news_classifier.pkl`
- `model/vectorizer.pkl`

---

## 📌 API Endpoints

| Method | Endpoint    | Description                               |
| ------ | ----------- | ----------------------------------------- |
| `GET`  | `/`         | Test API status                           |
| `POST` | `/predict/` | Predict if a news article is Fake or Real |

Example request:

```json
{
  "text": "Breaking news: AI is taking over the world!"
}
```

Response:

```json
{
  "prediction": "Fake"
}
```

---

## 🤝 Contributing

Feel free to fork this repo and submit pull requests for improvements! 🚀

---

## 📜 License

This project is **MIT Licensed**. Feel free to use and modify it!

