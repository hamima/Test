/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 7/28/13
 * Time: 5:04 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('MyDesktop.app.model.CapsuleModel', {
    extend: 'MyDesktop.app.model.EquipModel',
    alias: 'model.capsule',
    fields: [
        {
        	name: 'model',
        	type: 'string'
        },
        {
            name: 'serialNumber',
            type: 'string'
        },
        {
            name: 'reserve',
            type: 'string'
        },
        {
        	name: 'droppingDate',
        	type: 'auto'
        },
        {
            name: 'type',
            type: 'string'
        },
        {
            name: 'capacity',
            type: 'float'
        },
        {
            name:'locations',
            type:'auto'
        }
    ],
/*    associations: [
		{
		    type        : 'hasMany',
		    model       : 'MyDesktop.app.model.CapsuleLocationModel',
		    autoLoad: true,
		    associationKey:'locations',
		    name: 'locations'
		}
	],*/
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
            read: 'capsule/view.action',
            create: 'capsule/create.action',
            update: 'capsule/update.action',
            destroy: 'capsule/delete.action'
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
        writer:new Ext.data.writer.Json({
            type: 'json',
            root: 'data',
            encode:false,
            writeAllFields:false

        })
    }
});