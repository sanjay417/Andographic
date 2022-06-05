import requests
from pprint import pprint
from requests_toolbelt import MultipartEncoder

FILE = r'/mnt/c/Users/miran/Desktop/Applications/InsecureBankv2.apk'
APIKEY = 'addc5c87e609dee41b490019d90d40291a604d6bc6d3a7efa3d4b2ad22de109a'
SERVER = "http://127.0.0.1:8000"

def upload():
    """Upload File"""
    print("Uploading file")
    multipart_data = MultipartEncoder(fields={'file': (FILE, open(FILE, 'rb'), 'application/octet-stream')})
    headers = {'Content-Type': multipart_data.content_type, 'Authorization': APIKEY}
    response = requests.post(SERVER + '/api/v1/upload', data=multipart_data, headers=headers)
    # pprint(response.text)
    return response.text


def getApps():
    print("Getting App List")
    headers = {'Authorization': APIKEY}
    response = requests.get(SERVER + '/api/v1/dynamic/get_apps', headers=headers)
    pprint(response.text)

getApps()

def startDynamic():
    print("start Dynamic")
    headers = {'Authorization': APIKEY}
    data = {"hash" : "bae9b38fa76781e60179aad49d9c5380"}
    response = requests.post(SERVER + '/api/v1/dynamic/start_analysis', data=data, headers=headers)
    pprint(response.text)

startDynamic()

def mobsf():
    print("MOBSF")
    headers = {'Authorization': APIKEY}
    data = {"identifier" : "192.168.7.103:5555"}
    response = requests.post(SERVER + '/api/v1/android/mobsfy', data=data, headers=headers)
    pprint(response.text)

mobsf()

def jsonReport():
    print("Json Report")
    headers = {'Authorization': APIKEY}
    data = {"hash" : "bae9b38fa76781e60179aad49d9c5380"}
    response = requests.post(SERVER + '/api/v1/dynamic/report_json', data=data, headers=headers)
    pprint(response.status_code)

def stopDynamic():
    print("stopping dynamic api")
    headers = {'Authorization': APIKEY}
    data = {"hash" : "bae9b38fa76781e60179aad49d9c5380"}
    response = requests.post(SERVER + '/api/v1/dynamic/stop_analysis', data=data, headers=headers)
    pprint(response)


def logcatStream():
    print("Logcat Streaming")
    headers = {'Authorization': APIKEY}
    data = {"package": "com.cp.camera"}
    response = requests.post(SERVER + '/api/v1/android/logcat', data=data, headers=headers)
    pprint(response.text)

logcatStream()
# stopDynamic()
# jsonReport()
