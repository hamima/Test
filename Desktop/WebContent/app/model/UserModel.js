/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 7/28/13
 * Time: 5:04 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyDesktop.app.model.UserModel', {
    extend: 'MyDesktop.app.model.PersonalInfoModel',
    alias: 'model.userModel',
    requires: ['MyDesktop.app.model.OrganModel'],
    fields: [
        {
            name: 'userName',
            type: 'string'
        },
        {
            name: 'password',
            type: 'string'
        },
        {
            name: 'passMustBeChange',
            type: 'string'
        },
        {
            name: 'blocked',
            type: 'string'
        },
        {
            name:'workingAt',
            type:'auto'
        }
    ],
   /* associations: [
		{
			type        : 'hasMany',
			model: 'MyDesktop.app.model.OrganModel',
		    associationKey:'workingAt',
		    autoLoad: true,
		    name: 'workingAt'
		}
	]
    ,*/
    proxy: {
        type: 'ajax',
        api: {
            read: 'user/view.action',
            create: 'user/create.action',
            update: 'user/update.action',
            destroy: 'user/delete.action'
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
            writeAllFields:true
        })
    }
});