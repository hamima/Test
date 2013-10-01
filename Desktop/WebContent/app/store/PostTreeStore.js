Ext.define('MyDesktop.app.store.PostTreeStore', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.postTree',
    requires: [
        'MyDesktop.app.model.Post'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            model: 'MyDesktop.app.model.Post',
            remoteFilter: true,
            storeId: 'postTree',
            root: {
                name: 'data',
                expand: true
            },
            proxy: {
                type: 'ajax',
                url: 'post/view.action',
	            reader: {
	                type: 'json',
	                root: 'data'
	            },
	            writer: {
	                type: 'json',
                    root:'data'
	            }
            }
        }, cfg)]);
    }
});