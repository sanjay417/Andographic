import React, { Component } from 'react';
import {AppAccordian, CategoryDropDown, GenericDropDown} from '../index';
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import axios from 'axios';
import {Button, TextField, CircularProgress} from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import {HashRouter} from "react-router-dom";
import Card from "@material-ui/core/Card/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions/CardActions";
import ReactDOM from "react-dom";


export default class Predict extends Component{
    constructor(props) {
        super(props);
        this.state = {
            systemActions: [],
            permissions: [],
            predictMsg: "",
            accuracy: "",
            rowsAccuracy: 1000,
            rowsPrediction: 1000,
            rotate: false,
            rotateTrain: false,
            developer: "",
            genreFilter:"",
            appData : {
                id: "1",
                pkgname: "_",

                permissions:{
                    ACCESS_CHECKIN_PROPERTIES: "0",
                    ACCESS_COARSE_LOCATION: "0",
                    ACCESS_FINE_LOCATION: "0",
                    ACCESS_LOCATION_EXTRA_COMMANDS: "0",
                    ACCESS_NETWORK_STATE: "0",
                    ACCESS_NOTIFICATION_POLICY: "0",
                    ACCESS_WIFI_STATE: "0",
                    ACCOUNT_MANAGER: "0",
                    ADD_VOICEMAIL: "0",
                    BATTERY_STATS: "0",
                    BIND_ACCESSIBILITY_SERVICE: "0",
                    BIND_APPWIDGET: "0",
                    BIND_CARRIER_MESSAGING_SERVICE: "0",
                    BIND_CARRIER_SERVICES: "0",
                    BIND_CHOOSER_TARGET_SERVICE: "0",
                    BIND_CONDITION_PROVIDER_SERVICE: "0",
                    BIND_DEVICE_ADMIN: "0",
                    BIND_DREAM_SERVICE: "0",
                    BIND_INCALL_SERVICE: "0",
                    BIND_INPUT_METHOD: "0",
                    BIND_MIDI_DEVICE_SERVICE: "0",
                    BIND_NFC_SERVICE: "0",
                    BIND_NOTIFICATION_LISTENER_SERVICE: "0",
                    BIND_PRINT_SERVICE: "0",
                    BIND_QUICK_SETTINGS_TILE: "0",
                    BIND_REMOTEVIEWS: "0",
                    BIND_SCREENING_SERVICE: "0",
                    BIND_TELECOM_CONNECTION_SERVICE: "0",
                    BIND_TEXT_SERVICE: "0",
                    BIND_TV_INPUT: "0",
                    BIND_VOICE_INTERACTION: "0",
                    BIND_VPN_SERVICE: "0",
                    BIND_VR_LISTENER_SERVICE: "0",
                    BIND_WALLPAPER: "0",
                    BLUETOOTH: "0",
                    BLUETOOTH_ADMIN: "0",
                    BLUETOOTH_PRIVILEGED: "0",
                    BODY_SENSORS: "0",
                    BROADCAST_PACKAGE_REMOVED: "0",
                    BROADCAST_SMS: "0",
                    BROADCAST_STICKY: "0",
                    BROADCAST_WAP_PUSH: "0",
                    CALENDAR: "0",
                    CALL_PHONE: "0",
                    CALL_PRIVILEGED: "0",
                    CAMERA: "0",
                    'CAMERA.1': "0",
                    CAPTURE_AUDIO_OUTPUT: "0",
                    CAPTURE_SECURE_VIDEO_OUTPUT: "0",
                    CAPTURE_VIDEO_OUTPUT: "0",
                    CHANGE_COMPONENT_ENABLED_STATE: "0",
                    CHANGE_CONFIGURATION: "0",
                    CHANGE_NETWORK_STATE: "0",
                    CHANGE_WIFI_MULTICAST_STATE: "0",
                    CHANGE_WIFI_STATE: "0",
                    CLEAR_APP_CACHE: "0",
                    CONTACTS: "0",
                    CONTROL_LOCATION_UPDATES: "0",
                    DELETE_CACHE_FILES: "0",
                    DELETE_PACKAGES: "0",
                    DIAGNOSTIC: "0",
                    DISABLE_KEYGUARD: "0",
                    DUMP: "0",
                    EXPAND_STATUS_BAR: "0",
                    FACTORY_TEST: "0",
                    GET_ACCOUNTS: "0",
                    GET_ACCOUNTS_PRIVILEGED: "0",
                    GET_PACKAGE_SIZE: "0",
                    GET_TASKS: "0",
                    GLOBAL_SEARCH: "0",
                    INSTALL_LOCATION_PROVIDER: "0",
                    INSTALL_PACKAGES: "0",
                    INSTALL_SHORTCUT: "0",
                    INTERNET: "0",
                    KILL_BACKGROUND_PROCESSES: "0",
                    LOCATION: "0",
                    LOCATION_HARDWARE: "0",
                    MANAGE_DOCUMENTS: "0",
                    MASTER_CLEAR: "0",
                    MEDIA_CONTENT_CONTROL: "0",
                    MICROPHONE: "0",
                    MODIFY_AUDIO_SETTINGS: "0",
                    MODIFY_PHONE_STATE: "0",
                    MOUNT_FORMAT_FILESYSTEMS: "0",
                    MOUNT_UNMOUNT_FILESYSTEMS: "0",
                    NFC: "0",
                    PACKAGE_USAGE_STATS: "0",
                    PERSISTENT_ACTIVITY: "0",
                    PHONE: "0",
                    PROCESS_OUTGOING_CALLS: "0",
                    READ_CALENDAR: "0",
                    READ_CALL_LOG: "0",
                    READ_CONTACTS: "0",
                    READ_EXTERNAL_STORAGE: "0",
                    READ_FRAME_BUFFER: "0",
                    READ_INPUT_STATE: "0",
                    READ_LOGS: "0",
                    READ_PHONE_STATE: "0",
                    READ_SMS: "0",
                    READ_SYNC_SETTINGS: "0",
                    READ_SYNC_STATS: "0",
                    READ_VOICEMAIL: "0",
                    REBOOT: "0",
                    RECEIVE_BOOT_COMPLETED: "0",
                    RECEIVE_MMS: "0",
                    RECEIVE_SMS: "0",
                    RECEIVE_WAP_PUSH: "0",
                    RECORD_AUDIO: "0",
                    REORDER_TASKS: "0",
                    REQUEST_IGNORE_BATTERY_OPTIMIZATIONS: "0",
                    REQUEST_INSTALL_PACKAGES: "0",
                    RESTART_PACKAGES: "0",
                    SEND_RESPOND_VIA_MESSAGE: "0",
                    SEND_SMS: "0",
                    SENSORS: "0",
                    SET_ALARM: "0",
                    SET_ALWAYS_FINISH: "0",
                    SET_ANIMATION_SCALE: "0",
                    SET_DEBUG_APP: "0",
                    SET_PREFERRED_APPLICATIONS: "0",
                    SET_PROCESS_LIMIT: "0",
                    SET_TIME: "0",
                    SET_TIME_ZONE: "0",
                    SET_WALLPAPER: "0",
                    SET_WALLPAPER_HINTS: "0",
                    SIGNAL_PERSISTENT_PROCESSES: "0",
                    SMS: "0",
                    STATUS_BAR: "0",
                    STORAGE: "0",
                    SYSTEM_ALERT_WINDOW: "0",
                    TRANSMIT_IR: "0",
                    UNINSTALL_SHORTCUT: "0",
                    UPDATE_DEVICE_STATS: "0",
                    USE_FINGERPRINT: "0",
                    USE_SIP: "0",
                    VIBRATE: "0",
                    WAKE_LOCK: "0",
                    WRITE_APN_SETTINGS: "0",
                    WRITE_CALENDAR: "0",
                    WRITE_CALL_LOG: "0",
                    WRITE_CONTACTS: "0",
                    WRITE_EXTERNAL_STORAGE: "0",
                    WRITE_GSERVICES: "0",
                    WRITE_SECURE_SETTINGS: "0",
                    WRITE_SETTINGS: "0",
                    WRITE_SYNC_SETTINGS: "0",
                    WRITE_VOICEMAIL: "0"
                },

                systemActions:{
                    'android.app.action.ACTION_PASSWORD_CHANGED' : '0',
                    'android.app.action.ACTION_PASSWORD_EXPIRING': '0',
                    'android.app.action.ACTION_PASSWORD_FAILED': '0',
                    'android.app.action.ACTION_PASSWORD_SUCCEEDED': '0',
                    'android.app.action.ACTION_PROFILE_PROVISIONING_COMPLETE': '0',
                    'android.app.action.DEVICE_ADMIN_DISABLE_REQUESTED': '0',
                    'android.app.action.DEVICE_ADMIN_DISABLED': '0',
                    'android.app.action.DEVICE_ADMIN_ENABLED': '0',
                    'android.bluetooth.a2dp.action.SINK_STATE_CHANGED': '0',
                    'android.bluetooth.a2dp.intent.action.SINK_STATE_CHANGED': '0',
                    'android.bluetooth.a2dp.profile.action.CONNECTION_STATE_CHANGED': '0',
                    'android.bluetooth.a2dp.profile.action.PLAYING_STATE_CHANGED': '0',
                    'android.bluetooth.adapter.action.CONNECTION_STATE_CHANGED': '0',
                    'android.bluetooth.adapter.action.DISCOVERY_FINISHED': '0',
                    'android.bluetooth.adapter.action.DISCOVERY_STARTED': '0',
                    'android.bluetooth.adapter.action.LOCAL_NAME_CHANGED': '0',
                    'android.bluetooth.adapter.action.SCAN_MODE_CHANGED': '0',
                    'android.bluetooth.adapter.action.STATE_CHANGED': '0',
                    'android.bluetooth.device.action.ACL_CONNECTED': '0',
                    'android.bluetooth.device.action.ACL_DISCONNECT_REQUESTED': '0',
                    'android.bluetooth.device.action.ACL_DISCONNECTED': '0',
                    'android.bluetooth.device.action.BOND_STATE_CHANGED': '0',
                    'android.bluetooth.device.action.CLASS_CHANGED': '0',
                    'android.bluetooth.device.action.FOUND': '0',
                    'android.bluetooth.device.action.NAME_CHANGED': '0',
                    'android.bluetooth.device.action.PAIRING_REQUEST': '0',
                    'android.bluetooth.device.action.UUID': '0',
                    'android.bluetooth.devicepicker.action.DEVICE_SELECTED': '0',
                    'android.bluetooth.devicepicker.action.LAUNCH': '0',
                    'android.bluetooth.headset.action.AUDIO_STATE_CHANGED': '0',
                    'android.bluetooth.headset.action.STATE_CHANGED': '0',
                    'android.bluetooth.headset.action.VENDOR_SPECIFIC_HEADSET_EVENT': '0',
                    'android.bluetooth.headset.profile.action.AUDIO_STATE_CHANGED': '0',
                    'android.bluetooth.headset.profile.action.CONNECTION_STATE_CHANGED': '0',
                    'android.bluetooth.input.profile.action.CONNECTION_STATE_CHANGED': '0',
                    'android.bluetooth.inputdevice.action.INPUT_DEVICE_STATE_CHANGED': '0',
                    'android.bluetooth.intent.action.BLUETOOTH_STATE_CHANGED': '0',
                    'android.bluetooth.intent.action.BOND_STATE_CHANGED_ACTION': '0',
                    'android.bluetooth.intent.action.BONDING_CREATED': '0',
                    'android.bluetooth.intent.action.BONDING_REMOVED': '0',
                    'android.bluetooth.intent.action.DISABLED': '0',
                    'android.bluetooth.intent.action.DISCOVERY_COMPLETED': '0',
                    'android.bluetooth.intent.action.DISCOVERY_STARTED': '0',
                    'android.bluetooth.intent.action.ENABLED': '0',
                    'android.bluetooth.intent.action.HEADSET_ADUIO_STATE_CHANGED': '0',
                    'android.bluetooth.intent.action.HEADSET_STATE_CHANGED': '0',
                    'android.bluetooth.intent.action.MODE_CHANGED': '0',
                    'android.bluetooth.intent.action.NAME_CHANGED': '0',
                    'android.bluetooth.intent.action.PAIRING_CANCEL': '0',
                    'android.bluetooth.intent.action.PAIRING_REQUEST': '0',
                    'android.bluetooth.intent.action.REMOTE_ALIAS_CHANGED': '0',
                    'android.bluetooth.intent.action.REMOTE_ALIAS_CLEARED': '0',
                    'android.bluetooth.intent.action.REMOTE_DEVICE_CONNECTED': '0',
                    'android.bluetooth.intent.action.REMOTE_DEVICE_DISAPPEARED': '0',
                    'android.bluetooth.intent.action.REMOTE_DEVICE_DISCONNECT_REQUESTED': '0',
                    'android.bluetooth.intent.action.REMOTE_DEVICE_DISCONNECTED': '0',
                    'android.bluetooth.intent.action.REMOTE_DEVICE_FOUND': '0',
                    'android.bluetooth.intent.action.REMOTE_NAME_FAILED': '0',
                    'android.bluetooth.intent.action.REMOTE_NAME_UPDATED': '0',
                    'android.bluetooth.intent.action.SCAN_MODE_CHANGED': '0',
                    'android.bluetooth.pan.action.STATE_CHANGED': '0',
                    'android.bluetooth.pan.profile.action.CONNECTION_STATE_CHANGED': '0',
                    'android.hardware.action.NEW_PICTURE': '0',
                    'android.hardware.action.NEW_VIDEO': '0',
                    'android.hardware.input.action.QUERY_KEYBOARD_LAYOUTS': '0',
                    'android.intent.action.ACTION_POWER_CONNECTED': '0',
                    'android.intent.action.ACTION_POWER_DISCONNECTED': '0',
                    'android.intent.action.ACTION_SHUTDOWN': '0',
                    'android.intent.action.AIRPLANE_MODE': '0',
                    'android.intent.action.APPLICATION_RESTRICTIONS_CHANGED': '0',
                    'android.intent.action.BATTERY_CHANGED': '0',
                    'android.intent.action.BATTERY_LOW': '0',
                    'android.intent.action.BATTERY_OKAY': '0',
                    'android.intent.action.BOOT_COMPLETED': '0',
                    'android.intent.action.CAMERA_BUTTON': '0',
                    'android.intent.action.CONFIGURATION_CHANGED': '0',
                    'android.intent.action.CONTENT_CHANGED': '0',
                    'android.intent.action.DATA_SMS_RECEIVED': '0',
                    'android.intent.action.DATE_CHANGED': '0',
                    'android.intent.action.DEVICE_STORAGE_LOW': '0',
                    'android.intent.action.DEVICE_STORAGE_OK': '0',
                    'android.intent.action.DOCK_EVENT': '0',
                    'android.intent.action.DOWNLOAD_COMPLETE': '0',
                    'android.intent.action.DOWNLOAD_NOTIFICATION_CLICKED': '0',
                    'android.intent.action.DREAMING_STARTED': '0',
                    'android.intent.action.DREAMING_STOPPED': '0',
                    'android.intent.action.EXTERNAL_APPLICATIONS_AVAILABLE': '0',
                    'android.intent.action.EXTERNAL_APPLICATIONS_UNAVAILABLE': '0',
                    'android.intent.action.FETCH_VOICEMAIL': '0',
                    'android.intent.action.GTALK_CONNECTED': '0',
                    'android.intent.action.GTALK_DISCONNECTED': '0',
                    'android.intent.action.HEADSET_PLUG': '0',
                    'android.intent.action.INPUT_METHOD_CHANGED': '0',
                    'android.intent.action.LOCALE_CHANGED': '0',
                    'android.intent.action.MANAGE_PACKAGE_STORAGE': '0',
                    'android.intent.action.MEDIA_BAD_REMOVAL': '0',
                    'android.intent.action.MEDIA_BUTTON': '0',
                    'android.intent.action.MEDIA_CHECKING': '0',
                    'android.intent.action.MEDIA_EJECT': '0',
                    'android.intent.action.MEDIA_MOUNTED': '0',
                    'android.intent.action.MEDIA_NOFS': '0',
                    'android.intent.action.MEDIA_REMOVED': '0',
                    'android.intent.action.MEDIA_SCANNER_FINISHED': '0',
                    'android.intent.action.MEDIA_SCANNER_SCAN_FILE': '0',
                    'android.intent.action.MEDIA_SCANNER_STARTED': '0',
                    'android.intent.action.MEDIA_SHARED': '0',
                    'android.intent.action.MEDIA_UNMOUNTABLE': '0',
                    'android.intent.action.MEDIA_UNMOUNTED': '0',
                    'android.intent.action.MY_PACKAGE_REPLACED': '0',
                    'android.intent.action.NEW_OUTGOING_CALL': '0',
                    'android.intent.action.NEW_VOICEMAIL': '0',
                    'android.intent.action.PACKAGE_ADDED': '0',
                    'android.intent.action.PACKAGE_CHANGED': '0',
                    'android.intent.action.PACKAGE_DATA_CLEARED': '0',
                    'android.intent.action.PACKAGE_FIRST_LAUNCH': '0',
                    'android.intent.action.PACKAGE_FULLY_REMOVED': '0',
                    'android.intent.action.PACKAGE_INSTALL': '0',
                    'android.intent.action.PACKAGE_NEEDS_VERIFICATION': '0',
                    'android.intent.action.PACKAGE_REMOVED': '0',
                    'android.intent.action.PACKAGE_REPLACED': '0',
                    'android.intent.action.PACKAGE_RESTARTED': '0',
                    'android.intent.action.PACKAGE_VERIFIED': '0',
                    'android.intent.action.PHONE_STATE': '0',
                    'android.intent.action.PROVIDER_CHANGED': '0',
                    'android.intent.action.PROXY_CHANGE': '0',
                    'android.intent.action.REBOOT': '0',
                    'android.intent.action.SCREEN_OFF': '0',
                    'android.intent.action.SCREEN_ON': '0',
                    'android.intent.action.TIME_SET': '0',
                    'android.intent.action.TIME_TICK': '0',
                    'android.intent.action.TIMEZONE_CHANGED': '0',
                    'android.intent.action.UID_REMOVED': '0',
                    'android.intent.action.UMS_CONNECTED': '0',
                    'android.intent.action.UMS_DISCONNECTED': '0',
                    'android.intent.action.USER_PRESENT': '0',
                    'android.intent.action.WALLPAPER_CHANGED': '0',
                    'android.media.action.CLOSE_AUDIO_EFFECT_CONTROL_SESSION': '0',
                    'android.media.action.OPEN_AUDIO_EFFECT_CONTROL_SESSION': '0',
                    'android.media.ACTION_SCO_AUDIO_STATE_UPDATED': '0',
                    'android.media.AUDIO_BECOMING_NOISY': '0',
                    'android.media.RINGER_MODE_CHANGED': '0',
                    'android.media.SCO_AUDIO_STATE_CHANGED': '0',
                    'android.media.VIBRATE_SETTING_CHANGED': '0',
                    'android.net.conn.BACKGROUND_DATA_SETTING_CHANGED': '0',
                    'android.net.conn.CONNECTIVITY_CHANGE': '0',
                    'android.net.nsd.STATE_CHANGED': '0',
                    'android.net.scoring.SCORE_NETWORKS': '0',
                    'android.net.wifi.NETWORK_IDS_CHANGED': '0',
                    'android.net.wifi.p2p.CONNECTION_STATE_CHANGE': '0',
                    'android.net.wifi.p2p.DISCOVERY_STATE_CHANGE': '0',
                    'android.net.wifi.p2p.PEERS_CHANGED': '0',
                    'android.net.wifi.p2p.STATE_CHANGED': '0',
                    'android.net.wifi.p2p.THIS_DEVICE_CHANGED': '0',
                    'android.net.wifi.RSSI_CHANGED': '0',
                    'android.net.wifi.SCAN_RESULTS': '0',
                    'android.net.wifi.STATE_CHANGE': '0',
                    'android.net.wifi.supplicant.CONNECTION_CHANGE': '0',
                    'android.net.wifi.supplicant.STATE_CHANGE': '0',
                    'android.net.wifi.WIFI_STATE_CHANGED': '0',
                    'android.nfc.action.ADAPTER_STATE_CHANGED': '0',
                    'android.os.action.POWER_SAVE_MODE_CHANGED': '0',
                    'android.provider.Telephony.SIM_FULL': '0',
                    'android.provider.Telephony.SMS_CB_RECEIVED': '0',
                    'android.provider.Telephony.SMS_DELIVER': '0',
                    'android.provider.Telephony.SMS_EMERGENCY_CB_RECEIVED': '0',
                    'android.provider.Telephony.SMS_RECEIVED': '0',
                    'android.provider.Telephony.SMS_REJECTED': '0',
                    'android.provider.Telephony.SMS_SERVICE_CATEGORY_PROGRAM_DATA_RECEIVED': '0',
                    'android.provider.Telephony.WAP_PUSH_DELIVER': '0',
                    'android.provider.Telephony.WAP_PUSH_RECEIVED': '0',
                    'android.speech.tts.engine.TTS_DATA_INSTALLED': '0',
                    'android.speech.tts.TTS_QUEUE_PROCESSING_COMPLETED': '0',
                    'com.google.gservices.intent.action.GSERVICES_CHANGED': '0',
                    'com.google.gservices.intent.action.GSERVICES_OVERRIDE': '0'
                },
                Description: "_",
                WhatsNew: "_",
                Ratings: "0",
                Title: "_",
                DeveloperAddress: "_",
                FourStarRatings: "0",
                LastUpdated:"0",
                ReviewsAverage: "0",
                Price: "0",
                ThreeStarRatings: "0",
                PrivacyPolicyLink: "_",
                Genre: "",
                FiveStarRatings: "0",
                OneStarRatings: "0",
                Url: "_",
                ContentRating: "_",
                CurrentVersion: "0",
                DeveloperEmail: "_",
                AndroidVersion: "0",
                DeveloperWebsite: "_",
                DeveloperName: "",
                FileSize: "0",
                TwoStarRatings: "0",
                Downloads: "0",
                vtdetection: "0",
                malicious:  "No",
                source: ""
            }
        }
    }

    componentDidMount(){
        this.populateSystemActions();
        this.populatePermissions();
        this.populateGenres();
    };


    populateSystemActions =() =>{
        axios.get('/api/getSystemActions').then((result)=>{
            const dataSuggestions = result.data.map(entry => ({
                value: entry.pid,
                label: entry.permission
            }))
            this.setState({systemActions: dataSuggestions})
        }).catch((err)=>{
            console.log(err)
        })
    };

    populatePermissions =() =>{
        axios.get('/api/getPermissions').then((result)=>{
            //console.log(result);
            const dataSuggestions = result.data.map(entry => ({
                value: entry.pid,
                label: entry.permission,
            }))
            this.setState({permissions: dataSuggestions})
        }).catch((err)=>{
            console.log(err)
        })
    };

    handleUpload(event) {
        //alert(event.target.files[0]);

        var formData = new FormData();
        formData.append("file",event.target.files[0]);
        this.setState({rotate : true})
        axios.post('/ML/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((result)=>{
            this.setState({rotate : false})
            let data = this.state.appData;
            let permissions = result.data["permissions"]
            let actions = result.data["actions"]

            for(let i in permissions){
                let permission = permissions[i];
                let pieces = permission.split('.')
                let split = pieces[pieces.length-1]
                if(data.permissions[split])
                    data.permissions[split] = 1;
            }

            for(let i in actions){
                let action = actions[i];
                if(data.systemActions[action])
                    data.systemActions[action] = 1;
            }

            data["Title"] = result.data["Title"]
            data["pkgname"] = result.data["pkgname"]
            data["AndroidVersion"] = result.data["AndroidVersion"]
            data["DeveloperName"] = this.state.developer;
            data["Genre"] = this.state.genreFilter;
            this.setState({appData: data} )
        }).catch((err)=>{
            console.log(err)
        })
    }


    convert = (data) =>{

        let result = {};
        let self = this;

        let permCOunt = 0;
        let actionCOunt = 0;
        Object.keys(data).forEach(function(key) {
            let print = "";
            if(key != 'permissions' && key != 'systemActions'){
                result[key] = data[key];
                console.log(key)
            }else if(key == 'permissions'){
                let list  = data[key]
                for(let i in list){
                    let id = self.getPermissionId(i)
                    result[id] = data.permissions[i];
                    console.log(id)
                    permCOunt++;
                }

            }else if(key == 'systemActions'){
                let list  = data[key]
                for(let i in list){
                    //let pieces = i.split('.')
                    //let action = pieces[pieces.length-1]
                    let id = self.getSystemActionId(i)
                    result[id] = data.systemActions[i];
                    console.log(id)
                    actionCOunt++;
                }
            }

        });

        console.log("Perm", permCOunt);
        console.log("Action", actionCOunt);
       return result;
    }

    getSystemActionId =(name) =>{
        let permissionObj = this.state.systemActions.find(elem => elem.label == name);
        return permissionObj.value;
    }
    getPermissionId =(name) =>{
        let permissionObj = this.state.permissions.find(elem => elem.label == name);
        return permissionObj.value;
    }

    handleChange = (data) =>{
        this.setState({appData: data});
    }

    handleTrain = (data) =>{
        this.setState({rotateTrain : true})
        axios.get('/ML/train?rows='+this.state.rowsAccuracy).then((result)=>{
            this.setState({rotateTrain : false})
          this.setState({"accuracy" : result.data.toFixed(2) + " %"})
        }).catch((err)=>{
            console.log(err)
        })


    }

    handlePredict = (data) =>{
        let finalData = this.convert(this.state.appData);
        finalData = JSON.stringify(finalData);
        this.setState({rotate : true})

        axios.post('/ML/predict', finalData, {headers: {'Content-Type': 'application/json'}}).then((result)=>{
            let prediction = result.data == "Yes" ? "Malicious" :"Benign"
            this.setState({"predictMsg" : prediction})
            this.setState({rotate : false})
        }).catch((err)=>{
            console.log(err)
        })

    }

    populateGenres =() =>{
        axios.get('/api/getGenre').then((result)=>{
            this.setState({genres: result.data});
            const dataSuggestions = result.data.map(dev => ({
                value: dev.Genre,
                label: dev.Genre
            }))
            this.setState({suggestions: dataSuggestions});
        }).catch((err)=>{
            console.log(err)
        })
    }

    changeAccuracyRows= (e)=>{
        this.setState({"rowsAccuracy" : e.target.value})
    }

    changePredictionRows= (e)=>{
        this.setState({"rowsPrediction" : e.target.value})
    }

    changeDeveloper= (e)=>{
        this.setState({"developer" : e.target.value})
    }


    changeCatDropDown =(result, selectedVals) =>{
        let i = 0;
        let genres = [];
        if(selectedVals == null){
            this.setState({genres: []});
            return;
        }


        for(i = 0; i < selectedVals.length; i++){
            genres.push(selectedVals[i].value)
        }
        this.setState({genreFilter: genres.join()});

    }

    render(){

     /*   const json = {
            id: "1",
            pkgname: "_",

            permissions:{
                ACCESS_CHECKIN_PROPERTIES: "0",
                ACCESS_COARSE_LOCATION: "0",
                ACCESS_FINE_LOCATION: "0",
                ACCESS_LOCATION_EXTRA_COMMANDS: "0",
                ACCESS_NETWORK_STATE: "0",
                ACCESS_NOTIFICATION_POLICY: "0",
                ACCESS_WIFI_STATE: "0",
                ACCOUNT_MANAGER: "0",
                ADD_VOICEMAIL: "0",
                BATTERY_STATS: "0",
                BIND_ACCESSIBILITY_SERVICE: "0",
                BIND_APPWIDGET: "0",
                BIND_CARRIER_MESSAGING_SERVICE: "0",
                BIND_CARRIER_SERVICES: "0",
                BIND_CHOOSER_TARGET_SERVICE: "0",
                BIND_CONDITION_PROVIDER_SERVICE: "0",
                BIND_DEVICE_ADMIN: "0",
                BIND_DREAM_SERVICE: "0",
                BIND_INCALL_SERVICE: "0",
                BIND_INPUT_METHOD: "0",
                BIND_MIDI_DEVICE_SERVICE: "0",
                BIND_NFC_SERVICE: "0",
                BIND_NOTIFICATION_LISTENER_SERVICE: "0",
                BIND_PRINT_SERVICE: "0",
                BIND_QUICK_SETTINGS_TILE: "0",
                BIND_REMOTEVIEWS: "0",
                BIND_SCREENING_SERVICE: "0",
                BIND_TELECOM_CONNECTION_SERVICE: "0",
                BIND_TEXT_SERVICE: "0",
                BIND_TV_INPUT: "0",
                BIND_VOICE_INTERACTION: "0",
                BIND_VPN_SERVICE: "0",
                BIND_VR_LISTENER_SERVICE: "0",
                BIND_WALLPAPER: "0",
                BLUETOOTH: "0",
                BLUETOOTH_ADMIN: "0",
                BLUETOOTH_PRIVILEGED: "0",
                BODY_SENSORS: "0",
                BROADCAST_PACKAGE_REMOVED: "0",
                BROADCAST_SMS: "0",
                BROADCAST_STICKY: "0",
                BROADCAST_WAP_PUSH: "0",
                CALENDAR: "0",
                CALL_PHONE: "0",
                CALL_PRIVILEGED: "0",
                CAMERA: "0",
                'CAMERA.1': "0",
                CAPTURE_AUDIO_OUTPUT: "0",
                CAPTURE_SECURE_VIDEO_OUTPUT: "0",
                CAPTURE_VIDEO_OUTPUT: "0",
                CHANGE_COMPONENT_ENABLED_STATE: "0",
                CHANGE_CONFIGURATION: "0",
                CHANGE_NETWORK_STATE: "0",
                CHANGE_WIFI_MULTICAST_STATE: "0",
                CHANGE_WIFI_STATE: "0",
                CLEAR_APP_CACHE: "0",
                CONTACTS: "0",
                CONTROL_LOCATION_UPDATES: "0",
                DELETE_CACHE_FILES: "0",
                DELETE_PACKAGES: "0",
                DIAGNOSTIC: "0",
                DISABLE_KEYGUARD: "0",
                DUMP: "0",
                EXPAND_STATUS_BAR: "0",
                FACTORY_TEST: "0",
                GET_ACCOUNTS: "0",
                GET_ACCOUNTS_PRIVILEGED: "0",
                GET_PACKAGE_SIZE: "0",
                GET_TASKS: "0",
                GLOBAL_SEARCH: "0",
                INSTALL_LOCATION_PROVIDER: "0",
                INSTALL_PACKAGES: "0",
                INSTALL_SHORTCUT: "0",
                INTERNET: "0",
                KILL_BACKGROUND_PROCESSES: "0",
                LOCATION: "0",
                LOCATION_HARDWARE: "0",
                MANAGE_DOCUMENTS: "0",
                MASTER_CLEAR: "0",
                MEDIA_CONTENT_CONTROL: "0",
                MICROPHONE: "0",
                MODIFY_AUDIO_SETTINGS: "0",
                MODIFY_PHONE_STATE: "0",
                MOUNT_FORMAT_FILESYSTEMS: "0",
                MOUNT_UNMOUNT_FILESYSTEMS: "0",
                NFC: "0",
                PACKAGE_USAGE_STATS: "0",
                PERSISTENT_ACTIVITY: "0",
                PHONE: "0",
                PROCESS_OUTGOING_CALLS: "0",
                READ_CALENDAR: "0",
                READ_CALL_LOG: "0",
                READ_CONTACTS: "0",
                READ_EXTERNAL_STORAGE: "0",
                READ_FRAME_BUFFER: "0",
                READ_INPUT_STATE: "0",
                READ_LOGS: "0",
                READ_PHONE_STATE: "0",
                READ_SMS: "0",
                READ_SYNC_SETTINGS: "0",
                READ_SYNC_STATS: "0",
                READ_VOICEMAIL: "0",
                REBOOT: "0",
                RECEIVE_BOOT_COMPLETED: "0",
                RECEIVE_MMS: "0",
                RECEIVE_SMS: "0",
                RECEIVE_WAP_PUSH: "0",
                RECORD_AUDIO: "0",
                REORDER_TASKS: "0",
                REQUEST_IGNORE_BATTERY_OPTIMIZATIONS: "0",
                REQUEST_INSTALL_PACKAGES: "0",
                RESTART_PACKAGES: "0",
                SEND_RESPOND_VIA_MESSAGE: "0",
                SEND_SMS: "0",
                SENSORS: "0",
                SET_ALARM: "0",
                SET_ALWAYS_FINISH: "0",
                SET_ANIMATION_SCALE: "0",
                SET_DEBUG_APP: "0",
                SET_PREFERRED_APPLICATIONS: "0",
                SET_PROCESS_LIMIT: "0",
                SET_TIME: "0",
                SET_TIME_ZONE: "0",
                SET_WALLPAPER: "0",
                SET_WALLPAPER_HINTS: "0",
                SIGNAL_PERSISTENT_PROCESSES: "0",
                SMS: "0",
                STATUS_BAR: "0",
                STORAGE: "0",
                SYSTEM_ALERT_WINDOW: "0",
                TRANSMIT_IR: "0",
                UNINSTALL_SHORTCUT: "0",
                UPDATE_DEVICE_STATS: "0",
                USE_FINGERPRINT: "0",
                USE_SIP: "0",
                VIBRATE: "0",
                WAKE_LOCK: "0",
                WRITE_APN_SETTINGS: "0",
                WRITE_CALENDAR: "0",
                WRITE_CALL_LOG: "0",
                WRITE_CONTACTS: "0",
                WRITE_EXTERNAL_STORAGE: "0",
                WRITE_GSERVICES: "0",
                WRITE_SECURE_SETTINGS: "0",
                WRITE_SETTINGS: "0",
                WRITE_SYNC_SETTINGS: "0",
                WRITE_VOICEMAIL: "0"
            },

            systemActions:{
                'android.app.action.ACTION_PASSWORD_CHANGED' : '0',
                'android.app.action.ACTION_PASSWORD_EXPIRING': '0',
                'android.app.action.ACTION_PASSWORD_FAILED': '0',
                'android.app.action.ACTION_PASSWORD_SUCCEEDED': '0',
                'android.app.action.ACTION_PROFILE_PROVISIONING_COMPLETE': '0',
                'android.app.action.DEVICE_ADMIN_DISABLE_REQUESTED': '0',
                'android.app.action.DEVICE_ADMIN_DISABLED': '0',
                'android.app.action.DEVICE_ADMIN_ENABLED': '0',
                'android.bluetooth.a2dp.action.SINK_STATE_CHANGED': '0',
                'android.bluetooth.a2dp.intent.action.SINK_STATE_CHANGED': '0',
                'android.bluetooth.a2dp.profile.action.CONNECTION_STATE_CHANGED': '0',
                'android.bluetooth.a2dp.profile.action.PLAYING_STATE_CHANGED': '0',
                'android.bluetooth.adapter.action.CONNECTION_STATE_CHANGED': '0',
                'android.bluetooth.adapter.action.DISCOVERY_FINISHED': '0',
                'android.bluetooth.adapter.action.DISCOVERY_STARTED': '0',
                'android.bluetooth.adapter.action.LOCAL_NAME_CHANGED': '0',
                'android.bluetooth.adapter.action.SCAN_MODE_CHANGED': '0',
                'android.bluetooth.adapter.action.STATE_CHANGED': '0',
                'android.bluetooth.device.action.ACL_CONNECTED': '0',
                'android.bluetooth.device.action.ACL_DISCONNECT_REQUESTED': '0',
                'android.bluetooth.device.action.ACL_DISCONNECTED': '0',
                'android.bluetooth.device.action.BOND_STATE_CHANGED': '0',
                'android.bluetooth.device.action.CLASS_CHANGED': '0',
                'android.bluetooth.device.action.FOUND': '0',
                'android.bluetooth.device.action.NAME_CHANGED': '0',
                'android.bluetooth.device.action.PAIRING_REQUEST': '0',
                'android.bluetooth.device.action.UUID': '0',
                'android.bluetooth.devicepicker.action.DEVICE_SELECTED': '0',
                'android.bluetooth.devicepicker.action.LAUNCH': '0',
                'android.bluetooth.headset.action.AUDIO_STATE_CHANGED': '0',
                'android.bluetooth.headset.action.STATE_CHANGED': '0',
                'android.bluetooth.headset.action.VENDOR_SPECIFIC_HEADSET_EVENT': '0',
                'android.bluetooth.headset.profile.action.AUDIO_STATE_CHANGED': '0',
                'android.bluetooth.headset.profile.action.CONNECTION_STATE_CHANGED': '0',
                'android.bluetooth.input.profile.action.CONNECTION_STATE_CHANGED': '0',
                'android.bluetooth.inputdevice.action.INPUT_DEVICE_STATE_CHANGED': '0',
                'android.bluetooth.intent.action.BLUETOOTH_STATE_CHANGED': '0',
                'android.bluetooth.intent.action.BOND_STATE_CHANGED_ACTION': '0',
                'android.bluetooth.intent.action.BONDING_CREATED': '0',
                'android.bluetooth.intent.action.BONDING_REMOVED': '0',
                'android.bluetooth.intent.action.DISABLED': '0',
                'android.bluetooth.intent.action.DISCOVERY_COMPLETED': '0',
                'android.bluetooth.intent.action.DISCOVERY_STARTED': '0',
                'android.bluetooth.intent.action.ENABLED': '0',
                'android.bluetooth.intent.action.HEADSET_ADUIO_STATE_CHANGED': '0',
                'android.bluetooth.intent.action.HEADSET_STATE_CHANGED': '0',
                'android.bluetooth.intent.action.MODE_CHANGED': '0',
                'android.bluetooth.intent.action.NAME_CHANGED': '0',
                'android.bluetooth.intent.action.PAIRING_CANCEL': '0',
                'android.bluetooth.intent.action.PAIRING_REQUEST': '0',
                'android.bluetooth.intent.action.REMOTE_ALIAS_CHANGED': '0',
                'android.bluetooth.intent.action.REMOTE_ALIAS_CLEARED': '0',
                'android.bluetooth.intent.action.REMOTE_DEVICE_CONNECTED': '0',
                'android.bluetooth.intent.action.REMOTE_DEVICE_DISAPPEARED': '0',
                'android.bluetooth.intent.action.REMOTE_DEVICE_DISCONNECT_REQUESTED': '0',
                'android.bluetooth.intent.action.REMOTE_DEVICE_DISCONNECTED': '0',
                'android.bluetooth.intent.action.REMOTE_DEVICE_FOUND': '0',
                'android.bluetooth.intent.action.REMOTE_NAME_FAILED': '0',
                'android.bluetooth.intent.action.REMOTE_NAME_UPDATED': '0',
                'android.bluetooth.intent.action.SCAN_MODE_CHANGED': '0',
                'android.bluetooth.pan.action.STATE_CHANGED': '0',
                'android.bluetooth.pan.profile.action.CONNECTION_STATE_CHANGED': '0',
                'android.hardware.action.NEW_PICTURE': '0',
                'android.hardware.action.NEW_VIDEO': '0',
                'android.hardware.input.action.QUERY_KEYBOARD_LAYOUTS': '0',
                'android.intent.action.ACTION_POWER_CONNECTED': '0',
                'android.intent.action.ACTION_POWER_DISCONNECTED': '0',
                'android.intent.action.ACTION_SHUTDOWN': '0',
                'android.intent.action.AIRPLANE_MODE': '0',
                'android.intent.action.APPLICATION_RESTRICTIONS_CHANGED': '0',
                'android.intent.action.BATTERY_CHANGED': '0',
                'android.intent.action.BATTERY_LOW': '0',
                'android.intent.action.BATTERY_OKAY': '0',
                'android.intent.action.BOOT_COMPLETED': '0',
                'android.intent.action.CAMERA_BUTTON': '0',
                'android.intent.action.CONFIGURATION_CHANGED': '0',
                'android.intent.action.CONTENT_CHANGED': '0',
                'android.intent.action.DATA_SMS_RECEIVED': '0',
                'android.intent.action.DATE_CHANGED': '0',
                'android.intent.action.DEVICE_STORAGE_LOW': '0',
                'android.intent.action.DEVICE_STORAGE_OK': '0',
                'android.intent.action.DOCK_EVENT': '0',
                'android.intent.action.DOWNLOAD_COMPLETE': '0',
                'android.intent.action.DOWNLOAD_NOTIFICATION_CLICKED': '0',
                'android.intent.action.DREAMING_STARTED': '0',
                'android.intent.action.DREAMING_STOPPED': '0',
                'android.intent.action.EXTERNAL_APPLICATIONS_AVAILABLE': '0',
                'android.intent.action.EXTERNAL_APPLICATIONS_UNAVAILABLE': '0',
                'android.intent.action.FETCH_VOICEMAIL': '0',
                'android.intent.action.GTALK_CONNECTED': '0',
                'android.intent.action.GTALK_DISCONNECTED': '0',
                'android.intent.action.HEADSET_PLUG': '0',
                'android.intent.action.INPUT_METHOD_CHANGED': '0',
                'android.intent.action.LOCALE_CHANGED': '0',
                'android.intent.action.MANAGE_PACKAGE_STORAGE': '0',
                'android.intent.action.MEDIA_BAD_REMOVAL': '0',
                'android.intent.action.MEDIA_BUTTON': '0',
                'android.intent.action.MEDIA_CHECKING': '0',
                'android.intent.action.MEDIA_EJECT': '0',
                'android.intent.action.MEDIA_MOUNTED': '0',
                'android.intent.action.MEDIA_NOFS': '0',
                'android.intent.action.MEDIA_REMOVED': '0',
                'android.intent.action.MEDIA_SCANNER_FINISHED': '0',
                'android.intent.action.MEDIA_SCANNER_SCAN_FILE': '0',
                'android.intent.action.MEDIA_SCANNER_STARTED': '0',
                'android.intent.action.MEDIA_SHARED': '0',
                'android.intent.action.MEDIA_UNMOUNTABLE': '0',
                'android.intent.action.MEDIA_UNMOUNTED': '0',
                'android.intent.action.MY_PACKAGE_REPLACED': '0',
                'android.intent.action.NEW_OUTGOING_CALL': '0',
                'android.intent.action.NEW_VOICEMAIL': '0',
                'android.intent.action.PACKAGE_ADDED': '0',
                'android.intent.action.PACKAGE_CHANGED': '0',
                'android.intent.action.PACKAGE_DATA_CLEARED': '0',
                'android.intent.action.PACKAGE_FIRST_LAUNCH': '0',
                'android.intent.action.PACKAGE_FULLY_REMOVED': '0',
                'android.intent.action.PACKAGE_INSTALL': '0',
                'android.intent.action.PACKAGE_NEEDS_VERIFICATION': '0',
                'android.intent.action.PACKAGE_REMOVED': '0',
                'android.intent.action.PACKAGE_REPLACED': '0',
                'android.intent.action.PACKAGE_RESTARTED': '0',
                'android.intent.action.PACKAGE_VERIFIED': '0',
                'android.intent.action.PHONE_STATE': '0',
                'android.intent.action.PROVIDER_CHANGED': '0',
                'android.intent.action.PROXY_CHANGE': '0',
                'android.intent.action.REBOOT': '0',
                'android.intent.action.SCREEN_OFF': '0',
                'android.intent.action.SCREEN_ON': '0',
                'android.intent.action.TIME_SET': '0',
                'android.intent.action.TIME_TICK': '0',
                'android.intent.action.TIMEZONE_CHANGED': '0',
                'android.intent.action.UID_REMOVED': '0',
                'android.intent.action.UMS_CONNECTED': '0',
                'android.intent.action.UMS_DISCONNECTED': '0',
                'android.intent.action.USER_PRESENT': '0',
                'android.intent.action.WALLPAPER_CHANGED': '0',
                'android.media.action.CLOSE_AUDIO_EFFECT_CONTROL_SESSION': '0',
                'android.media.action.OPEN_AUDIO_EFFECT_CONTROL_SESSION': '0',
                'android.media.ACTION_SCO_AUDIO_STATE_UPDATED': '0',
                'android.media.AUDIO_BECOMING_NOISY': '0',
                'android.media.RINGER_MODE_CHANGED': '0',
                'android.media.SCO_AUDIO_STATE_CHANGED': '0',
                'android.media.VIBRATE_SETTING_CHANGED': '0',
                'android.net.conn.BACKGROUND_DATA_SETTING_CHANGED': '0',
                'android.net.conn.CONNECTIVITY_CHANGE': '0',
                'android.net.nsd.STATE_CHANGED': '0',
                'android.net.scoring.SCORE_NETWORKS': '0',
                'android.net.wifi.NETWORK_IDS_CHANGED': '0',
                'android.net.wifi.p2p.CONNECTION_STATE_CHANGE': '0',
                'android.net.wifi.p2p.DISCOVERY_STATE_CHANGE': '0',
                'android.net.wifi.p2p.PEERS_CHANGED': '0',
                'android.net.wifi.p2p.STATE_CHANGED': '0',
                'android.net.wifi.p2p.THIS_DEVICE_CHANGED': '0',
                'android.net.wifi.RSSI_CHANGED': '0',
                'android.net.wifi.SCAN_RESULTS': '0',
                'android.net.wifi.STATE_CHANGE': '0',
                'android.net.wifi.supplicant.CONNECTION_CHANGE': '0',
                'android.net.wifi.supplicant.STATE_CHANGE': '0',
                'android.net.wifi.WIFI_STATE_CHANGED': '0',
                'android.nfc.action.ADAPTER_STATE_CHANGED': '0',
                'android.os.action.POWER_SAVE_MODE_CHANGED': '0',
                'android.provider.Telephony.SIM_FULL': '0',
                'android.provider.Telephony.SMS_CB_RECEIVED': '0',
                'android.provider.Telephony.SMS_DELIVER': '0',
                'android.provider.Telephony.SMS_EMERGENCY_CB_RECEIVED': '0',
                'android.provider.Telephony.SMS_RECEIVED': '0',
                'android.provider.Telephony.SMS_REJECTED': '0',
                'android.provider.Telephony.SMS_SERVICE_CATEGORY_PROGRAM_DATA_RECEIVED': '0',
                'android.provider.Telephony.WAP_PUSH_DELIVER': '0',
                'android.provider.Telephony.WAP_PUSH_RECEIVED': '0',
                'android.speech.tts.engine.TTS_DATA_INSTALLED': '0',
                'android.speech.tts.TTS_QUEUE_PROCESSING_COMPLETED': '0',
                'com.google.gservices.intent.action.GSERVICES_CHANGED': '0',
                'com.google.gservices.intent.action.GSERVICES_OVERRIDE': '0'
            },
            Description: "_",
            WhatsNew: "_",
            Ratings: "0",
            Title: "_",
            DeveloperAddress: "_",
            FourStarRatings: "0",
            LastUpdated:"0",
            ReviewsAverage: "0",
            Price: "0",
            ThreeStarRatings: "0",
            PrivacyPolicyLink: "_",
            Genre: "_",
            FiveStarRatings: "0",
            OneStarRatings: "0",
            Url: "_",
            ContentRating: "_",
            CurrentVersion: "0",
            DeveloperEmail: "_",
            AndroidVersion: "0",
            DeveloperWebsite: "_",
            DeveloperName: "_",
            FileSize: "0",
            TwoStarRatings: "0",
            Downloads: "0",
            vtdetection: "0",
            malicious:  "No"
        };*/

        let root = {
            maxWidth: 400,
            marginLeft: "10px",
            width: "50%"

        };

        const dropDownOptionsVTDetection ={
            suggestions : this.state.suggestions,
            title: "Select Genre"
        }

        return(

            <HashRouter>
                <Card className={root} style={{marginLeft : "10px" , width: "32%"}}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="300"
                            image="apps.png"
                            title="Contemplative Reptile"
                            marginLeft="10%"
                            marginTop="20%"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Predict
                            </Typography>
                            <div style={{display: "inline-grid"}}>
                                <TextField id="standard-basic" value = {this.state.developer} label="Developer"
                                           onChange={this.changeDeveloper.bind(this)} style={{marginBottom: "10px"}}/>

                                <GenericDropDown id="categoryDropDown" style={{width: "200px", marginTop: "10px"}} data = {dropDownOptionsVTDetection} onChange={this.changeCatDropDown.bind(this)}/>

                                <input
                                    style={{ display: 'none' }}
                                    id="raised-button-file"
                                    multiple
                                    type="file"
                                    accept="apk/!*"
                                    onChange={this.handleUpload.bind(this)}

                                />

                                <Typography gutterBottom variant="h5" component="h2" color="secondary" >
                                      {this.state.rotate ? <CircularProgress color="secondary"  style={{marginLeft : "5px"}} /> :  this.state.predictMsg}
                                </Typography>

                                <Typography variant="body2" color="textSecondary" component="p">
                                    Select APK to extract data and click on predict to check the malicious class
                                </Typography>

                                <label htmlFor="raised-button-file">
                                    <Button variant="raised" component="span" variant="contained" color="primary" >
                                        Upload APK
                                    </Button>


                                </label>

                            </div>

                        </CardContent>
                    </CardActionArea>
                    <CardActions style={{marginLeft: "40%"}}>
                        <Button variant="contained" color="primary"  onClick={this.handlePredict.bind(this)} style={{marginLeft : "0"}}>
                            Predict
                        </Button>
                    </CardActions>
                </Card>
            </HashRouter>


           /* <div style={{display : "block", textAlign:"left"}} >

                <input
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    multiple
                    type="file"
                    accept="apk/!*"
                    onChange={this.handleUpload.bind(this)}

                />
                <label htmlFor="raised-button-file">
                    <Button variant="raised" component="span" variant="contained" color="primary" >
                        Upload
                    </Button>
                </label>


                {/!*     <div style={{width : "60%", marginRight : "1%"}}>
                    <Editor
                        value={json}
                        onChange={this.handleChange.bind(this)}
                    />
                </div>*!/}

                <div style={{width : "30%", marginLeft : "1%"}}>
                    <div style={{display : "block"}}>
                        <Typography gutterBottom variant="h5" component="h2">
                            Check Model Accuracy
                        </Typography>

                        <div style={{display : "flex"}}>
    {/!*                        <TextField id="standard-basic" value = {this.state.rowsAccuracy} label="No of Rows to train model" style={{width : "200px"}}
                                       onChange={this.changeAccuracyRows.bind(this)} />*!/}

                            <Button variant="contained" color="primary"  onClick={this.handleTrain.bind(this)} style={{marginLeft : "0"}}>
                                Train
                            </Button>
                            {this.state.
                                rotateTrain ? <CircularProgress color="secondary"  style={{marginLeft : "25px"}} /> : null}
                        </div>
                    </div>

                    <Typography gutterBottom variant="h6" component="h5" style={{marginTop : "2%",  display: "flex"}}>
                        Accuracy :  <Typography gutterBottom variant="h6" component="h5" style={{marginLeft : "2%", color: "red"}}>
                        {this.state.accuracy}
                    </Typography>
                    </Typography>



                    <div style={{marginTop : "30%"}}>
                        <Typography gutterBottom variant="h5" component="h2">
                            Predict Application Class
                        </Typography>
                        <div style={{display : "flex"}}>
                            <Button variant="contained" color="primary"  onClick={this.handlePredict.bind(this)} style={{marginLeft : "0"}}>
                                Predict
                            </Button>
                            {this.state.rotate ? <CircularProgress color="secondary"  style={{marginLeft : "25px"}} /> : null}
                        </div>
                    </div>

                    <Typography gutterBottom variant="h6" component="h5" style={{marginTop : "2%", display: "flex"}}>
                        Predicted Class :
                        <Typography gutterBottom variant="h6" component="h5" style={{marginLeft : "2%", color: "red"}}>
                            {this.state.predictMsg}
                         </Typography>
                    </Typography>

                </div>*/
           /* </div>*/

        )
    }
}

