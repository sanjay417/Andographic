const UtilityController = require('./ConnectionController');

module.exports = {
    getSQLV1 : (type, vtdetections)=>{

        if(type == 'Benign'){
            return  ' and vtdetection = 0 ';
        }else if( type == 'Malicious' && vtdetections != undefined && vtdetections != 'undefined' && vtdetections.length != 0){
            return  ' and vtdetection IN ('+vtdetections +') ';
        }else{
            return '';
        }
    },

    getSQLV2 : (type, vtdetections)=>{

        if(type == 'Benign'){
            return  ' where vtdetection = 0 ';
        }else if( type == 'Malicious' && vtdetections != undefined && vtdetections != 'undefined' && vtdetections.length != 0){
            return  ' where vtdetection IN ('+vtdetections +') ';
        }else{
            return '';
        }
    },


    concat : (pids)=>{
            let str = "";
            for(let i = 0; i < pids.length; i++) {
                let pid = pids[i]
                str = str + " sum("+pid+") as " +pid;
                if(i != pids.length - 1){
                    str = str + " , "
                }
            }

            return str;
        },
}