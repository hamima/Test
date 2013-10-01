/**
 * Created with JetBrains WebStorm.
 * User: Hamid. R. Maghbooli
 * Date: 7/28/13
 * Time: 5:04 PM
 * To change this template use File | Settings | File Templates.
 */


Ext.define('MyDesktop.app.model.CapsuleLocationModel', {
    extend: 'Ext.data.Model',
    alias: 'model.capsuleLocation',
    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'code',
            type: 'string'
        },
        {
            name: 'buildingName',
            type: 'string'
        },
        {
            name: 'locationDescription',
            type: 'string'
        },
        {
            name: 'fromDate',
            type: 'auto'
            /*convert:function(v, record){
                var persianDate = v.substring(0,9);
                var persianDate = persianDate.replace(/\-/g, '/');
                var Date = new Date(Ext.Date.parseJalali(persianDate)).toDateString();
                console.log(Date);
                return Date;
            }*/
        },
        {
            name: 'toDate',
            type: 'auto'
            /*convert:function(v, record){
                var persianDate = v.substring(0,9);
                var persianDate = persianDate.replace(/\-/g, '/');
                var Date = new Date(Ext.Date.parseJalali(persianDate)).toDateString();
                return Date;
            }*/
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
            read: 'capsuleLocation/view.action',
            create: 'capsuleLocation/create.action',
            update: 'capsuleLocation/update.action',
            destroy: 'capsuleLocation/delete.action'
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