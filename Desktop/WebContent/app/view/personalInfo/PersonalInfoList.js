Ext.define('MyDesktop.app.view.personalInfo.PersonalInfoList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.personalInfoList',
    requires:['MyDesktop.app.store.PersonalInfoStore'],
    height: 400,
    rtl: true,
    closable:true,
    width: 400,
    title: 'مشخصات فردی',

    initComponent: function() {
        var me = this;
        var filters = new Ext.ux.grid.FiltersFeature({
            // encode and local configuration options defined previously for easier reuse
            encode: true, // json encode the filter query
            local: false,   // defaults to false (remote filtering)
            filters: [
                {
                    dataIndex: 'firstName',
                    type: 'string'
                },
                {
                    dataIndex: 'lastName',
                    type: 'string'
                },
                {
                    dataIndex: 'email',
                    type: 'string'
                },
                {
                    dataIndex: 'cellphone',
                    type: 'string'
                },
                {
                    dataIndex: 'telephone',
                    type: 'string'
                },
                {
                    dataIndex: 'emergencyPhone',
                    type: 'string'
                },
                {
                    dataIndex: 'nationalCode',
                    type: 'string'
                },
                {
                    dataIndex: 'personelCode',
                    type: 'string'
                },
                {
                    dataIndex: 'medicalDocNumber',
                    type: 'string'
                },
                {
                    dataIndex: 'clothesSize',
                    type: 'list',

                    labelField: 'name',
                    options: [
                        {id: 'YES', name:'بله'},
                        {id: 'NO', name:'خیر'}
                    ]
                },
                {
                    dataIndex: 'footSize',
                    type: 'numeric'
                },
                {
                    dataIndex: 'height',
                    type: 'numeric'
                },
                {
                    dataIndex: 'weight',
                    type: 'numeric'
                },
                {
                    dataIndex: 'bloodType',
                    type: 'list',

                    labelField: 'name',
                    options: [
                        {id: 'YES', name:'بله'},
                        {id: 'NO', name:'خیر'}
                    ]
                },
                {
                    dataIndex: 'userName',
                    type: 'string'
                },
                {
                    dataIndex: 'blocked',
                    type: 'list',

                    labelField: 'name',
                    options: [
                        {id: 'YES', name:'بله'},
                        {id: 'NO', name:'خیر'}
                    ]
                }

                ]
        });
        Ext.applyIf(me, {
            items:
                [
                    {
                        xtype:'grid',
                        height:600,
                        columnLines:true,
                        id:'personalInfoGridList',
                        store:MyDesktop.app.util.GlobalVariables.gPersonStore,
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
                                width:300,
                                text: 'سمت سازمانی',
                                renderer: function(value){
                                    var postName;
                                    var post = value;
                                    if(post){
                                        if(post.name){
                                            postName = post.name;
                                        }else{
                                            var combo = Ext.getCmp('personInfoPostListCombo');
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
                                    id:'personInfoPostListCombo',
                                    name:'post',
                                    store:Ext.create('MyDesktop.app.store.Posts',{}),
                                    displayField: 'name',
                                    valueField:'id',
                                    emptyText: 'پست سازمانی',
                                    pageSize:20
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
                        selModel: Ext.create('Ext.selection.CellModel', {
                        }),
                        features: [filters],
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
                            text:'اضافه کردن شخص حقیقی',
                            tooltip:'Add a new row',
                            iconCls:'add',
                            handler : function() {
                                var grid = Ext.getCmp('personalInfoGridList');
                                var rec = Ext.create('MyDesktop.app.model.PersonalInfoModel');
                                grid.store.insert(0,rec);
                            }
                        }, '-', {
                            text:'بروزرسانی تغییرات',
                            tooltip:'بروزرسانی تغییرات',
                            iconCls:'save',
                            handler : function() {
                                var grid = Ext.getCmp('personalInfoGridList');
                                var modifiedRecords = grid.store.getModifiedRecords();
                                var updateArray = [];
                                for(var i=0;i<modifiedRecords.length;i++){
                                    if(modifiedRecords[i].get('post')){
                                        if(modifiedRecords[i].get('post').name){
                                            updateArray.push(modifiedRecords[i].data);
                                        }else{
                                            var id = modifiedRecords[i].get('post');
                                            var post;
                                            Ext.Ajax.request({
                                                url : 'post/getById.action',
                                                method: 'POST',
                                                async:false,
                                                params:{id : id},
                                                success: function (response) {
                                                    post = Ext.JSON.decode(response.responseText);
                                                    modifiedRecords[i].set('post',post);
                                                    updateArray.push(modifiedRecords[i].data);
                                                },
                                                failure: function (response) {
                                                    var jsonResp = Ext.JSON.decode(response.responseText);
                                                    Ext.Msg.alert("Error",jsonResp.error);
                                                }
                                            });
                                        }
                                    }else{
                                        modifiedRecords[i].set('post',null);
                                        updateArray.push(modifiedRecords[i].data);
                                    }
                                }
                                Ext.Ajax.request({
                                    url : 'personalInfo/batchUpdate.action',
                                    method: 'POST',
                                    jsonData:updateArray,
                                    success: function (response) {
                                        var jsonResp = Ext.JSON.decode(response.responseText);
                                        grid.store.commitChanges();
                                        grid.getView().refresh();
                                    },
                                    failure: function (response) {
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
    },
    onRemoveClick: function(grid, rowIndex){
        this.getStore().removeAt(rowIndex);
    }

});