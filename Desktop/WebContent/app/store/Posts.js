Ext.define('MyDesktop.app.store.Posts', {
    extend: 'Ext.data.Store',
    model: 'MyDesktop.app.model.Post',
    autoLoad: true,
    pageSize: 20,
    autoLoad: {start: 0, limit: 20}
});
