/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 7/28/13
 * Time: 5:04 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('MyDesktop.app.model.EquipmentTypeModel', {
    extend: 'Ext.data.Model',
    alias: 'model.equipmentType',
    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'name',
            type: 'string'
        },
        {
            name: 'defaults',
            type: 'auto'
        },
        {
            name: 'type',
            type: 'string'
        },
        {
            name: 'num',
            type: 'string'
        }
    ],
//    validations: [
//	    {type: 'presence',  field: 'age'},
//	    {type: 'length',    field: 'name',     min: 2},
//	    {type: 'inclusion', field: 'gender',   list: ['Male', 'Female']},
//	    {type: 'exclusion', field: 'username', list: ['Admin', 'Operator']},
//	    {type: 'format',    field: 'username', matcher: /([a-z]+)[0-9]{2,3}/}
//    ]
//    ,
    proxy: {
        type: 'ajax',
        api: {
            read: 'equipmentType/view.action',
            create: 'equipmentType/create.action',
            update: 'equipmentType/update.action',
            destroy: 'equipmentType/delete.action'
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
        writer:new Ext.data.writer.Json({
            type: 'json',
            root: 'data',
            encode:false,
            writeAllFields:false
        })
    }
});