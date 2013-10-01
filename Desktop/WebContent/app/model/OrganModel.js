/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 7/28/13
 * Time: 5:04 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyDesktop.app.model.OrganModel', {
    extend: 'Ext.data.Model',
    alias: 'model.organModel',

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
            name: 'stateName',
            type: 'string'
        },
        {
            name: 'stateCode',
            type: 'string'
        },
        {
            name: 'level',
            type: 'int'
        },
        {
            name: 'confirmPlanning',
            type: 'string',
            defaultValue:'NO'
        },
        {
            name: 'confirmDoneAcitivities',
            type: 'string',
            defaultValue:'NO'
        },
        {
            name: 'confirmUserAcitivities',
            type: 'string',
            defaultValue:'NO'
        },
        {
            name: 'referenceReadyToRun',
            type: 'string',
            defaultValue:'NO'
        },
        {
            name: 'referenceAuto',
            type: 'string',
            defaultValue:'NO'
        },
        {
            name: 'workEnterTime',
            type: 'string',
            defaultValue:'NO'
        },
        {
            name: 'workDeclareEnough',
            type: 'string',
            defaultValue:'NO'
        },
        {
            name: 'workMustEnterSubAct',
            type: 'string',
            defaultValue:'NO'
        },
        {
            name: 'workMustEnterSubActPrice',
            type: 'string',
            defaultValue:'NO'
        },
        {
            name: 'workMustEnterSubActTime',
            type: 'string',
            defaultValue:'NO'
        },
        {
            name: 'workMustEnterEquipment',
            type: 'string',
            defaultValue:'NO'
        },
        {
            name: 'workMustEnterPermitInfo',
            type: 'string',
            defaultValue:'NO'
        },
        {
            name: 'workCanEnterInfoWP',
            type: 'string',
            defaultValue:'NO'
        },
        {
            name: 'alamak',
            type: 'string',
            defaultValue:'IRON'
        },
        {
            name: 'currentActDisplayInt',
            type: 'int'
        },
        {
            name: 'jobReferenceCounter',
            type: 'int'
        },
        {
            name:'parent',
            type:'auto'
        }
    ],
/*	associations: [
		{
		    type        : 'hasOne',
		    model       : 'MyDesktop.app.model.OrganModel',
            foreignKey  : 'parent',
		    getterName  : 'getParent',   // if not overridden you get 'getFoo.model.Parent'
		    setterName  : 'setParent',   // if not overridden you get 'setFoo.model.Parent'
		    instanceName: 'parent',
		    name:'parent'// if not overridden you get 'Foo.model.ParentBelongsToInstance'
		}
	]
    ,*/
    proxy: {
        type: 'ajax',
        api: {
            read: 'organ/view.action',
            create: 'organ/create.action',
            update: 'organ/update.action',
            destroy: 'organ/delete.action'
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