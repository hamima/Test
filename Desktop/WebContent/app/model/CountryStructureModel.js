/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 8/17/13
 * Time: 2:46 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyDesktop.app.model.CountryStructureModel', {
    extend: 'Ext.data.Model',
    alias: 'model.csModel',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'name',
            sortType: 'asText',
            type: 'string'
        },
        {
            name: 'code',
            sortType: 'asText',
            type: 'string'
        },
        {
            name: 'level',
            type: 'int'
        },
        {
            name:'parent',
            type:'auto'
        }
    ],
    proxy: {
        type: 'ajax',
        api: {
            read: 'countryStructure/view.action',
            create: 'countryStructure/create.action',
            update: 'countryStructure/update.action',
            destroy: 'countryStructure/delete.action'
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