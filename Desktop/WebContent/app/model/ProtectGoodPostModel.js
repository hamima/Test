/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 9/27/13
 * Time: 8:07 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyDesktop.app.model.ProtectGoodPostModel', {
    extend: 'Ext.data.Model',
    alias: 'model.protectGoodPostModel',
    fields: [
        {
            name: 'id',
            type: 'number'
        },
        {
            name: 'myPost',
            type: 'auto'
        },
        {
            name: 'consumingGoodGroup',
            type: 'auto'
        },
        {
            name: 'consumingGood',
            type: 'auto'
        },
        {
            name:'number',
            type:'float'
        },
        {
            name:'repeatDistance',
            type:'float'
        }

    ],
    proxy: {
        type: 'ajax',
        api: {
            read: 'protectGoodsPost/view.action',
            create: 'protectGoodsPost/create.action',
            update: 'protectGoodsPost/update.action',
            destroy: 'protectGoodsPost/delete.action'
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
