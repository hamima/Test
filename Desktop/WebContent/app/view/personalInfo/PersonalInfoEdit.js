/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 9/1/13
 * Time: 2:20 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyDesktop.app.view.personalInfo.PersonalInfoEdit', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.personalInfoEdit',
    requires:['MyDesktop.app.store.Posts'],
    height: 356,
    rtl: true,
    closable:true,
    autoScroll: true,
    width: 400,
    bodyPadding: 10,
    title: 'مشخصات فردی',
    onComboboxSelect: function(combo, records, eOpts) {

    },
    createSearchPanel:function(){
        var panel;
        //noinspection JSValidateTypes
        panel = Ext.create('Ext.panel.Panel', {
            renderTo: Ext.getBody(),
            animCollapse: true,
            collapsible: true,
            title: 'جستجو',
            width: 600,

            bodyPadding: 5,
            layout: 'anchor',

            items: [
                {
                    xtype: 'combo',
                    store: MyDesktop.app.util.GlobalVariables.gPersonStore,
                    displayField: 'firstName',
                    typeAhead: false,
                    hideLabel: true,
                    hideTrigger: true,
                    submitValue: false,
                    queryMode: 'remote',
                    anchor: '50%',

                    listConfig: {
                        loadingText: 'در حال جستجو ....',
                        emptyText: 'موردی یافت نشد.',

                        // Custom rendering template for each item
                        getInnerTpl: function () {
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
                },
                {
                    xtype: 'component',
                    style: 'margin-top:10px',
                    html: 'نام مورد جستجو را وارد کنید'
                }
            ]
        });
        return panel},
    initComponent: function() {
        var me = this;

        //noinspection JSValidateTypes
        Ext.applyIf(me, {
            items: [
                {
                    xtype:'form',
                    border:false,
                    id:'personalInfoEditForm',
                    items:
                        [
                            {
                                xtype: 'fieldset',
                                title: 'مشخصات فردی',
                                autoScroll:true,
                                items: [
                                    {
                                        xtype: 'textfield',
                                        name : 'id',
                                        fieldLabel: 'id',
                                        hidden:true
                                    },
                                    {
                                        xtype: 'fieldcontainer',
                                        layout: {
                                            align: 'stretch',
                                            type: 'table',
                                            columns: 3

                                        },
                                        fieldLabel: '',
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

                                                colspan:3,
                                                xtype: 'combobox',
                                                anchor: '50%',
                                                fieldLabel: 'پست سازمانی',
                                                invalidText: 'مقدار وارد شده صحیح نیست',
                                                emptyText: 'پست سازمانی',
                                                id: 'personPostCombo',
                                                name:'post',
                                                store:Ext.create('MyDesktop.app.store.Posts',{}),
                                                displayField: 'name'

                                            }

                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'button',
                                text: 'ثبت',
                                handler: function() {
                                    //noinspection JSValidateTypes
                                    var form = Ext.getCmp('personalInfoEditForm');
                                    var record = Ext.create('MyDesktop.app.model.PersonalInfoModel'),
                                        values = form.getValues(),
                                        store = MyDesktop.app.util.GlobalVariables.gPersonStore;
                                    var combo = Ext.getCmp('personPostCombo');
                                    record.set(values);
                                    var v = combo.getValue();
                                    if(v == null){
                                        record.set('post',null);
                                    } else{
                                        var rec = combo.findRecord(combo.valueField || combo.displayField, v);
                                        record.set('post',rec.data);
                                    }
                                    record.set('workingAt',null);
                                    record.setId(0);
                                    store.add(record);
                                    store.sync();
                                    form.getForm().reset();
                                }
                            }
                        ]
                }
                /*{
                    xtype:'grid',
                    store:MyDesktop.app.util.GlobalVariables.gPersonStore,
                    height:400,
                    columns: [
                        {
                            xtype: 'rownumberer',
                            locked: true
                        },
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
                            dataIndex: 'nationalCode',
                            text: 'کد ملی',
                            editor: {
                                xtype: 'textfield'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'cellphone',
                            text: 'تلفن همراه',
                            editor: {
                                xtype: 'textfield'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'telephone',
                            text: 'تلفن ثابت',
                            editor: {
                                xtype: 'textfield'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'emergencyPhone',
                            text: 'تلفن ضروری',
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
                            dataIndex: 'email',
                            text: 'پست الکترونیک',
                            editor: {
                                xtype: 'textfield',
                                vtype: 'email'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'post',
                            text: 'سمت سازمانی',
                            renderer: function(value){//1.
                                //var orderStore = record.orderStore;//2a.
                                //var orderList = ordersStore.data.items;//2b.
                                var postName;
                                var post = value;
                                if(post){
                                    if(post.name){
                                        postName = post.name;
                                    }else{
                                        var combo = Ext.getCmp('postListCombo');
                                        var rec = combo.findRecord(combo.valueField , post);
                                        if(rec){
                                            postName = rec.data.name;
                                        }else{
                                            postName = '---';
                                        }
                                    }
                                }
                                else{
                                    postName = '---';
                                }
                                return postName;
                            },
                            editor: {
                                xtype: 'combobox',
                                id:'postListCombo',
                                name:'post',
                                store:Ext.create('MyDesktop.app.store.Posts',{}),
                                displayField: 'name'
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
                                    }
                                }
                            ]
                        }
                    ],
                    listeners: {
                        scope: this,
                        selectionchange: this.onSelectionChange
                    }
                    ,
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
                            store:MyDesktop.app.util.GlobalVariables.gPersonStore,
                            displayInfo: true,
                            emptyMsg: 'داده ای برای نمایش وجود ندارد',
                            firstText: 'صفحه اول',
                            lastText: 'صحفه آخر',
                            nextText: 'صفحه بعدی'
                        }
                    ]
                    *//*,
                    tbar:[{
                        text:'اضافه کردن شخص حقیقی',
                        tooltip:'Add a new row',
                        iconCls:'add',
                        handler : function() {

                        }
                    }, '-', {
                        text:'تنظیمات',
                        tooltip:'Modify options',
                        iconCls:'option',
                        handler : function() {}
                    }
                    ]*//*
                }
                 */
            ]
            /*,
            tbar:[
                this.createSearchPanel()
            ]*/
        });

        me.callParent(arguments);
    },
    onSelectionChange: function(model, records) {
        var rec = records[0];
        if (rec) {
            Ext.getCmp('personalInfoEditForm').loadRecord(rec);
        }
    }

});