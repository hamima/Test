/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 8/17/13
 * Time: 3:51 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyDesktop.app.view.warehouse.WarehouseList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.warehouseList',
    requires:['Ext.ux.form.ItemSelector','MyDesktop.app.store.Organs','MyDesktop.app.store.WarehouseStore'],
    rtl: true,
    closable:true,
    title: 'ساختار جریان',
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
                            Ext.getCmp('OrganWindow').close();
                        }
                    },
                    {
                        text: 'ثبت',
                        handler: function(){
                            var rec = Ext.getCmp('warehouseList').store.getAt(rowIndex);
                            rec.set('organizations',Ext.getCmp('organSelector').value);
                            Ext.getCmp('OrganWindow').close();
                        }
                    }]
            }];
    },
    showItemSelector:function(inputs,rowIndex){
        var isForm = Ext.create('Ext.window.Window', {
            title: 'انتخاب جریان های ورودی',
            id:'OrganWindow',
            width: 600,
            bodyPadding: 10,
            height: 300,
            layout: 'fit',
            closable:true,
            items:[{
                xtype: 'itemselector',
                name: 'itemselector',
                id: 'organSelector',
                anchor: '100%',
                fieldLabel: 'جریان های ورودی',
                store: MyDesktop.app.util.GlobalVariables.gOrganStore,
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

        Ext.applyIf(me, {
            items:
                [
                    {
                        xtype:'grid',
                        store: MyDesktop.app.util.GlobalVariables.gWarehouseStore,
                        height:400,
                        columnLines: true,
                        id:'warehouseList',
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
                                    xtype:'textfield'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'code',
                                text: 'نام',
                                editor:{
                                    xtype:'textfield'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'descriptiveAddress',
                                text: 'نام',
                                editor:{
                                    xtype:'textfield'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'specificUse',
                                text: 'نام',
                                editor:{
                                    xtype:'textfield'
                                }
                            },
                            {
                                xtype: 'actioncolumn',
                                text:'سازمان ها',
                                items: [
                                    {
                                        icon: 'resources/images/icons/fam/cog_edit.png',
                                        tooltip: 'لیست جریان های ورودی',
                                        scope: this,
                                        handler: function(grid, rowIndex) {
                                            var rec = grid.getStore().getAt(rowIndex);
                                            var inputs = [];
                                            if(rec.get('organizations')){
                                                for(var i = 0;i<rec.get('organizations').length;i++){
                                                    inputs.push(rec.get('organizations')[i].id);
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
                                            grid.getStore().sync();
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
                                store:MyDesktop.app.util.GlobalVariables.gWarehouseStore,
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
                                var grid = Ext.getCmp('warehouseList');
                                var rec = Ext.create('MyDesktop.app.model.WarehouseModel');
                                grid.store.insert(0,rec);
                            }
                        }, '-', {
                            text:'ثبت تغییرات',
                            tooltip:'ثبت تغییرات',
                            iconCls:'save',
                            handler:function(){
                                var grid = Ext.getCmp('warehouseList');
                                var modifiedRecords = grid.store.getModifiedRecords();
                                var updateArray = [];
                                for(var i=0;i<modifiedRecords.length;i++){
                                    if(modifiedRecords[i].get('organizations').length > 0){
                                        var organs = [];
                                        for(var j = 0;j < modifiedRecords[i].get('organizations').length;j++){
                                            if(modifiedRecords[i].get('')[j].name){
                                                organs.push(modifiedRecords[i].get('organizations')[j]);
                                            }else{
                                                var id = modifiedRecords[i].get('organizations')[j];
                                                var flow = grid.store.findRecord('id',id);
                                                organs.push(flow.data);
                                            }
                                        }
                                        modifiedRecords[i].set('organizations',organs);
                                        updateArray.push(modifiedRecords[i].data);
                                    }else{
                                        var organs = [];
                                        modifiedRecords[i].set('organizations',organs);
                                        updateArray.push(modifiedRecords[i].data);
                                    }
                                }
                                Ext.Ajax.request({
                                    url : 'warehouse/batchUpdate.action',
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
