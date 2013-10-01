/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 9/1/13
 * Time: 10:48 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyDesktop.app.view.capsuleLocation.CapsuleLocationEdit', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.capsuleLocationEdit',
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
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype:'form',
                    id:'capsuleLocationBaseForm',
                    header:false,
                    border:false,
                    items:
                        [
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
                                        id: 'fromDate',
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
                                        id: 'toDate',
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
                                        values = Ext.getCmp('capsuleLocationBaseForm').getValues(),
                                        store = MyDesktop.app.util.GlobalVariables.gCapsuleLocationStore;
                                    console.log(Ext.getCmp('capsuleLocationBaseForm').getValues());
                                    record.setDirty();
                                    record.set(values);
                                    var to = values.toDate;
                                    var from = values.fromDate;
                                    to = to.split('/');
                                    from = from.split('/');
                                    var todate = new Date(Ext.Date.JalaliConverter.jalaliToGregorian(to)).getTime();
                                    var fromdate = new Date(Ext.Date.JalaliConverter.jalaliToGregorian(from)).getTime();
                                    record.set('fromDate',fromdate);
                                    record.set('toDate',todate);
                                    record.setId(0);
                                    console.log(record);
                                    store.add(record);
                                    store.sync({
                                        success: function (proxy, operations) {
                                            Ext.getCmp('capsuleLocationBaseForm').store.refresh();
                                        }, failure: function (proxy, operations) {
                                        }
                                    });
                                }
                            }
                        ]
                },
                {
                    xtype:'grid',
                    store:MyDesktop.app.util.GlobalVariables.gCapsuleLocationStore,
                    columns: [
                        {
                            xtype: 'rownumberer',
                            locked: true
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'id',
                            text: 'شناسه',
                            editor: {
                                xtype: 'textfield'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'code',
                            text: 'کد',
                            editor: {
                                xtype: 'textfield'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'buildingName',
                            text: 'نام ساختمان',
                            editor: {
                                xtype: 'textfield'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'locationDescription',
                            text: 'توضیح موقعیت',
                            editor: {
                                xtype: 'textfield'
                            }
                        },
                        {
                            xtype: 'datecolumn',
                            dataIndex: 'fromDate',
                            text: 'از تاریخ',
                            renderer: function(value){

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
                            editor: {
                                xtype: 'datefield',
                                anchor: '50%',
                                plugins: ['jalalidate'],
                                format:'d/m/Y'
                            }
                        },
                        {
                            xtype: 'datecolumn',
                            dataIndex: 'toDate',
                            text: 'تا تاریخ',
                            renderer: function(value){

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
                            editor: {
                                xtype: 'datefield',
                                anchor: '50%',
                                plugins: ['jalalidate'],
                                format:'d/m/Y'
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
                    },
                    selModel: Ext.create('Ext.selection.RowModel', {
                    }),
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            dock: 'bottom',
                            rtl: true,
                            width: 360,
                            store:MyDesktop.app.util.GlobalVariables.gCapsuleLocationStore,
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
    },
    onSelectionChange: function(model, records) {
        var rec = records[0];
        if (rec) {
            Ext.getCmp('capsuleLocationBaseForm').loadRecord(rec);
        }
    }

});