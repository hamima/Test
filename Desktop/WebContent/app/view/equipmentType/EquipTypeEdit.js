/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 8/27/13
 * Time: 1:19 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyDesktop.app.view.equipmentType.EquipTypeEdit', {
    extend: 'Ext.form.Panel',
    alias: 'widget.equipTypeEdit',
    requires:['MyDesktop.app.store.EquipmentTypeStore'],
    height: 356,
    rtl: true,
    closable:true,
    autoScroll: true,
    width: 400,
    bodyPadding: 10,
    title: 'ساخت تیپ کپسول',
    layout:{
        type:'vbox'
    },
    capsuleTypeCombo:function(){
        // The data store containing the list of capsule types
        var capsuleType = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"ONE", "name":"نوع اول"},
                {"value":"TWO", "name":"نوع دوم"},	        //...
                {"value":"THREE", "name":"نوع سوم"},
                {"value":"FOUR", "name":"نوع چهارم"},
                {"value":"FIVE", "name":"نوع پنجم"}
            ]
        });

        // Create the combo box, attached to the states data store
        var combo = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'نوع کپسول',
            id: 'capsuleTypeCombo',
            store: capsuleType,
            queryMode: 'local',
            name:'type',
            displayField: 'name',
            valueField: 'value',
            renderTo: Ext.getBody()
        });

        return combo;
    },
    equipTypeCombo:function(){
        // The data store containing the list of capsule types
        var capsuleType = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"CAPSULE", "name":"کپسول"}
            ]
        });

        // Create the combo box, attached to the states data store
        var combo = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'نوع تجهیز',
            id: 'equipTypeCombo',
            store: capsuleType,
            queryMode: 'local',
            name:'type',
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
                    collapsible:true,
                    header:false,
                    id:'equipTypeBaseForm',
                    items:[
                        {
                            xtype: 'fieldset',
                            title: 'مشخصات کلی تجهیز',
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    layout: {
                                        type: 'table',
                                        columns: 3

                                    },
                                    items:[
                                        {
                                            xtype: 'textfield',
                                            anchor: '50%',
                                            fieldLabel:'شماره تجهیز',
                                            name: 'eqNumber'

                                        },
                                        {
                                            xtype: 'textfield',
                                            anchor: '50%',
                                            fieldLabel:'شماره پیمان',
                                            name: 'shomarePeyman'
                                        },
                                        {
                                            xtype: 'textareafield',
                                            anchor: '50%',
                                            fieldLabel:'آدرس',
                                            name: 'address'
                                        },
                                        {
                                            xtype: 'textfield',
                                            anchor: '50%',
                                            fieldLabel:'اجرا کننده',
                                            name: 'executer'
                                        },
                                        {
                                            xtype: 'textfield',
                                            anchor: '50%',
                                            fieldLabel:'طول جغرافیایی',
                                            name: 'longtitute'
                                        },
                                        {
                                            xtype: 'textfield',
                                            anchor: '50%',
                                            fieldLabel:'عرض جغرافیایی',
                                            name: 'latitute'
                                        },
                                        {
                                            xtype: 'textfield',
                                            anchor: '50%',
                                            fieldLabel:'ارتفاع',
                                            name: 'height'
                                        },
                                        {
                                            anchor: '50%',
                                            fieldLabel:'جمع آوری شده',
                                            name: 'gathered',
                                            boxLabel: '',
                                            xtype: 'checkboxfield',
                                            checked   : false,
                                            value: 1,
                                            inputValue: 'YES',
                                            uncheckedValue: 'NO'
                                        },
                                        {
                                            xtype: 'textareafield',
                                            anchor: '50%',
                                            fieldLabel:'نکات جمع آوری',
                                            name: 'gatheringNotes'
                                        },
                                        {
                                            xtype: 'datefield',
                                            anchor: '50%',
                                            plugins: ['jalalidate'],
                                            format:'d/m/Y',
                                            fieldLabel:'تاریخ بهره برداری',
                                            name: 'lunchTime'
                                        },
                                        {
                                            xtype: 'datefield',
                                            anchor: '50%',
                                            plugins: ['jalalidate'],
                                            format:'d/m/Y',
                                            fieldLabel:'تاریخ جمع آوری',
                                            name: 'gatheringDate'
                                        },
                                        {
                                            xtype: 'textfield',
                                            anchor: '50%',
                                            fieldLabel:'قفل',
                                            name: 'locked'
                                        },
                                        {
                                            xtype:'combobox',
                                            fieldLabel:'ساختار جریان',
                                            id: 'equipFlowCombo',
                                            emptyText: 'ساختار جریان',
                                            name:'flows',
                                            anchor:'50%',
                                            multiSelect: true,
                                            store:Ext.create('MyDesktop.app.store.FlowStructureStore',{}),
                                            displayField: 'name'
                                        },
                                        {
                                            xtype:'combobox',
                                            fieldLabel:'ساختار کشوری',
                                            id: 'equipCSCombo',
                                            emptyText: 'ساختار کشوری',
                                            name:'countryStructure',
                                            anchor:'50%',
                                            store:Ext.create('MyDesktop.app.store.CountryStructureStore',{}),
                                            displayField: 'name'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    title: 'مشخصات کلی تجهیز',
                                    items: [
                                        {
                                            xtype: 'fieldcontainer',
                                            layout: {
                                                type: 'table',
                                                columns: 3

                                            },
                                            items:[
                                                {
                                                    xtype: 'textfield',
                                                    anchor: '50%',
                                                    name:'id',
                                                    hidden:true
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    anchor: '50%',
                                                    name:'model',
                                                    fieldLabel: 'مدل کپسول'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    anchor: '50%',
                                                    name:'serialNumber',
                                                    fieldLabel: 'شماره سریال'
                                                },
                                                this.capsuleTypeCombo(),
                                                {
                                                    xtype: 'textfield',
                                                    anchor: '50%',
                                                    fieldLabel: 'ظرفیت',
                                                    name: 'capacity'
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    anchor: '50%',
                                                    fieldLabel: 'رزرو',
                                                    name: 'reserve',
                                                    checked   : false,
                                                    value: 1,
                                                    inputValue: 'YES',
                                                    uncheckedValue: 'NO'
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    anchor: '50%',
                                                    plugins: ['jalalidate'],
                                                    format:'d/m/Y',
                                                    fieldLabel: 'تاریخ اسقاط',
                                                    name: 'droppingDate'
                                                },
                                                ,
                                                {
                                                    xtype:'combobox',
                                                    fieldLabel:'مکان کپسول',
                                                    id: 'capsuleLocationCombo',
                                                    emptyText: 'مکان کپسول',
                                                    name:'locations',
                                                    anchor:'50%',
                                                    multiSelect: true,
                                                    store:Ext.create('MyDesktop.app.store.CapsuleLocationStore',{}),
                                                    displayField: 'buildingName'

                                                }
                                            ]

                                        }
                                    ]
                                }


                            ]
                        },
                        {
                            xtype:'combobox',
                            fieldLabel:'موقعیت کپسول ها',
                            id: 'capsuleCapsuleLocationCombo',
                            emptyText: 'موقعیت کپسول ها',
                            name:'capsuleLocation',
                            anchor:'50%',
                            multiSelect: true,
                            store:Ext.create('MyDesktop.app.store.CapsuleLocationStore',{}),
                            displayField: 'name'
                        },
                        {
                            xtype: 'button',
                            text: 'ثبت',
                            handler: function(button, event) {
                                var record = Ext.create('MyDesktop.app.model.EquipmentTypeModel'),
                                    capsuleModel = Ext.create('MyDesktop.app.model.CapsuleModel'),
                                    values = me.getValues(),
                                    store = MyDesktop.app.util.GlobalVariables.gEquipmentTypeStore;
                                record.set('name',Ext.getCmp('name').value);
                                record.set('type',Ext.getCmp('equipTypeCombo').getValue());
                                record.setDirty();
                                var locationJSON = new Array();
                                var flowsJSON = new Array();
                                var countryJSON;
                                var capsuleJSON;
                                capsuleModel.setDirty();
                                var capsuleForm = Ext.getCmp('capsuleForm');
                                var flowcombo = Ext.getCmp('equipFlowCombo');
                                var locationcombo = Ext.getCmp('capsuleLocationCombo');
                                var countrycombo = Ext.getCmp('equipCSCombo');
                                var flow = capsuleModel.flows();
                                var v = flowcombo.getValue();
                                var l = locationcombo.getValue();
                                var c = countrycombo.getValue();
                                for (var i=0; i< v.length;i++){
                                    var rec = flowcombo.findRecord(flowcombo.valueField || flowcombo.displayField, v[i]);
                                    flow.add(rec.data);
                                    flowsJSON[i] =  JSON.stringify(rec.data);
                                }
                                for (var i=0; i< flow.data.items.length;i++){
                                    flow.data.items[i].setDirty();
                                }

                                var country = countrycombo.findRecord(countrycombo.valueField || countrycombo.displayField, c);
                                countryJSON = JSON.stringify(country.data);
                                var locations = capsuleModel.locations();
                                for (var i=0; i< l.length;i++){
                                    var location = locationcombo.findRecord(locationcombo.valueField || locationcombo.displayField, l[i]);
                                    locations.add(location.data);
                                    locationJSON[i] = JSON.stringify(location.data);
                                }
                                for (var i=0; i< locations.data.items.length;i++){
                                    locations.data.items[i].setDirty();
                                }
                                capsuleModel.set(capsuleForm.getValues());
                                capsuleModel.set('flows',flowsJSON);
                                capsuleModel.set('locations',locationJSON);
                                capsuleModel.set('countryStructure',countryJSON);
                                capsuleJSON = JSON.stringify(capsuleModel.data);
                                capsuleJSON = capsuleJSON.replace(/\\/g,'');
                                capsuleJSON = capsuleJSON.replace(/\[\"{/g, '[{');
                                capsuleJSON = capsuleJSON.replace(/\}"\]/g, '}]');
                                capsuleJSON = capsuleJSON.replace(/\}",\"{/g, '},{');
                                capsuleJSON = capsuleJSON.replace(/\}",/g, '},');
                                capsuleJSON = capsuleJSON.replace(/\:"{/g, ':{');
                                record.set('defaults',capsuleJSON);
                                /*                      var combo = Ext.getCmp('equipmentTypeCombo');

                                 var v = combo.getValue();
                                 if(v == null){
                                 record.set('post',{});
                                 } else{
                                 var rec = combo.findRecord(combo.valueField || combo.displayField, v);


                                 parent.set(rec.data);
                                 record.set('post',parent.data);
                                 }*/
                                record.setDirty();
                                record.setId(0);
                                console.log(record);
                                store.add(record);
                                store.sync({
                                    success: function (proxy, operations) {
                                        Ext.getCmp('equipTypeBaseForm').store.refresh();
                                    }, failure: function (proxy, operations) {
                                        // resume records
                                    }
                                });
                            }
                        }
                    ]
                },
                {
                   xtype:'splitter'
                },
                {
                    xtype:'grid',
                    store:MyDesktop.app.util.GlobalVariables.gEquipmentTypeStore,
                    columns: [
                        {
                            xtype: 'rownumberer',
                            locked: true
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'id',
                            text: 'شناسه',
                            editor: {
                                xtype: 'textfield'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'name',
                            text: 'نام',
                            editor: {
                                xtype: 'textfield'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'type',
                            text: '',
                            editor: {
                                xtype: 'textfield'
                            }
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
                                        grid.dataview.refresh();
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
                            store:Ext.create('MyDesktop.app.store.EquipmentTypeStore',{}),
                            displayInfo: true,
                            emptyMsg: 'داده ای برای نمایش وجود ندارد',
                            firstText: 'صفحه اول',
                            lastText: 'صحفه آخر',
                            nextText: 'صفحه بعدی'
                        }
                    ],
                    tbar:[{
                        text:'اضافه کردن تیپ تجهیز',
                        tooltip:'Add a new row',
                        iconCls:'add',
                        handler : function() {}
                    }, '-', {
                        text:'تنظیمات',
                        tooltip:'Modify options',
                        iconCls:'option',
                        handler : function() {}
                    },'-',{
                        text:'حذف کردن موقعیت کپسول',
                        tooltip:'Remove the selected item',
                        iconCls:'remove',
                        handler : function() {}
                    }]
                }
            ],
            tbar:[
                /* this.createSearchPanel()*/
            ]
        });

        me.callParent(arguments);
    },
    onSelectionChange: function(model, records) {
        var rec = records[0];
        if (rec) {
            Ext.getCmp('equipTypeBaseForm').loadRecord(rec);
        }
    }

});