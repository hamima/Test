/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 9/1/13
 * Time: 2:55 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyDesktop.app.view.user.UserEdit', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.userEdit',
    requires:['MyDesktop.app.util.GlobalVariables'],
    height: 450,
    rtl: true,
    autoScroll: true,
    width: 400,
    closable:true,
    bodyPadding: 10,
    title: 'تعریف کاربر',
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
                    typeAhead: true,
                    hideLabel: true,
                    submitValue: false,
                    hideTrigger: true,
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
        return panel
    },
    onComboboxSelect:function(combo,records){
        rec = records[0];
        if (rec) {
            Ext.getCmp('userEditForm').loadRecord(rec);
        }
    },
    initComponent: function() {
        var me = this;
        //noinspection JSValidateTypes
        Ext.applyIf(me, {
            items: [
                {
                    xtype:'form',
                    id:'userEditForm',
                    collapsible:true,
                    border:false,
                    items:
                        [
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
                                                xtype:'textfield',
                                                name:'id',
                                                hidden:true
                                            },
                                            {
                                                xtype: 'textfield',
                                                anchor: '50%',
                                                name:'firstName',
                                                fieldLabel: 'نام',
                                                allowBlank:false,
                                                invalidText: 'مقدار وارد شده صحیح نیست',
                                                blankText: 'پر کردن ای فیلد اجباری است'
                                            },
                                            {
                                                xtype: 'textfield',
                                                anchor: '50%',
                                                name:'lastName',
                                                allowBlank:false,
                                                fieldLabel: 'نام خانوادگی',
                                                invalidText: 'مقدار وارد شده صحیح نیست',
                                                blankText: 'پر کردن ای فیلد اجباری است'
                                            },
                                            {
                                                xtype: 'textfield',
                                                anchor: '50%',
                                                fieldLabel: 'کد ملی',
                                                allowBlank:false,
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
                                                fieldLabel: 'سمت سازمانی',
                                                invalidText: 'مقدار وارد شده صحیح نیست',
                                                emptyText: 'سمت سازمانی',
                                                id: 'userPostCombo',
                                                name:'post',
                                                store:Ext.create('MyDesktop.app.store.Posts',{}),
                                                displayField: 'name',
                                                pageSize:10
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'fieldset',
                                title: 'اطلاعات کاربر',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        anchor: '50%',
                                        fieldLabel: 'شناسه کاربری',
                                        name: 'userName',
                                        textValid: false,
                                        validator: function(){
                                            return this.textValid;
                                        },
                                        listeners : {
                                            'change' : function(field, newValue, oldValue) {
                                                var isValid = true;
                                                var errorText;
                                                if(newValue.length < 5){
                                                    errorText = "طول شناسه کاربری باید بیش از5 کارامتر باشد";
                                                    field.markInvalid(errorText);
                                                    field.textValid = false;
                                                }else{
                                                    Ext.Ajax.request({
                                                        url: 'personalInfo/checkUserName.action',
                                                        method: 'POST',
                                                        params: {'username': newValue},
                                                        success: function(o) {
                                                            if (o.responseText == 0) {
                                                                field.clearInvalid();
                                                                field.textValid = true;
                                                            }else{
                                                                errorText = 'این شناسه قبلا مورد استفاده قرار گرفته شده است';
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
                                        inputType: 'password',
                                        fieldLabel: 'رمز عبور',
                                        name: 'password'
                                    },
                                    {
                                        xtype: 'textfield',
                                        inputType: 'password',
                                        validator: function(value) {
                                            var password1 = this.previousSibling('[name=password]');
                                            return (value === password1.getValue()) ? true : 'کد کاربری صحیح نمی باشد';
                                        },
                                        anchor: '50%',
                                        submitValue: false,
                                        fieldLabel: 'تکرار رمز عبور'
                                    }
                                ]
                            },
                            {
                                xtype: 'fieldcontainer',
                                layout: {
                                    align: 'stretch',
                                    type: 'table',
                                    columns: 2

                                },
                                items:[
                                    {
                                        xtype: 'checkboxfield',
                                        anchor: '50%',
                                        fieldLabel: '',
                                        boxLabel: 'نیاز به تعویض رمز عبور در اولین ورود کاربر' ,
                                        checked   : false,
                                        name:'passMustBeChange',
                                        value: 1,
                                        inputValue: 'YES',
                                        uncheckedValue: 'NO'
                                    },
                                    {
                                        xtype: 'checkboxfield',
                                        anchor: '50%',
                                        fieldLabel: '',
                                        boxLabel: 'مسدود شده',
                                        checked   : false,
                                        name:'blocked',
                                        value: 1,
                                        inputValue: 'YES',
                                        uncheckedValue: 'NO'
                                    }

                                ]

                            },
                            {
                                xtype:'combobox',
                                fieldLabel:'ادارات تحت عملکرد',
                                id: 'userOrganCombo',
                                emptyText: 'ادارات تحت عملکرد',
                                name:'workingAt',
                                anchor:'50%',
                                multiSelect: true,
                                store:Ext.create('MyDesktop.app.store.Organs',{}),
                                displayField: 'name',
                                pageSize:20

                            }
                            ,
                            {
                                xtype: 'button',
                                text: 'ثبت',
                                handler: function() {
                                    //noinspection JSValidateTypes
                                    var form = Ext.getCmp('userEditForm');
                                    var record = Ext.create('MyDesktop.app.model.PersonalInfoModel'),
                                        values = form.getValues(),
                                        store = MyDesktop.app.util.GlobalVariables.gPersonStore;

                                    var postcombo = Ext.getCmp('userPostCombo');
                                    var combo = Ext.getCmp('userOrganCombo');
                                    record.set(values);
                                    var post = postcombo.getValue();
                                    if(post == null){
                                        record.set('post',null);
                                    } else{
                                        if(post.name){
                                        }else{

                                            var rec = combo.findRecord(combo.valueField || combo.displayField, post);
                                            if(rec){
                                                record.set('post',rec.data);
                                            }else{

                                            }
                                        }
                                    }
                                    var v = combo.getValue();
                                    var recpost = postcombo.findRecord(postcombo.valueField || postcombo.displayField, post);
                                    var workingAt = null;
                                    for (var i=0; i< v.length;i++){
                                        var rec = combo.findRecord(combo.valueField || combo.displayField, v[i]);
                                        workingAt.push(rec.data);
                                    }
                                    record.setDirty();
                                    /*record.set('post',recpost.data);*/
                                    record.set('workingAt',workingAt);
                                    var records = [];
                                    records.push(record.data);
                                    Ext.Ajax.request({
                                        url: 'personalInfo/batchUpdate.action',
                                        method: 'POST',
                                        jsonData: records,
                                        success: function(o) {
                                            store.load();
                                            Ext.getCmp('userEditForm').getForm().reset();
                                        }
                                    });
                                    /*store.add(record);
                                    store.sync();*/
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
                            text:'مشخصات فردی',
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
                                    text: 'شماره تلفن اداری'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'cellphone',
                                    text: 'شماره موبایل'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'emergencyPhone',
                                    text: 'شماره تلفن ضروری'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'post',
                                    text: 'سمت سازمانی',
                                    renderer: function(value){//1.
                                        var postName;
                                        var post = value;
                                        if(post.name){
                                            postName = post.name;
                                        }else if(post){
                                            var combo = Ext.getCmp('hsePostListCombo');
                                            var rec = combo.findRecord(combo.valueField , post);
                                            postName = rec.data.name;
                                        }else{
                                            postName = '---';
                                        }
                                        return postName;
                                    },
                                    editor: {
                                        xtype: 'combobox',
                                        id:'postListCombo',
                                        name:'post',
                                        store:Ext.create('MyDesktop.app.store.Posts',{}),
                                        displayField: 'name',
                                        valueField:'id'
                                    }
                                }

                            ]
                        },
                        *//*{
                            xtype: 'gridcolumn',
                            dataIndex: 'username',
                            text: 'شناسه کاربری'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'password',
                            text: 'رمز عبور'
                        },
                        {
                            xtype: 'checkcolumn',
                            dataIndex: 'blocked',
                            text: 'مسدود شده'
                        },
                        {
                            xtype: 'checkcolumn',
                            dataIndex: 'passMustBeChange',
                            text: 'نیاز به تعویض رمز'
                        },*//*
                        {
                            xtype: 'actioncolumn',
                            text: 'تحت عملکرد',
                            items: [
                                {
                                    icon: 'resources/images/grid.png',
                                    tooltip: 'نمایش ادارات تحت عملکرد',
                                    scope: this,

                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                        var edit = Ext.create('MyDesktop.app.view.organ.OrganMiniList').show();
                                        var userModel = Ext.create('MyDesktop.app.model.UserModel',record.data);
                                        *//* var organStore = Ext.create('MyDesktop.app.store.Organs');*//*
                                        var organ = userModel.get('workingAt');
                                        if(record){
                                            edit.down('#organGrid').store.add(userModel.get('workingAt'));
                                        }
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
                    ],
                    tbar:[{
                        text:'اضافه کردن کاربر جدید',
                        tooltip:'Add a new row',
                        iconCls:'add'
                    }, '-', {
                        text:'تنظیمات',
                        tooltip:'Modify options',
                        iconCls:'option'
                    },'-',{
                        text:'حذف کاربر',
                        tooltip:'Remove the selected item',
                        iconCls:'remove'
                    }]
                }*/
            ],
            tbar:[
                this.createSearchPanel()
            ]
        });

        me.callParent(arguments);
    }

});