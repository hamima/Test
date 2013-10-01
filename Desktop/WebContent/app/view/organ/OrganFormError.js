Ext.define('MyDesktop.app.view.organ.OrganForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.organFormerr',
    requires:['MyDesktop.app.util.GlobalVariables','MyDesktop.app.store.Organs'],
    height:450,
    rtl: true,
    closable:true,
    autoScroll: true,
    bodyPadding: 10,
    title: 'ساختار سازمانی',
    alamakCombo:function(){
        var alamak = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"IRON", "name":"آهنی"},
                {"value":"POLYETILEN", "name":"پلی اتیلن"}	        //...
            ]
            });

		var combo = Ext.create('Ext.form.ComboBox', {
		    fieldLabel: 'نوع علمک',
		    store: alamak,
		    queryMode: 'local',
            name:'alamak',
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
                    xtype: 'fieldset',
                    title: 'ساختار سازمانی',
                    collapsible: true,
                    layout: {
                        type: 'table',
                        columns:3
                    },
                    items:[
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
                            fieldLabel: 'نام'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '50%',
                            name:'stateName',
                            fieldLabel: 'نام استان'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '50%',
                            name:'stateCode',
                            fieldLabel: 'کد استان'
                        }
                        ,
                        {
                            xtype: 'fieldset',
                            collapsible: true,
                            title: 'رویه های کلان',
                            colspan:3,
                            layout: {
                                type: 'table',
                                columns:3
                            },
                            items: [
                                {
                                    xtype: 'fieldset',
                                    colspan:3,
                                    title:'آپشن های تأییدات',
                                    layout: {
                                        align: 'stretch',
                                        type: 'table',
                                        columns: 3

                                    },
                                    items:[
                                        {
                                            xtype: 'checkboxfield',
                                            anchor: '50%',
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
                                            anchor: '50%',
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
                                            anchor: '50%',
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
                                    title:'آپشن های ارجاع کار',
                                    colspan:3,
                                    layout: {
                                        align: 'stretch',
                                        type: 'table',
                                        columns: 2
                                    },
                                    items:[
                                        {
                                            xtype: 'checkboxfield',
                                            anchor: '50%',
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
                                            anchor: '50%',
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
                                    title:'آپشن های ارجاع کار',
                                    colspan:3,
                                    layout: {
                                        align: 'stretch',
                                        type: 'table',
                                        columns: 3

                                    },
                                    items:[
                                        {
                                            xtype: 'checkboxfield',
                                            anchor: '50%',
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
                                            anchor: '50%',
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
                                            anchor: '50%',
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
                                            anchor: '50%',
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
                                            anchor: '50%',
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
                                            anchor: '50%',
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
                                            anchor: '50%',
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
                                            anchor: '50%',
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
                        },
                        {
                            xtype: 'fieldset',
                            collapsible: true,
                            title: 'پیش فرض ها',
                            layout: {
                                align: 'stretch',
                                type: 'table',
                                columns: 3

                            },
                            items: [
                              /*  {
                                    xtype: 'fieldset',
                                    title:'پیش فرض های شناسنامه',
                                    colspan:3,
                                    layout: {
                                        align: 'stretch',
                                        type: 'table',
                                        columns: 1
                                    },
                                    items:[*/
                                        this.alamakCombo(),
                                 /*   ]
                                },*/
                                /*{
                                    xtype: 'fieldset',
                                    title:'پیش فرض های نمایش و ارجاع عملیات ها',
                                    layout: {
                                        type: 'table',
                                        columns: 2

                                    },
                                    items:[*/
                                        {
                                            xtype: 'numberfield',
                                            anchor: '30%',
                                            name:'currentActDisplayInt',
                                            fieldLabel: 'بازه ی نمایش عملیاتهای جاری (برحسب هفته)',
                                            labelAlign: 'right'
                                        },
                                        {
                                            xtype: 'numberfield',
                                            anchor: '30%',
                                            name:'jobReferenceCounter',
                                            value: 4,
                                            fieldLabel: 'تعداد شماره انداز ارجاع کار در هر ماه'
                                        }
                                /*    ]
                                }*/
                            ]
                        },
                        {
                            xtype:'combobox',
                            fieldLabel:'تحت کنترل',
                            id: 'organCombo',
                            emptyText: 'Organs',
                            name:'parent',
                            store:Ext.create('MyDesktop.app.store.Organs',{}),
                            displayField: 'name'

                        },
                        {
                            xtype: 'button',
                            text: 'ثبت',
                            handler: function(button, event) {
                                var record = Ext.create('MyDesktop.app.model.OrganModel'),
                                    values = me.getValues(),
                                    store = MyDesktop.app.util.GlobalVariables.gOrganStore,
                                    parent = Ext.create('MyDesktop.app.model.OrganModel');
                                var combo = Ext.getCmp('organCombo');
                                var v = combo.getValue();
                                var rec = combo.findRecord(combo.valueField || combo.displayField, v);
                                record.set(values);
                                if(v == null){
                                    record.set('parent',{});
                                } else{
                                    var rec = combo.findRecord(combo.valueField || combo.displayField, v);


                                    parent.set(rec.data);
                                    record.set('parent',parent.data);
                                }

                                record.setDirty();
                                record.setId(0);
                                console.log(record);
                                store.add(record);
                                store.sync();
                            }
                        }

                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});