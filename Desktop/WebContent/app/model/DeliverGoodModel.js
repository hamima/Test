/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 9/27/13
 * Time: 10:50 PM
 * To change this template use File | Settings | File Templates.
 */
/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 9/27/13
 * Time: 8:07 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyDesktop.app.model.DeliverGoodModel', {
    extend: 'Ext.data.Model',
    alias: 'model.deliverGoodModel',
    fields: [
        {
            name: 'id',
            type: 'number'
        },
        {
            name: 'protectGoodsPerson',
            type: 'auto'
        },
        {
            name: 'protectGoodsPost',
            type: 'auto'
        },
        {
            name: 'warehouse',
            type: 'auto'
        },
        {
            name:'deliverNumber',
            type:'float'
        },
        {
            name:'deliverFormNumber',
            type:'float'
        },
        {
            name:'deliverDate',
            type:'auto'
        },
        {
            name:'deliverConfirm',
            type:'boolean'
        },
        {
            name:'tahvildahandeh',
            type:'string'
        }

    ],
    proxy: {
        type: 'ajax',
        api: {
            read: 'deliverGood/view.action',
            create: 'deliverGood/create.action',
            update: 'deliverGood/update.action',
            destroy: 'deliverGood/delete.action'
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
            encode:false

        })
    }
});
