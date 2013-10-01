/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 9/1/13
 * Time: 11:44 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyDesktop.app.view.consumingGood.ConsumingGoodEdit', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.consumingGoodEdit',
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
                                                fieldLabel:'نام قلم',
                                                name: 'name'

                                            },
                                            {
                                                xtype: 'textfield',
                                                anchor: '50%',
                                                fieldLabel:'کد قلم',
                                                name: 'code'
                                            },
                                            {
                                                xtype: 'textfield',
                                                anchor: '50%',
                                                fieldLabel:'خصوصیات ویژه',
                                                name: 'specificProps'
                                            },
                                            {
                                            	xtype: 'combobox',
                                            	store: Ext.create('MyDesktop.app.store.ConsumingGoodGroupStore'),
                                            	displayField: 'description',
                                            	valueField: 'id',
                                            	id: 'consumingGoodGroup',
                                            	name: 'consumingGoodsGroup',
                                            	fieldLabel: 'گروه اقلام مصرفی',
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
                                    var record = Ext.create('MyDesktop.app.model.ConsumingGoodModel'),
                                        values = me.getValues(),
                                        store = MyDesktop.app.util.GlobalVariables.gConsumingGoodStore;

                                    var combo = Ext.getCmp('consumingGoodGroup');
                                    
                                    var v = combo.getValue();
                                    record.set(values);
                                    if(v == null){
                                        record.set('consumingGoodsGroup',null);
                                    } else{
                                        var rec = combo.findRecord(combo.valueField || combo.displayField, v);
                                        record.set('consumingGoodsGroup',rec.data);
                                    }
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