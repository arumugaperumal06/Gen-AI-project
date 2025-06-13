from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
import joblib

data = {
    'text': [
        "I feel so happy and excited!",
        "I'm very sad and tired.",
        "I'm so angry and mad at everything.",
        "Feeling calm and peaceful today.",
        "Life is joyful and bright.",
        "I’m depressed and feeling blue."
    ],
    'label': ['happy', 'sad', 'angry', 'relaxed', 'happy', 'sad']
}

vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(data['text'])
y = data['label']

model = MultinomialNB()
model.fit(X, y)

joblib.dump(model, 'model.pkl')
joblib.dump(vectorizer, 'vectorizer.pkl')
