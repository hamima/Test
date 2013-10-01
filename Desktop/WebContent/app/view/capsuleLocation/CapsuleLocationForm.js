Ext.define('MyDesktop.app.view.capsuleLocation.CapsuleLocationForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.capsuleLocationForm',
    requires:['MyDesktop.app.store.CapsuleLocationStore','Ext.ux.Jalali',
        'Ext.ux.JalaliDate',
        'Ext.ux.JalaliDatePlugin',
        'Ext.ux.JalaliDatePlugin-fa_IR'],
    height: 356,
    rtl: true,
    closable:true,
    autoScroll: true,
    width: 400,
    bodyPadding: 10,
    title: 'مشخصات موقعیت کپسول',
    onComboboxSelect: function(combo, records, eOpts) {

    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldset',
                    title: 'مشخصات موقعیت کپسول ها',
                    items: [
                        {
                            xtype: 'textfield',
                            name : 'id',
                            fieldLabel: 'id',
                            hidden:true
                        },
                        {
                            xtype: 'textfield',
                            anchor: '50%',
                            name:'code',
                            fieldLabel: 'کد',
                            invalidText: 'مقدار وارد شده صحیح نیست',
                            blankText: 'پر کردن ای فیلد اجباری است'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '50%',
                            fieldLabel: 'نام ساختمان',
                            name: 'buildingName',
                            invalidText: 'مقدار وارد شده صحیح نیست',
                            blankText: 'پر کردن ای فیلد اجباری است'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '50%',
                            fieldLabel: 'توضیح موقعیت',
                            name: 'locationDescription',
                            invalidText: 'مقدار وارد شده صحیح نیست',
                            blankText: 'پر کردن ای فیلد اجباری است'
                        },
                        {
                            xtype: 'datefield',
                            plugins: ['jalalidate'],
                            anchor: '50%',
                            fieldLabel: 'از',
                            name: 'fromDate',
                            format:'d/m/Y',
                            invalidText: 'مقدار وارد شده صحیح نیست',
                            blankText: 'پر کردن ای فیلد اجباری است'
                        },
                        {
                            xtype: 'datefield',
                            anchor: '50%',
                            plugins: ['jalalidate'],
                            fieldLabel: 'تا',
                            name: 'toDate',
                            format:'d/m/Y',
                            invalidText: 'مقدار وارد شده صحیح نیست',
                            blankText: 'پر کردن ای فیلد اجباری است'
                        }
                    ]
                },
                {
                    xtype: 'button',
                    text: 'ثبت',
                    handler: function() {
                        var record = Ext.create('MyDesktop.app.model.CapsuleLocationModel'),
                            values = me.getValues(),
                            store = MyDesktop.app.util.GlobalVariables.gCapsuleLocationStore;
                        console.log(me.getValues());
                        record.setDirty();
                        record.set(values);
                        record.setId(0);
                        console.log(record);
                        store.add(record);
                        store.sync();
                    }
                }
            ],
            tbar:[
                /*this.createSearchPanel()*/
            ]
        });

        me.callParent(arguments);
    }

});