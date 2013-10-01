/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 8/11/13
 * Time: 1:50 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyDesktop.app.view.organ.Option1', {
    extend: 'Ext.window.Window',
    requires: ['Ext.form.Panel','MyDesktop.app.util.GlobalVariables'],
    height: 250,
    width: 400,
    title: 'رویه های کلان',
    modal: true,
    rtl:true,
    layout: 'fit',
    autoScroll:true,
    autoShow: true,
    organ:null,
    alamakCombo:function(){
        // The data store containing the list of states
        var alamak = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"IRON", "name":"آهنی"},
                {"value":"POLYETILEN", "name":"پلی اتیلن"}	        //...
            ]
        });

        // Create the combo box, attached to the states data store
        var combo = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'نوع علمک',
            store: alamak,
            name:'alamak',
            queryMode: 'local',
            displayField: 'name',
            valueField: 'value',
            renderTo: Ext.getBody()
        });

        return combo;
    },
    initComponent: function() {
        var me = this;
        this.items = [
            {
                xtype: 'form',
                id:'myform',
                padding: '5 5 0 5',
                border: false,
                style: 'background-color: #fff;',

                fieldDefaults: {
                    anchor: '100%',
                    labelAlign: 'left',
                    allowBlank: false,
                    combineErrors: true,
                    msgTarget: 'side'
                },

                items: [                {
                    xtype: 'fieldset',
                    collapsible: true,
                    title: 'رویه های کلان',
                    items: [
                        {
                            xtype: 'fieldset',
                            collapsed: true,
                            collapsible: true,
                            title: 'آپشن های تأییدات',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    anchor: '100%',
                                    name:'confirmPlanning',
                                    fieldLabel: '',
                                    boxLabel: 'تأیید برنامه ریزی توسط مدیران اجباری است'
                                    ,checked   : false,
                                    value: 1,
                                    inputValue: 'YES',
                                    uncheckedValue: 'NO'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    anchor: '100%',
                                    name:'confirmDoneAcitivities',
                                    fieldLabel: '',
                                    boxLabel: 'برای تأیید عملیات انجام شده حتما جدول تأییدات تکمیل گردد '
                                    ,checked   : false,
                                    value: 1,
                                    inputValue: 'YES',
                                    uncheckedValue: 'NO'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    anchor: '100%',
                                    name:'confirmUserAcitivities',
                                    fieldLabel: '',
                                    boxLabel: 'تأیید عملیات انجام شده توسط کاربران مسئول اجباری است'
                                    ,checked   : false,
                                    value: 1,
                                    inputValue: 'YES',
                                    uncheckedValue: 'NO'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            collapsed: true,
                            collapsible: true,
                            title: 'آپشن های ارجاع کار',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    anchor: '100%',
                                    name:'referenceReadyToRun',
                                    fieldLabel: '',
                                    boxLabel: 'اعلام "آماده ی اجرا "  برای تمامی ارجاعات کاری توسط مدیران اجباری است'
                                    ,checked   : false,
                                    value: 1,
                                    inputValue: 'YES',
                                    uncheckedValue: 'NO'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    anchor: '100%',
                                    name:'referenceAuto',
                                    fieldLabel: '',
                                    boxLabel: 'ارجاع خودکار توسط سیستم انجام گیرد'
                                    ,checked   : false,
                                    value: 1,
                                    inputValue: 'YES',
                                    uncheckedValue: 'NO'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            collapsed: true,
                            collapsible: true,
                            title: 'آپشن های اعلام انجام کار',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    anchor: '100%',
                                    fieldLabel: '',
                                    name:'workEnterTime',
                                    boxLabel: 'مجری مجاز به درج "تاریخ انجام کار " می باشد'
                                    ,checked   : false,
                                    value: 1,
                                    inputValue: 'YES',
                                    uncheckedValue: 'NO'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    anchor: '100%',
                                    fieldLabel: '',
                                    name:'workDeclareEnough',
                                    boxLabel: 'اعلام انجام کار کفایت می کند '
                                    ,checked   : false,
                                    value: 1,
                                    inputValue: 'YES',
                                    uncheckedValue: 'NO'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    anchor: '100%',
                                    fieldLabel: '',
                                    name:'workMustEnterSubAct',
                                    boxLabel: 'مجری موظف به درج ریز اطلاعات میزان اجرای هر عملیات است'
                                    ,checked   : false,
                                    value: 1,
                                    inputValue: 'YES',
                                    uncheckedValue: 'NO'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    anchor: '100%',
                                    fieldLabel: '',
                                    name:'workMustEnterSubActPrice',
                                    boxLabel: 'مجری موظف به درج ریز اطلاعات هزینه ی هر عملیات است'
                                    ,checked   : false,
                                    value: 1,
                                    inputValue: 'YES',
                                    uncheckedValue: 'NO'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    anchor: '100%',
                                    fieldLabel: '',
                                    name:'workMustEnterSubActTime',
                                    boxLabel: 'مجری موظف به درج ریز اطلاعات مدت اجرای هر عملیات است'
                                    ,checked   : false,
                                    value: 1,
                                    inputValue: 'YES',
                                    uncheckedValue: 'NO'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    anchor: '100%',
                                    fieldLabel: '',
                                    name:'workMustEnterEquipment',
                                    boxLabel: 'مجری موظف به درج اطلاعات اقلام مصرف است'
                                    ,checked   : false,
                                    value: 1,
                                    inputValue: 'YES',
                                    uncheckedValue: 'NO'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    anchor: '100%',
                                    fieldLabel: '',
                                    name:'workMustEnterPermitInfo',
                                    boxLabel: 'مجری موظف به درج اطلاعات مجوزها و پرمیت های حین عملیات است'
                                    ,checked   : false,
                                    value: 1,
                                    inputValue: 'YES',
                                    uncheckedValue: 'NO'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    anchor: '100%',
                                    fieldLabel: '',
                                    name:'workCanEnterInfoWP',
                                    boxLabel: 'امکان درج اطلاعات ارقام گیری بدون ارجاع کار میسر است'
                                    ,checked   : false,
                                    value: 1,
                                    inputValue: 'YES',
                                    uncheckedValue: 'NO'
                                }
                            ]
                        }

                    ]
                }]
            }
        ];
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            id:'buttons',
            ui: 'footer',
            items: ['->', {
                iconCls: 'icon-save',
                itemId: 'save',
                text: 'ثبت',
                handler:this.setOrgan
            },{
                iconCls: 'icon-reset',
                text: 'بستن پنجره',
                scope: this,
                handler: this.close
            }]
        }];
        me.callParent(arguments);
    },
    setOrgan:function(){
       /* MyDesktop.app.util.GlobalVariables.organStore = Ext.create('MyDesktop.app.model.OrganModel');*/
        MyDesktop.app.util.GlobalVariables.organStore = this.down('#myform').getValues();
    }

});