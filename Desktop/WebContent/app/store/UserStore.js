Ext.define('MyDesktop.app.store.UserStore', {
    extend: 'Ext.data.Store',
    model: 'MyDesktop.app.model.PersonalInfoModel',
    autoLoad: true,
    pageSize: 20,
    autoLoad: {start: 0, limit: 20},

    proxy: {
        type: 'ajax',
        api: {
            read: 'personalInfo/viewUsers.action',
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
            encode:false
        })
    }
});
