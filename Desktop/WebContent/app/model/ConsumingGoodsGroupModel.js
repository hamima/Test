Ext.define('MyDesktop.app.model.ConsumingGoodsGroupModel', {
    extend: 'Ext.data.Model',
    alias: 'model.consumingGoodsGroupModel',
    fields: [
        {
        	name: 'id',
        	type: 'number'
        },
        {
            name: 'description',
            type: 'string'
        },
        {
            name: 'code',
            type: 'string'
        },
        {
        	name: 'metric',
        	type: 'string'
        },
        {
            name: 'rasteh',
            type: 'string'
        }
    ],
    proxy: {
        type: 'ajax',
        api: {
            read: 'cosnumingGoodsGroup/view.action',
            create: 'cosnumingGoodsGroup/create.action',
            update: 'cosnumingGoodsGroup/update.action',
            destroy: 'cosnumingGoodsGroup/delete.action'
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
            writeAllFields: false
        })
    }
});