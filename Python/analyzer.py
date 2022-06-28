import json
from pprint import pprint
import requests
from requests_toolbelt import MultipartEncoder
from flask import Flask, request, send_file, send_from_directory
from flask_restful import Api, reqparse
import boto3
from flask import jsonify
import os

s3 = boto3.client('s3',
                  region_name='us-west-1',
                  aws_access_key_id='AKIARHJEVSEZL2N32EM3',
                  aws_secret_access_key='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')

AWS_BUCKET_NAME = "androidapkandrographic"
app = Flask(__name__)
api = Api(app)
parser = reqparse.RequestParser()


SERVER = "http://127.0.0.1:8000"
APIKEY = 'addc5c87e609dee41b490019d90d40291a604d6bc6d3a7efa3d4b2ad22de109a'


def upload():
    """Upload File"""
    app_dir = os.path.realpath(os.path.join(os.path.dirname(__file__), "applications"))
    file = request.files['file']
    file.save(os.path.join(app_dir, file.filename))
    # s3.upload_file(
    #     Bucket=AWS_BUCKET_NAME,
    #     Filename=file.filename,
    #     Key=file.filename)

    FILE = app_dir + "\\" + file.filename
    multipart_data = MultipartEncoder(fields={'file': (FILE, open(FILE, 'rb'), 'application/octet-stream')})
    headers = {'Content-Type': multipart_data.content_type, 'Authorization': APIKEY}
    response = requests.post(SERVER + '/api/v1/upload', data=multipart_data, headers=headers)
    pprint(response.text)
    return response.text


def scan(data):
    """Scan the file"""
    print("Scanning file")
    post_dict = json.loads(data)
    headers = {'Authorization': APIKEY}
    response = requests.post(SERVER + '/api/v1/scan', data=post_dict, headers=headers)
    pprint(response)


@app.route("/api2/downloadPdf", methods=["POST"])
def pdf():
    """Generate PDF Report"""
    direc = os.path.realpath(os.path.join(os.path.dirname(__file__), '..', "IndependentStudy-master", "frontend", "src", "assets", "applications", "pdfs"))
    scan_hash = request.get_json()['scan_hash']
    print("Generate PDF report")
    headers = {'Authorization': APIKEY}
    data = {"hash": scan_hash}
    file_name = str(scan_hash) + "_report.pdf"
    print(file_name)
    response = requests.post(SERVER + '/api/v1/download_pdf', data=data, headers=headers, stream=True)
    path = direc + "\\" + file_name
    print(path)
    with open(path, 'wb') as flip:
        for chunk in response.iter_content(chunk_size=1024):
            if chunk:
                flip.write(chunk)

    return path


def json_resp(data):
    """Generate JSON Report"""
    print("Generate JSON report")
    headers = {'Authorization': APIKEY}
    data = {"hash": json.loads(data)["hash"]}
    print(data)
    print(headers)
    print(SERVER + '/api/v1/report_json', data, headers)
    response = requests.post(SERVER + '/api/v1/report_json', data=data, headers=headers)
    json_data = json.loads(response.text)
    json_data.update(data)
    return json_data


def delete(data):
    """Delete Scan Result"""
    print("Deleting Scan")
    headers = {'Authorization': APIKEY}
    data = {"hash": json.loads(data)["hash"]}
    requests.post(SERVER + '/api/v1/delete_scan', data=data, headers=headers)


def recent_scans():
    print("recent scans")
    headers = {'Authorization': APIKEY}
    data = {'page': 1, 'page_size': 10}
    response = requests.get(SERVER + '/api/v1/scans', data=data, headers=headers)
    return response.text


@app.route("/api2/scoreCard", methods=["POST", "GET"])
def app_scorecard():
    data = request.args.get('scan_hash')
    headers = {'Authorization': APIKEY}
    data = {"hash": data}
    response = requests.post(SERVER + '/api/v1/scorecard', data=data, headers=headers)
    pprint(response.text)
    return response.text


@app.route("/api2/staticAnalysis", methods=["POST", "GET"])
def upload_apk():
    pprint(recent_scans())
    RESP = upload()
    scan(RESP)
    resp = json_resp(RESP)
    return jsonify(resp)


def start_dynamic(scan_hash):
    print("starting dynamic ", scan_hash)
    headers = {'Authorization': APIKEY}
    data = {'hash': scan_hash, 're_install': 0}
    response = requests.post(SERVER + '/api/v1/dynamic/start_analysis', data=data, headers=headers)
    print(response.text)


def start_activity_tester(scan_hash):
    print("starting activity tester")
    headers = {'Authorization': APIKEY}
    data = {'hash': scan_hash, 'test': 'activity'}
    response = requests.post(SERVER + '/api/v1/android/activity', data=data, headers=headers)
    print(response.text)


def exported_activity_tester(scan_hash):
    print("starting exported activity tester")
    headers = {'Authorization': APIKEY}
    data = {'hash': scan_hash, 'test': 'exported'}
    response = requests.post(SERVER + '/api/v1/android/activity', data=data, headers=headers)
    print(response.text)


def tls_ssl_tester(scan_hash):
    print("SSL/TLS tester")
    headers = {'Authorization': APIKEY}
    data = {'hash': scan_hash}
    response = requests.post(SERVER + '/api/v1/android/tls_tests', data=data, headers=headers)
    print(response.text)


def frida_instrumentation(scan_hash):
    print("starting frida instrumentation")
    headers = {'Authorization': APIKEY}
    data = {'hash': scan_hash, 'default_hooks': 'api_monitor', 'auxiliary_hooks': '', 'frida_code': ''}
    response = requests.post(SERVER + '/api/v1/android/tls_tests', data=data, headers=headers)
    print(response.text)


def stop_dynamic(scan_hash):
    print("stopping dynamic")
    headers = {'Authorization': APIKEY}
    data = {'hash': scan_hash}
    response = requests.post(SERVER + '/api/v1/dynamic/stop_analysis', data=data, headers=headers)
    print(response.text)


def generate_json(scan_hash):
    print("generating json")
    headers = {'Authorization': APIKEY}
    data = {'hash': scan_hash}
    response = requests.post(SERVER + '/api/v1/dynamic/report_json', data=data, headers=headers)
    pprint(response.text)
    return response.text


@app.route("/api2/dynamicAnalysis", methods=["POST", "GET"])
def get_apk():
    scan_hash = request.args.get('scan_hash')
    start_dynamic(scan_hash)
    start_activity_tester(scan_hash)
    exported_activity_tester(scan_hash)
    tls_ssl_tester(scan_hash)
    frida_instrumentation(scan_hash)
    stop_dynamic(scan_hash)
    json_data = generate_json(scan_hash)
    print(json_data)
    return json_data


if __name__ == "__main__":
    app.run(debug=True)
