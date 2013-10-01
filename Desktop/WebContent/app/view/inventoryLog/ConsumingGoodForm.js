Ext.define('MyDesktop.app.view.consumingGood.InventoForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.consumingGoodForm',
    requires:['MyDesktop.app.store.ConsumingGoodStore','MyDesktop.app.store.ConsumingGoodsGroupStore'],
    autoScroll: true,
    height: 400,
    rtl: true,
    closable:true,
    width: 400,
    bodyPadding: 10,
    title: 'کالای مصرفی',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldset',
                    title: 'کالای مصرفی',
                    items: [
                        {
                            xtype: 'textfield',
                            name : 'id',
                            fieldLabel: 'id',
                            hidden:true
                        },
                        {
                            xtype: 'textfield',
                            anchor: '50%',
                            name:'name',
                            fieldLabel: 'نام کالای مصرفی'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '50%',
                            name:'specificProps',
                            fieldLabel: 'مشخصه های خاص'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '50%',
                            name:'code',
                            fieldLabel: 'کد کالا'
                        },
                        {
                            xtype: 'combobox',
                            anchor: '50%',
                            fieldLabel: 'گروه اقلام مصرفی',
                            invalidText: 'مقدار وارد شده صحیح نیست',
                            emptyText: 'گروه اقلام مصرفی',
                            id: 'groupCombo',
                            name:'consumingGoodsGroup',
                            store:Ext.create('MyDesktop.app.store.ConsumingGoodsGroupStore',{}),
                            displayField: 'description',
                            valueField:'id',
                            pageSize:20
                        }
                    ]
                },
                {
                    xtype: 'button',
                    text: 'ثبت',
                    id:'createPost',
                    handler: function(button, event) {
                        var record = Ext.create('MyDesktop.app.model.ConsumingGoodModel'),
                            values = me.getValues(),
                            store = MyDesktop.app.util.GlobalVariables.gConsumingGoodStore;
                        var combo = Ext.getCmp('groupCombo');
                        var value = combo.value;
                        record.set(values);
                        if(value){
                            var rec = combo.findRecord(combo.valueField, value);
                            record.set('consumingGoodsGroup',rec.data);
                        }else{
                            record.set('consumingGoodsGroup',null);
                        }
                        store.add(record);
                        store.sync();
                    }
                }
            ]
        });
        me.callParent(arguments);
    }
});