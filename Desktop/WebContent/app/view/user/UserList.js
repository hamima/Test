Ext.define('MyDesktop.app.view.user.UserList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.userList',
    requires:['MyDesktop.app.store.UserStore','Ext.ux.form.ItemSelector'],
    height: 250,
    rtl: true,
    closable:true,
    autoScroll:true,
    id:'userList',
    title: 'لیست کاربران',
    yesNoCombo:function(){
        // The data store containing the list of states
        var yesOrno = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"YES", "name":"بله"},
                {"value":"NO", "name":"خیر"}	        //...
            ]
        });

        // Create the combo box, attached to the states data store
        var combo;
        combo = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '',
            store: yesOrno,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'value',
            renderTo: Ext.getBody()
        });

        return combo;
    },
    createDockedItems:function(rowIndex) {
        return [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                defaults: {
                    minWidth: 75
                },
                items: ['->',
                    {
                        text: 'بستن',
                        handler: function() {
                            Ext.getCmp('FlowWindow').close();
                        }
                    },
                    {
                        text: 'ثبت',
                        handler: function(){
                            var rec = Ext.getCmp('userGridList').store.getAt(rowIndex);
                            rec.set('workingAt',Ext.getCmp('flowSelector').value);
                            Ext.getCmp('FlowWindow').close();
                        }
                    }]
            }];
    },
    showItemSelector:function(inputs,rowIndex){
        var isForm = Ext.create('Ext.window.Window', {
            title: 'انتخاب سازمان های تحت عملکرد',
            id:'FlowWindow',
            width: 600,
            bodyPadding: 10,
            height: 300,
            layout: 'fit',
            closable:true,
            items:[{
                xtype: 'itemselector',
                name: 'itemselector',
                id: 'flowSelector',
                anchor: '100%',
                fieldLabel: 'سازمان های تحت عملکرد',
                store: MyDesktop.app.util.GlobalVariables.gOrganStore,
                displayField: 'name',
                valueField: 'id',
                value: inputs,
                msgTarget: 'side',
                pageSize:10,
                fromTitle: 'لیست سازمان ها',
                toTitle: 'لیست انتخابی'
            }],
            dockedItems: this.createDockedItems(rowIndex)
        });
        return isForm;
    },
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
                        columnLines:true,
                        id:'userGridList',
                        store:MyDesktop.app.util.GlobalVariables.gUserStore,
                        height:600,
                        columns: [
                            {
                                text:'مشخصات فردی',
                                columns: [
                                    /*{
                                        xtype:'rownumberer',
                                        text:'ردیف',
                                        locked: true
                                    },*/
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
                                        width:300,
                                        text: 'سمت سازمانی',
                                        renderer: function(value){//1.
                                            var postName;
                                            var post = value;
                                            if(post){
                                                if(post.name){
                                                    postName = post.name;
                                                }else{
                                                    var combo = Ext.getCmp('userPostListCombo');
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
                                            id:'userPostListCombo',
                                            name:'post',
                                            store:Ext.create('MyDesktop.app.store.Posts',{}),
                                            displayField: 'name',
                                            valueField:'id',
                                            emptyText: 'پست سازمانی',
                                            pageSize:20
                                        }
                                    }
                                ]
                            }
                            ,
                            {
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
                                xtype: 'gridcolumn',
                                renderer:function(value){
                                    var ret;
                                    if(value == 'NO'){
                                        ret = 'خیر';
                                    }else{
                                        ret = 'بله';
                                    }
                                    return ret;
                                },
                                dataIndex: 'blocked',
                                text: 'مسدود شده',
                                editor:this.yesNoCombo()
                            },
                            {
                                xtype: 'gridcolumn',
                                renderer:function(value){
                                    var ret;
                                    if(value == 'NO'){
                                        ret = 'خیر';
                                    }else{
                                        ret = 'بله';
                                    }
                                    return ret;
                                },
                                dataIndex: 'passMustBeChange',
                                text: 'نیاز به تعویض رمز',
                                editor:this.yesNoCombo()
                            },
                            {
                                xtype: 'actioncolumn',
                                text: 'تحت عملکرد',
                                items: [
                                    {
                                        icon: 'resources/images/grid.png',
                                        tooltip: 'نمایش ادارات تحت عملکرد',
                                        scope: this,
                                        handler: function(grid,rowIndex) {
                                            var rec = grid.getStore().getAt(rowIndex);
                                            var inputs = [];
                                            if(rec.get('workingAt')){
                                                for(var i = 0;i<rec.get('workingAt').length;i++){
                                                    inputs.push(rec.get('workingAt')[i].id);
                                                }
                                            }else{

                                            }
                                            var selectedItem = this.showItemSelector(inputs,rowIndex);
                                            selectedItem.show();
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
                                store:MyDesktop.app.util.GlobalVariables.gUserStore,
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
                            iconCls:'add',
                            handler:function(){
                                var grid = Ext.getCmp('userGridList');
                                var rec = Ext.create('MyDesktop.app.model.PersonalInfoModel');
                                grid.store.insert(0,rec);
                            }
                        }, '-', {
                            text:'ثبت تغییرات',
                            tooltip:'ثبت تغییرات',
                            iconCls:'save',
                            handler:function(){
                                var grid = Ext.getCmp('userGridList');
                                var modifiedRecords = grid.store.getModifiedRecords();
                                var updateArray = [];
                                for(var i=0;i<modifiedRecords.length;i++){
                                    if(modifiedRecords[i].get('post')){
                                        if(modifiedRecords[i].get('post').name){
                                            /*updateArray.push(modifiedRecords[i].data);*/
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
                                                },
                                                failure: function (response) {
                                                    var jsonResp = Ext.JSON.decode(response.responseText);
                                                    Ext.Msg.alert("Error",jsonResp.error);
                                                }
                                            });
                                            /*updateArray.push(modifiedRecords[i].data);*/
                                        }
                                    }else{
                                        /*updateArray.push(modifiedRecords[i].data);*/
                                    }
                                    if(modifiedRecords[i].get('workingAt')){

                                        if(modifiedRecords[i].get('workingAt').length > 0){
                                            var workingAt = [];
                                            if(modifiedRecords[i].get('workingAt')[0].name){

                                            }else{
                                                var flow;
                                                var id = modifiedRecords[i].get('workingAt');
                                                Ext.Ajax.request({
                                                    url : 'organ/getById.action',
                                                    method: 'POST',
                                                    async:false,
                                                    params:{ids : id},
                                                    success: function (response) {
                                                        flow = Ext.JSON.decode(response.responseText);
                                                        modifiedRecords[i].set('workingAt',flow);
                                                    },
                                                    failure: function (response) {
                                                        var jsonResp = Ext.JSON.decode(response.responseText);
                                                        Ext.Msg.alert("Error",jsonResp.error);
                                                    }
                                                });
                                            }
                                        }
                                    }
                                    else{
                                        modifiedRecords[i].set('workingAt', null);
                                    }
                                    updateArray.push(modifiedRecords[i].data);
                                }
                                Ext.Ajax.request({
                                    url : 'personalInfo/batchUpdate.action',
                                    method: 'POST',
                                    /*headers:{'Content-Type' : 'text/html'},*/
                                    jsonData:updateArray,
                                    success: function (/*response*/) {
                                        /* var jsonResp = Ext.util.JSON.decode(response.responseText);*/
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
    } ,

    onRemoveClick: function(grid, rowIndex){
    this.getStore().removeAt(rowIndex);
    }

});