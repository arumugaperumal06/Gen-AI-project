import sys
import os
import joblib

# Get the directory where this script is located
script_dir = os.path.dirname(os.path.abspath(__file__))

# Load model and vectorizer using absolute paths
model = joblib.load(os.path.join(script_dir, 'model.pkl'))
vectorizer = joblib.load(os.path.join(script_dir, 'vectorizer.pkl'))

user_input = sys.argv[1]
X = vectorizer.transform([user_input])
prediction = model.predict(X)
print(prediction[0])