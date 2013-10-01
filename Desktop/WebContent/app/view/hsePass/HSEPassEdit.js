/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 8/27/13
 * Time: 12:38 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyDesktop.app.view.hsePass.HSEPassEdit', {
    extend: 'Ext.panel.Panel',
    alias:'widget.hsePassEdit',
    requires:['MyDesktop.app.util.GlobalVariables'],
    height: 250,
    rtl: true,
    closable:true,
    width: 424,
    autoScroll: true,
    bodyPadding: 10,
    layout:{
        type:'vbox'
    },
    title: 'شناسنامه HSE کارمندان',
    createHseList:function(){
        var list = Ext.create('MyDesktop.app.view.hsePass.HSEPassList',{
            header:false,
            collapsible:true
        });
        return list;
    },
    bloodTypeCombo:function(){
        // The data store containing the list of states
        var bloodType;
        bloodType = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data: [
                {"value": "Ap", "name": "A+"},
                {"value": "Am", "name": "A-"},
                {"value": "Bp", "name": "B+"},
                {"value": "Bm", "name": "B-"},
                {"value": "Op", "name": "O+"},
                {"value": "Om", "name": "O-"},
                {"value": "ABp", "name": "AB+"},
                {"value": "ABm", "name": "AB-"}
            ]
        });

        // Create the combo box, attached to the states data store
        var combo = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'گروه خونی',
            store: bloodType,
            name:'bloodType',
            queryMode: 'local',
            displayField: 'name',
            valueField: 'value',
            renderTo: Ext.getBody()
        });

        return combo;
    },
    clozeSizeCombo:function(){
        // The data store containing the list of states
        var alamak = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"M", "name":"M"},
                {"value":"L", "name":"L"},
                {"value":"XL", "name":"XL"},
                {"value":"xxL", "name":"XXL"}
            ]
        });

        // Create the combo box, attached to the states data store
        var combo = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'سایز لباس',
            store: alamak,
            name:'clothesSize',
            queryMode: 'local',
            displayField: 'name',
            valueField: 'value',
            renderTo: Ext.getBody()
        });

        return combo;
    },
    createSearchPanel:function(){
        var panel = Ext.create('Ext.panel.Panel', {
            renderTo: Ext.getBody(),
            animCollapse: true,
            collapsible: true,
            title: 'جستجو',
            width: 600,
            bodyPadding: 5,
            layout: 'anchor',

            items: [{
                xtype: 'combo',
                store: MyDesktop.app.util.GlobalVariables.gPersonStore,
                displayField: 'firstName',
                typeAhead: false,
                hideLabel: true,
                hideTrigger:true,
                submitValue: false,
                queryMode:'remote',
                anchor: '50%',

                listConfig: {
                    loadingText: 'در حال جستجو ....',
                    emptyText: 'موردی یافت نشد.',

                    // Custom rendering template for each item
                    getInnerTpl: function() {
                        return '<a class="search-item" >' +
                            '<h3><span>{firstName}</span>{lastName}</h3>' +
                            '{post.name}' +
                            '</a>';
                    }
                },
                pageSize: 10,
                listeners: {
                    select: {
                        fn: this.onComboboxSelect,
                        scope: this
                    }
                }
            }, {
                xtype: 'component',
                style: 'margin-top:10px',
                html: 'نام مورد جستجو را وارد کنید'
            }]
        } );
        return panel
    },
    onComboboxSelect:function(combo,records){
        rec = records[0];
        if (rec) {
            Ext.getCmp('hseBaseForm').loadRecord(rec);
        }
    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype:'form',
                    id:'hseBaseForm',
                    collapsible:true,
                    border:false,
                    items:[
                        {
                            xtype: 'fieldset',
                            title: 'مشخصات فردی',
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    layout: {
                                        align: 'stretch',
                                        type: 'table',
                                        columns: 3

                                    },
                                    items:[
                                        {
                                            xtype: 'textfield',
                                            anchor: '50%',
                                            name:'firstName',
                                            fieldLabel: 'نام',
                                            invalidText: 'مقدار وارد شده صحیح نیست',
                                            blankText: 'پر کردن ای فیلد اجباری است'
                                        },
                                        {
                                            xtype: 'textfield',
                                            anchor: '50%',
                                            name:'lastName',
                                            fieldLabel: 'نام خانوادگی',
                                            invalidText: 'مقدار وارد شده صحیح نیست',
                                            blankText: 'پر کردن ای فیلد اجباری است'
                                        },
                                        {
                                            xtype: 'textfield',
                                            anchor: '50%',
                                            fieldLabel: 'کد ملی',
                                            name: 'nationalCode',
                                            invalidText: 'مقدار وارد شده صحیح نیست',
                                            blankText: 'پر کردن ای فیلد اجباری است',
                                            textValid: false,
                                            validator: function(){
                                                return this.textValid;
                                            },
                                            listeners : {
                                                'change' : function(field, newValue, oldValue) {
                                                    var isValid = true;
                                                    var errorText;
                                                    if(newValue.length < 10){
                                                        errorText = "طول کد ملی باید 10 کراکتر باشد";
                                                        field.markInvalid(errorText);
                                                        field.textValid = false;
                                                    }else if(newValue.length > 10){
                                                        errorText = "طول کد ملی باید 10 کراکتر باشد";
                                                        field.markInvalid(errorText);
                                                        field.textValid = false;
                                                    }
                                                    else{
                                                        Ext.Ajax.request({
                                                            url: 'personalInfo/checkNationalCode.action',
                                                            method: 'POST',
                                                            params: {'nationalCode': newValue},
                                                            success: function(o) {
                                                                if (o.responseText == 0) {
                                                                    field.clearInvalid();
                                                                    field.textValid = true;
                                                                }else{
                                                                    errorText = 'فرد دیگری با این کد ملی ثبت شده است';
                                                                    field.markInvalid(errorText);
                                                                    field.textValid = false;
                                                                }
                                                            }
                                                        });
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            anchor: '50%',
                                            fieldLabel: 'کد پرسنلی',
                                            name: 'personelCode',
                                            invalidText: 'مقدار وارد شده صحیح نیست',
                                            blankText: 'پر کردن ای فیلد اجباری است'
                                        },
                                        {
                                            xtype: 'textfield',
                                            anchor: '50%',
                                            fieldLabel: 'تلفن محل کار ',
                                            name: 'telephone',
                                            invalidText: 'مقدار وارد شده صحیح نیست',
                                            blankText: 'پر کردن ای فیلد اجباری است'
                                        },
                                        {
                                            xtype: 'textfield',
                                            anchor: '50%',
                                            fieldLabel: 'تلفن همراه',
                                            name: 'cellphone',
                                            invalidText: 'مقدار وارد شده صحیح نیست',
                                            blankText: 'پر کردن ای فیلد اجباری است'
                                        },
                                        {
                                            xtype: 'textfield',
                                            anchor: '50%',
                                            name: 'emergencyPhone',
                                            fieldLabel: 'تلفن ضروری',
                                            invalidText: 'مقدار وارد شده صحیح نیست'
                                        },
                                        {
                                            xtype: 'textfield',
                                            anchor: '50%',
                                            fieldLabel: 'پست الکترونیک',
                                            name: 'email',
                                            invalidText: 'مقدار وارد شده صحیح نیست',
                                            vtype: 'email'
                                        },
                                        {

                                            xtype: 'combobox',
                                            anchor: '50%',
                                            fieldLabel: 'پست سازمانی',
                                            invalidText: 'مقدار وارد شده صحیح نیست',
                                            emptyText: 'پست سازمانی',
                                            id: 'hsePostCombo',
                                            name:'post',
                                            store:Ext.create('MyDesktop.app.store.Posts',{}),
                                            displayField: 'name'
                                        }
                                    ]
                                }

                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'شناسنامه HSE',
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    layout: {
                                        align: 'stretch',
                                        type: 'table',
                                        columns: 3

                                    },
                                    items:[
                                        {
                                            xtype: 'textfield',
                                            anchor: '50%',
                                            fieldLabel: 'شماره پرونده بهداشتی',
                                            name: 'medicalDocNumber'
                                        },
                                        this.clozeSizeCombo(),
                                        {
                                            xtype: 'numberfield',
                                            anchor: '50%',
                                            fieldLabel: 'سایز کفش',
                                            name: 'footSize',
                                            maxValue: 45,
                                            minValue: 35
                                        },
                                        {
                                            xtype: 'textfield',
                                            anchor: '50%',
                                            fieldLabel: 'قد',
                                            name: 'height'
                                        },
                                        {
                                            xtype: 'textfield',
                                            anchor: '50%',
                                            fieldLabel: 'وزن',
                                            name: 'weight'
                                        },
                                        this.bloodTypeCombo()
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'button',
                            text: 'ثبت',
                            handler: function(button, event) {
                                var record = Ext.create('MyDesktop.app.model.PersonalInfoModel'),
                                    values = me.getValues(),
                                    store = MyDesktop.app.util.GlobalVariables.gPersonStore,
                                    parent = Ext.create('MyDesktop.app.model.Post');
                                var combo = Ext.getCmp('hsePostCombo');

                                var v = combo.getValue();

                                record.set(values);
                                if(v == null){
                                    record.set('post',null);
                                } else{
                                    var rec = combo.findRecord(combo.valueField || combo.displayField, v);


                                    parent.set(rec.data);
                                    record.set('post',parent.data);
                                }
                                record.setDirty();
                                console.log(record);
                                /*store.add(record);
                                store.sync();*/
                            }
                        }
                    ]
                }/*,
                {
                    xtype:'splitter'
                }*/
/*                {
                    xtype:'grid',
                    store:MyDesktop.app.util.GlobalVariables.gPersonStore,
                    columns: [
                        {
                            xtype: 'rownumberer',
                            locked: true
                        },
                        {
                            text: 'مشخصات فردی',
                            columns: [


                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'firstName',
                                    text: 'نام',
                                    editor: {
                                        xtype: 'textfield'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'lastName',
                                    text: 'نام خانوادگی',
                                    editor: {
                                        xtype: 'textfield'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'personelCode',
                                    text: 'کد پرسنلی',
                                    editor: {
                                        xtype: 'textfield'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'nationalCode',
                                    text: 'کد ملی',
                                    editor: {
                                        xtype: 'textfield'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'telephone',
                                    text: 'شماره تلفن اداری',
                                    editor: {
                                        xtype: 'textfield'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'cellphone',
                                    text: 'شماره موبایل',
                                    editor: {
                                        xtype: 'textfield'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'emergencyPhone',
                                    text: 'شماره تلفن ضروری',
                                    editor: {
                                        xtype: 'textfield'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'post',
                                    text: 'سمت سازمانی',
                                    renderer: function(value,meta,record){//1.
                                        var postName;
                                        var post = value;
                                        if(post.name){
                                            postName = post.name;
                                        }else if(post){
                                            var combo = Ext.getCmp('hsePostEditListCombo');
                                            var rec = combo.findRecord(combo.valueField , post);
                                            postName = rec.data.name;
                                        }else{
                                            postName = '---';
                                        }
                                        return postName;
                                    },
                                    editor: {
                                        xtype: 'combobox',
                                        id:'hsePostEditListCombo',
                                        name:'post',
                                        store:MyDesktop.app.util.GlobalVariables.gPostStore,
                                        displayField: 'name'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'medicalDocNumber',
                            text: 'شماره پرونده بهداشتی',
                            editor: {
                                xtype: 'textfield'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'clothesSize',
                            text: 'سایز لباس',
                            editor: this.clozeSizeCombo()
                        },
                        {
                            xtype: 'numbercolumn',
                            dataIndex: 'footSize',
                            text: 'سایز کفش',
                            editor: {
                                xtype: 'numberfield'
                            }
                        },
                        {
                            xtype: 'numbercolumn',
                            dataIndex: 'weight',
                            text: 'وزن',
                            editor: {
                                xtype: 'numberfield'
                            }
                        },
                        {
                            xtype: 'numbercolumn',
                            dataIndex: 'height',
                            emptyCellText: '---',
                            text: 'قد',
                            editor: {
                                xtype: 'numberfield'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'bloodType',
                            renderer:function(value){
                                var bloodType;
                                if(value === 'Ap'){
                                    bloodType = 'A+';
                                }else if(value === 'Am'){
                                    bloodType = 'A-';
                                }else if(value === 'Bm'){
                                    bloodType = 'B-';
                                }else if(value === 'Bp'){
                                    bloodType = 'B+';
                                }else if(value === 'Om'){
                                    bloodType = 'O-';
                                }else if(value === 'Op'){
                                    bloodType = 'O+';
                                }else if(value === 'ABm'){
                                    bloodType = 'AB-';
                                }else if(value === 'ABp'){
                                    bloodType = 'AB+';
                                }
                               return bloodType;
                            },
                            text: 'گروه خونی',
                            editor: this.bloodTypeCombo()
                        },
                        {
                            xtype: 'actioncolumn',
                            items: [
                                {
                                    icon: 'resources/images/icons/fam/delete.gif',
                                    tooltip: 'حذف',
                                    scope: this,
                                    handler: this.onRemoveClick}
                            ]
                        }
                    ],
                    listeners: {
                        scope: this,
                        selectionchange: this.onSelectionChange
                    },
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
                            store:MyDesktop.app.util.GlobalVariables.gPersonStore,
                            displayInfo: true,
                            emptyMsg: 'داده ای برای نمایش وجود ندارد',
                            firstText: 'صفحه اول',
                            lastText: 'ص',
                            nextText: 'صفحه بعدی'
                        }
                    ]
                    ,
                    tbar:[{
                        text:'ایجاد شناسنامه',
                        tooltip:'اضافه کردن شناسنامه',
                        iconCls:'add'
                    }, '-', {
                        text:'تنظیمات',
                        tooltip:'Modify options',
                        iconCls:'option'
                    },'-',{
                        text:'ثبت تغییرات',
                        tooltip:'ثبت تغییرات انجام شده در جدول',
                        iconCls:'remove'
                    }]
                }*/


            ],
            tbar:[
                this.createSearchPanel()
            ]
        });

        me.callParent(arguments);
    },
    onSelectionChange: function(model, records) {
        var rec = records[0];
        if (rec) {
            Ext.getCmp('hseBaseForm').loadRecord(rec);
        }
    }

});