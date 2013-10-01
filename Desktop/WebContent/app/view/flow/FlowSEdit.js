/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 9/1/13
 * Time: 12:32 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyDesktop.app.view.flow.FlowSEdit', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.flowEdit',
    requires:['Ext.ux.form.ItemSelector'],
    autoScroll: true,
    height: 182,
    rtl: true,
    closable:true,
    width: 400,
    bodyPadding: 10,
    title: 'ایجاد ساختار جریان',
    flowTypeCombo:function(){
        // The data store containing the list of states
        var flowType = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"DRS", "name":"DRS"},
                {"value":"TBS", "name":"TBS"},
                {"value":"CGS", "name":"CGS"},
                {"value":"RS", "name":"RS"}
            ]
        });

        // Create the combo box, attached to the states data store
        var combo = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '',
            store: flowType,
            name:'type',
            queryMode: 'local',
            displayField: 'name',
            valueField: 'value',
            renderTo: Ext.getBody()
        });

        return combo;
    },
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
    createDockedItems:function(rowIndex,grid) {
        return [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                defaults: {
                    minWidth: 75
                },
                items: ['->',
                    {
                        text: 'بستن',
                        handler: function() {
                            Ext.getCmp('FlowWindow').close();
                        }
                    },
                    {
                        text: 'ثبت',
                        handler: function(){
                            var rec = Ext.getCmp('flowSList').store.getAt(rowIndex);
                            rec.set('inputFlows',Ext.getCmp('flowSelector').value);
                            Ext.getCmp('FlowWindow').close();
                        }
                    }]
            }];
    },
    showItemSelector:function(inputs,rowIndex,grid){
        var isForm = Ext.create('Ext.window.Window', {
            title: 'انتخاب جریان های ورودی',
            id:'FlowWindow',
            width: 600,
            bodyPadding: 10,
            height: 300,
            layout: 'fit',
            closable:true,
            items:[{
                xtype: 'itemselector',
                name: 'itemselector',
                id: 'flowSelector',
                anchor: '100%',
                fieldLabel: 'جریان های ورودی',
                store: MyDesktop.app.util.GlobalVariables.gFlowStructStore,
                displayField: 'name',
                valueField: 'id',
                value: inputs,
                msgTarget: 'side',
                fromTitle: 'لیست جریان ها',
                toTitle: 'لیست جریان های انتخاب شده'
            }],
            dockedItems: this.createDockedItems(rowIndex,grid)
        });
        return isForm;
    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype:'form',
                    id:'flowBaseForm',
                    collapsible:true,
                    animCollapse:true,
                    border:false,
                    items:
                        [
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
                                        id: 'inputFlowCombo',
                                        emptyText: 'جریان ورودی',
                                        name:'inputs',
                                        anchor:'50%',
                                        multiSelect: true,
                                        store:MyDesktop.app.util.GlobalVariables.gFlowStructStore,
                                        displayField: 'name',
                                        pageSize:20

                                    }
                                ]
                            },
                            {
                                xtype: 'button',
                                text: 'ثبت',
                                id:'createPost',
                                handler: function() {
                                    var record = Ext.create('MyDesktop.app.model.FlowStructureModel'),
                                        values = me.getValues(),
                                        store = MyDesktop.app.util.GlobalVariables.gFlowStructStore,
                                        parent = Ext.create('MyDesktop.app.model.FlowStructureModel');
                                    var combo = Ext.getCmp('inputFlowCombo');
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
                                    store.sync({
                                        success: function (proxy, operations) {
                                            Ext.getCmp('flowBaseForm').getForm().reset();
                                            Ext.getCmp('flowSGridEdit').store.refresh();
                                        }, failure: function (proxy, operations) {
                                            // resume records
                                        }
                                    });

                                }
                            },
                            {
                                xtype: 'button',
                                text: 'پاک کردن فیلدها',
                                id:'reset'
                            }
                        ]
                },
                {
                    xtype:'grid',
                    store:MyDesktop.app.util.GlobalVariables.gFlowStructStore,
                    id:'flowSGridEdit',
                    columnLines: true,
                    height:400,
                    columns: [
                        {
                            xtype: 'rownumberer',
                            rtl: true,
                            locked: true,
                            editable:false
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'name',
                            text: 'نام',
                            editor:{
                                xtype:'textfield',
                                name:'name'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'type',
                            text: 'نوع جریان',
                            editor:this.flowTypeCombo()
                        },
                        {
                            xtype: 'actioncolumn',
                            text:'لیست جریان های ورودی',
                            items: [
                                {
                                    icon: 'resources/images/icons/fam/cog_edit.png',
                                    tooltip: 'لیست جریان های ورودی',
                                    scope: this,
                                    handler: function(grid, rowIndex) {
                                        var rec = grid.getStore().getAt(rowIndex);
                                        var inputs = [];
                                        if(rec.get('inputFlows')){
                                            for(var i = 0;i<rec.get('inputFlows').length;i++){
                                                inputs.push(rec.get('inputFlows')[i].id);
                                            }
                                        }else{

                                        }
                                        var selectedItem = this.showItemSelector(inputs,rowIndex,grid);
                                        selectedItem.show();
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'actioncolumn',
                            items: [
                                {
                                    icon: 'resources/images/icons/fam/delete.gif',
                                    tooltip: 'حذف',
                                    scope: this,
                                    handler: function(grid, rowIndex) {
                                        var rec = grid.getStore().getAt(rowIndex);
                                        rec.setDirty();
                                        grid.getStore().remove(rec);
                                        grid.getStore().sync();
                                    }
                                }
                            ]
                        }
                    ],
                    listeners: {
                        scope: this,
                        selectionchange: this.onSelectionChange
                    },
                    selModel: Ext.create('Ext.selection.RowModel', {

                    }),
                    plugins: [
                        Ext.create('Ext.grid.plugin.CellEditing', {
                            triggerEvent: 'celldblclick',
                            autoCancel: false
                        })
                    ],
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            dock: 'bottom',
                            rtl: true,
                            width: 360,
                            store:MyDesktop.app.util.GlobalVariables.gFlowStructStore,
                            displayInfo: true,
                            emptyMsg: 'داده ای برای نمایش وجود ندارد',
                            firstText: 'صفحه اول',
                            lastText: 'صحفه آخر',
                            nextText: 'صفحه بعدی'
                        }
                    ]
                   /* ,
                    tbar:[{
                        text:'Add Something',
                        tooltip:'اضافه کردن ساختار جریان',
                        iconCls:'add'
                    }, '-', {
                        text:'تنظیمات',
                        tooltip:'Modify options',
                        iconCls:'option'
                    },'-',{
                        text:'حذف',
                        tooltip:'Remove the selected item',
                        iconCls:'remove'
                    }]*/
                }
            ]
        });

        me.callParent(arguments);
    },
    onSelectionChange: function(model, records) {
        var rec = records[0];
        if (rec) {
            Ext.getCmp('flowBaseForm').loadRecord(rec);
        }
    }

});