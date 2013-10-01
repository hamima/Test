/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 9/1/13
 * Time: 11:44 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyDesktop.app.view.capsule.CapsuleEdit', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.capsuleEdit',
    requires:['MyDesktop.app.util.GlobalVariables'],
    height: 356,
    rtl: true,
    closable:true,
    autoScroll: true,
    width: 400,
    bodyPadding: 10,
    title: 'مشخصات کپسول ها',
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
    capsuleTypeCombo:function(){
        // The data store containing the list of capsule types
        var capsuleType = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"ONE", "name":"نوع یک"},
                {"value":"TWO", "name":"نوع دو"},	        //...
                {"value":"THREE", "name":"نوع سه"},
                {"value":"FOUR", "name":"نوع چهار"},
                {"value":"FIVE", "name":"نوع پنج"}
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
    dateRenderer:function(value){
        var toDate = value;
        if(toDate){
            if(toDate.length){
                var miladi = value.split('-')[2];
                var date = [];
                if(miladi > 1500){
                    date.push( value.split('-')[2]);
                    date.push( value.split('-')[1]);
                    date.push( value.split('-')[0]);
                    toDate = Ext.Date.JalaliConverter.gregorianToJalali(date);
                }else
                {
                    var todate = value.split('-');
                    toDate = [];
                    toDate[0] = todate[2];
                    toDate[1] = todate[1];
                    toDate[2] = todate[0];
                }
                if(toDate[1].toString().length == 1){
                    toDate[1] = '0'+toDate[1];
                }
                if(toDate[2].toString().length == 1){
                    toDate[2] = '0'+toDate[2];
                }
                toDate = toDate[2]+'-'+toDate[1]+'-'+toDate[0];
            }else{

                var date = [];
                date.push(toDate.getFullYear());
                date.push(toDate.getMonth()+1);
                date.push(toDate.getDate());
                toDate = Ext.Date.JalaliConverter.gregorianToJalali(date);
                if(toDate[1].toString().length == 1){
                    toDate[1] = '0'+toDate[1];
                }
                if(toDate[2].toString().length == 1){
                    toDate[2] = '0'+toDate[2];
                }
                toDate = toDate[2]+'-'+toDate[1]+'-'+toDate[0];
            }
        }else{
            toDate = '---'
        }
        return toDate;
    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                   xtype:'form',
                   border:false,
                   items:
                        [
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
                                    var record = Ext.create('MyDesktop.app.model.CapsuleModel'),
                                        values = me.getValues(),
                                        store = MyDesktop.app.util.GlobalVariables.gCapsuleStore;

                                    var combo = Ext.getCmp('capsuleCapsuleLocationCombo');

                                    var v = combo.getValue();
                                    record.set(values);
                                    var capsuleLocation = [];
                                    for (var i=0; i< v.length;i++){
                                        var rec = combo.findRecord(combo.valueField || combo.displayField, v[i]);
                                        capsuleLocation.add(rec.data);
                                    };

                                    for (var i = 0; i < capsuleLocation.data.items.length; i++) {
                                        capsuleLocation.data.items[i].setDirty();
                                    };
                                    record.setDirty();
                                    record.set('capsuleLocation',capsuleLocation);

                                    store.add(record);
                                    store.sync();
                                }
                            }
                        ]
                },
                {
                    xtype:'grid',
                    store:MyDesktop.app.util.GlobalVariables.gCapsuleStore,
                    columnLines:true,
                    height:400,

                    columns: [
                        {
                            xtype: 'rownumberer',
                            locked: true
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'eqNumber',
                            text: 'شماره تجهیز',
                            editor: {
                                xtype: 'textfield'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'shomarePeyman',
                            text: 'شماره پیمان',
                            editor: {
                                xtype: 'textfield'
                            }

                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'address',
                            text: 'آدرس',
                            editor: {
                                xtype: 'textareafield'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'longtitute',
                            text: 'طول جغرافیایی',
                            editor: {
                                xtype: 'textfield'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'latitute',
                            text: 'عرض جغرافیایی',
                            editor: {
                                xtype: 'textfield'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'height',
                            text: 'ارتفاع',
                            editor: {
                                xtype: 'textfield'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer:function(value,meta,record){
                                var ret;
                                if(value == 'NO'){
                                    ret = 'خیر';
                                }else{
                                    ret = 'بله';
                                }
                                return ret;
                            },

                            dataIndex: 'gathered',
                            text: 'جمع آوری شده',
                            editor:this.yesNoCombo()
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'gatheringNotes',
                            text: 'نکات جمع آوری',
                            editor: {
                                xtype: 'textareafield'
                            }
                        },
                        {
                            xtype: 'datecolumn',
                            dataIndex: 'gatheringDate',
                            text: 'تاریخ جمع آوری',
                            renderer: function(value){
                                return this.dateRenderer(value);
                            },
                            editor: {
                                xtype: 'datefield',
                                anchor: '50%',
                                plugins: ['jalalidate'],
                                format:'d/m/Y'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'lunchTime',
                            text: 'تاریخ بهره برداری',
                            renderer: function(value){
                                return this.dateRenderer(value);
                            },
                            editor: {
                                xtype: 'datefield',
                                anchor: '50%',
                                plugins: ['jalalidate'],
                                format:'d/m/Y'
                            }
                        },
                        {   xtype: 'gridcolumn',
                            renderer:function(value,meta,record){
                                var ret;
                                if(value == 'NO'){
                                    ret = 'خیر';
                                }else{
                                    ret = 'بله';
                                }
                                return ret;
                            },
                            dataIndex: 'locked',
                            text: 'قفل',
                            editor: this.yesNoCombo()
                        },
                        {
                            text:'مشخصات کپسول',
                            columns:[{
                                xtype: 'gridcolumn',
                                dataIndex: 'model',
                                text: 'مدل',
                                editor: {
                                    xtype: 'textfield'
                                }
                            },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'serialNumber',
                                    text: 'شماره سریال',
                                    editor: {
                                        xtype: 'textfield'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'reserve',
                                    text: 'رزرو',
                                    editor: {
                                        xtype: 'textfield'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'type',
                                    text: 'رزرو',
                                    editor: {
                                        xtype: 'textfield'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'droppingDate',
                                    text: 'تاریخ اسقاط',
                                    renderer: function(value){
                                        return this.dateRenderer(value);
                                    },
                                    editor: {
                                        xtype: 'datefield',
                                        anchor: '50%',
                                        plugins: ['jalalidate'],
                                        format:'d/m/Y'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'type',
                                    text: 'تیپ کپسول',
                                    editor: {
                                        xtype: 'textfield'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'capacity',
                                    text: 'ظرفیت',
                                    editor: {
                                        xtype: 'textfield'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'capsuleLocation',
                                    text: 'موقعیت کپسول',
                                    renderer: function(value,meta,record){//1.
                                        //var orderStore = record.orderStore;//2a.
                                        //var orderList = ordersStore.data.items;//2b.
                                        var post = record.raw.capsuleLocation[0]; //3.This line is the same as 2 the lines above(2a,2b).
                                        var postName; //5.
                                        if(post != null){
                                            postName = post.buldingName;
                                        }else{
                                            postName = '---';
                                        }
                                        return postName ;
                                    },
                                    editor: {
                                        xtype: 'combobox',
                                        id:'capsuleLocationListCombo',
                                        name:'capsuleLocation',
                                        store:MyDesktop.app.util.GlobalVariables.gCapsuleLocationStore,
                                        displayField: 'buildingName'
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
                            store:MyDesktop.app.util.GlobalVariables.gCapsuleStore,
                            displayInfo: true,
                            emptyMsg: 'داده ای برای نمایش وجود ندارد',
                            firstText: 'صفحه اول',
                            lastText: 'صحفه آخر',
                            nextText: 'صفحه بعدی'
                        }
                    ]

                }

            ],
            tbar:[

            ]
        });

        me.callParent(arguments);
    }

});