/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 8/17/13
 * Time: 3:17 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyDesktop.app.store.ConsumingGoodStore', {
    extend: 'Ext.data.Store',
    model: 'MyDesktop.app.model.ConsumingGoodModel',
    autoLoad: true,
    pageSize: 10,
    autoLoad: {start: 0, limit: 10}
});