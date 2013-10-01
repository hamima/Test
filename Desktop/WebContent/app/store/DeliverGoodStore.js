/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 9/27/13
 * Time: 10:56 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyDesktop.app.store.DeliverGoodStore', {
    extend: 'Ext.data.Store',
    model: 'MyDesktop.app.deliverGoodModel',
    autoLoad: true,
    pageSize: 20,
    autoLoad: {start: 0, limit: 20}
});
