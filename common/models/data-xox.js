'use strict';

module.exports = function (DataPlanXox) {
    _disableRemoteMethod(DataPlanXox)

    var __app;
    let count = 1

    DataPlanXox.on('attached', function (a) {
        __app = a;
    });

    ///////// Dataplan add

    DataPlanXox.addXox = async function (data, cb) {
  
      __registerNewXox(__app, data, cb)
  
    };
  
    DataPlanXox.remoteMethod("addXox", {
      description: "Register Xox Number",
      isStatic: true,
      accepts: [
          { arg: 'data', type: 'object', http: { source: 'body' } },
          { arg: "options", type: "object", http: "optionsFromRequest" }
      ],
      returns: {
        type: "object",
        root: true,
      },
      http: { path: "/addXox/", verb: "post" },
    });

    ///////// dataplan add end

    DataPlanXox.updateXox = function (data, cb) {
        console.log(data);
        _updateXox(__app, data, cb)
    }
    DataPlanXox.remoteMethod ('updateXox', {
        description: `Update Xox Number`,
        isStatic: true,
        accepts: [
            { arg: 'data', type: 'object', http: { source: 'body' } },
            { arg: "options", type: "object", http: "optionsFromRequest" }
        ],
        returns: {
            type: 'object',
            root: true
        },
        http: { path: '/updateXox/', verb: 'post' }
    })
    ///////// dataplan update end

    DataPlanXox.updateMaxisToXox = function (data, cb) {
        // console.log(data);
        _changeToXox(__app, data, cb)
    }
    DataPlanXox.remoteMethod ('updateMaxisToXox', {
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
        http: { path: '/updateMaxisToXox/', verb: 'post' }
    })
    ///////// dataplan change end

    DataPlanXox.deleteXox = async function (dataId, cb) {
        // console.log(dataId);
        _deleteXox(__app, dataId, cb)
    }
    DataPlanXox.remoteMethod ('deleteXox', {
        description: `Delete Xox Number`,
        isStatic: true,
        accepts: [
            { arg: "id", type: "number", required: true },
            { arg: "options", type: "object", http: "optionsFromRequest" }
        ],
        returns: {
            type: 'object',
            root: true
        },
        http: { path: '/deleteXox/:id', verb: 'delete' }
    })
    ///////// dataplan delete end

    DataPlanXox.getLatestDataByDevice = function (cb) {
        _listLatestDataByDevice(__app, cb)
    }
    DataPlanXox.remoteMethod ('getLatestDataByDevice', {
        description: `Get Latest Data by Device`,
        isStatic: true,
        accepts: [],
        returns: {
            type: 'object',
            root: true
        },
        http: { path: '/getLatestDataByDevice/', verb: 'get' }
    })


    DataPlanXox.getLatestCompanyData = function (cb) {
        _listLatestCompanyData(__app, cb)
    }
    DataPlanXox.remoteMethod ('getLatestCompanyData', {
        description: `Get Latest Data by Device`,
        isStatic: true,
        accepts: [],
        returns: {
            type: 'object',
            root: true
        },
        http: { path: '/getLatestCompanyData/', verb: 'get' }
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


async function __registerNewXox(__app, data, cb) {
    // 1) find siteId based on siteName, 
    // 2) save siteId, numbers and serialNumber into Device table,
    // 3) get current device id for dataPlanXox.deviceId
    // 4) save deviceId, date, etc in dataPlanXox
    console.log(data);

    // 1) search siteId based on site name
    let sitedetail = await __app.models.Site.findOne({   
        where: { or: [{ name: data.siteName }]}})
    console.log(sitedetail);

    let siteIdtemp = sitedetail.id      // take site id from site details
    console.log(siteIdtemp);

    try {
    // 2) save siteId, numbers and serialNumber into Device table,
        let _dataDevice = {
            mobileNumber: data.phoneNumber,
            serialNumber: data.serialNumber,
            siteId: siteIdtemp,  
            }
        let _res1 = await __app.models.Device.create(_dataDevice);
        console.log("_res1", _res1);

    // 3) get new device id for dataPlanXox.deviceId
        let deviceIdtemp = _res1.id
        console.log(deviceIdtemp);

    // 4) save deviceId, numbers, date, etc in dataPlanXox
        let _dataPlanXox = {
            serviceProvider: 'XOX',
            simCardExpiryDate: data.simCardExpiryDate,     
            dataExpiryDate: data.monthlyExpiryDate,         
            seasonPassBal: data.seasonPassBal,
            dataBalance: data.monthlyData,
            linkToXox: data.linkToXox,
            deviceId: deviceIdtemp,    
        }
        let _res2 = await __app.models.DataPlanXox.create(_dataPlanXox);
        console.log("_res2", _res2);


    return Promise.resolve(_res2)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    // ##### update xox #####
    async function _updateXox(__app, data, cb) {
        // console.log("data",data.id);
    
        try {
        // 1) update Device table phoneNumber,
            let _dataDevice = {
                mobileNumber: data.phoneNumber,
                }
            let _res1 = await __app.models.Device.upsertWithWhere( 
                 { id: data.id }, _dataDevice
            )

        // 2) update dataplan table monthlyExpiryDate,
            let _dataPlan = {
                linkToXox: data.linkToXox,
                dataExpiryDate: data.monthlyExpiryDate,
                dataBalance: data.monthlyData,
                seasonPassBal: data.seasonPassBal,
                simCardExpiryDate: data.simCardExpiryDate,      // reconfirm
                }
            let _res2 = await __app.models.DataPlanXox.upsertWithWhere( 
                 { id: data.id }, _dataPlan
            )
    
        return Promise.resolve(data)
            } catch (error) {
                return Promise.reject(error)
            }
        }

    // ##### change to maxis #####
    async function _changeToXox(__app, data, cb) {
        console.log("data",data);

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
        // 2) delete maxis data based on deviceId,
            let _res1 = await __app.models.DataPlanXox.findOne({
                fields: [
                    `id`
                ],where: { deviceId: deviceId.id }}
            )
            console.log('_res1',_res1.id);
            await __app.models.DataPlanXox.destroyById(_res1.id)
        // 2) create new dataplan in table xox with deviceId,
            let _dataPlanXox = {
                serviceProvider: 'XOX',
                linkToXox: data.linkToXox,
                dataBalance: data.dataBalance,
                seasonPassBal: data.seasonPassBal,
                simCardExpiryDate: data.simCardExpiryDate, 
                deviceId: deviceId.id,     
                createdAt: new Date()
            }
            let _res2 = await __app.models.DataPlanXox.create(_dataPlanXox);
            console.log("_res2", _res2);

        return Promise.resolve(_res2)
            } catch (error) {
                return Promise.reject(error)
            }
        }

async function _deleteXox(app, dataId, cb) {    
    let _deviceExist = await app.models.Device.findOne({where: {id:dataId}})
    let _dataExist = await app.models.DataPlanXox.find({fields: [`id`], where: {deviceId: dataId}})
    console.log(_dataExist);
    let _allDataId = []
        _dataExist.forEach(element => {
        _allDataId.push(element.id)
    })
    console.log(_allDataId.length)
    for (let i=0;i<_allDataId.length;i++) {
        await app.models.DataPlanXox.destroyById(_allDataId[i])
    }
    await app.models.Device.destroyById(_deviceExist.id)
}