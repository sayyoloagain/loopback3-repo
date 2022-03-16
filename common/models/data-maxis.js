'use strict';

module.exports = function (DataPlanMaxis) {
    _disableRemoteMethod(DataPlanMaxis)

    var __app;
    let count = 1

    DataPlanMaxis.on('attached', function (a) {
        __app = a;
    });

    ///////// Dataplan add

    DataPlanMaxis.addMaxis = async function (data, cb) {
        console.log(data);
    //   // console.log(cb);
    //   // console.log(data.vehiclePicture);
    //   // console.log(__app)
  
    //   if (typeof (data.mobileNumber) === 'undefined' || typeof (data.mobileNumber) === '') {
    //       return Promise.reject({ statusCode: 400, message: 'Missing number.' })
    //   }
    //   // if (typeof (data.FenceSerialNumber) === 'undefined') {
    //   //     return Promise.reject({ statusCode: 400, message: 'Missing FenceSerialNumber.' })
    //   // }
     
  
    //   try {
    //     // Check
    //     let __sensor = await DataPlanMaxis.findOne({ where: { mobileNumber: data.mobileNumber } });
    //     //Fence_id
    //     if (__sensor !== null) {
    //       return Promise.reject({
    //         statusCode: 400,
    //         message: "The number has already registered!.",
    //       });
    //     }
  
  
    //   } catch (error) {
    //     return Promise.reject(error);
    //   }
  
      __addMaxis(__app, data, cb)
    };

    DataPlanMaxis.remoteMethod("addMaxis", {
      description: "Register Maxis Number",
      isStatic: true,
      accepts: [
          { arg: 'data', type: 'object', http: { source: 'body' } },
          { arg: "options", type: "object", http: "optionsFromRequest" }
      ],
      returns: {
        type: "object",
        root: true,
      },
      http: { path: "/addMaxis/", verb: "post" },
    });
    ///////// dataplan add end
    
    DataPlanMaxis.updateMaxis = function (data, cb) {
        // console.log(data);
        _updateMaxis(__app, data, cb)
    }
    DataPlanMaxis.remoteMethod ('updateMaxis', {
        description: `Update Maxis Number`,
        isStatic: true,
        accepts: [
            { arg: 'data', type: 'object', http: { source: 'body' } },
            { arg: "options", type: "object", http: "optionsFromRequest" }
        ],
        returns: {
            type: 'object',
            root: true
        },
        http: { path: '/updateMaxis/', verb: 'post' }
    })
    ///////// dataplan update end
        
    DataPlanMaxis.updateXoxToMaxis = function (data, cb) {
        // console.log(data);
        _changeToMaxis(__app, data, cb)
    }
    DataPlanMaxis.remoteMethod ('updateXoxToMaxis', {
        description: `Change to Maxis Number`,
        isStatic: true,
        accepts: [
            { arg: 'data', type: 'object', http: { source: 'body' } },
            { arg: "options", type: "object", http: "optionsFromRequest" }
        ],
        returns: {
            type: 'object',
            root: true
        },
        http: { path: '/updateXoxToMaxis/', verb: 'post' }
    })
    ///////// dataplan change end

    DataPlanMaxis.deleteMaxis = async function (dataId, cb) {
        console.log(dataId);
        _deleteMaxis(__app, dataId, cb)
    }
    DataPlanMaxis.remoteMethod ('deleteMaxis', {
        description: `Delete Maxis Number`,
        isStatic: true,
        accepts: [
            { arg: "id", type: "number", required: true },
            { arg: "options", type: "object", http: "optionsFromRequest" }
        ],
        returns: {
            type: 'object',
            root: true
        },
        http: { path: '/deleteMaxis/:id', verb: 'delete' }
    })
    ///////// dataplan delete end

    DataPlanMaxis.getLatestDataByDevice = function (cb) {
        _listLatestDataByDevice(__app, cb)
    }
    DataPlanMaxis.remoteMethod ('getLatestDataByDevice', {
        description: `Get Latest Data by Device`,
        isStatic: true,
        accepts: [],
        returns: {
            type: 'object',
            root: true
        },
        http: { path: '/getLatestDataByDevice/', verb: 'get' }
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


async function __addMaxis(__app, data, cb) {
    // 1) find siteId based on siteName, 
    // 2) save siteId, mobileNumber and serialNumber into Device table,
    // 3) get current device id for dataPlanMaxid.deviceId
    // 4) save deviceId, date, etc in dataPlanMaxid
    // console.log(data);

    // 1) search siteId based on site name
    let sitedetail = await __app.models.Site.findOne({   
        where: { or: [{ name: data.siteName }]}})
    console.log(sitedetail);

    let siteIdtemp = sitedetail.id      // take site id from site details
    console.log(siteIdtemp);

    try {
    // 2) save siteId, mobileNumber and serialNumber into Device table,
        let _dataDevice = {
            mobileNumber: data.phoneNumber,
            serialNumber: '000',
            deviceUsername: 'Innates7@gmail.com',
            devicePassword: 'Innates2017',
            siteId: siteIdtemp,  
            }
        let _res1 = await __app.models.Device.create(_dataDevice);
        console.log("_res1", _res1);

    // 3) get new device id for DataPlanMaxis.deviceId
        let deviceIdtemp = _res1.id
        console.log(deviceIdtemp);

    // 4) save deviceId, numbers, date, etc in DataPlanMaxis
        let _dataPlanMaxis = {
            serviceProvider: 'Maxis',
            dataExpiryDate: data.monthlyExpiryDate,         // reconfirm
            linkToMaxis: data.linkToMaxis,
            deviceId: deviceIdtemp,    
        }
        console.log(__app.models.DataPlanMaxis);
        let _res2 = await __app.models.DataPlanMaxis.create(_dataPlanMaxis);
        console.log("_res2", _res2);


    return Promise.resolve(_res2)
        } catch (error) {
            return Promise.reject(error)
        }
}
    
// ##### update maxis #####
async function _updateMaxis(__app, data, cb) {
    console.log("data",data);

    try {
    // 1) update Device table phoneNumber,
        let _dataDevice = {
            mobileNumber: data.phoneNumber,
            }
        let _res1 = await __app.models.Device.upsertWithWhere( 
                { id: data.id }, _dataDevice
        )
    // 2) update dataplan table dataExpiryDate,
        let _dataPlan = {
            dataExpiryDate: data.monthlyExpiryDate,
            }
        let _res2 = await __app.models.DataPlanMaxis.upsertWithWhere( 
                { id: data.id }, _dataPlan
        )

    return Promise.resolve(_res1)
        } catch (error) {
            return Promise.reject(error)
        }
}

// ##### change to maxis #####
async function _changeToMaxis(__app, data, cb) {
    // console.log("data",data);
// 1) find device Id based on number,
let phoneNumberTemp = data.phoneNumber     
let deviceId = ''
deviceId = await __app.models.Device.findOne({
    fields: [
        `id`
    ],where: {mobileNumber: phoneNumberTemp}}
)
console.log('deviceId',deviceId.id);

    try {
    // 2) delete xox data based on deviceId,
        let _res1 = await __app.models.DataPlanXox.findOne({
            fields: [
                `id`
            ],where: { deviceId: deviceId.id }}
        )
        console.log('_res1',_res1.id);
        await __app.models.DataPlanXox.destroyById(_res1.id)
    // 2) create new dataplan in table Maxis with deviceId,
        let _dataPlanMaxis = {
            serviceProvider: 'Maxis',
            dataExpiryDate: data.monthlyExpiryDate,         // reconfirm
            linkToMaxis: data.linkToMaxis,
            deviceId: deviceId.id,    
            createdAt: new Date()
        }
        let _res2 = await __app.models.DataPlanMaxis.create(_dataPlanMaxis);
        console.log("_res2", _res2);

    return Promise.resolve(_res2)
        } catch (error) {
            return Promise.reject(error)
        }
}

async function _deleteMaxis(app, dataId, cb) {    
    let _deviceExist = await app.models.Device.findOne({where: {id:dataId}})
    let _dataExist = await app.models.DataPlanMaxis.find({fields: [`id`], where: {deviceId: dataId}})
    // console.log(_dataExist);
    let _allDataId = []
        _dataExist.forEach(element => {
        _allDataId.push(element.id)
    })
    console.log(_allDataId.length)
    for (let i=0;i<_allDataId.length;i++) {
        await app.models.DataPlanMaxis.destroyById(_allDataId[i])
    }
    await app.models.Device.destroyById(_deviceExist.id)
}