/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 9/1/13
 * Time: 11:44 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyDesktop.app.view.consumingGoodGroup.ConsumingGoodGroupEdit', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.consumingGoodGroupEdit',
    requires:['MyDesktop.app.util.GlobalVariables'],
    height: 356,
    rtl: true,
    closable:true,
    autoScroll: true,
    width: 400,
    bodyPadding: 10,
    title: 'ویرایش اقلام مصرفی',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype:'form',
                    border:false,
                    items:
                        [
                            {
                                xtype: 'fieldset',
                                title: 'اقلام مصرفی',
                                items: [
                                    {
                                        xtype: 'fieldcontainer',
                                        layout: {
                                            type: 'table',
                                            columns: 3

                                        },
                                        items:[
                                            {
                                                xtype: 'textfield',
                                                anchor: '50%',
                                                fieldLabel:'Ø´Ù…Ø§Ø±Ù‡ ØªØ¬Ù‡ÛŒØ²',
                                                name: 'description'

                                            },
                                            {
                                                xtype: 'textfield',
                                                anchor: '50%',
                                                fieldLabel:'Ø´Ù…Ø§Ø±Ù‡ ØªØ¬Ù‡ÛŒØ²',
                                                name: 'code'

                                            },
                                            {
                                                xtype: 'textfield',
                                                anchor: '50%',
                                                fieldLabel:'Ø´Ù…Ø§Ø±Ù‡ ØªØ¬Ù‡ÛŒØ²',
                                                name: 'metric'
                                            },
                                            {
                                                xtype:'combobox',
                                                fieldLabel:'Ø§Ø¯Ø§Ø±Ø§Øª ØªØ­Øª Ø¹Ù…Ù„Ú©Ø±Ø¯',
                                                id: 'consumingGoodsListCombo',
                                                emptyText: 'Ø§Ø¯Ø§Ø±Ø§Øª ØªØ­Øª Ø¹Ù…Ù„Ú©Ø±Ø¯',
                                                name:'listOfGoods',
                                                anchor:'50%',
                                                multiSelect: true,
                                                store:Ext.create('MyDesktop.app.store.ConsumingGoodStore',{}),
                                                displayField: 'name',
                                                renderer: function(value){

                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'button',
                                text: 'ثبت',
                                handler: function(button, event) {
                                    var record = Ext.create('MyDesktop.app.model.ConsumingGoodGroupModel'),
                                        values = me.getValues(),
                                        store = MyDesktop.app.util.GlobalVariables.gConsumingGoodGroupStore;

                                    var combo = Ext.getCmp('consumingGoodsListCombo');

                                    var v = combo.getValue();
                                    record.set(values);
                                    var consumingGoodGroupList = [];
                                    for (var i=0; i< v.length;i++){
                                        var rec = combo.findRecord(combo.valueField || combo.displayField, v[i]);
                                        consumingGoodGroupList.push(rec.data);
                                    }
                                    record.set('listOfGoods',consumingGoodGroupList);
                                    console.log(record);
                                    store.add(record);
                                    store.sync();
                                }
                            }
                        ]
                }
            ],
            tbar:[

            ]
        });

        me.callParent(arguments);
    }
});