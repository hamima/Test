Ext.define('MyDesktop.app.view.user.UserForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.userForm',
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
        return panel},
    initComponent: function() {
        var me = this;

        //noinspection JSValidateTypes
        Ext.applyIf(me, {
            items: [
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
                                    blankText: 'پر کردن ای فیلد اجباری است'
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
                                    fieldLabel: 'سمت الکترونیک',
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
                                    valueField:'id'
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
                            vtype:'uniqueUserName'
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
                            displayField: 'name'

                        }
                    ]

                }
                ,
                {
                    xtype: 'button',
                    text: 'ثبت',
                    handler: function() {
                        //noinspection JSValidateTypes
                        var record = Ext.create('MyDesktop.app.model.PersonalInfoModel'),
                            values = me.getValues(),
                            store = MyDesktop.app.util.GlobalVariables.gPersonStore;

                        var postcombo = Ext.getCmp('userPostCombo');
                        var combo = Ext.getCmp('userOrganCombo');
                        var post = postcombo.getValue();
                        var v = combo.getValue();
                        var recpost = postcombo.findRecord(postcombo.valueField || postcombo.displayField, post);
                        record.set(values);
                        var workingAt = [];
                        for (var i=0; i< v.length;i++){
                            var rec = combo.findRecord(combo.valueField || combo.displayField, v[i]);
                            workingAt.push(rec.data);
                        }
                        record.setDirty();
                        record.set('post',recpost.data);
                        record.set('workingAt',workingAt);
                        record.setId(0);
                        console.log(record);
                        store.add(record);
                        store.sync();
                    }
                }
            ],
            tbar:[
                this.createSearchPanel()
            ]
        });

        me.callParent(arguments);
    }

});