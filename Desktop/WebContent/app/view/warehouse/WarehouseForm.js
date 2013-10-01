/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 8/17/13
 * Time: 3:51 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyDesktop.app.view.warehouse.WarehouseForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.warehouseForm',
    requires:['MyDesktop.app.store.WarehouseStore'],
    autoScroll: true,
    height: 182,
    rtl: true,
    closable:true,
    width: 400,
    bodyPadding: 10,
    title: 'ایجاد ساختار جریان',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldset',
                    title: 'ساختار جریان',
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
                            fieldLabel: 'نام جریان'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '50%',
                            name:'code',
                            fieldLabel: 'کد جریان'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '50%',
                            name:'descriptiveAddress',
                            fieldLabel: 'کد جریان'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '50%',
                            name:'specificUse',
                            fieldLabel: 'کد جریان'
                        },
                        {
                            xtype:'combobox',
                            fieldLabel:'جریان های ورودی',
                            id: 'organizationCombo',
                            emptyText: 'جریان ورودی',
                            name:'organizations',
                            anchor:'50%',
                            multiSelect: true,
                            store:MyDesktop.app.util.GlobalVariables.gOrganStore,
                            displayField: 'name'

                        }
                    ]
                },
                {
                    xtype: 'button',
                    text: 'ایجاد پست',
                    id:'createPost',
                    handler: function(button, event) {
                        var record = Ext.create('MyDesktop.app.model.WarehouseModel'),
                            values = me.getValues(),
                            store = MyDesktop.app.util.GlobalVariables.gWarehouseStore,
                            parent = Ext.create('MyDesktop.app.model.OrganModel');
                        var combo = Ext.getCmp('organizationCombo');
                        var v = combo.getValue();
                        var inputs = [];
                        if(v.length > 0){
                            for (var i=0; i< v.length;i++){
                                var rec = combo.findRecord(combo.valueField || combo.displayField, v[i]);
                                inputs.push(rec.data);
                            };
                        }else{

                        }
                        record.set(values);
                        if(inputs){
                            record.set('organizations',inputs);
                        }
                        record.setId(0);
                        store.add(record);
                        store.sync();
                    }
                },
                {
                    xtype: 'button',
                    text: 'پاک کردن فیلدها',
                    id:'reset'
                }
            ]
        });

        me.callParent(arguments);
    }

});