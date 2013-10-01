/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 9/1/13
 * Time: 12:01 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyDesktop.app.view.countryStructure.CountrySEdit', {
    extend: 'Ext.form.Panel',
    alias: 'widget.countryEdit',
    autoScroll: true,
    height: 182,
    rtl: true,
    closable:true,
    width: 600,
    bodyPadding: 10,
    title: 'ایجاد ساختار کشوری',
    layout:{
        type:'vbox',
        align: 'stretch'
    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype:'form',
                    border:false,
                    id:'countrySEditForm',
                    items:
                        [
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
                                    store.sync({
                                        success: function (proxy, operations) {
                                            Ext.getCmp('countrySEditForm').store.refresh();
                                        }, failure: function (proxy, operations) {
                                        }
                                    });
                                }
                            }
                        ]

                }/*,
                {
                    xtype:'grid',
                    height:400,
                    id:'countrySEditList',
                    store:MyDesktop.app.util.GlobalVariables.gCountryStructStore,
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
                            dataIndex:'parent',
                            renderer: function(value,meta,record){//1.
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
                                store:MyDesktop.app.util.GlobalVariables.gCountryStructStore,
                                displayField: 'name',
                                valueField:'id'
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
                    listeners: {
                        scope: this,
                        selectionchange: this.onSelectionChange
                    },
                    selModel: Ext.create('Ext.selection.RowModel', {

                    }),
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
                            nextText: 'صفحه بعدی'
                        }
                    ],
                    tbar:[
                        *//*{
                        text:'اضافه کردن ساختار کشوری',
                        tooltip:'اضافه کردن ساختار کشوری',
                        iconCls:'add',
                        handler:function(){
                            var rec = Ext.create('MyDesktop.app.model.CountryStructureModel');
                            var store = Ext.getCmp('countrySEditList').store;
                            store.insert(0,rec);
                        }
                    },'-',*//*{
                        text:'ثبت تغییرات',
                        tooltip:'ثبت تغییرات',
                        iconCls:'save',
                        handler:function(){
                            var modifiedRecords = me.store.getModifiedRecords();
                            var updateArray = [];
                            for(var i=0;i<modifiedRecords.length;i++){
                                *//* if(modifiedRecords[i].get('hseunderControl') == 'false')
                                 {
                                 modifiedRecords[i].set('hseunderControl','NO');
                                 }else if(modifiedRecords[i].get('hseunderControl') == 'true'){
                                 modifiedRecords[i].set('hseunderControl','YES');
                                 }*//*
                                if(modifiedRecords[i].get('parent')){
                                    if(modifiedRecords[i].get('parent').name){
                                        updateArray.push(modifiedRecords[i].data);

                                    }else{
                                        var id = modifiedRecords[i].get('parent');
                                        var parent = me.store.findRecord('id',id);
                                        modifiedRecords[i].set('parent',parent.data);
                                        updateArray.push(modifiedRecords[i].data);
                                    }
                                }else{
                                    updateArray.push(modifiedRecords[i].data);
                                }
                            }
                            Ext.Ajax.request({
                                url : 'countryStructure/batchUpdate.action',
                                method: 'POST',
                                *//*headers:{'Content-Type' : 'text/html'},*//*
                                jsonData:updateArray,
                                success: function (response) {
                                     var jsonResp = Ext.JSON.decode(response.responseText);
                                    *//* Ext.Msg.alert("Info","UserName from Server : "+jsonResp.username);*//*
                                    me.store.commitChanges();
                                    me.getView().refresh();
                                },
                                failure: function (response) {
                                    var jsonResp = Ext.JSON.decode(response.responseText);
                                    Ext.Msg.alert("Error",jsonResp.error);
                                }
                            });
                        }
                    }*//*,'-',{
                            text:'حذف',
                            tooltip:'Remove the selected item',
                            iconCls:'remove'
                        }*//*]

                }*/

            ]
        });

        me.callParent(arguments);
    },
    onSelectionChange: function(model, records) {
        var rec = records[0];
        if (rec) {
            Ext.getCmp('countrySEditForm').loadRecord(rec);
        }
    }

});