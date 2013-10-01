/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 8/15/13
 * Time: 12:11 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyDesktop.app.view.user.RegisterForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.register',
    requires:['MyDesktop.app.store.Posts','MyDesktop.app.store.Organs','MyDesktop.app.util.GlobalVariables'],
    height: 450,
    rtl: true,
    autoScroll: true,
    width: 400,
    bodyPadding: 10,
    title: 'ثبت نام در سیستم HSE',
    onComboboxSelect: function(combo, records, eOpts) {
        if(records.raw != null){

        }
    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldset',
                    title: 'مشخصات فردی',
                    items: [
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
                            fieldLabel: 'پست الکترونیک',
                            name: 'email',
                            invalidText: 'مقدار وارد شده صحیح نیست',
                            vtype: 'email'
                        },
                        {
                            xtype: 'fieldset',
                            title: 'پست سازمانی',
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    fieldLabel: 'Date Range',
                                    combineErrors: true,
                                    msgTarget : 'side',
                                    layout: 'hbox',
                                    defaults: {
                                        flex: 1,
                                        hideLabel: true
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            anchor: '50%',
                                            fieldLabel: 'پست سازمانی',
                                            invalidText: 'مقدار وارد شده صحیح نیست',
                                            emptyText: 'پست سازمانی',
                                            id: 'userPostCombo',
                                            name:'post',
                                            store:Ext.create('MyDesktop.app.store.Posts',{}),
                                            displayField: 'name'
                                        },
                                        {
                                            xtype     : 'button',
                                            iconCls:'add',
                                            handler:function(){

                                            }


                                        }
                                    ]
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
                            name: 'userName'
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
                    xtype: 'checkboxfield',
                    anchor: '50%',
                    fieldLabel: '',
                    hidden:true,
                    boxLabel: 'نیاز به تعویض رمز عبور در اولین ورود کاربر' ,
                    checked   : true,
                    name:'passMustBeChange',
                    value: 1,
                    inputValue: 'YES',
                    uncheckedValue: 'NO'
                },
                {
                    xtype: 'checkboxfield',
                    anchor: '50%',
                    fieldLabel: '',
                    hidden:true,
                    boxLabel: 'مسدود شده',
                    checked   : false,
                    name:'blocked',
                    value: 1,
                    inputValue: 'YES',
                    uncheckedValue: 'NO'
                },
                ,
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Date Range',
                    combineErrors: true,
                    msgTarget : 'side',
                    layout: 'hbox',
                    defaults: {
                        flex: 1,
                        hideLabel: true
                    },
                    items: [{
                    xtype:'combobox',
                    fieldLabel:'ادارات تحت عملکرد',
                    id: 'registerOrganCombo',
                    emptyText: 'ادارات تحت عملکرد',
                    name:'workingAt',
                    anchor:'50%',
                    multiSelect: true,
                    store:MyDesktop.app.util.GlobalVariables.gOrganStore,
                    displayField: 'name'

                },{
                        xtype     : 'button',
                        iconCls:'add',
                        handler:function(){

                        }


                    }]
                },
                {
                    xtype: 'button',
                    text: 'ثبت',
                    handler: function(button, event) {
                        var record = Ext.create('MyDesktop.app.model.UserModel'),
                            values = me.getValues(),
                            store = MyDesktop.app.util.GlobalVariables.gUserStore;

                        var postcombo = Ext.getCmp('userPostCombo');
                        var combo = Ext.getCmp('registerOrganCombo');
                        var post = postcombo.getValue();
                        var v = combo.getValue();
                        var recpost = postcombo.findRecord(postcombo.valueField || postcombo.displayField, post);
                        record.set(values);
                        var workingAt = record.workingAt();
                        for (var i=0; i< v.length;i++){
                            var rec = combo.findRecord(combo.valueField || combo.displayField, v[i]);
                            workingAt.add(rec.data);
                        };
                        var post = recpost.data;

                        for (var i = 0; i < workingAt.data.items.length; i++) {
                            workingAt.data.items[i].setDirty();
                        };
                        record.setDirty();
                        record.set('post',post);
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