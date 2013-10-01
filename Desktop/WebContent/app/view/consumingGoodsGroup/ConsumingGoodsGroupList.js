Ext.define('MyDesktop.app.view.consumingGoodsGroup.ConsumingGoodsGroupList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.consumingGoodsGroupList',
    requires:['MyDesktop.app.store.ConsumingGoodsGroupStore'],
    rtl: true,
    closable:true,
    title: 'گروه اقلام مصرفی',
    rastehTypeCombo:function(){
        // The data store containing the list of states
        var rastehType = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value": "PERSONALPROTECTION", "name": "حفاظت فردی"},
                {"value": "TECHNICAL", "name": "فنی"},
                {"value": "OFFICEEQUIPMENT", "name": "تاسیسات"},
                {"value": "MACHINERY", "name": "ماشینی"},
                {"value": "ENVIRONMENTAL", "name": "زیست محیطی"}
            ]
        });

        // Create the combo box, attached to the states data store
        var combo = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '',
            store: rastehType,
            name:'rasteh',
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
            items:
                [
                    {
                        xtype:'grid',
                        id:'consumingGoodsGroupGridList',
                        columnLines:true,
                        store:MyDesktop.app.util.GlobalVariables.gConsumingGoodsGroupStore,
                        height:400,
                        columns:  [
                            {
                                xtype: 'rownumberer',
                                locked: true,
                                editable:false
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'description',
                                text: 'توضیحات گروه قلم مصرفی',
                                editor:{
                                    xtype:'textfield'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'code',
                                text: 'کد گروه قیم مصرفی',
                                editor:{
                                    xtype:'textfield'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'metric',
                                text: 'معیار سنجش',
                                editor:{
                                    xtype:'textfield'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'rasteh',
                                text: 'رسته',
                                editor:this.rastehTypeCombo()
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
                                store:MyDesktop.app.util.GlobalVariables.gConsumingGoodsGroupStore,
                                displayInfo: true,
                                emptyMsg: '',
                                firstText: 'صحفه اول',
                                lastText: 'صحفه آخر',
                                nextText: 'صحفه بعدی',
                                prevText:'صحفه قبلی'
                            }
                        ],
                        tbar:[{
                            text:'اضافه کردن گروه اقلام مصرفی',
                            tooltip:'اضافه کردن گروه اقلام مصرفی',
                            iconCls:'add',
                            handler:function(){
                                var grid =  Ext.getCmp('consumingGoodsGroupGridList');
                                var rec = Ext.create('MyDesktop.app.model.ConsumingGoodsGroupModel');
                                grid.store.insert(0,rec);
                            }
                        },'-',{
                            text:'ثبت تغییرات',
                            tooltip:'ثبت تغییرات',
                            iconCls:'save',
                            handler:function(){
                                var grid =  Ext.getCmp('consumingGoodsGroupGridList');
                                var modifiedRecords = grid.store.getModifiedRecords();
                                var updateArray = [];
                                for(var i=0;i<modifiedRecords.length;i++){
                                    if(modifiedRecords[i].get('consumingGoodsGroup')){
                                        if(modifiedRecords[i].get('consumingGoodsGroup').name){
                                            updateArray.push(modifiedRecords[i].data);
                                        }else{
                                            var id = modifiedRecords[i].get('consumingGoodsGroup');
                                            var parent = grid.store.findRecord('id',id);
                                        }
                                    }else{
                                        modifiedRecords[i].set('consumingGoodsGroup',null);
                                        updateArray.push(modifiedRecords[i].data);
                                    }
                                }
                                Ext.Ajax.request({
                                    url : 'consumingGoodsGroup/batchUpdate.action',
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