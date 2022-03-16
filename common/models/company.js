'use strict';

module.exports = function (Site) {
    _disableRemoteMethod(Site)

    var __app;
    let count = 1

    Site.on('attached', function (a) {
        __app = a;
    });

    

    Site.getLatestDataByDevice = function (cb) {
        _listLatestDataByDevice(__app, cb)
    }
    Site.remoteMethod ('getLatestDataByDevice', {
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

async function _listLatestDataByDevice(app, cb) {
    try {
        let allCollar = await app.models.Site.find()
        // console.log('allcollar',allCollar);

        let ListID = []
        
        allCollar.forEach( element => {
            ListID.push(element.id)
        })

        let LatestDataEachID = []
        let result

        for(let index=0; index < allCollar.length ; index++) {
            result = await app.models.Site.find({
                fields: [ 
                    `id`,
                    `name`,
                    `apiKey`,
                    `alertSwitch`,
                    `companyId`
                     ], 
                where: { and: [{ isDeleted: false }, { companyId: ListID[index] } ] },
                include: "Company",
                // order: 'createdDate DESC',
            })
        }
        console.log(result);
        LatestDataEachID.push(result)
        
        cb(null, LatestDataEachID)
    } catch (error) {
        cb(error)
    }
}