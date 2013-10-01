/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 8/17/13
 * Time: 3:51 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyDesktop.app.view.flow.FlowSList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.flowList',
    requires:['Ext.ux.form.ItemSelector','MyDesktop.app.store.FlowStructureStore'],
    rtl: true,
    closable:true,
    title: 'ساختار جریان',
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
    createDockedItems:function(rowIndex) {
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
                var rec = Ext.getCmp('flowSGridList').store.getAt(rowIndex);
                rec.set('inputFlows',Ext.getCmp('flowSelector').value);
                Ext.getCmp('FlowWindow').close();
            }
        }]
    }];
    },
    showItemSelector:function(inputs,rowIndex){
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
                store: Ext.create('MyDesktop.app.store.FlowStructureStore'),
                displayField: 'name',
                valueField: 'id',
                value: inputs,
                msgTarget: 'side',
                fromTitle: 'لیست جریان ها',
                toTitle: 'لیست جریان های انتخاب شده'
            }],
            dockedItems: this.createDockedItems(rowIndex)
        });
        return isForm;
    },
    initComponent: function() {
        var me = this;
        var filters = new Ext.ux.grid.FiltersFeature({
            // encode and local configuration options defined previously for easier reuse
            encode: true, // json encode the filter query
            local: false,   // defaults to false (remote filtering)
            filters:
                [
                    {
                        type: 'string',
                        dataIndex: 'name'
                    },
                    {
                        type: 'list',
                        dataIndex: 'type',
                        options: [
                            {id:"DRS", "name":"DRS"},
                            {id:"TBS", "name":"TBS"},
                            {id:"CGS", "name":"CGS"},
                            {id:"RS", "name":"RS"}
                        ]
                    }
                ]
        });
        Ext.applyIf(me, {
            items:
                [
                    {
                        xtype:'grid',
                        store: MyDesktop.app.util.GlobalVariables.gFlowStructStore,
                        height:600,
                        columnLines: true,
                        id:'flowSGridList',
                        columns: [
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
                                        handler: function(grid, rowIndex, colIndex) {
                                            var rec = grid.getStore().getAt(rowIndex);
                                            rec.setDirty();
                                            grid.getStore().remove(rec);
                                            grid.getStore().sync({
                                                success: function (proxy, operations) {
                                                    // pop success message
                                                }, failure: function (proxy, operations) {
                                                    // resume records
                                                    grid.getStore().rejectChanges();
                                                }
                                            });
                                        }
                                    }
                                ]
                            }
                        ],
                        selModel: Ext.create('Ext.selection.CellModel', {

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
                        ],
                        tbar:[{
                            text:'اضافه کردن ساختار جریان',
                            tooltip:'اضافه کردن ساختار جریان',
                            iconCls:'add',
                            handler:function(){
                                var grid = Ext.getCmp('flowSGridList');
                                var rec = Ext.create('MyDesktop.app.model.FlowStructureModel');
                                grid.store.insert(0,rec);
                            }
                        }, '-', {
                            text:'ثبت تغییرات',
                            tooltip:'ثبت تغییرات',
                            iconCls:'save',
                            handler:function(){
                                var grid = Ext.getCmp('flowSGridList');
                                var modifiedRecords = grid.store.getModifiedRecords();
                                var updateArray = [];
                                for(var i=0;i<modifiedRecords.length;i++){

                                    if(modifiedRecords[i].get('inputFlows')){
                                        if(modifiedRecords[i].get('inputFlows').length > 0){
                                            var inputFlows = [];
                                            if(modifiedRecords[i].get('inputFlows')[0].name){

                                            }else{
                                                var flow;
                                                var id = modifiedRecords[i].get('inputFlows');
                                                Ext.Ajax.request({
                                                    url : 'flow/getById.action',
                                                    method: 'POST',
                                                    async:false,
                                                    params:{ids : id},
                                                    success: function (response) {
                                                        flow = Ext.JSON.decode(response.responseText);
                                                        modifiedRecords[i].set('inputFlows',flow);
                                                    },
                                                    failure: function (response) {
                                                        var jsonResp = Ext.JSON.decode(response.responseText);
                                                        Ext.Msg.alert("Error",jsonResp.error);
                                                    }
                                                });
                                            }
                                        }else{
                                            var inputFlows = [];
                                            modifiedRecords[i].set('inputFlows',inputFlows);
                                            updateArray.push(modifiedRecords[i].data);
                                        }
                                    }else{
                                        var inputFlows = [];
                                        modifiedRecords[i].set('inputFlows',inputFlows);
                                        updateArray.push(modifiedRecords[i].data);
                                    }

                                }
                                Ext.Ajax.request({
                                    url : 'flow/batchUpdate.action',
                                    method: 'POST',
                                    jsonData:updateArray,
                                    success: function (response) {
                                         var jsonResp = Ext.JSON.decode(response.responseText);
                                        grid.store.commitChanges();
                                        grid.getView().refresh();
                                    },
                                    failure: function (response) {
                                        var jsonResp = Ext.JSON.decode(response.responseText);
                                        Ext.Msg.alert("Error",jsonResp.error);
                                    }
                                });
                            }
                        }
                        ]

                    }
                ]

        });


        me.callParent(arguments);
    }
});