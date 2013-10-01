/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 8/17/13
 * Time: 3:51 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyDesktop.app.view.flow.FlowSForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.flowForm',
    requires:['MyDesktop.app.store.FlowStructureStore'],
    autoScroll: true,
    height: 182,
    rtl: true,
    closable:true,
    width: 400,
    bodyPadding: 10,
    title: 'ایجاد ساختار جریان',
    flowTypeCombo:function(){
        // The data store containing the list of states
        var flowType;
        flowType = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data: [
                {"value": "DRS", "name": "DRS"},
                {"value": "TBS", "name": "TBS"},
                {"value": "CGS", "name": "CGS"},
                {"value": "RS", "name": "RS"}
            ]
        });

        // Create the combo box, attached to the states data store
        var combo;
        combo = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'نوع جریان',
            store: flowType,
            name: 'type',
            queryMode: 'local',
            displayField: 'name',
            valueField: 'value',
            renderTo: Ext.getBody()
        });

        return combo;
    },
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
                            name : 'level',
                            fieldLabel: 'level',
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
                        this.flowTypeCombo(),
                        {
                            xtype:'combobox',
                            fieldLabel:'جریان های ورودی',
                            id: 'inputFlowFormCombo',
                            emptyText: 'جریان ورودی',
                            name:'inputs',
                            anchor:'50%',
                            multiSelect: true,
                            store:MyDesktop.app.util.GlobalVariables.gFlowStructStore,
                            displayField: 'name'

                        }
                    ]
                },
                {
                    xtype: 'button',
                    text: 'ایجاد پست',
                    id:'createPost',
                    handler: function(button, event) {
                        var record = Ext.create('MyDesktop.app.model.FlowStructureModel'),
                            values = me.getValues(),
                            store = MyDesktop.app.util.GlobalVariables.gFlowStructStore,
                            parent = Ext.create('MyDesktop.app.model.FlowStructureModel');
                        var combo = Ext.getCmp('inputFlowFormCombo');
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
                            record.set('inputFlows',inputs);
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