Ext.define('MyDesktop.app.view.equipmentType.EquipmentTypeList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.equipTypeList',
    requires:['MyDesktop.app.store.EquipmentTypeStore'],
    store:Ext.create('MyDesktop.app.store.EquipmentTypeStore',{}),
    height: 600,
    rtl: true,
    closable:true,
    width: 400,
    title: 'لیست تیپ های تجهیزات',
    capsuleTypeCombo:function(){
        // The data store containing the list of capsule types
        var capsuleType;
        capsuleType = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data: [
                {"value": "ONE", "name": "نوع اول"},
                {"value": "TWO", "name": "نوع دوم"},	        //...
                {"value": "THREE", "name": "نوع سوم"},
                {"value": "FOUR", "name": "نوع چهارم"},
                {"value": "FIVE", "name": "نوع پنجم"}
            ]
        });

        // Create the combo box, attached to the states data store
        var combo;
        combo = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'نوع کپسول',
            id: 'capsuleType',
            store: capsuleType,
            queryMode: 'local',
            name: 'type',
            displayField: 'name',
            valueField: 'value',
            renderTo: Ext.getBody()
        });

        return combo;
    },
    equipTypeCombo:function(){
        // The data store containing the list of capsule types
        var capsuleType;
        capsuleType = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data: [
                {"value": "CAPSULE", "name": "کپسول"}
            ]
        });

        // Create the combo box, attached to the states data store
        var combo;
        combo = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'نوع تجهیز',
            id: 'equipTypeCombo',
            store: capsuleType,
            queryMode: 'local',
            name: 'type',
            displayField: 'name',
            valueField: 'value',
            renderTo: Ext.getBody()
        });

        return combo;
    },
    showDefaults:function(record,type,defaults,rowIndex){
        var isForm = Ext.create('Ext.window.Window', {
            title: 'تعیین پیش فرض های تجهیز',
            id:'DefaultsWindow',
            width: 600,
            bodyPadding: 5,
            height: 300,
            layout: 'fit',
            rtl:true,
            closable:true,
            items:
                [
                    {
                        xtype:'form',
                        id:'capsuleDefaultsForm',
                        header: false,
                        border: false,
                        items:[
                            {
                                xtype: 'fieldset',
                                animCollapse: true,
                                collapsible: true,
                                title: 'مشخصات کپسول',
                                items: [
                                    {
                                        xtype:'fieldcontainer',
                                        layout:{
                                            type:'hbox'
                                        },
                                        items:
                                            [
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
                                                }


                                            ]

                                    },
                                    {
                                        xtype:'fieldcontainer',
                                        layout:{
                                            type:'hbox'
                                        },
                                        items:
                                            [
                                                this.capsuleTypeCombo(),
                                                {
                                                    xtype: 'textfield',
                                                    anchor: '50%',
                                                    fieldLabel: 'ظرفیت',
                                                    name: 'capacity'
                                                }

                                            ]
                                    },
                                    {
                                        xtype:'fieldcontainer',
                                        layout:{
                                            type:'hbox'
                                        },
                                        items:
                                            [
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
                                                }
                                            ]
                                    }
                                ]
                            }
                        ]
                    }
                ],
            dockedItems:
                [
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
                                    Ext.getCmp('DefaultsWindow').close();
                                }
                            },
                            {
                                text: 'ثبت',
                                handler: function(){
                                    var capsuleModel = Ext.create('MyDesktop.app.model.CapsuleModel'),
                                    capsuleForm = Ext.getCmp('capsuleDefaultsForm'), flows = null
                                        , locations = null, country = null;
                                    capsuleModel.set(capsuleForm.getValues());
                                    var valueForm = capsuleForm.getValues();
                                    var droppingDate = valueForm.droppingDate;
                                    droppingDate = droppingDate.split('/');
                                    var dropping = new Date(Ext.Date.JalaliConverter.jalaliToGregorian(droppingDate)).getTime();
                                    capsuleModel.set('droppingDate',dropping);
                                    capsuleModel.set('flows',flows);
                                    capsuleModel.set('locations',locations);
                                    capsuleModel.set('countryStructure',country);
                                    var capsuleJSON = JSON.stringify(capsuleModel.data);
                                    var rec = Ext.getCmp('equipTypeGridList').store.getAt(rowIndex);
                                    rec.set('defaults',capsuleJSON);
                                    Ext.getCmp('DefaultsWindow').close();
                                }
                            }]
                    }]
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
                        labelField:'name',
                        options:
                            [
                                {id: "CAPSULE", "name": "کپسول"}
                            ]
                    },
                    {
                        type: 'string',
                        dataIndex: 'num'
                    }
                ]
        });
        Ext.applyIf(me, {

            items:
                [
                    {
                        xtype:'grid',
                        height:600,
                        columnLines:true,
                        id:'equipTypeGridList',
                        store:MyDesktop.app.util.GlobalVariables.gEquipmentTypeStore,
                        columns: [
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
                                text: 'نوع',
                                editor: {
                                    xtype: 'textfield'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'num',
                                text: 'تعداد'

                            },
                            {
                                xtype: 'actioncolumn',
                                items: [
                                    {
                                        iconCls:'settings',
                                        tooltip: 'پیش فرض های تجهیز',
                                        scope: this,
                                        handler: function(grid, rowIndex) {
                                            var rec = grid.getStore().getAt(rowIndex);
                                            var defaults = rec.get('defaults');
                                            var type = rec.get('type');
                                            var defaultWindow = this.showDefaults(rec,type,defaults,rowIndex);
                                            var record = Ext.create('MyDesktop.app.model.CapsuleModel');
                                            record.data = Ext.JSON.decode(defaults);
                                            Ext.getCmp('capsuleDefaultsForm').loadRecord(record);
                                            defaultWindow.show();
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
                                            grid.dataview.refresh();
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
                        features: [filters],
                        dockedItems: [
                            {
                                xtype: 'pagingtoolbar',
                                dock: 'bottom',
                                rtl: true,
                                width: 360,
                                store:MyDesktop.app.util.GlobalVariables.gEquipmentTypeStore,
                                displayInfo: true,
                                emptyMsg: 'داده ای برای نمایش وجود ندارد',
                                firstText: 'صفحه اول',
                                lastText: 'صحفه آخر',
                                nextText: 'صفحه بعدی'
                            }
                        ],
                        tbar:[{
                            text:'اضافه کردن تیپ تجهیز',
                            tooltip:'اضافه کردن تیپ تجهیز',
                            iconCls:'add',
                            handler : function() {
                                var grid =  Ext.getCmp('equipTypeGridList');
                                var rec = Ext.create('MyDesktop.app.model.EquipmentTypeModel');
                                grid.store.insert(0,rec);
                            }
                        },'-',{
                            text:'ثبت تغییرات',
                            tooltip:'ثبت تغییرات',
                            iconCls:'save',
                            handler : function() {
                                var grid =  Ext.getCmp('equipTypeGridList');
                                var modifiedRecords = grid.store.getModifiedRecords();
                                var updateArray = [];
                                for(var i=0;i<modifiedRecords.length;i++){
                                    updateArray.push(modifiedRecords[i]);
                                }
                                Ext.Ajax.request({
                                    url : 'equipmentType/batchUpdate.action',
                                    method: 'POST',
                                    /*headers:{'Content-Type' : 'text/html'},*/
                                    jsonData:updateArray,
                                    success: function (response) {
                                        var jsonResp = Ext.JSON.decode(response.responseText);
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
                        }]
                    }
                ]

        });

        me.callParent(arguments);
    }
});