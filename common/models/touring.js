'use strict';

const { callbackPromise } = require("nodemailer/lib/shared");

module.exports = function (TourTimetable) {
    _disableRemoteMethod(TourTimetable)

    var __app;
    let count = 1

    TourTimetable.on('attached', function (a) {
        __app = a;
    });

    TourTimetable.getLatestDataByDevice = function (cb) {
        _listLatestDataByDevice(__app, cb)
    }
    TourTimetable.remoteMethod ('getLatestDataByDevice', {
        description: `Get Latest Data by Device`,
        isStatic: true,
        accepts: [],
        returns: {
            type: 'object',
            root: true
        },
        http: { path: '/getLatestDataByDevice/', verb: 'get' }
    })

    TourTimetable.addTimetableData = function (data, cb) {
        _addTimetableData(__app, data, cb)
    }
    TourTimetable.remoteMethod ('addTimetableData', {
        description: `Add Timetable Data`,
        isStatic: true,
        accepts: [
            { arg: 'data', type: 'object', http: { source: 'body' } },
            { arg: "options", type: "object", http: "optionsFromRequest" }
        ],
        returns: {
            type: 'object',
            root: true
        },
        http: { path: '/addTimetableData/', verb: 'post' }
    })

    TourTimetable.deleteTimetableData = async function (data, cb) {
        _deleteTimetableData(__app, data, cb)
    }
    TourTimetable.remoteMethod ('deleteTimetableData', {
        description: `Delete Timetable Data`,
        isStatic: true,
        accepts: [
            { arg: "id", type: "number", required: true },
            { arg: "options", type: "object", http: "optionsFromRequest" }
        ],
        returns: {
            type: 'object',
            root: true
        },
        http: { path: '/deleteTimetableData/:id', verb: 'delete' }
    })

};
function _disableRemoteMethod(Model) {
    // GET
    // Model.disableRemoteMethodByName('find')

    // POST 
    Model.disableRemoteMethodByName('create')

    // PUT
    Model.disableRemoteMethodByName('replaceOrCreate')

    // PATCH
    Model.disableRemoteMethodByName('patchOrCreate')

    // GET /findOne
    Model.disableRemoteMethodByName('findOne')

    // GET /:id
    Model.disableRemoteMethodByName('findById')

    // GET /:id/exists
    Model.disableRemoteMethodByName('exists')

    // GET /count
    // Model.disableRemoteMethodByName('count')

    // POST /update
    Model.disableRemoteMethodByName('updateAll')

    // DELETE /:id
    Model.disableRemoteMethodByName('deleteById')

    // PATCH /:id
    Model.disableRemoteMethodByName('prototype.patchAttributes')

    // PUT /:id
    Model.disableRemoteMethodByName('replaceById')

    // POST|GET	/change-stream
    Model.disableRemoteMethodByName('createChangeStream')

    // POST	/upsertWithWhere
    Model.disableRemoteMethodByName('upsertWithWhere')


    //=================== From Related Model =====================================

    let _relationName = []
    // POST /{id}/{relation-name}
    // Model.disableRemoteMethodByName('prototype.__create__' + _relationName)
    _relationName.forEach(element => {
        Model.disableRemoteMethodByName('prototype.__create__' + element)
    });

    // // GET /{id}/{relation-name}
    // Model.disableRemoteMethodByName('prototype.__get__' + _relationName);

    // DELETE /{id}/{relation-name}
    // Model.disableRemoteMethodByName('prototype.__delete__' + _relationName)
    _relationName.forEach(element => {
        Model.disableRemoteMethodByName('prototype.__delete__' + element)
    });

    // // PUT /{id}/{relation-name}
    // Model.disableRemoteMethodByName('prototype.__update__' + _relationName);
    _relationName.forEach(element => {
        Model.disableRemoteMethodByName('prototype.__update__' + element)
    });

    // // DELETE /{id}/{relation-name}
    // Model.disableRemoteMethodByName('prototype.__destroy__' + _relationName)
    _relationName.forEach(element => {
        Model.disableRemoteMethodByName('prototype.__destroy__' + element)
    });

    // GET /{id}/{relation-name}/{fk}
    // Model.disableRemoteMethodByName('prototype.__findById__' + _relationName);
    _relationName.forEach(element => {
        Model.disableRemoteMethodByName('prototype.__findById__' + element)
    });

    // PUT /{id}/{relation-name}/{fk}
    // Model.disableRemoteMethodByName('prototype.__updateById__' + _relationName);
    _relationName.forEach(element => {
        Model.disableRemoteMethodByName('prototype.__updateById__' + element)
    });

    // DELETE /{id}/{relation-name}/{fk}
    // Model.disableRemoteMethodByName('prototype.__destroyById__' + _relationName)
    _relationName.forEach(element => {
        Model.disableRemoteMethodByName('prototype.__destroyById__' + element)
    });
}

async function _addTimetableData(app, data, cb) {
    console.log("siteId", data);
    let _site = await app.models.TourTimetable.findOne({ where: { siteId: data.siteId } })
    // console.log("_site", _site);
    let alertTemp = 0, alertTimeTemp = 0, hours = 0,seconds = 0
    
    if (data.alert === 0) {
        alertTemp = 0, alertTimeTemp = 0
    }
    else {
        alertTemp = 1, alertTimeTemp = hours+':'+data.alert+':'+seconds;
    }

    try {
        if (_site != null || data.siteId === 0) {
            return console.log("Data exist");
        }
        else if (_site === null) {
            console.log("Data don't exist yet");

        let timeTemp = []
        for (let i=0;i<24;i++) {
            if (data.time.includes(i.toString())) {
                timeTemp.push(1)
            }
            else {
                timeTemp.push(0)
            }
        }

    // 2) save data into tourtimetable table,
        let _timetableData = {
            am12: timeTemp[0],
            am1: timeTemp[1],
            am2: timeTemp[2],
            am3: timeTemp[3],
            am4: timeTemp[4],
            am5: timeTemp[5],
            am6: timeTemp[6],
            am7: timeTemp[7],
            am8: timeTemp[8],
            am9: timeTemp[9],
            am10:timeTemp[10],
            am11:timeTemp[11],
            pm12:timeTemp[12],
            pm1: timeTemp[13],
            pm2: timeTemp[14],
            pm3: timeTemp[15],
            pm4: timeTemp[16],
            pm5: timeTemp[17],
            pm6: timeTemp[18],
            pm7: timeTemp[19],
            pm8: timeTemp[20],
            pm9: timeTemp[21],
            pm10:timeTemp[22],
            pm11:timeTemp[23],
            siteId: (data.siteId) + 1,
            alert: alertTemp,
            alertTime: (alertTimeTemp),
            }
        // console.log("_timetableData",_timetableData);
        // let res1 = await app.models.TourTimetable.create(_timetableData);
        // console.log("res1", res1);
        return Promise.resolve(res1)
        }        
        cb(null, test)
    } catch (error) {
        return Promise.reject(error)
    }
}

async function _deleteTimetableData(app, dataId, cb) { 
    let _timetable = await app.models.TourTimetable.findOne({where: {siteId:dataId}})
    try {
        await app.models.TourTimetable.destroyById(dataId)
    } catch (error) {
        cb(error)
    }
}

async function _listLatestDataByDevice(app, cb) {
    try {
        let result = [], SiteID = [], test = []

        let result1 = await app.models.TourTimetable.find()
        result1.forEach( element => {
            SiteID.push(element.siteId)
        })
        console.log('SiteID',SiteID.length);
        
        for(let index=0; index < SiteID.length ; index++) {
            result = await app.models.Site.find({include: {
                relation: "TourTimetable",
            },where: {
                id: SiteID[index] 
            },
            }),test.push(result)
        }
        console.log('result',test);
        cb(null, test)
    } catch (error) {
        cb(error)
    }
}