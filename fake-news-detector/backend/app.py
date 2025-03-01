from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB

app = FastAPI()

# **Enable CORS**
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (or specify ["http://localhost:3000"])
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# **Define Pydantic Model for Request Body**
class NewsInput(BaseModel):
    text: str  # Expecting a JSON object with a "text" key

# Load dataset
df_fake = pd.read_csv("../dataset/Fake.csv")
df_real = pd.read_csv("../dataset/True.csv")

df_fake["label"] = 0  # Fake news
df_real["label"] = 1  # Real news

df = pd.concat([df_fake, df_real])
df = df.sample(frac=1).reset_index(drop=True)  # Shuffle dataset

# Split into train & test
X_train, X_test, y_train, y_test = train_test_split(df["text"], df["label"], test_size=0.2, random_state=42)

# Vectorize text data
vectorizer = TfidfVectorizer(stop_words="english")
X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf = vectorizer.transform(X_test)

# Train Naive Bayes model
model = MultinomialNB()
model.fit(X_train_tfidf, y_train)

# Save the model & vectorizer
joblib.dump(model, "model/news_classifier.pkl")
joblib.dump(vectorizer, "model/vectorizer.pkl")

@app.get("/")
def home():
    return {"message": "Fake News Detector API"}

@app.post("/predict/")
def predict_news(news_input: NewsInput):
    """Predict whether a news article is real or fake."""
    model = joblib.load("model/news_classifier.pkl")
    vectorizer = joblib.load("model/vectorizer.pkl")

    text_tfidf = vectorizer.transform([news_input.text])
    prediction = model.predict(text_tfidf)[0]

    return {"prediction": "Real" if prediction == 1 else "Fake"}
