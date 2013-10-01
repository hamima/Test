/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 8/17/13
 * Time: 2:49 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyDesktop.app.model.FlowStructureModel', {
    extend: 'Ext.data.Model',
    alias: 'model.fsModel',
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
            name: 'type',
            type: 'string'
        },
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'level',
            type: 'int'
        },
        {
            name:'inputFlows',
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
            read: 'flow/view.action',
            create: 'flow/create.action',
            update: 'flow/update.action',
            destroy: 'flow/delete.action'
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
            writeAllFields:false,
            encode:false,
            root: 'data'
        })
    }
});