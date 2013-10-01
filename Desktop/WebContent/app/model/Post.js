/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 7/28/13
 * Time: 5:04 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyDesktop.app.model.Post', {
    extend: 'Ext.data.Model',
    alias: 'model.postModel',

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
            name: 'level',
            type: 'int'
        },
        {
            name: 'hseunderControl',
            type: 'string',
            defaultValue:'NO'
        },
        {
           name:'parent',
           type:'auto'
        }

    ]
/*	associations: [
		{
		    type        : 'hasOne',
		    model       : 'MyDesktop.app.model.Post',
		    getterName  : 'getParent',   // if not overridden you get 'getFoo.model.Parent'
		    setterName  : 'setParent',   // if not overridden you get 'setFoo.model.Parent'
		    instanceName: 'parent',
		    name:         'parent'
		}
	]*/
    ,
    proxy: {
        type: 'ajax',
        batchActions: true,
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
            root: 'data'
        })
    }
});