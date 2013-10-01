/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 8/31/13
 * Time: 4:53 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyDesktop.app.view.post.PostEdit', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.postEdit',
    requires:['MyDesktop.app.store.Posts'],
    autoScroll: true,
    height: 182,
    rtl: true,
    closable:true,
    width: 400,
    bodyPadding: 10,
    title: 'فرم پست سازمانی',
    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    yesNoCombo:function(){
        // The data store containing the list of states
        var yesOrno = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"YES", "name":"بله"},
                {"value":"NO", "name":"خیر"}	        //...
            ]
        });

        // Create the combo box, attached to the states data store
        var combo;
        combo = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '',
            store: yesOrno,
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
                    xtype:'form',
                    header: false,
                    padding:10,
                    border: false,
                    id:'postEditForm',
                    items:
                        [
                            {
                                xtype: 'fieldset',
                                title: 'سمت سازمانی',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        name : 'id',
                                        fieldLabel: 'id',
                                        hidden:true
                                    },
                                    {
                                        xtype: 'textfield',
                                        anchor: '50%',
                                        name:'name',
                                        fieldLabel: 'نام سمت',
                                        allowBlank:false,
                                        blankText: 'پر کردن ای فیلد اجباری است'
                                    },
                                    {
                                        xtype: 'combobox',
                                        id:'parentCombo',
                                        anchor: '50%',
                                        fieldLabel: 'سمت مسئول',
                                        name:'parent',
                                        store:Ext.create('MyDesktop.app.store.Posts',{}),
                                        displayField: 'name',
                                        valueField:'id',
                                        pageSize:10
                                    },
                                    {
                                        xtype: 'checkboxfield',
                                        anchor: '50%',
                                        name:'hseunderControl',
                                        fieldLabel: 'تحت اختیار HSE',
                                        boxLabel: '',
                                        checked   : false,
                                        value: 1,
                                        inputValue: 'YES',
                                        uncheckedValue: 'NO'
                                    }
                                ]
                            },
                            {
                                xtype: 'button',
                                text: 'ایجاد پست',
                                id:'createPost',
                                handler: function() {
                                    var combo = Ext.getCmp('parentCombo');
                                    var v = combo.getValue();
                                    var record = Ext.create('MyDesktop.app.model.Post'),
                                        form = Ext.getCmp('postEditForm'),
                                        store = MyDesktop.app.util.GlobalVariables.gPostStore,
                                        parent = Ext.create('MyDesktop.app.model.Post');
                                    var values = form.getValues();
                                    record.set(values);
                                    if(v == null){
                                        record.set('parent',null);
                                    } else{
                                        var rec = combo.findRecord(combo.valueField || combo.displayField, v);
                                        parent.set('id',rec.get('id'));

                                        parent.set('hseunderControl',rec.get('hseunderControl'));
                                        parent.set('name',rec.get('name'));
                                        parent.set('parent',null);
                                        record.set('parent',parent.data);
                                    }
                                    record.set('id',null);
                                    /* record.set('name',Ext.JSON.encode(record.data));*/
                                    store.add(record);

                                    store.sync({
                                        success: function (proxy, operations) {
                                            Ext.getCmp('postEditForm').getForm().reset();
                                        }, failure: function (proxy, operations) {
                                            // resume records
                                        }
                                    });

                                }
                            }/*,
                            {
                                xtype: 'button',
                                text: 'به روز رسانی',
                                id:'update',
                                disabled: true,
                                handler:function(){
                                    var record = Ext.create('MyDesktop.app.model.Post'),
                                        values = me.getValues(),
                                        store = MyDesktop.app.util.GlobalVariables.gPostStore,
                                        parent = Ext.create('MyDesktop.app.model.Post');
                                    var combo = Ext.getCmp('parentCombo');
                                    var v = combo.getValue();
                                    record.set(values);
                                    if(v == null){
                                        record.set('parent',{});
                                    } else{
                                        var rec = combo.findRecord(combo.valueField || combo.displayField, v);
                                        parent.set('id',rec.get('id'));
                                        parent.set('hseunderControl',rec.get('hseunderControl'));
                                        parent.set('name',rec.get('name'));
                                        parent.set('parent',null);
                                        record.set('parent',parent.data);
                                    }
                                    console.log(record);
                                    store.add(record);
                                    store.sync();
                                }
                            }*/
                        ]
                }
                /*{
                    xtype:'grid',
                    header: false,
                    padding:10,
                    id:'postGridEdit',
                    store:MyDesktop.app.util.GlobalVariables.gPostStore,
                    columns:  [
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
                            text: 'پست مسئول',
                            emptyCellText: '---',
                            dataIndex:'parent',
                            renderer: function(value,meta,record){//1.
                                var parentName;
                                var parent = value;
                                if(parent){
                                    if(parent.name){
                                        parentName = parent.name;
                                    }else{
                                        var combo = Ext.getCmp('postListCombo');
                                        var rec = combo.findRecord(combo.valueField , value);
                                        if(rec){
                                            parentName = rec.data.name;
                                        }else{
                                            parentName = '---';
                                        }
                                    }
                                }
                                else{
                                    parentName = '---';
                                }
                                return parentName;
                            },
                            editor: {
                                xtype: 'combobox',
                                id:'postEditCombo',
                                store:MyDesktop.app.util.GlobalVariables.gPostStore,
                                displayField: 'name',
                                valueField:'id',
                                emptyText: 'پست سازمانی'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            *//*editRenderer: function(value,meta, record) {
                             return value == true ? 'YES':'NO';
                             },*//*
                            renderer:function(value,meta,record){
                                var ret;
                                if(record.get('hseunderControl') == 'NO'){
                                    ret = 'خیر';
                                }else{
                                    ret = 'بله';
                                }
                                return ret;
                            },
                            dataIndex: 'hseunderControl',
                            text: 'تحت کنترل HSE',
                            editor:this.yesNoCombo()
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
                            store:MyDesktop.app.util.GlobalVariables.gPostStore,
                            displayInfo: true,
                            emptyMsg: 'داده ای برای نمایش وجود ندارد',
                            firstText: 'صفحه اول',
                            lastText: 'صحفه آخر',
                            nextText: 'صفحه بعدی'
                        }
                    ]
                   *//* tbar:[
                        {
                        text:'ثبت تغییرات',
                        tooltip:'ثبت تغییرات',
                        iconCls:'save',
                        handler:function(){
                            var modifiedRecords = me.store.getModifiedRecords();
                            var updateArray = [];
                            for(var i=0;i<modifiedRecords.length;i++){
                                if(modifiedRecords[i].get('hseunderControl') == 'false')
                                {
                                    modifiedRecords[i].set('hseunderControl','NO');
                                }else if(modifiedRecords[i].get('hseunderControl') == 'true'){
                                    modifiedRecords[i].set('hseunderControl','YES');
                                }
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
                                url : 'post/batch.action',
                                method: 'POST',
                                *//**//*headers:{'Content-Type' : 'text/html'},*//**//*
                                jsonData:updateArray,
                                success: function (response) {
                                     var jsonResp = Ext.JSON.decode(response.responseText);
                                    *//**//* Ext.Msg.alert("Info","UserName from Server : "+jsonResp.username);*//**//*
                                    me.store.commitChanges();
                                    me.getView().refresh();
                                },
                                failure: function (response) {
                                    var jsonResp = Ext.JSON.decode(response.responseText);
                                    Ext.Msg.alert("Error",jsonResp.error);
                                }
                            });

                        }
                    }]*//*
                }*/
            ]
        });

        me.callParent(arguments);
    },

    onSelectionChange: function(model, records) {
        var rec = records[0];
        if (rec) {
            Ext.getCmp('postEditForm').loadRecord(rec);
            if(rec.get('parent')){
                /*var combo = Ext.getCmp('parentCombo');
                var record = combo.findRecord(combo.valueField || combo.displayField, rec.get('parent').name);
                var index = combo.store.indexOf(rec.get('parent'));
                combo.setValue(combo.store.getAt(index).get(combo.valueField));*/
            }else{

            }
            Ext.getCmp('update').enable();
            Ext.getCmp('createPost').disable();
        }else{
            Ext.getCmp('update').disable();
            Ext.getCmp('createPost').enable();
        }
    }

});