/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 8/21/13
 * Time: 12:03 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyDesktop.app.model.EquipModel', {
    extend: 'Ext.data.Model',
    alias: 'model.equipModel',
    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'eqNumber',
            type: 'string'
        },
        {
            name: 'shomarePeyman',
            type: 'string'
        },
        {
            name: 'address',
            type: 'string'
        },
        {
            name: 'executer',
            type: 'string'
        },
        {
            name: 'longtitute',
            type: 'string'
        },
        {
            name: 'latitute',
            type: 'string'
        },
        {
            name: 'height',
            type: 'string'
        },
        {
            name: 'gathered',
            type: 'string',
            defaultValue:'NO'
        },
        {
            name: 'gatheringNotes',
            type: 'string'
        },
        {
            name: 'lunchTime',
            type: 'auto'
        },
        {
            name: 'gatheringDate',
            type: 'auto'
        },
        {
            name: 'locked',
            type: 'string',
            defaultValue:'NO'
        },
        {
            name:'flows',
            type:'auto',
            defaultValue:null
        },
        {
            name:'countryStructure',
            type:'auto',
            defaultValue:null
        },
        {
            name:'eqType',
            type:'auto',
            defaultValue:null
        }

    ]
    ,
    proxy: {
        type: 'ajax',
        api: {
            read: 'post/view.action',
            create: 'post/create.action',
            update: 'post/update.action',
            destroy: 'post/delete.action'
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
            totalProperty : 'total',
            successProperty: 'success'
        },
        writer: new Ext.data.writer.Json({
            type: 'json',
            writeAllFields:false,
            root: 'data',
            encode:false
        })
    }
});