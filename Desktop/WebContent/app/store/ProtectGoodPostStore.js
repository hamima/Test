/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 9/27/13
 * Time: 8:25 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyDesktop.app.store.ProtectGoodPostStore', {
    extend: 'Ext.data.Store',
    model: 'MyDesktop.app.model.ProtectGoodPostModel',
    autoLoad: false,
    pageSize: 20,
//    autoLoad: {start: 0, limit: 20},

    proxy: {
        type: 'ajax',
        api: {
            read: 'protectGoodsPost/viewProtects.action',
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