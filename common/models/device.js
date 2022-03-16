'use strict';
const uid = require('uid2');
const LENGTH = 16

module.exports = function (Device) {
    _disableRemoteMethod(Device)

    var __app;

    Device.on('attached', function (a) {
        __app = a;
    });

    Device.DeviceAddXox = async function (data, cb) {
        //     console.log(data);
        //   // console.log(cb);
        // console.log(data.siteName);
        // console.log(data.serialNumber);
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
      
          __registerXoxNumber(__app, data, cb)
      
        };
      
        Device.remoteMethod("deviceAddXox", {
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
          http: { path: "/deviceAddXox/", verb: "post" },
        });

    Device.register = async function (data) {
        // console.log(data)
        if (typeof (data.name) === 'undefined') {
            return Promise.reject({ statusCode: 400, message: 'Missing name.' })
        }
        if (typeof (data.devid) === 'undefined') {
            return Promise.reject({ statusCode: 400, message: 'Missing devid.' })
        }

        try {
            // Check
            let __sensor = await Device.findOne({ where: { device_id: data.devid } })
            if (__sensor !== null) {
                return Promise.reject({ statusCode: 400, message: 'Sensor Device already register!.' })
            }

            let _apiKey = await __createApiKey()
            let _data = { name: data.name, device_id: data.devid, api_key: _apiKey }
            let _res = await Device.create(_data)

            return Promise.resolve(_res)
        } catch (error) {
            return Promise.reject(error)
        }
    }
    Device.remoteMethod('register', {
        description: 'Register Device',
        isStatic: true,
        accepts: [{ arg: 'data', type: 'object', http: { source: 'body' } }],
        returns: {
            type: 'object',
            root: true
        },
        http: { path: '/register', verb: 'post' }
    })

    Device.updateInfo = async function (id, data) {
        // console.log(data)
        // if (typeof (id) === 'undefined') {
        //     return Promise.reject({ statusCode: 400, message: 'Missing id.' })
        // }
        // if (typeof (data.name) === 'undefined') {
        //     return Promise.reject({ statusCode: 400, message: 'Missing name.' })
        // }
        // if (typeof (data.devid) === 'undefined') {
        //     return Promise.reject({ statusCode: 400, message: 'Missing devid.' })
        // }

        try {
            // Check
            // let __sensor = await Device.findOne({ where: { device_id: data.devid } })
            // if (__sensor !== null) {
            //     if (__sensor.id !== id) {
            //         return Promise.reject({ statusCode: 400, message: 'Device already register!.' })
            //     }
            // }

            let _res = await Device.updateAll({id: id}, data)

            return Promise.resolve(_res)
        } catch (error) {
            return Promise.reject(error)
        }
    }


    Device.remoteMethod('updateInfo', {
        description: 'Update Info',
        isStatic: true,
        accepts: [
            { arg: 'id', type: 'string', required: true },
            { arg: 'data', type: 'object', http: { source: 'body' } }
        ],
        returns: {
            type: 'object',
            root: true
        },
        http: { path: '/update/info/:id', verb: 'post' }
    })

    //----- UPDATE -----

    Device.updateDevice = async function (id, body) {
        console.log(id)
        console.log(body)
        try {

            // let _id = await CollarDevice.findOne({ where: { id: id } })
            // if (_id === null) {
            //     return Promise.reject({ statusCode: 400, message: 'User not Found.' })
            // }

            // if (typeof (body.username) !== 'undefined') {
            //     return Promise.reject({ statusCode: 400, message: 'Cannot update username.' })
            // }

            // if (typeof (body.username) !== 'undefined') {
            //     return Promise.reject({ statusCode: 400, message: 'Cannot update username.' })
            // }
            console.log(body)

            await Device.updateAll({ id: id }, body)

            return Promise.resolve('OK')
        } catch (error) {
            return Promise.reject(error)
        }
    }
    Device.remoteMethod('updateDevice', {
        description: `Update Device`,
        isStatic: true,
        accepts: [
            { arg: 'id', type: 'number', required: true },
            { arg: 'data', type: 'object', required: true, http: { source: 'body' } },
            { arg: "options", type: "object", http: "optionsFromRequest" }
        ],
        returns: {
            type: 'object',
            root: true
        },
        http: { path: '/updateDevice/:id', verb: 'post' }
    })

    Device.updateDevice = async function (id, body) {
        console.log(id)
        console.log(body)
        try {

            // let _id = await CollarDevice.findOne({ where: { id: id } })
            // if (_id === null) {
            //     return Promise.reject({ statusCode: 400, message: 'User not Found.' })
            // }

            // if (typeof (body.username) !== 'undefined') {
            //     return Promise.reject({ statusCode: 400, message: 'Cannot update username.' })
            // }

            // if (typeof (body.username) !== 'undefined') {
            //     return Promise.reject({ statusCode: 400, message: 'Cannot update username.' })
            // }
            console.log(body)

            await Device.updateAll({ id: id }, body)

            return Promise.resolve('OK')
        } catch (error) {
            return Promise.reject(error)
        }
    }
    Device.remoteMethod('updateDevice', {
        description: `Update Device`,
        isStatic: true,
        accepts: [
            { arg: 'id', type: 'number', required: true },
            { arg: 'data', type: 'object', required: true, http: { source: 'body' } },
            { arg: "options", type: "object", http: "optionsFromRequest" }
        ],
        returns: {
            type: 'object',
            root: true
        },
        http: { path: '/updateDevice/:id', verb: 'post' }
    })
    
    Device.listDevice = function (cb) {
        __listDevice(__app, cb)   
    }
    Device.remoteMethod('listDevice', {
        description: `Get List of Devices`,
        isStatic: true,
        accepts: [],
        returns: {
            type: 'object',
            root: true
        },
        http: { path: '/list', verb: 'get' }
    })

    //----- DELETE -----

    Device.removeDevice = async function (id) {
        try {
            let _id = await Device.findOne({ where: { id: id } })
            if (_id === null) {
                return Promise.reject({ statusCode: 400, message: 'ID not Found.' })
            }

            await Device.destroyById(_id.id)

            return Promise.resolve('OK')
        } catch (error) {
            return Promise.reject(error)
        }
    }
    Device.remoteMethod('removeDevice', {
        description: `Remove Device`,
        isStatic: true,
        accepts: { arg: 'id', type: 'number', required: true },
        returns: {
            type: 'object',
            root: true
        },
        http: { path: '/removeDevice/:id', verb: 'delete' }
    })
    
};

 

function _disableRemoteMethod(Model) {
    // GET
    Model.disableRemoteMethodByName('find')

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

async function __registerXoxNumber(__app, data, cb) {
    // console.log(__app)
    // console.log(data);
    // let testSiteName = 'umw'
    // search site id, then device id

    let onesiteId = await __app.models.Site.findOne({
        where: { or: [{ name: data.site }]}})
    let siteId = onesiteId.id
    console.log('onesiteId', siteId);
    let companyId = await __app.models.Company.find({
    })
    // console.log('companyId',companyId);


        try {
    
          let _dataSite = {
              name: data.siteName,
              apiKey: 3000,
              alertSwitch: 1,
              companyId: 1,
          }

          let _dataDevice = {
            serialNumber: data.serialNumber,
            siteId: onesiteId.id,  // site based on input
            }
            let _res2 = ''
        //   _res2 = await __app.models.Device.create(_dataDevice);
        //   console.log(_res2.id);

          let _dataPlanXox = {
            mobileNumber: data.phoneNumber,
            serviceProvider: 'XOX',
            simCardExpiryDate: data.simCardExpiryDate,
            dataExpiryDate: data.monthlyExpiryDate,
            seasonPassExpiryDate: data.seasonPass,
            seasonPassBal: data.seasonPassBal,
            dataQuota: 12,
            dataBalance: data.dataBalance,
            linkToXox: data.linkToXox,
            deviceId: 1,    
          }

        //   let _res = await __app.models.Site.create(_dataSite);
        //   console.log(_res.id);

        //   let _res = await __app.models.DataPlanXox.create(_dataPlanXox);
        //   console.log(_res.id);

    
        return Promise.resolve(onesiteId)
            } catch (error) {
                return Promise.reject(error)
            }
    }

async function __listDevice(app ,cb) {
    try {
        let allDevice = await app.models.Device.find()
        let allSite = await app.models.Site.find()
        console.log('alldevice',allDevice);
        console.log('allsite',allSite);

        let ListID = []
        let allSiteId = []

        allDevice.forEach( element => {
            ListID.push(element.id)
        })
        allDevice.forEach( element => {
            allSiteId.push(element.siteId)
        })
        console.log('test', allSiteId);

        let LatestDataEachID = []
        let result

        for(let index=0; index < allDevice.length ; index++) {
        // let device = await app.models.Device.find({ 
            result = await app.models.Device.find({ 
                fields: [ 
                    // "id" ,
                    // "serialNumber" ,
                    // "siteId" ,
                    "id" ,
                    "name" ,
                    "apiKey" ,
                    "alertSwitch" ,
                    "companyId" ,
            ], 
            where: { and: [{ isDeleted: false }, { siteId: allSiteId[index] } ] },
            include: "Site",
        })
        console.log('result', result);
        LatestDataEachID.push(result)
    }

        cb(null, LatestDataEachID)
    } catch (error) {
        cb(error)
    }
}

function __createApiKey() {
    return new Promise((resolve, reject) => {
        uid(LENGTH, function (err, guid) {
            if (err) {
                console.log(err)
                return reject(err)
            }

            // console.log(guid)
            resolve(guid)
        });
    })
}