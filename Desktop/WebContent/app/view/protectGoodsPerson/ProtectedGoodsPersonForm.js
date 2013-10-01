Ext.define('MyDesktop.app.view.protectGoodsPost.ProtectGoodPersonForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.protectGoodPostForm',
    requires:['MyDesktop.app.store.ConsumingGoodStore','MyDesktop.app.store.ConsumingGoodsGroupStore','MyDesktop.app.store.PersonalInfoStore'],
    autoScroll: true,
    rtl: true,
    closable:true,
    bodyPadding: 10,
    title: 'اقلام حفاظت فردی پست های سازمانی',
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
                            xtype: 'combobox',
                            anchor: '50%',
                            fieldLabel: 'پست سازمانی',
                            emptyText: 'پست سازمای',
                            itemId: 'postGood',
                            name:'post',
                            store:Ext.create('MyDesktop.app.store.PersonalInfoStore',{}),
                            displayField: 'name',
                            valueField:'id',
                            pageSize:20
                        },
                        {
                            xtype: 'combobox',
                            anchor: '50%',
                            fieldLabel: 'گروه اقلام مصرفی',
                            emptyText: 'گروه اقلام مصرفی',
                            id: 'groupCombo',
                            name:'consumingGoodsGroup',
                            store:Ext.create('MyDesktop.app.store.ConsumingGoodsGroupStore',{}),
                            displayField: 'description',
                            valueField:'id',
                            pageSize:20,
                            listeners: {
                                select: function(combo, records, eOpts) {
                                    var rec = records[0];
                                    if (rec) {
                                        Ext.Ajax.request({
                                            url : 'consumingGood/getByGroup.action',
                                            method: 'POST',
                                            async:false,
                                            params:{id : rec.get('id')},
                                            success: function (response) {
                                                var data = Ext.JSON.decode(response.responseText);
                                                var combo = Ext.getCmp('goodCombo');
                                                var store = Ext.create('Ext.data.Store',
                                                    {
                                                        fields: [
                                                            {
                                                                name: 'id',
                                                                type: 'number'
                                                            },
                                                            {
                                                                name: 'name',
                                                                type: 'string'
                                                            },
                                                            {
                                                                name: 'code',
                                                                type: 'string'
                                                            },
                                                            {
                                                                name: 'specificProps',
                                                                type: 'string'
                                                            },
                                                            {
                                                                name:'consumingGoodsGroup',
                                                                type:'auto'
                                                            }
                                                        ],
                                                        data :data.data
                                                    });
                                                combo.store.loadData(store.getRange(),false);
                                            },
                                            failure: function (response) {
                                                var jsonResp = Ext.JSON.decode(response.responseText);
                                                Ext.Msg.alert("Error",jsonResp.error);
                                            }
                                        });
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'combobox',
                            anchor: '50%',
                            store:Ext.create('Ext.data.Store',
                                {
                                    fields: [
                                        {
                                            name: 'id',
                                            type: 'number'
                                        },
                                        {
                                            name: 'name',
                                            type: 'string'
                                        },
                                        {
                                            name: 'code',
                                            type: 'string'
                                        },
                                        {
                                            name: 'specificProps',
                                            type: 'string'
                                        },
                                        {
                                            name:'consumingGoodsGroup',
                                            type:'auto'
                                        }
                                    ],
                                    data:[]
                                }),
                            fieldLabel: 'قلم مصرفی',
                            emptyText: 'قلم مصرفی',
                            id: 'goodCombo',
                            queryMode: 'local',
                            name:'consumingGood',
                            displayField: 'name',
                            valueField:'id'
                        },
                        {
                            xtype: 'numberfield',
                            anchor: '50%',
                            name:'number',
                            fieldLabel: 'تعداد'
                        },
                        {
                            xtype: 'numberfield',
                            anchor: '50%',
                            name:'repeatDistance',
                            fieldLabel: 'دوره تکرار'
                        }
                    ]
                },
                {
                    xtype: 'button',
                    text: 'ثبت',
                    id:'createPost',
                    handler: function(button, event) {
                        var record = Ext.create('MyDesktop.app.model.ProtectGoodPersonModel'),
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