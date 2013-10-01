/**
 * Created with JetBrains WebStorm.
 * User: MusI
 * Date: 9/29/13
 * Time: 12:07 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyDesktop.app.view.protectGoodsPost.ProtectGoodsPostWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.protectGoodPostWindow',
    requires:['MyDesktop.app.store.ConsumingGoodStore','MyDesktop.app.store.ConsumingGoodsGroupStore','MyDesktop.app.util.GlobalVariables.gProtectGoodPostStore'],
    autoScroll: true,
    rtl: true,
    width: 500,
    height: 400,
    layout: 'border',
    closable:true,
    bodyPadding: 10,
    post:null,
    title: 'اقلام حفاظت فردی پست های سازمانی',
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype:'form',
                    border: false,
                    region: 'north',
                    id: 'protectGoodsPostWin',
                    itemId: 'protectGoodsPostForm',
                    items:
                        [
                            {
                                xtype: 'fieldset',
                                title: 'کالای مصرفی',
                                items: [

                                    {
                                        xtype: 'textfield',
                                        name : 'id',
                                        fieldLabel: 'id',
                                        hidden:true
                                    },
                                    {
                                        xtype: 'combobox',
                                        anchor: '50%',
                                        fieldLabel: 'گروه اقلام مصرفی',
                                        emptyText: 'گروه اقلام مصرفی',
                                        id: 'groupCombo',
                                        name:'consumingGoodGroup',
                                        store:Ext.create('MyDesktop.app.store.ConsumingGoodsGroupStore',{
                                            params:{
                                                HSETrue: 'YES'
                                            }
                                        }),
                                        displayField: 'description',
                                        valueField:'id',
                                        pageSize:20,
                                        listeners: {
                                            select: function(combo, records, eOpts) {
                                                var rec = records[0];
                                                if (rec) {
                                                    Ext.Ajax.request({
                                                        url : 'consumingGood/getByGroup.action',
                                                        method: 'POST',
                                                        async:false,
                                                        params:{id : rec.get('id')},
                                                        success: function (response) {
                                                            var data = Ext.JSON.decode(response.responseText);
                                                            var combo = Ext.getCmp('goodCombo');
                                                            var store = Ext.create('Ext.data.Store',
                                                                {
                                                                    fields: [
                                                                        {
                                                                            name: 'id',
                                                                            type: 'number'
                                                                        },
                                                                        {
                                                                            name: 'name',
                                                                            type: 'string'
                                                                        },
                                                                        {
                                                                            name: 'code',
                                                                            type: 'string'
                                                                        },
                                                                        {
                                                                            name: 'specificProps',
                                                                            type: 'string'
                                                                        },
                                                                        {
                                                                            name:'consumingGoodsGroup',
                                                                            type:'auto'
                                                                        }
                                                                    ],
                                                                    data :data.data
                                                                });
                                                            combo.store.loadData(store.getRange(),false);
                                                        },
                                                        failure: function (response) {
                                                            var jsonResp = Ext.JSON.decode(response.responseText);
                                                            Ext.Msg.alert("Error",jsonResp.error);
                                                        }
                                                    });
                                                }
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'combobox',
                                        anchor: '50%',
                                        store:Ext.create('Ext.data.Store',
                                            {
                                                fields: [
                                                    {
                                                        name: 'id',
                                                        type: 'number'
                                                    },
                                                    {
                                                        name: 'name',
                                                        type: 'string'
                                                    },
                                                    {
                                                        name: 'code',
                                                        type: 'string'
                                                    },
                                                    {
                                                        name: 'specificProps',
                                                        type: 'string'
                                                    },
                                                    {
                                                        name:'consumingGoodsGroup',
                                                        type:'auto'
                                                    }
                                                ],
                                                data:[]
                                            }),
                                        fieldLabel: 'قلم مصرفی',
                                        emptyText: 'قلم مصرفی',
                                        id: 'goodCombo',
                                        queryMode: 'local',
                                        name:'consumingGood',
                                        displayField: 'name',
                                        valueField:'id'
                                    },
                                    {
                                        xtype: 'numberfield',
                                        anchor: '50%',
                                        name:'number',
                                        fieldLabel: 'تعداد'
                                    },
                                    {
                                        xtype: 'numberfield',
                                        anchor: '50%',
                                        name:'repeatDistance',
                                        fieldLabel: 'دوره تکرار'
                                    }
                                ]
                            },
                            {
                                xtype: 'button',
                                text: 'ثبت',
                                id:'createPost',
                                handler: function(button, event) {
                                    var record = Ext.create('MyDesktop.app.model.ProtectGoodPostModel'),
                                        form = Ext.getCmp('protectGoodsPostWin'),
                                        store = MyDesktop.app.util.GlobalVariables.gProtectGoodPostStore;
                                    var values = form.getValues();
                                    var combo = Ext.getCmp('groupCombo');
                                    var value = combo.value;
                                    record.set(values);
                                    if(value){
                                        var rec = combo.findRecord(combo.valueField, value);
                                        record.set('consumingGoodGroup',rec.data);
                                    }else{
                                        record.set('consumingGoodGroup',null);
                                    }
                                    var myPost = me.post;
                                    if(myPost){
                                         record.set('myPost', myPost);
                                    }
                                    combo = Ext.getCmp('goodCombo');
                                    value = combo.value;
                                    var winGrid = Ext.getCmp('protectGoodPostList');
                                    if(value){
                                         var rec = combo.findRecord(combo.valueField, value);
                                        record.set('consumingGood',rec.data);
                                    } else {
                                        record.set('consumingGood',null);
                                    }
                                    store.add(record);
                                    store.sync({
                                        success: function (proxy, operations) {
                                            Ext.getCmp('protectGoodsPostWin').getForm().reset();
                                            winGrid.store.add(record);
                                            winGrid.store.commitChanges();
                                        }, failure: function (proxy, operations) {
                                            // resume records
                                        }
                                    });
                                    me.down('#protectGoodsPostForm').getForm().reset();
                                }
                            }
                        ]

                },
                {
                    xtype: 'grid',
                    id: 'protectGoodPostList',
                    itemId: 'protectGoodPostList',
                    columnLines:true,
                    border: false,
                    region: 'center',
                    /*store: Ext.create('',{
                        params:{postId:me.post.id}
                    })*/
                    store: Ext.create('MyDesktop.app.store.ProtectGoodPostStore'),
                    /*store: MyDesktop.app.util.GlobalVariables.gProtectGoodPostStore.filterBy(function(record){
                        var currentPost = record.get('myPost');
                        var post = me.post;
                        if (post && currentPost){
                            if(post.id && currentPost.id) {
                                if(post.id == currentPost.id){
                                    return true;
                                } else {
                                    return true;
                                }
                            }
                        } else return false;
                    }),*/
                    /*store: Ext.create('MyDesktop.app.store.ProtectGoodPostStore'),.filter(function(record){
                         var currentPost = record.myPost;
                        return (me.post == currentPost);
                    }),*/
                    columns:  [
                        /*{
                         xtype: 'rownumberer',
                         locked: true,
                         editable:false
                         *//*renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                         var rowspan = this.rowspan;
                         if (rowspan){
                         metaData.tdAttr = 'rowspan="' + rowspan + '"';
                         }

                         metaData.tdCls = Ext.baseCSSPrefix + 'grid-cell-special';

                         console.log(store.indexOfTotal(record));
                         console.log(store.getTotalCount());
                         console.log(store.data.items.length);
                         console.log(record);
                         console.log('**');
                         return store.indexOfTotal(record) + 1;
                         }*//*
                         },*/
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'myPost',
                            text: 'پست',
                            emptyCellText: '---',
                            renderer: function(value){
                                var myPost = value;
                                var postName;
                                if(myPost){
                                    if (myPost.name){
                                        postName = myPost.name;
                                    }
                                }
                                return postName;
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            text: 'گروه قلم حفاظتی',
                            emptyCellText: '---',
                            dataIndex:'consumingGoodGroup',
                            renderer: function(value){
                                var groupName;
                                var group = value;
                                if(group){
                                    if(group.description){
                                        groupName= group.description;

                                    }
                                } else{
                                    groupName = '---';
                                }
                                return groupName;
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            text: 'تعداد',
                            dataIndex: 'number'
                        },
                        {
                            xtype: 'gridcolumn',
                            text: 'بازه تکرار',
                            dataIndex: 'repeatDistance'
                        },
                        {
                            xtype: 'actioncolumn',
                            items: [
                                {
                                    icon: 'resources/images/icons/fam/delete.gif',
                                    tooltip: '???',
                                    scope: this,
                                    handler: function (grid, rowIndex) {
                                        var rec = grid.getStore().getAt(rowIndex);
                                        rec.setDirty();
                                        grid.getStore().remove(rec);
                                        grid.getStore().sync();
                                    }
                                }
                            ]
                        }

                    ]
                }

            ]
        });
        me.callParent(arguments);
    }
});