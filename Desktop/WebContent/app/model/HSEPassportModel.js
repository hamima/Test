/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 7/28/13
 * Time: 5:04 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyDesktop.app.model.HSEPassportModel', {
    extend: 'MyDesktop.app.model.PersonalInfoModel',
    alias: 'model.hsePassModel',
    fields: [
        {
            name: 'medicalDocNumber',
            type: 'string'
        },
        {
            name: 'clothesSize',
            type: 'string'
        },
        {
            name: 'footSize',
            type: 'int'
        },
        {
            name: 'height',
            type: 'float'
        },
        {
            name: 'weight',
            type: 'float'
        },
        {
            name: 'bloodType',
            type: 'string'
        }
    ]
    ,
    proxy: {
        type: 'ajax',
        api: {
            read: 'hsePass/view.action',
            create: 'hsePass/create.action',
            update: 'hsePass/update.action',
            destroy: 'hsePass/delete.action'
        },
        listeners: {
            exception: function(proxy, response, operation){
                Ext.MessageBox.show({
                    title: 'REMOTE EXCEPTION',
                    msg: operation.getError(),
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            },
            success:function(proxy, response, operation){

            }
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        },
        writer:new Ext.data.writer.Json({
            type: 'json',
            root: 'data',
            writeAllFields:true
        })
    }
});