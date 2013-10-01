/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 8/25/13
 * Time: 1:50 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyDesktop.app.view.capsule.CapsuleCreateForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.capsuleCreateForm',
    requires:['MyDesktop.app.store.CapsuleLocationStore'],
    height: 356,
    rtl: true,
    closable:true,
    autoScroll: true,
    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    width: 400,
    bodyPadding: 10,
    title: 'مشخصات کپسول ها',
    capsuleTypeCombo:function(){
        // The data store containing the list of capsule types
        var capsuleType = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"ONE", "name":"نوع یک"},
                {"value":"TWO", "name":"نوع دو"},	        //...
                {"value":"THREE", "name":"نوع سه"},
                {"value":"FOUR", "name":"نوع چهار"},
                {"value":"FIVE", "name":"نوع پنج"}
            ]
        });

        // Create the combo box, attached to the states data store
        var combo = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'نوع کپسول',
            id: 'capsuleTypeCombo',
            store: capsuleType,
            queryMode: 'local',
            name:'type',
            displayField: 'name',
            valueField: 'value',
            renderTo: Ext.getBody()
        });

        return combo;
    },
    capsuleList: function(){
        var grid = Ext.create('MyDesktop.app.view.capsule.CapsuleList');
        grid.header = false;
        grid.collapsible = true;
        return grid;
    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    bodyPadding: 10,
                    id:'createForm',
                    header: false,
                    items:[
                        {
                            xtype:'combobox',
                            fieldLabel:'',
                            id: 'equipTypeCombo',
                            emptyText: 'تیپ کپسول',
                            name:'countryStructure',
                            anchor:'50%',
                            store:Ext.create('MyDesktop.app.store.EquipmentTypeStore',{}),
                            displayField: 'name',
                            valueField:'id'
                        },
                        {
                            xtype:'numberfield',
                            name:'tedad',
                            id:'num',
                            fieldLabel:'تعداد'
                        },{
                            xtype:'button',
                            text:'ایجاد',
                            handler: function (){
                                Ext.Ajax.request({
                                    url: 'capsule/batchCreate.action',
                                    params: {
                                        num: Ext.getCmp('createForm').getValues()
                                    },
                                    success: function(response){
                                        Ext.getCmp('createForm').getForm().reset();
                                        var text = response.responseText;
                                        Ext.getCmp('capsuleGridList').store.load();
                                    }
                                });
                            }
                        }
                    ]

                },
                {
                    xtype: 'splitter'
                },
                this.capsuleList()


                /*{
                    xtype: 'button',
                    text: 'ثبت',
                    handler: function(button, event) {
                        var record = Ext.create('MyDesktop.app.model.CapsuleModel'),
                            values = me.getValues(),
                            store = MyDesktop.app.util.GlobalVariables.gCapsuleStore;

                        var combo = Ext.getCmp('capsuleCapsuleLocationCombo');

                        var v = combo.getValue();
                        record.set(values);
                        var capsuleLocation = record.capsuleLocation();
                        for (var i=0; i< v.length;i++){
                            var rec = combo.findRecord(combo.valueField || combo.displayField, v[i]);
                            capsuleLocation.add(rec.data);
                        };

                        for (var i = 0; i < capsuleLocation.data.items.length; i++) {
                            capsuleLocation.data.items[i].setDirty();
                        };
                        record.setDirty();
                        record.set('capsuleLocation',capsuleLocation);

                        console.log(record);
                        store.add(record);
                        store.sync();
                    }
                }*/
            ],
            tbar:[

            ]
        });

        me.callParent(arguments);
    }

});