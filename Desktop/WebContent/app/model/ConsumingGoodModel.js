Ext.define('MyDesktop.app.model.ConsumingGoodModel', {
    extend: 'Ext.data.Model',
    alias: 'model.consumingGoodModel',
    fields: [
        {
        	name: 'id',
        	type: 'number'
        },
        {
            name: 'name',
            type: 'string'
        },
        {
            name: 'code',
            type: 'string'
        },
        {
        	name: 'specificProps',
        	type: 'string'
        },
        {
            name:'consumingGoodsGroup',
            type:'auto'
        }
    ],
    proxy: {
        type: 'ajax',
        api: {
            read: 'consumingGood/view.action',
            create: 'consumingGood/create.action',
            update: 'consumingGood/update.action',
            destroy: 'consumingGood/delete.action'
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
