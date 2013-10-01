Ext.define('MyDesktop.app.view.capsuleLocation.CapsuleLocationList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.capsuleLocationList',
    requires:['Ext.ux.grid.AutoResizer','Ext.ux.grid.FiltersFeature'],
    height:500,
    rtl: true,
    closable:true,
    width: 400,
    title: 'لیست موقعیت کپسول ها',
    initComponent: function() {
        var me = this;
        var filters = new Ext.ux.grid.FiltersFeature({
            // encode and local configuration options defined previously for easier reuse
            encode: true, // json encode the filter query
            local: false,   // defaults to false (remote filtering)
            filters: [{
                type: 'string',
                dataIndex: 'code'
            }, {
                type: 'string',
                dataIndex: 'buildingName'
            }, {
                type: 'date',
                dataIndex: 'toDate',
                dateFormat: 'Y/m/d',  // default
                beforeText: 'قبل', // default
                afterText: 'بعد',   // default
                onText: 'در',         // default
                pickerOpts: {
                    plugins:['jalalidate']
                }
            },{
                type: 'date',
                dataIndex: 'fromDate',
                dateFormat: 'Y/m/d',  // default
                beforeText: 'قبل', // default
                afterText: 'بعد',   // default
                onText: 'در',         // default
                pickerOpts: {
                    plugins:['jalalidate']
                }

             }]
        });

        Ext.applyIf(me, {
            items:
                [
                    {
                        xtype:'grid',
                        height:600,
                        columnLines:true,
                        id:'capsuleLocationGridList',
                        store:MyDesktop.app.util.GlobalVariables.gCapsuleLocationStore,
                        columns: [
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'id',
                                hidden:true
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
                                format:'d-m-Y',
                                renderer: function(value){

                                    var toDate = value;
                                    if(toDate){
                                        if(toDate.length){
                                            var miladi = value.split('-')[0];
                                            var date = [];
                                            if(miladi > 1500){
                                                date.push( value.split('-')[0]);
                                                date.push( value.split('-')[1]);
                                                date.push( value.split('-')[2]);
                                                toDate = Ext.Date.JalaliConverter.gregorianToJalali(date);
                                            }else
                                            {
                                                var todate = value.split('-');
                                                toDate = [];
                                                /*toDate[0] = todate[2];
                                                toDate[1] = todate[1];
                                                toDate[2] = todate[0];*/
                                            }
                                            if(toDate[1].toString().length == 1){
                                                toDate[1] = '0'+toDate[1];
                                            }
                                            if(toDate[2].toString().length == 1){
                                                toDate[2] = '0'+toDate[2];
                                            }
                                            toDate = toDate[0]+'-'+toDate[1]+'-'+toDate[2];
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
                                            toDate = toDate[0]+'-'+toDate[1]+'-'+toDate[2];
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
                                renderer: function(value,meta,record){
                                    var toDate = value;
                                    if(toDate){
                                        if(toDate.length){
                                            var miladi = value.split('-')[0];
                                            var date = [];
                                            if(miladi > 1500){
                                                date.push( value.split('-')[0]);
                                                date.push( value.split('-')[1]);
                                                date.push( value.split('-')[2]);
                                                toDate = Ext.Date.JalaliConverter.gregorianToJalali(date);
                                            }else
                                            {
                                                var todate = value.split('-');
                                                /*toDate = [];
                                                toDate[0] = todate[2];
                                                toDate[1] = todate[1];
                                                toDate[2] = todate[0];*/
                                            }
                                            if(toDate[1].toString().length == 1){
                                                toDate[1] = '0'+toDate[1];
                                            }
                                            if(toDate[2].toString().length == 1){
                                                toDate[2] = '0'+toDate[2];
                                            }
                                            toDate = toDate[0]+'-'+toDate[1]+'-'+toDate[2];
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
                                            toDate = toDate[0]+'-'+toDate[1]+'-'+toDate[2];
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
                                        handler: function(grid, rowIndex) {
                                            var rec = grid.getStore().getAt(rowIndex);
                                            rec.setDirty();
                                            grid.getStore().remove(rec);
                                            grid.getStore().sync({
                                                success: function (proxy, operations) {
                                                    // pop success message
                                                }, failure: function (proxy, operations) {
                                                    // resume records
                                                    grid.getStore().rejectChanges();
                                                }
                                            });
                                        }
                                    }
                                ]
                            }
                        ],
                        selModel: Ext.create('Ext.selection.CellModel', {
                        }),
                        plugins: [
                            Ext.create('Ext.grid.plugin.CellEditing', {
                                clicksToEdit: 2,
                                autoCancel: false
                            })
                        ],
                        features: [filters],
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
                        ],
                        tbar:[{
                            text:'اضافه کردن موقعیت کپسول',
                            tooltip:'Add a new row',
                            iconCls:'add',
                            handler : function() {
                                var grid = Ext.getCmp('capsuleLocationGridList');
                                var rec = Ext.create('MyDesktop.app.model.CapsuleLocationModel')
                                grid.store.insert(0,rec);
                            }
                        },'-',{
                            text:'ثبت تغییرات',
                            tooltip:'ثبت تغییرات',
                            iconCls:'save',
                            handler : function() {
                                var grid = Ext.getCmp('capsuleLocationGridList');

                                var modifiedRecords = grid.store.getModifiedRecords();
                                var updateArray = [];
                                for(var i=0;i<modifiedRecords.length;i++){
                                    updateArray.push(modifiedRecords[i].data);
                                }
                                Ext.Ajax.request({
                                    url : 'capsuleLocation/batchUpdate.action',
                                    method: 'POST',
                                    jsonData:updateArray,
                                    success: function (response) {
                                        var jsonResp = Ext.JSON.decode(response.responseText);
                                        /* Ext.Msg.alert("Info","UserName from Server : "+jsonResp.username);*/
                                        grid.store.commitChanges();
                                        grid.store.load();
                                        grid.getView().refresh();
                                    },
                                    failure: function (response) {
                                        grid.store.rejectChanges();
                                        var jsonResp = Ext.JSON.decode(response.responseText);
                                        Ext.Msg.alert("Error",jsonResp.error);
                                    }
                                });
                            }
                        }
                        ]
                    }
                ]

        });
        me.callParent(arguments);
    }
});