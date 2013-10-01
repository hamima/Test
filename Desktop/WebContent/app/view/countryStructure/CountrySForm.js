/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 8/17/13
 * Time: 3:41 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyDesktop.app.view.countryStructure.CountrySForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.countryForm',
    autoScroll: true,
    height: 182,
    rtl: true,
    closable:true,
    width: 400,
    bodyPadding: 10,
    title: 'ایجاد ساختار کشوری',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldset',
                    title: 'ساختار کشوری',
                    items: [
                        {
                            xtype: 'textfield',
                            name : 'id',
                            fieldLabel: 'id',
                            hidden:true
                        },
                        {
                            xtype: 'textfield',
                            name : 'level',
                            fieldLabel: 'level',
                            hidden:true
                        },
                        {
                            xtype: 'textfield',
                            anchor: '50%',
                            name:'name',
                            fieldLabel: 'نام'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '50%',
                            name:'code',
                            fieldLabel: 'کد ساختار'
                        },
                        {
                            xtype: 'combobox',
                            id:'parentCombo',
                            anchor: '50%',
                            fieldLabel: 'ساختار بالا دستی',
                            name:'parent',
                            store:MyDesktop.app.util.GlobalVariables.gCountryStructStore,
                            displayField: 'name'
                        }
                    ]
                },
                {
                    xtype: 'button',
                    text: 'ایجاد پست',
                    id:'createPost',
                    handler: function(button, event) {
                        var record = Ext.create('MyDesktop.app.model.CountryStructureModel'),
                            values = me.getValues(),
                            store = MyDesktop.app.util.GlobalVariables.gCountryStructStore,
                            parent = Ext.create('MyDesktop.app.model.CountryStructureModel');
                        var combo = Ext.getCmp('parentCombo');
                        var v = combo.getValue();
                        record.set(values);
                        if(v == null){
                            record.set('parent',{});
                        } else{
                            var rec = combo.findRecord(combo.valueField || combo.displayField, v);
                            parent.set(rec.data);
                            record.set('parent',parent.data);
                        }
                        record.setId(0);
                        console.log(record);
                        store.add(record);
                        store.sync();
                    }
                }
            ]
        });

        me.callParent(arguments);
    }

});