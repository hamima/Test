/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 9/27/13
 * Time: 8:10 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyDesktop.app.store.ProtectGoodPersonStore', {
    extend: 'Ext.data.Store',
    model: 'MyDesktop.app.model.ProtectGoodPersonModel',
    autoLoad: true,
    pageSize: 20,
    autoLoad: {start: 0, limit: 20}
});