/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 7/28/13
 * Time: 5:04 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyDesktop.app.model.PersonalInfoModel', {
    extend: 'Ext.data.Model',
    alias: 'model.personalInfoModel',
    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'firstName',
            type: 'string'
        },
        {
            name: 'lastName',
            type: 'string'
        },
        {
            name: 'email',
            type: 'string'
        },
        {
            name: 'cellphone',
            type: 'string'
        },
        {
            name: 'telephone',
            type: 'string'
        },
        {
            name: 'emergencyPhone',
            type: 'string'
        },
        {
            name: 'nationalCode',
            type: 'string'
        },
        {
            name: 'personelCode',
            type: 'string'
        },
        {
            name: 'post',
            type: 'auto'
        },
        {
            name: 'medicalDocNumber',
            type: 'string'
        },
        {
            name: 'clothesSize',
            type: 'string',
            defaultValue:'XL'
        },
        {
            name: 'footSize',
            type: 'int',
            defaultValue:35
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
            type: 'string',
            defaultValue:'Amm'
        },
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
            type: 'string',
            defaultValue:'NO'
        },
        {
            name: 'blocked',
            type: 'string',
            defaultValue:'NO'
        },
        {
            name:'workingAt',
            type:'auto'
        }
    ],
/*    associations: [
		{
		    type        : 'hasOne',
		    model       : 'MyDesktop.app.model.Post',
		    autoLoad: true,
		    associationKey:'post',	
		    name: 'post' 
		}
	]
    ,*/
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
            read: 'personalInfo/view.action',
            create: 'personalInfo/create.action',
            update: 'personalInfo/update.action',
            destroy: 'personalInfo/delete.action'
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
            writeAllFields:false,
            encode:false
        })
    }
});