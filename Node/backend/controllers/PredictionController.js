const ConnectionController = require('./ConnectionController');
const SummaryController = require('./SummaryController');
let DataFrame = require('dataframe-js').DataFrame;

module.exports = {

    predict : ()=>{



        let result =  SummaryController.getRandomRecords(0);
        const df = new DataFrame(result, ['ID1','ID2','ID3','ID4','ID5','ID6','ID7','ID8','ID9','ID10','ID11','ID12','ID13','ID14','ID15','ID16','ID17','ID18','ID19','ID20',
            'ID21','ID22','ID23','ID24','ID25','ID26','ID27','ID28','ID29','ID30','ID31','ID32','ID33','ID34','ID35','ID36','ID37','ID38','ID39','ID40','ID41',
            'ID42','ID43','ID44','ID45','ID46','ID47','ID48','ID49','ID50','ID51','ID52','ID53','ID54','ID55','ID56','ID57','ID58','ID59','ID60','ID61','ID62',
            'ID63','ID64','ID65','ID66','ID67','ID68','ID69','ID70','ID71','ID72','ID73','ID74','ID75','ID76','ID77','ID78','ID79','ID80','ID81','ID82','ID83',
            'ID84','ID85','ID86','ID87','ID88','ID89','ID90','ID91','ID92','ID93','ID94','ID95','ID96','ID97','ID98','ID99','ID100','ID101','ID102','ID103',
            'ID104','ID105','ID106','ID107','ID108','ID109','ID110','ID111','ID112','ID113','ID114','ID115','ID116','ID117','ID118','ID119','ID120','ID121',
            'ID122','ID123','ID124','ID125','ID126','ID127','ID128','ID129','ID130','ID131','ID132','ID133','ID134','ID135','ID136','ID137','ID138','ID139',
            'ID140','ID141','ID142','ID143','ID144','ID145','ID146','ID147','ID148','ID149','ID150','ID151','ID152','ID153','ID154','ID155','ID156','ID157',
            'ID158','ID159','ID160','ID161','ID162','ID163','ID164','ID165','ID166','ID167','ID168','ID169','ID170','ID171','ID172','ID173','ID174','ID175',
            'ID176','ID177','ID178','ID179','ID180','ID181','ID182','ID183','ID184','ID185','ID186','ID187','ID188','ID189','ID190','ID191','ID192','ID193',
            'ID194','ID195','ID196','ID197','ID198','ID199','ID200','ID201','ID202','ID203','ID204','ID205','ID206','ID207','ID208','ID209','ID210','ID211',
            'ID212','ID213','ID214','ID215','ID216','ID217','ID218','ID219','ID220','ID221','ID222','ID223','ID224','ID225','ID226','ID227','ID228','ID229',
            'ID230','ID231','ID232','ID233','ID234','ID235','ID236','ID237','ID238','ID239','ID240','ID241','ID242','ID243','ID244','ID245','ID246','ID247',
            'ID248','ID249','ID250','ID251','ID252','ID253','ID254','ID255','ID256','ID257','ID258','ID259','ID260','ID261','ID262','ID263','ID264','ID265',
            'ID266','ID267','ID268','ID269','ID270','ID271','ID272','ID273','ID274','ID275','ID276','ID277','ID278','ID279','ID280','ID281','ID282','ID283',
            'ID284','ID285','ID286','ID287','ID288','ID289','ID290','ID291','ID292','ID293','ID294','ID295','ID296','ID297','ID298','ID299','ID300','ID301',
            'ID302','ID303','ID304','ID305','ID306','ID307','ID308','ID309','ID310','ID311','ID312','ID313','ID314','ID317','ID319',
            'ID321','Ratings','FourStarRatings',
            'ThreeStarRatings','Genre','FiveStarRatings',
            'DeveloperName','TwoStarRatings',
            'vtdetection','malicious']);

        console.log("######", df.dim());
        return result;
    }
}