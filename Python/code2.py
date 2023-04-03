import os
import hashlib
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.metrics import classification_report

# Helper function to calculate the sha256 hash of a file
def hash_file(filename):
    h = hashlib.sha256()
    with open(filename, 'rb', buffering=0) as f:
        for b in iter(lambda : f.read(128*1024), b''):
            h.update(b)
    return h.hexdigest()

# The directory containing the APK files
directory = './apks/'

# Dictionary to store the file names and their corresponding hashes
hashes = {}

# Loop through all the files in the directory
for filename in os.listdir(directory):
    # Skip any non-APK files
    if not filename.endswith('.apk'):
        continue

    # Calculate the hash of the file
    file_hash = hash_file(os.path.join(directory, filename))
    hashes[filename] = file_hash

# Load the data into a pandas dataframe
df = pd.DataFrame.from_dict(hashes, orient='index', columns=['sha256'])

# Load the labels for each file into a separate dataframe
labels = pd.read_csv('./labels.csv', index_col=0)

# Merge the two dataframes based on the file names
df = df.merge(labels, left_index=True, right_index=True)

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(df['sha256'], df['label'], test_size=0.2)

# Train the SVM classifier can add your neural network here see previous codes and code1
clf = SVC()
clf.fit(X_train, y_train)

# Predict the labels for the test set
y_pred = clf.predict(X_test)

# Print the classification report
print(classification_report(y_test, y_pred))
