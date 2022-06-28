import os

import pymysql
import time
import pandas as pd
from sqlalchemy import create_engine
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, f1_score, precision_score, recall_score
from sklearn.naive_bayes import GaussianNB
import pickle
from androguard.misc import AnalyzeAPK

labelencoder = LabelEncoder()


def create_connection():
    print("CONNECTING")
    sqlEngine = create_engine(
        'mysql+pymysql://root:' + os.getenv("MYSQL_PASSWORD") + os.getenv("MYSQL_PASSWORD"),
        pool_recycle=36000)
    dbConnection = sqlEngine.connect()
    print("CONNECTED")
    return dbConnection


def populate_data_v1(rows):
    connection = create_connection()
    print("Populate data......Hi")
    frame1 = pd.read_sql("select * from technical", connection)
    result = pd.DataFrame(frame1)
    connection.close()
    return result


def populate_data(rows):
    connection = create_connection()
    print("Populate data......")
    frame1 = pd.read_sql("select * from technical where vtdetection > 0", connection)
    df1 = pd.DataFrame(frame1)
    print("Populated Malicious data......")
    connection.close()

    connection = create_connection()
    frame2 = pd.read_sql("select * from technical where vtdetection = 0 limit 200000", connection)
    df2 = pd.DataFrame(frame2)
    print("Populated Benign data......")
    # frame = pd.read_sql("select * from technical limit " + rows, connection)
    pd.set_option('display.expand_frame_repr', False)
    frames = [df1, df2]
    result = pd.concat(frames)
    connection.close()

    return result


def preprocess(df):
    columns = ['id', 'ID315', 'ID316', 'ID320', 'ReviewsAverage', 'AndroidVersion', 'Url', 'ID318', 'ID321', 'Price',
               'OneStarRatings', 'ContentRating',
               'Downloads', 'pkgname', 'Title', 'PrivacyPolicyLink', 'DeveloperEmail', 'DeveloperWebsite',
               'LastUpdated', 'FileSize', 'DeveloperAddress',
               'CurrentVersion', 'Description', 'WhatsNew', 'source', 'vtdetection']
    for col in columns:
        if col in df:
            del df[col]

    print("Preprocess data......")
    return df


def type_conversion(df):
    print(df.head())
    df['DeveloperName'] = df['DeveloperName'].astype('unicode')
    df['Genre'] = df['Genre'].astype('|S')
    if 'malicious' in df:
        df['malicious'] = df['malicious'].astype('|S')
    print("Type conversion......")
    return df


def label_encoding(df):
    print("Label Encoding......")
    df['DeveloperName'] = labelencoder.fit_transform(df['DeveloperName'])
    df['Genre'] = labelencoder.fit_transform(df['Genre'])
    if 'malicious' in df:
        df['malicious'] = labelencoder.fit_transform(df['malicious'])
    return df


def type_converstion_numeric(df):
    print("Numeric......")
    for col in df.columns:
        df[col] = df[col].astype('float64')
    return df


def trian(df):
    X_train, X_test = train_test_split(df, test_size=0.3, random_state=int(time.time()))

    for col in X_train.columns:
        if not col in X_test.columns:
            print(col)

    gnb = GaussianNB()
    gnb.fit(
        X_train.loc[:, X_train.columns != 'malicious'],
        X_train["malicious"]
    )
    y_pred = gnb.predict(X_test.loc[:, X_test.columns != 'malicious'])
    accuracy = accuracy_score(X_test['malicious'], y_pred)
    f1 = f1_score(X_test['malicious'], y_pred)
    precision = precision_score(X_test['malicious'], y_pred)
    recall = recall_score(X_test['malicious'], y_pred)
    print("f1:: ", f1)
    print("precision:: ", precision)
    print("recall:: ", recall)
    prediction = round(y_pred[0])
    print("Accuracy:: ", accuracy)

    filename = 'model.sav'
    pickle.dump(gnb, open(filename, 'wb'))
    return accuracy * 100


# def calculate_accuracy(df):
#     X_train, X_test = train_test_split(df, test_size=0.5, random_state=int(time.time()))
#     print(len(X_train.columns))
#     print(len(X_test.columns))
#
#     for col in X_train.columns:
#         if not col in X_test.columns:
#             print(col)
#
#     gnb = GaussianNB()
#     gnb.fit(
#         X_train.loc[:, X_train.columns != 'malicious'],
#         X_train["malicious"]
#     )
#     y_pred = gnb.predict(X_test.loc[:, X_test.columns != 'malicious'])
#     accuracy = accuracy_score(X_test['malicious'], y_pred)
#     prediction = round(y_pred[0])
#     print("Accuracy:: ", accuracy)
#
#
#     filename = 'model.sav'
#     pickle.dump(gnb, open(filename, 'wb'))
#
#     return accuracy * 100
#
# def classify(X_train, X_test):
#     #X_train, X_test = train_test_split(df, test_size=0.5, random_state=int(time.time()))
#     print(len(X_train.columns))
#     print(len(X_test.columns))
#
#     for col in X_train.columns:
#         if not col in X_test.columns:
#             print(col)
#
#     gnb = GaussianNB()
#     gnb.fit(
#         X_train.loc[:, X_train.columns != 'malicious'],
#         X_train["malicious"]
#     )
#     y_pred = gnb.predict(X_test.loc[:, X_test.columns != 'malicious'])
#     #y_pred = gnb.predict(X_test)
#    # accuracy = accuracy_score(X_test['malicious'], y_pred)
#     prediction = round(y_pred[0])
#     #print("Accuracy:: ", accuracy)
#     print("y_pred:: ", y_pred)
#     return 'Yes' if (prediction == 1) else 'No'

def classify(X_test):
    gnb = pickle.load(open('model.sav', 'rb'))
    y_pred = gnb.predict(X_test.loc[:, X_test.columns != 'malicious'])
    prediction = round(y_pred[0])
    print("y_pred:: ", y_pred)
    return 'Yes' if (prediction == 1) else 'No'


def create_test_data(json):
    cols = ["id", "pkgname", "ID1", "ID2", "ID3", "ID4", "ID5", "ID6", "ID7", "ID8", "ID9", "ID10", "ID11", "ID12",
            "ID13", "ID14", "ID15", "ID16", "ID17", "ID18", "ID19", "ID20", "ID21", "ID22", "ID23",
            "ID24", "ID25", "ID26", "ID27", "ID28", "ID29", "ID30", "ID31", "ID32", "ID33", "ID34", "ID35", "ID36",
            "ID37", "ID38", "ID39", "ID40", "ID41", "ID42", "ID43", "ID44", "ID45", "ID46", "ID47",
            "ID48", "ID49", "ID50", "ID51", "ID52", "ID53", "ID54", "ID55", "ID56", "ID57", "ID58", "ID59", "ID60",
            "ID61", "ID62", "ID63", "ID64", "ID65", "ID66", "ID67", "ID68", "ID69", "ID70", "ID71",
            "ID72", "ID73", "ID74", "ID75", "ID76", "ID77", "ID78", "ID79", "ID80", "ID81", "ID82", "ID83", "ID84",
            "ID85", "ID86", "ID87", "ID88", "ID89", "ID90", "ID91", "ID92", "ID93", "ID94", "ID95",
            "ID96", "ID97", "ID98", "ID99", "ID100", "ID101", "ID102", "ID103", "ID104", "ID105", "ID106", "ID107",
            "ID108", "ID109", "ID110", "ID111", "ID112", "ID113", "ID114", "ID115", "ID116",
            "ID117", "ID118", "ID119", "ID120", "ID121", "ID122", "ID123", "ID124", "ID125", "ID126", "ID127", "ID128",
            "ID129", "ID130", "ID131", "ID132", "ID133", "ID134", "ID135", "ID136", "ID137",
            "ID138", "ID139", "ID140", "ID141", "ID142", "ID143", "ID144", "ID145", "ID146", "ID147", "ID148", "ID149",
            "ID150", "ID151", "ID152", "ID153", "ID154", "ID155", "ID156", "ID157", "ID158",
            "ID159", "ID160", "ID161", "ID162", "ID163", "ID164", "ID165", "ID166", "ID167", "ID168", "ID169", "ID170",
            "ID171", "ID172", "ID173", "ID174", "ID175", "ID176", "ID177", "ID178", "ID179",
            "ID180", "ID181", "ID182", "ID183", "ID184", "ID185", "ID186", "ID187", "ID188", "ID189", "ID190", "ID191",
            "ID192", "ID193", "ID194", "ID195", "ID196", "ID197", "ID198", "ID199", "ID200",
            "ID201", "ID202", "ID203", "ID204", "ID205", "ID206", "ID207", "ID208", "ID209", "ID210", "ID211", "ID212",
            "ID213", "ID214", "ID215", "ID216", "ID217", "ID218", "ID219", "ID220", "ID221",
            "ID222", "ID223", "ID224", "ID225", "ID226", "ID227", "ID228", "ID229", "ID230", "ID231", "ID232", "ID233",
            "ID234", "ID235", "ID236", "ID237", "ID238", "ID239", "ID240", "ID241", "ID242",
            "ID243", "ID244", "ID245", "ID246", "ID247", "ID248", "ID249", "ID250", "ID251", "ID252", "ID253", "ID254",
            "ID255", "ID256", "ID257", "ID258", "ID259", "ID260", "ID261", "ID262", "ID263",
            "ID264", "ID265", "ID266", "ID267", "ID268", "ID269", "ID270", "ID271", "ID272", "ID273", "ID274", "ID275",
            "ID276", "ID277", "ID278", "ID279", "ID280", "ID281", "ID282", "ID283", "ID284",
            "ID285", "ID286", "ID287", "ID288", "ID289", "ID290", "ID291", "ID292", "ID293", "ID294", "ID295", "ID296",
            "ID297", "ID298", "ID299", "ID300", "ID301", "ID302", "ID303", "ID304", "ID305",
            "ID306", "ID307", "ID308", "ID309", "ID310", "ID311", "ID312", "ID313", "ID314", "ID315", "ID316", "ID317",
            "ID318", "ID319", "ID320", "ID321", "Description", "WhatsNew", "Ratings",
            "Title", "FourStarRatings", "DeveloperAddress", "LastUpdated", "ReviewsAverage", "Price",
            "ThreeStarRatings", "PrivacyPolicyLink", "Genre", "FiveStarRatings", "OneStarRatings",
            "Url", "ContentRating", "CurrentVersion", "DeveloperEmail", "AndroidVersion", "DeveloperWebsite",
            "DeveloperName", "FileSize", "TwoStarRatings", "Downloads", "vtdetection", "malicious"]

    data = [
        ['', 'a.b.wassim.guide', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
         '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
         '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
         '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
         '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
         '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
         '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
         '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
         '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
         '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
         '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
         '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
         '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
         '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
         '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
         '0', '0', '0', '0', ' ', ' ', '29', 'Guide for  Battle Of Polytopia', '1', ' ', '0000-00-00',
         '3', '0', '1', ' ', 'Strategy', '9', '13', 'https://play.google.com/store/apps/details?id=a.b.wassim.guide',
         '0', '1.0', 'legende_of_darkness@hotmail.fr', '4.0.3 and up', ' ',
         'gconley022', '', '5', '1,000 - 5,000', '1', 'Yes']]

    data = [{"id": '', "pkgname": "a_kuang.temperatureconversion2", "ID1": "0", "ID2": "0", "ID3": "0", "ID4": "0",
             "ID5": "1", "ID6": "0", "ID7": "0", "ID8": "0", "ID9": "0", "ID10": "0", "ID11": "0", "ID12": "0",
             "ID13": "0",
             "ID14": "0", "ID15": "0", "ID16": "0", "ID17": "0", "ID18": "0", "ID19": "0", "ID20": "0", "ID21": "0",
             "ID22": "0", "ID23": "0", "ID24": "0", "ID25": "0", "ID26": "0", "ID27": "0", "ID28": "0", "ID29": "0",
             "ID30": "0", "ID31": "0", "ID32": "0", "ID33": "0", "ID34": "0", "ID35": "0", "ID36": "0", "ID37": "0",
             "ID38": "0", "ID39": "0", "ID40": "0", "ID41": "0", "ID42": "0", "ID43": "0", "ID44": "0", "ID45": "0",
             "ID46": "0", "ID47": "0", "ID48": "0", "ID49": "0", "ID50": "0", "ID51": "0", "ID52": "0", "ID53": "0",
             "ID54": "0", "ID55": "0", "ID56": "0", "ID57": "0", "ID58": "0", "ID59": "0", "ID60": "0", "ID61": "0",
             "ID62": "0", "ID63": "0", "ID64": "0", "ID65": "0", "ID66": "0", "ID67": "0", "ID68": "0", "ID69": "0",
             "ID70": "0", "ID71": "1", "ID72": "0", "ID73": "0", "ID74": "0", "ID75": "0", "ID76": "0", "ID77": "0",
             "ID78": "0", "ID79": "0", "ID80": "0", "ID81": "0", "ID82": "0", "ID83": "0", "ID84": "0", "ID85": "0",
             "ID86": "0", "ID87": "0", "ID88": "0", "ID89": "0", "ID90": "0", "ID91": "0", "ID92": "0", "ID93": "0",
             "ID94": "0", "ID95": "0", "ID96": "0", "ID97": "0", "ID98": "0", "ID99": "0", "ID100": "0", "ID101": "0",
             "ID102": "0", "ID103": "0", "ID104": "0", "ID105": "0", "ID106": "0", "ID107": "0", "ID108": "0",
             "ID109": "0", "ID110": "0", "ID111": "0", "ID112": "0", "ID113": "0", "ID114": "0", "ID115": "0",
             "ID116": "0", "ID117": "0", "ID118": "0", "ID119": "0", "ID120": "0", "ID121": "0", "ID122": "0",
             "ID123": "0", "ID124": "0", "ID125": "0", "ID126": "0", "ID127": "0", "ID128": "1", "ID129": "0",
             "ID130": "0", "ID131": "0", "ID132": "0", "ID133": "0", "ID134": "0", "ID135": "0", "ID136": "0",
             "ID137": "0", "ID138": "0", "ID139": "0", "ID140": "0", "ID141": "0", "ID142": "0", "ID143": "0",
             "ID144": "0", "ID145": "0", "ID146": "0", "ID147": "0", "ID148": "0", "ID149": "0", "ID150": "0",
             "ID151": "0", "ID152": "0", "ID153": "0", "ID154": "0", "ID155": "0", "ID156": "0", "ID157": "0",
             "ID158": "0", "ID159": "0", "ID160": "0", "ID161": "0", "ID162": "0", "ID163": "0", "ID164": "0",
             "ID165": "0", "ID166": "0", "ID167": "0", "ID168": "0", "ID169": "0", "ID170": "0", "ID171": "0",
             "ID172": "0", "ID173": "0", "ID174": "0", "ID175": "0", "ID176": "0", "ID177": "0", "ID178": "0",
             "ID179": "0", "ID180": "0", "ID181": "0", "ID182": "0", "ID183": "0", "ID184": "0", "ID185": "0",
             "ID186": "0", "ID187": "0", "ID188": "0", "ID189": "0", "ID190": "0", "ID191": "0", "ID192": "0",
             "ID193": "0", "ID194": "0", "ID195": "0", "ID196": "0", "ID197": "0", "ID198": "0", "ID199": "0",
             "ID200": "0", "ID201": "0", "ID202": "0", "ID203": "0", "ID204": "0", "ID205": "0", "ID206": "0",
             "ID207": "0", "ID208": "0", "ID209": "0", "ID210": "0", "ID211": "0", "ID212": "0", "ID213": "0",
             "ID214": "0", "ID215": "0", "ID216": "0", "ID217": "0", "ID218": "0", "ID219": "0", "ID220": "0",
             "ID221": "0", "ID222": "0", "ID223": "0", "ID224": "0", "ID225": "0", "ID226": "0", "ID227": "0",
             "ID228": "0", "ID229": "0", "ID230": "0", "ID231": "0", "ID232": "0", "ID233": "0", "ID234": "0",
             "ID235": "0", "ID236": "0", "ID237": "0", "ID238": "0", "ID239": "0", "ID240": "0", "ID241": "0",
             "ID242": "0", "ID243": "0", "ID244": "0", "ID245": "0", "ID246": "0", "ID247": "0", "ID248": "0",
             "ID249": "0", "ID250": "0", "ID251": "0", "ID252": "0", "ID253": "0", "ID254": "0", "ID255": "0",
             "ID256": "0", "ID257": "0", "ID258": "0", "ID259": "0", "ID260": "0", "ID261": "0", "ID262": "0",
             "ID263": "0", "ID264": "0", "ID265": "0", "ID266": "0", "ID267": "0", "ID268": "0", "ID269": "0",
             "ID270": "0", "ID271": "0", "ID272": "0", "ID273": "0", "ID274": "0", "ID275": "0", "ID276": "0",
             "ID277": "0", "ID278": "0", "ID279": "0", "ID280": "0", "ID281": "0", "ID282": "0", "ID283": "0",
             "ID284": "0", "ID285": "0", "ID286": "0", "ID287": "0", "ID288": "0", "ID289": "0", "ID290": "0",
             "ID291": "0", "ID292": "0", "ID293": "0", "ID294": "0", "ID295": "0", "ID296": "0", "ID297": "0",
             "ID298": "0", "ID299": "0", "ID300": "0", "ID301": "0", "ID302": "0", "ID303": "0", "ID304": "0",
             "ID305": "0", "ID306": "0", "ID307": "0", "ID308": "0", "ID309": "0", "ID310": "0", "ID311": "0",
             "ID312": "0", "ID313": "0", "ID314": "0", "ID315": "0", "ID316": "0", "ID317": "0", "ID318": "0",
             "ID319": "0", "ID320": "0", "ID321": "0", "Description": '  ', "WhatsNew": '  ', "Ratings": "1",
             "Title": "All Temperature Converter", "FourStarRatings": "0", "DeveloperAddress": '  ',
             "LastUpdated": "0000-00-00", "ReviewsAverage": 5, "Price": 0, "ThreeStarRatings": 0,
             "PrivacyPolicyLink": '  ', "Genre": "Tools", "FiveStarRatings": 1, "OneStarRatings": 0,
             "Url": "https://play.google.com/store/apps/details?id=a_kuang.temperatureconversion2", "ContentRating": 0,
             "CurrentVersion": "2.3", "DeveloperEmail": "1032041@gmail.com ", "AndroidVersion": "4.0.3 and up",
             "DeveloperWebsite": "https://www.google.com/url?q=https://www.facebook.com/A-Kuang-192025534626438/&sa=D&usg=AFQjCNGK8DWAIEhM3I4ik9wJ_Pa7tZt8SA",
             "DeveloperName": "A-Kuang", "FileSize": "[]", "TwoStarRatings": 0, "Downloads": "5 - 10", "vtdetection": 0,
             "malicious": "No"}]

    data = [{"id": "", "pkgname": "a.b.wassim.guide", "ID1": "0", "ID2": "0", "ID3": "0", "ID4": "0", "ID5": "0",
             "ID6": "0", "ID7": "0", "ID8": "0", "ID9": "0", "ID10": "0", "ID11": "0", "ID12": "0", "ID13": "0",
             "ID14": "0", "ID15": "0", "ID16": "0", "ID17": "0", "ID18": "0", "ID19": "0", "ID20": "0", "ID21": "0",
             "ID22": "0", "ID23": "0", "ID24": "0", "ID25": "0", "ID26": "0", "ID27": "0", "ID28": "0",
             "ID29": "0", "ID30": "0", "ID31": "0", "ID32": "0", "ID33": "0", "ID34": "0", "ID35": "0", "ID36": "0",
             "ID37": "0", "ID38": "0", "ID39": "0", "ID40": "0", "ID41": "0", "ID42": "0", "ID43": "0",
             "ID44": "0", "ID45": "0", "ID46": "0", "ID47": "0", "ID48": "0", "ID49": "0", "ID50": "0", "ID51": "0",
             "ID52": "0", "ID53": "0", "ID54": "0", "ID55": "0", "ID56": "0", "ID57": "0", "ID58": "0",
             "ID59": "0", "ID60": "0", "ID61": "0", "ID62": "0", "ID63": "0", "ID64": "0", "ID65": "0", "ID66": "0",
             "ID67": "0", "ID68": "0", "ID69": "0", "ID70": "0", "ID71": "0", "ID72": "0", "ID73": "0",
             "ID74": "0", "ID75": "0", "ID76": "0", "ID77": "0", "ID78": "0", "ID79": "0", "ID80": "0", "ID81": "0",
             "ID82": "0", "ID83": "0", "ID84": "0", "ID85": "0", "ID86": "0", "ID87": "0", "ID88": "0",
             "ID89": "0", "ID90": "0", "ID91": "0", "ID92": "0", "ID93": "0", "ID94": "0", "ID95": "0", "ID96": "0",
             "ID97": "0", "ID98": "0", "ID99": "0", "ID100": "0", "ID101": "0", "ID102": "0", "ID103": "0",
             "ID104": "0", "ID105": "0", "ID106": "0", "ID107": "0", "ID108": "0", "ID109": "0", "ID110": "0",
             "ID111": "0", "ID112": "0", "ID113": "0", "ID114": "0", "ID115": "0", "ID116": "0", "ID117": "0",
             "ID118": "0", "ID119": "0", "ID120": "0", "ID121": "0", "ID122": "0", "ID123": "0", "ID124": "0",
             "ID125": "0", "ID126": "0", "ID127": "0", "ID128": "0", "ID129": "0", "ID130": "0", "ID131": "0",
             "ID132": "0", "ID133": "0", "ID134": "0", "ID135": "0", "ID136": "0", "ID137": "0", "ID138": "0",
             "ID139": "0", "ID140": "0", "ID141": "0", "ID142": "0", "ID143": "0", "ID144": "0", "ID145": "0",
             "ID146": "0", "ID147": "0", "ID148": "0", "ID149": "0", "ID150": "0", "ID151": "0", "ID152": "0",
             "ID153": "0", "ID154": "0", "ID155": "0", "ID156": "0", "ID157": "0", "ID158": "0", "ID159": "0",
             "ID160": "0", "ID161": "0", "ID162": "0", "ID163": "0", "ID164": "0", "ID165": "0", "ID166": "0",
             "ID167": "0", "ID168": "0", "ID169": "0", "ID170": "0", "ID171": "0", "ID172": "0", "ID173": "0",
             "ID174": "0", "ID175": "0", "ID176": "0", "ID177": "0", "ID178": "0", "ID179": "0", "ID180": "0",
             "ID181": "0", "ID182": "0", "ID183": "0", "ID184": "0", "ID185": "0", "ID186": "0", "ID187": "0",
             "ID188": "0", "ID189": "0", "ID190": "0", "ID191": "0", "ID192": "0", "ID193": "0", "ID194": "0",
             "ID195": "0", "ID196": "0", "ID197": "0", "ID198": "0", "ID199": "0", "ID200": "0", "ID201": "0",
             "ID202": "0", "ID203": "0", "ID204": "0", "ID205": "0", "ID206": "0", "ID207": "0", "ID208": "0",
             "ID209": "0", "ID210": "0", "ID211": "0", "ID212": "0", "ID213": "0", "ID214": "0", "ID215": "0",
             "ID216": "0", "ID217": "0", "ID218": "0", "ID219": "0", "ID220": "0", "ID221": "0", "ID222": "0",
             "ID223": "0", "ID224": "0", "ID225": "0", "ID226": "0", "ID227": "0", "ID228": "0", "ID229": "0",
             "ID230": "0", "ID231": "0", "ID232": "0", "ID233": "0", "ID234": "0", "ID235": "0", "ID236": "0",
             "ID237": "0", "ID238": "0", "ID239": "0", "ID240": "0", "ID241": "0", "ID242": "0", "ID243": "0",
             "ID244": "0", "ID245": "0", "ID246": "0", "ID247": "0", "ID248": "0", "ID249": "0", "ID250": "0",
             "ID251": "0", "ID252": "0", "ID253": "0", "ID254": "0", "ID255": "0", "ID256": "0", "ID257": "0",
             "ID258": "0", "ID259": "0", "ID260": "0", "ID261": "0", "ID262": "0", "ID263": "0", "ID264": "0",
             "ID265": "0", "ID266": "0", "ID267": "0", "ID268": "0", "ID269": "0", "ID270": "0", "ID271": "0",
             "ID272": "0", "ID273": "0", "ID274": "0", "ID275": "0", "ID276": "0", "ID277": "0", "ID278": "0",
             "ID279": "0", "ID280": "0", "ID281": "0", "ID282": "0", "ID283": "0", "ID284": "0", "ID285": "0",
             "ID286": "0", "ID287": "0", "ID288": "0", "ID289": "0", "ID290": "0", "ID291": "0", "ID292": "0",
             "ID293": "0", "ID294": "0", "ID295": "0", "ID296": "0", "ID297": "0", "ID298": "0", "ID299": "0",
             "ID300": "0", "ID301": "0", "ID302": "0", "ID303": "0", "ID304": "0", "ID305": "0", "ID306": "0",
             "ID307": "0", "ID308": "0", "ID309": "0", "ID310": "0", "ID311": "0", "ID312": "0", "ID313": "0",
             "ID314": "0", "ID315": "0", "ID316": "0", "ID317": "0", "ID318": "0", "ID319": "0", "ID320": "0",
             "ID321": "0", "Description": "", "WhatsNew": "", "Ratings": "29",
             "Title": "Guide for  Battle Of Polytopia", "FourStarRatings": "1", "DeveloperAddress": "",
             "LastUpdated": "0000-00-00", "ReviewsAverage": 3, "Price": 0, "ThreeStarRatings": 1,
             "PrivacyPolicyLink": "", "Genre": "Strategy", "FiveStarRatings": 9, "OneStarRatings": 13,
             "Url": "https://play.google.com/store/apps/details?id=a.b.wassim.guide", "ContentRating": 0,
             "CurrentVersion": "1.0", "DeveloperEmail": "legende_of_darkness@hotmail.fr ",
             "AndroidVersion": "4.0.3 and up", "DeveloperWebsite": "", "DeveloperName": "gconley022", "FileSize": "[]",
             "TwoStarRatings": 5, "Downloads": "1,000 - 5,000", "vtdetection": 0, "malicious": "Yes"}]

    data = [];
    data.append(json)
    df = pd.DataFrame(data)
    print(df.head())
    return df


def extract_perm(api):
    a, d, dx = AnalyzeAPK("app.apk")
    print(a.get_permissions());
    data = {}
    data['permissions'] = a.get_permissions()
    data['pkgname'] = a.get_package()
    data['Title'] = a.get_app_name()
    data['AndroidVersion'] = a.get_androidversion_name()
    data['actions'] = ""
    print("RECEIVERS: ")
    receivers = a.get_receivers()
    filters = ""
    for i in receivers:
        filters = a.get_intent_filters("receiver", i)
        print("\t", i, filters or "")
        #print("\n", filters["action"])
    if filters and filters["action"]:
        data['actions'] = filters["action"]

    return data
    # print(a.get_activities());
    # print(a.get_android_manifest_axml().get_xml())

# extract_perm()
