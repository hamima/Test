Ext.define('MyDesktop.app.store.Organs', {
    extend: 'Ext.data.Store',
    model: 'MyDesktop.app.model.OrganModel',
    autoLoad: true,
    pageSize: 20,
    autoLoad: {start: 0, limit: 20}
});
