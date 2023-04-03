import traceback
from flask import Flask, json
import pandas as pd
import ML as helper
import os
from werkzeug.utils import secure_filename
from flask import request


companies = [{"id": 1, "name": "Company One"}, {"id": 2, "name": "Company Two"}]

api = Flask(__name__)

def clean_data(df):
    df = helper.preprocess(df)
    df = helper.type_conversion(df)
    df = helper.label_encoding(df)
    df = helper.type_converstion_numeric(df)
    return df;

@api.route('/ML/train', methods=['GET'])
def get_accuracy():
    #rows = request.args.get('rows')
    df = helper.populate_data_v1(0)
    df = clean_data(df)
    accuracy = helper.trian(df)
    return json.dumps(accuracy)

@api.route('/ML/predict', methods=['GET','POST'])
def get_prediction_accuracy1():
    try:
        dataToTest = request.json
        test_df = helper.create_test_data(dataToTest);
        test_df = clean_data(test_df)
        prediction = helper.classify(test_df)
        return json.dumps(prediction)
    except Exception:
        traceback.print_exc()


@api.route('/predict', methods=['GET'])
def get_prediction_accuracy():
     # rows = request.args.get('rows')
    # train_df = helper.populate_data(rows)
    # clean_data(train_df)
    train_df = helper.populate_data()
    clean_data(train_df)
    test_df = helper.create_test_data();
    test_df = clean_data(test_df)
    prediction = helper.classify(train_df, test_df)
    return json.dumps(prediction)

@api.route('/ML/upload', methods=['POST'])
def upload():
    file = request.files['file']
    #os.makedirs(os.path.join(api.instance_path, 'apps'), exist_ok=True)
    file.save(os.path.join(secure_filename("app.apk")))
    data = helper.extract_perm(api);
    return json.dumps(data)

@api.route('/ML/comp', methods=['GET'])
def get_companies():
  return json.dumps(companies)

if __name__ == '__main__':
    api.run()
