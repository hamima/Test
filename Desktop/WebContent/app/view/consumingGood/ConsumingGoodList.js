Ext.define('MyDesktop.app.view.consumingGood.ConsumingGoodList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.consumingGoodList',
    requires:['MyDesktop.app.store.ConsumingGoodStore'],
    rtl: true,
    closable:true,
    title: 'اقلام مصرفی',
    
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items:
                [
                    {
                        xtype:'grid',
                        id:'consumingGoodGridList',
                        columnLines:true,
                        store:MyDesktop.app.util.GlobalVariables.gConsumingGoodStore,
                        height:400,
                        columns:  [
                            {
                                xtype: 'rownumberer',
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
                                dataIndex: 'description',
                                text: 'توضیحات',
                                editor:{
                                    xtype:'textfield'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'code',
                                text: 'کد',
                                editor:{
                                    xtype:'textfield'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'specificProps',
                                text: 'ویژگی های خاص',
                                editor:{
                                    xtype:'textfield'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'consumingGoodsGroup',
                                text: 'کد گروه قلم خفاظتی',
                                renderer:function(value){
                                    var consumingGoodGroupCode;
                                    var consumingGoodGroup = value;
                                    if(consumingGoodGroup){
                                        if(consumingGoodGroup.code){
                                            consumingGoodGroupCode = consumingGoodGroup.code;
                                        }else {
                                            consumingGoodGroupCode = '---';
                                        }
                                    } else {
                                        consumingGoodGroupCode = '---';
                                    }
                                    return consumingGoodGroupCode;
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'consumingGoodsGroup',
                                text: 'معیار سنجش گروه قلم خفاظتی',
                                renderer:function(value){
                                    var consumingGoodGroupMetric;
                                    var consumingGoodGroup = value;
                                    if(consumingGoodGroup){
                                        if(consumingGoodGroup.metric){
                                            consumingGoodGroupMetric = consumingGoodGroup.metric;
                                        }else {
                                            consumingGoodGroupMetric = '---';
                                        }
                                    } else {
                                        consumingGoodGroupMetric = '---';
                                    }
                                    return consumingGoodGroupMetric;
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
                                store:MyDesktop.app.util.GlobalVariables.gConsumingGoodStore,
                                displayInfo: true,
                                emptyMsg: 'داده ای برای نمایش وجود ندارد',
                                firstText: 'صفحه اول',
                                lastText: 'صحفه آخر',
                                nextText: 'صفحه بعدی'
                            }
                        ],
                        tbar:[{
                            text:'اضافه کردن اقلام مصرفی',
                            tooltip:'اضافه کردن اقلام مصرفی',
                            iconCls:'add',
                            handler:function(){
                                var grid =  Ext.getCmp('consumingGoodGridList');
                                var rec = Ext.create('MyDesktop.app.model.ConsumingGoodModel');
                                grid.store.insert(0,rec);
                            }
                        },'-',{
                            text:'ثبت تغییرات',
                            tooltip:'Remove the selected item',
                            iconCls:'save',
                            handler:function(){
                                var grid =  Ext.getCmp('consumingGoodGridList');
                                var modifiedRecords = grid.store.getModifiedRecords();
                                var updateArray = [];
                                for(var i=0;i<modifiedRecords.length;i++){
                                    if(modifiedRecords[i].get('consumingGoodsGroup')){
                                        if(modifiedRecords[i].get('consumingGoodsGroup').name){
                                            updateArray.push(modifiedRecords[i].data);
                                        }else{
                                            var id = modifiedRecords[i].get('consumingGoodsGroup');
                                            var groupValueCombo = grid.store.findRecord('id',id);
                                            if(groupValueCombo == null){
                                                modifiedRecords[i].set('consumingGoodsGroup',null);
                                                updateArray.push(modifiedRecords[i].data);
                                            }else {
                                                modifiedRecords[i].set('consumingGoodsGroup',groupValueCombo.data);
                                                updateArray.push(modifiedRecords[i].data);
                                            }
                                        }
                                    }else{
                                        modifiedRecords[i].set('consumingGoodsGroup',null);
                                        updateArray.push(modifiedRecords[i].data);
                                    }
                                }
                                Ext.Ajax.request({
                                    url : 'consumingGood/batchUpdate.action',
                                    method: 'POST',
                                    /*headers:{'Content-Type' : 'text/html'},*/
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
                        }]
                    }
                ]


        });

        me.callParent(arguments);
    }

});