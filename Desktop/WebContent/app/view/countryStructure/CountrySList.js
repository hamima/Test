/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 8/17/13
 * Time: 3:40 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyDesktop.app.view.countryStructure.CountrySList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.countryList',
    requires:['MyDesktop.app.store.CountryStructureStore'],
    rtl: true,
    closable:true,
    title: 'ساختار کشوری',

    initComponent: function() {
        var me = this;
        var filters = new Ext.ux.grid.FiltersFeature({
            encode: true,
            local: false,
            filters:
                [
                    {
                        type: 'string',
                        dataIndex: 'name'
                    },
                    {
                        type: 'string',
                        dataIndex: 'code'
                    }

                ]
        });
        Ext.applyIf(me, {
            items:
                [
                    {
                        xtype:'grid',
                        columnLines:true,
                        height:600,
                        id:'countrySGridList',
                        store:MyDesktop.app.util.GlobalVariables.gCountryStructStore,
                        columns: [
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'name',
                                text: 'نام',
                                editor:{
                                    xtype:'textfield'
                                }
                            },{
                                xtype: 'gridcolumn',
                                dataIndex: 'code',
                                text: 'کد',
                                editor:{
                                    xtype:'textfield'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                text: 'ساختار بالا دستی',
                                emptyCellText: '---',
                                width:300,
                                dataIndex:'parent',
                                renderer: function(value){//1.
                                    var postName;
                                    var post = value;
                                    if(post){
                                        if(post.name){
                                            postName = post.name;
                                        }else{
                                            var combo = Ext.getCmp('countryListCombo');
                                            var rec = combo.findRecord(combo.valueField , post);
                                            if(rec){
                                                postName = rec.data.name;
                                            }else{
                                                postName = '---';
                                            }
                                        }

                                    }else{
                                        postName = '---';
                                    }

                                    return postName;
                                },
                                editor: {
                                    xtype: 'combobox',
                                    id:'countryListCombo',
                                    store:Ext.create('MyDesktop.app.store.CountryStructureStore'),
                                    displayField: 'name',
                                    valueField:'id',
                                    emptyText: 'ساختار کشوری',
                                    pageSize:20
                                }
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
                        features: [filters],
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
                                store:MyDesktop.app.util.GlobalVariables.gCountryStructStore,
                                displayInfo: true,
                                emptyMsg: 'داده ای برای نمایش وجود ندارد',
                                firstText: 'صفحه اول',
                                lastText: 'صحفه آخر',
                                nextText: 'صفحه بعدی',
                                prevText:'صحفه قبل'
                            }
                        ],
                        tbar:[{
                            text:'اضافه کردن ساختار کشوری',
                            tooltip:'اضافه کردن ساختار کشوری',
                            iconCls:'add',
                            handler:function(){
                                var grid = Ext.getCmp('countrySGridList');
                                var rec = Ext.create('MyDesktop.app.model.CountryStructureModel');
                                grid.store.insert(0,rec);
                            }
                        },'-',{
                            text:'ثبت تغییرات',
                            tooltip:'ثبت تغییرات',
                            iconCls:'save',
                            handler:function(){
                                var grid = Ext.getCmp('countrySGridList');
                                var modifiedRecords = grid.store.getModifiedRecords();
                                var updateArray = [];
                                for(var i=0;i<modifiedRecords.length;i++){

                                    if(modifiedRecords[i].get('parent')){
                                        if(modifiedRecords[i].get('parent').name){

                                        }else{
                                            var id = modifiedRecords[i].get('parent');
                                            var parent = grid.store.findRecord('id',id);
                                            var ids = [];
                                            ids.push(id);
                                            if(parent == null){
                                                var countryStructure;
                                                Ext.Ajax.request({
                                                    url : 'countryStructure/getById.action',
                                                    method: 'POST',
                                                    async:false,
                                                    params:{ids : ids},
                                                    success: function (response) {
                                                        countryStructure = Ext.JSON.decode(response.responseText);
                                                        modifiedRecords[i].set('parent',countryStructure);
                                                    },
                                                    failure: function (response) {
                                                        var jsonResp = Ext.JSON.decode(response.responseText);
                                                        Ext.Msg.alert("Error",jsonResp.error);
                                                    }
                                                });
                                            }else{
                                                modifiedRecords[i].set('parent',parent.data);
                                            }
                                        }
                                    }else{
                                        modifiedRecords[i].set('parent',null);
                                    }
                                    updateArray.push(modifiedRecords[i].data);
                                }
                                Ext.Ajax.request({
                                    url : 'countryStructure/batchUpdate.action',
                                    method: 'POST',
                                    /*headers:{'Content-Type' : 'text/html'},*/
                                    jsonData:updateArray,
                                    success: function (response) {
                                        var jsonResp = Ext.JSON.decode(response.responseText);
                                        /* Ext.Msg.alert("Info","UserName from Server : "+jsonResp.username);*/
                                        grid.store.commitChanges();
                                        grid.store.load();
                                        grid.getView().refresh();
                                    },
                                    failure: function (response) {
                                        grid.store.rejectChanges();
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