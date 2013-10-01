/**
 * Created with JetBrains WebStorm.
 * User: MusI
 * Date: 9/23/13
 * Time: 5:19 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('MyDesktop.app.model.WarehouseModel', {
    extend: 'Ext.data.Model',
    alias: 'model.warehouseModel',
    fields: [
        {
            name: 'name',
            type: 'string'
        },
        {
            name: 'code',
            type: 'string'
        },
        {
            name: 'descriptiveAddress',
            type: 'string'
        },
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'specificUse',
            type: 'string'
        },
        {
            name:'organizations',
            type:'auto'

        }
    ],
    /* associations: [
     {
     type        : 'hasMany',
     model       : 'MyDesktop.app.model.CountryStructureModel',
     associationKey:'inputFlows',
     name:         'inputFlows'
     }
     ]
     ,*/
    proxy: {
        type: 'ajax',
        api: {
            read: 'warehouse/view.action',
            create: 'warehouse/create.action',
            update: 'warehouse/update.action',
            destroy: 'warehouse/delete.action'
        },
        listeners: {
            exception: function(proxy, response, operation){
                Ext.MessageBox.show({
                    title: 'REMOTE EXCEPTION',
                    msg: operation.getError(),
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        },
        writer: new Ext.data.writer.Json({
            type: 'json',
            encode:false,
            root: 'data'
        })
    }
});