/**
 * Created with JetBrains WebStorm.
 * User: Hamid. R. Maghbooli
 * Date: 8/17/13
 * Time: 3:17 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyDesktop.app.store.CapsuleLocationStore', {
    extend: 'Ext.data.Store',
    model: 'MyDesktop.app.model.CapsuleLocationModel',
    autoLoad: true,
    pageSize: 20,
    autoLoad: {start: 0, limit: 20}
});