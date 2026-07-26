# what is the configuration of the adjacent colors to the top layer

import tensorflow as tf
import pandas as pd
from sklearn.model_selection import train_test_split
import numpy as np

# need to load pll csv file using pandas
pll_df = pd.read_csv("./data/pll_training_data.csv")

X = pll_df.drop(columns="label").values
y = pll_df["label"].values

X_train, X_val, y_train, y_val = train_test_split(
  X, y, test_size=0.2, random_state=42, stratify=y
)

pll_model = tf.keras.Sequential([
  tf.keras.layers.Input(shape=(105,)),

  tf.keras.layers.Dense(units=128, activation="relu"),
  tf.keras.layers.Dense(units=64, activation="relu"),
  tf.keras.layers.Dense(units=22, activation="softmax"),
])

pll_model.compile(
  optimizer="adam",
  loss = tf.keras.losses.SparseCategoricalCrossentropy(),
  metrics=['accuracy'],
)

pll_model.fit(x=X_train, y=y_train, validation_data=(X_val, y_val), epochs=150, batch_size=16)

# Returns total loss and accuracy (0.0 to 1.0)
loss, accuracy = pll_model.evaluate(X_train, y_train, verbose=0)
print(f"Overall Model Accuracy: {accuracy * 100:.2f}%")
print(f"Overall Model Loss: {loss * 100:.2f}%")


# Grab the first 105-bit array and its actual label
sample_input = X[95:96]  # Slice keeps the 2D tensor shape (1, 105)
actual_label = y[95]

# Run prediction
probabilities = pll_model.predict(sample_input, verbose=0)
predicted_class = np.argmax(probabilities)
confidence = np.max(probabilities) * 100

print(f"Actual Label:    {actual_label}")
print(f"Predicted Class: {predicted_class}")
print(f"Confidence:      {confidence:.2f}%")