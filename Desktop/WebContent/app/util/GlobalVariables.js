/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 8/11/13
 * Time: 2:11 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyDesktop.app.util.GlobalVariables', {
    singleton: true,
    requires:[
        'MyDesktop.app.store.Organs',
        'MyDesktop.app.store.Posts',
        'MyDesktop.app.store.PersonalInfoStore',
        'MyDesktop.app.store.HSEPassStore',
        'MyDesktop.app.store.UserStore',
        'MyDesktop.app.store.CountryStructureStore',
        'MyDesktop.app.store.FlowStructureStore',
        'MyDesktop.app.store.CapsuleStore',
        'MyDesktop.app.store.EquipmentTypeStore',
        'MyDesktop.app.store.CapsuleLocationStore',
        'MyDesktop.app.store.ConsumingGoodsGroupStore',
        'MyDesktop.app.store.ConsumingGoodStore',
        'MyDesktop.app.store.WarehouseStore',
        'MyDesktop.app.store.ProtectGoodPersonStore',
        'MyDesktop.app.store.ProtectGoodPostStore'
    ],
    organStore: null,
    loggedInUser:null,
    loggined:true,
    showOrganOptions1:true,
    showOrganOptions2:true,
    userName:null,
    currentPage:null,
    selectedOrganList:null,
    currentPerson:null,
    gOrganStore:Ext.create('MyDesktop.app.store.Organs'),
    gPostStore:Ext.create('MyDesktop.app.store.Posts'),
    gPersonStore:Ext.create('MyDesktop.app.store.PersonalInfoStore'),
    gUserStore:Ext.create('MyDesktop.app.store.UserStore'),
    gHSEPassStore:Ext.create('MyDesktop.app.store.HSEPassStore'),
    gCountryStructStore:Ext.create('MyDesktop.app.store.CountryStructureStore'),
    gFlowStructStore:Ext.create('MyDesktop.app.store.FlowStructureStore'),
    gCapsuleStore: Ext.create('MyDesktop.app.store.CapsuleStore'),
    gEquipmentTypeStore:Ext.create('MyDesktop.app.store.EquipmentTypeStore'),
    gCapsuleLocationStore:Ext.create('MyDesktop.app.store.CapsuleLocationStore'),
    gConsumingGoodsGroupStore:Ext.create('MyDesktop.app.store.ConsumingGoodsGroupStore'),
    gConsumingGoodStore:Ext.create('MyDesktop.app.store.ConsumingGoodStore'),
    gProtectGoodPersonStore:Ext.create('MyDesktop.app.store.ProtectGoodPersonStore'),
    gProtectGoodPostStore:Ext.create('MyDesktop.app.store.ProtectGoodPostStore'),
    gWarehouseStore:Ext.create('MyDesktop.app.store.WarehouseStore')
});