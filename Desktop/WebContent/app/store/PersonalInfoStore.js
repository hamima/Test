Ext.define('MyDesktop.app.store.PersonalInfoStore', {
    extend: 'Ext.data.Store',
    model: 'MyDesktop.app.model.PersonalInfoModel',
    autoLoad: true,
    pageSize: 20,
    autoLoad: {start: 0, limit: 20}
});