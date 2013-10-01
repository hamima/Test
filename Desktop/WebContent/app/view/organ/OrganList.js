Ext.define('MyDesktop.app.view.organ.OrganList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.organList',
    requires:['Ext.ux.grid.FiltersFeature'],
    height: 550,
    closable:true,
    columnLines: true,
    rtl: true,
    title: 'ساختار سازمانی',
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
            fieldLabel: '',
		    store: alamak,
		    queryMode: 'local',
		    displayField: 'name',
		    valueField: 'value',
		    renderTo: Ext.getBody()
		});
		
		return combo;
	},
    initComponent: function() {
        var me = this;
        var filters = new Ext.ux.grid.FiltersFeature({
            // encode and local configuration options defined previously for easier reuse
            encode: true, // json encode the filter query
            local: false,   // defaults to false (remote filtering)
            filters: [
                        {
                            type: 'string',
                            dataIndex: 'name'
                        },
                        {
                            type: 'string',
                            dataIndex: 'stateName'
                        },
                        {
                            type: 'string',
                            dataIndex: 'stateCode'
                        },
                        {
                            dataIndex: 'confirmPlanning',
                            type: 'list',
                            labelField: 'name',
                            options: [
                                {id: 'YES', name:'بله'},
                                {id: 'NO', name:'خیر'}
                            ]
                        },
                        {
                            dataIndex: 'confirmDoneAcitivities',
                            type: 'list',
                            labelField: 'name',
                            options: [
                                {id: 'YES', name:'بله'},
                                {id: 'NO', name:'خیر'}
                            ]
                        },
                        {
                            dataIndex: 'confirmUserAcitivities',
                            type: 'list',
                            labelField: 'name',
                            options: [
                                {id: 'YES', name:'بله'},
                                {id: 'NO', name:'خیر'}
                            ]
                        },
                        {
                            dataIndex: 'referenceReadyToRun',
                            type: 'list',
                            labelField: 'name',
                            options: [
                                {id: 'YES', name:'بله'},
                                {id: 'NO', name:'خیر'}
                            ]
                        },
                        {
                            dataIndex: 'referenceAuto',
                            type: 'list',
                            labelField: 'name',
                            options: [
                                {id: 'YES', name:'بله'},
                                {id: 'NO', name:'خیر'}
                            ]
                        },
                        {
                            dataIndex: 'workEnterTime',
                            type: 'list',
                            labelField: 'name',
                            options: [
                                {id: 'YES', name:'بله'},
                                {id: 'NO', name:'خیر'}
                            ]
                        },
                        {
                            dataIndex: 'workDeclareEnough',
                            type: 'list',
                            labelField: 'name',
                            options: [
                                {id: 'YES', name:'بله'},
                                {id: 'NO', name:'خیر'}
                            ]
                        },
                        {
                            dataIndex: 'workMustEnterSubAct',
                            type: 'list',
                            labelField: 'name',
                            options: [
                                {id: 'YES', name:'بله'},
                                {id: 'NO', name:'خیر'}
                            ]
                        },
                        {
                            dataIndex: 'workMustEnterSubActPrice',
                            type: 'list',
                            labelField: 'name',
                            options: [
                                {id: 'YES', name:'بله'},
                                {id: 'NO', name:'خیر'}
                            ]
                        },
                        {
                            dataIndex: 'workMustEnterSubActTime',
                            type: 'list',
                            labelField: 'name',
                            options: [
                                {id: 'YES', name:'بله'},
                                {id: 'NO', name:'خیر'}
                            ]
                        },
                        {
                            dataIndex: 'workMustEnterEquipment',
                            type: 'list',
                            labelField: 'name',
                            options: [
                                {id: 'YES', name:'بله'},
                                {id: 'NO', name:'خیر'}
                            ]
                        },
                        {
                            dataIndex: 'workMustEnterPermitInfo',
                            type: 'list',
                            labelField: 'name',
                            options: [
                                {id: 'YES', name:'بله'},
                                {id: 'NO', name:'خیر'}
                            ]
                        },
                        {
                            dataIndex: 'workCanEnterInfoWP',
                            type: 'list',
                            labelField: 'name',
                            options: [
                                {id: 'YES', name:'بله'},
                                {id: 'NO', name:'خیر'}
                            ]
                        },
                        {
                            dataIndex: 'alamak',
                            ttype: 'list',
                            labelField: 'name',
                            options: [
                                {id: 'IRON', name:'آهنی'},
                                {id: 'POLYETILEN', name:'پلی اتیلن'}
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
                        id:'organGridList',
                        store: MyDesktop.app.util.GlobalVariables.gOrganStore,
                        columns: [
                            /*{
                                xtype: 'rownumberer',
                                locked: true
                            },*/
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'name',
                                text: 'نام',
                                editor:{
                                    blankText: 'پر کردن ای فیلد اجباری است',
                                    xtype:'textfield',
                                    allowBlank:false
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'stateName',
                                text: 'نام استان',
                                editor:{
                                    allowBlank:false,
                                    blankText: 'پر کردن ای فیلد اجباری است',
                                    xtype:'textfield'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'stateCode',
                                text: 'کد استان',
                                editor:{
                                    allowBlank:false,
                                    blankText: 'پر کردن ای فیلد اجباری است',
                                    xtype:'textfield'
                                }
                            },
                            {
                                text: 'رویه های کلان',
                                columns:[
                                    {
                                        text:'آپشن های تأییدات',
                                        columns:[
                                            {
                                                xtype: 'gridcolumn',
                                                renderer:function(value,meta,record){
                                                    var ret;
                                                    if(value == 'NO'){
                                                        ret = 'خیر';
                                                    }else{
                                                        ret = 'بله';
                                                    }
                                                    return ret;
                                                },
                                                editor:this.yesNoCombo(),
                                                text: 'تأیید برنامه ریزی توسط مدیران اجباری است',
                                                dataIndex:'confirmPlanning'

                                            },
                                            {

                                                dataIndex:'confirmDoneAcitivities',
                                                xtype: 'gridcolumn',
                                                renderer:function(value,meta,record){
                                                    var ret;
                                                    if(value == 'NO'){
                                                        ret = 'خیر';
                                                    }else{
                                                        ret = 'بله';
                                                    }
                                                    return ret;
                                                },
                                                editor:this.yesNoCombo(),

                                                text: 'برای تأیید عملیات انجام شده حتما جدول تأییدات تکمیل گردد '
                                            },
                                            {

                                                dataIndex:'confirmUserAcitivities',
                                                xtype: 'gridcolumn',
                                                renderer:function(value,meta,record){
                                                    var ret;
                                                    if(value == 'NO'){
                                                        ret = 'خیر';
                                                    }else{
                                                        ret = 'بله';
                                                    }
                                                    return ret;
                                                },
                                                editor:this.yesNoCombo(),
                                                text:'تأیید عملیات انجام شده توسط کاربران مسئول اجباری است'
                                            }
                                        ]
                                    },
                                    {
                                        text:'آپشن های ارجاع کار',
                                        columns:[
                                            {
                                                dataIndex:'referenceReadyToRun' ,
                                                xtype: 'gridcolumn',
                                                renderer:function(value,meta,record){
                                                    var ret;
                                                    if(value == 'NO'){
                                                        ret = 'خیر';
                                                    }else{
                                                        ret = 'بله';
                                                    }
                                                    return ret;
                                                },
                                                editor:this.yesNoCombo(),
                                                text:'اعلام "آماده ی اجرا "  برای تمامی ارجاعات کاری توسط مدیران اجباری است'
                                            },
                                            {
                                                dataIndex:'referenceAuto',
                                                xtype: 'gridcolumn',
                                                renderer:function(value,meta,record){
                                                    var ret;
                                                    if(value == 'NO'){
                                                        ret = 'خیر';
                                                    }else{
                                                        ret = 'بله';
                                                    }
                                                    return ret;
                                                },
                                                editor:this.yesNoCombo(),
                                                text:'ارجاع خودکار توسط سیستم انجام گیرد'
                                            }
                                        ]
                                    },
                                    {
                                        text:'آپشن های انجام کار',
                                        columns:[
                                            {
                                                dataIndex:'workEnterTime',
                                                xtype: 'gridcolumn',
                                                renderer:function(value,meta,record){
                                                    var ret;
                                                    if(value == 'NO'){
                                                        ret = 'خیر';
                                                    }else{
                                                        ret = 'بله';
                                                    }
                                                    return ret;
                                                },
                                                editor:this.yesNoCombo(),
                                                text:'مجری مجاز به درج "تاریخ انجام کار " می باشد'
                                            },
                                            {

                                                dataIndex:'workDeclareEnough',
                                                xtype: 'gridcolumn',
                                                renderer:function(value,meta,record){
                                                    var ret;
                                                    if(value == 'NO'){
                                                        ret = 'خیر';
                                                    }else{
                                                        ret = 'بله';
                                                    }
                                                    return ret;
                                                },
                                                editor:this.yesNoCombo(),
                                                text:'اعلام انجام کار کفایت می کند '
                                            },
                                            {
                                                dataIndex: 'workMustEnterSubAct',
                                                xtype: 'gridcolumn',
                                                renderer:function(value,meta,record){
                                                    var ret;
                                                    if(value == 'NO'){
                                                        ret = 'خیر';
                                                    }else{
                                                        ret = 'بله';
                                                    }
                                                    return ret;
                                                },
                                                editor:this.yesNoCombo(),
                                                text:'مجری موظف به درج ریز اطلاعات میزان اجرای هر عملیات است'
                                            },
                                            {

                                                dataIndex:'workMustEnterSubActPrice',
                                                xtype: 'gridcolumn',
                                                renderer:function(value,meta,record){
                                                    var ret;
                                                    if(value == 'NO'){
                                                        ret = 'خیر';
                                                    }else{
                                                        ret = 'بله';
                                                    }
                                                    return ret;
                                                },
                                                editor:this.yesNoCombo(),
                                                text:'مجری موظف به درج ریز اطلاعات هزینه ی هر عملیات است'
                                            },
                                            {
                                                dataIndex:'workMustEnterSubActTime',
                                                xtype: 'gridcolumn',
                                                renderer:function(value,meta,record){
                                                    var ret;
                                                    if(value == 'NO'){
                                                        ret = 'خیر';
                                                    }else{
                                                        ret = 'بله';
                                                    }
                                                    return ret;
                                                },
                                                editor:this.yesNoCombo(),
                                                text:'مجری موظف به درج ریز اطلاعات مدت اجرای هر عملیات است'
                                            },
                                            {
                                                dataIndex:'workMustEnterEquipment',
                                                xtype: 'gridcolumn',
                                                renderer:function(value,meta,record){
                                                    var ret;
                                                    if(value == 'NO'){
                                                        ret = 'خیر';
                                                    }else{
                                                        ret = 'بله';
                                                    }
                                                    return ret;
                                                },
                                                editor:this.yesNoCombo(),
                                                text: 'مجری موظف به درج اطلاعات اقلام مصرف است'
                                            },
                                            {
                                                dataIndex:'workMustEnterPermitInfo',
                                                xtype: 'gridcolumn',
                                                renderer:function(value,meta,record){
                                                    var ret;
                                                    if(value == 'NO'){
                                                        ret = 'خیر';
                                                    }else{
                                                        ret = 'بله';
                                                    }
                                                    return ret;
                                                },
                                                editor:this.yesNoCombo(),
                                                text: 'مجری موظف به درج اطلاعات مجوزها و پرمیت های حین عملیات است'
                                            },
                                            {
                                                dataIndex:'workCanEnterInfoWP',
                                                xtype: 'gridcolumn',
                                                renderer:function(value,meta,record){
                                                    var ret;
                                                    if(value == 'NO'){
                                                        ret = 'خیر';
                                                    }else{
                                                        ret = 'بله';
                                                    }
                                                    return ret;
                                                },
                                                editor:this.yesNoCombo(),
                                                text: 'امکان درج اطلاعات ارقام گیری بدون ارجاع کار میسر است'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                text: 'پیش فرض ها',
                                /*hidden: MyDesktop.app.util.GlobalVariables.showOrganOptions2,*/
                                columns:[
                                    {
                                        text:'پیش فرض های شناسنامه',
                                        columns:[
                                            {
                                                xtype: 'gridcolumn',
                                                dataIndex:'alamak',
                                                width:150,
                                                renderer:function(value){
                                                    var alamak;
                                                    if(value == 'IRON'){
                                                        alamak='آهنی';
                                                    }else{
                                                        alamak='پلی اتیلن';
                                                    }
                                                    return alamak;
                                                },
                                                text:'علمک',
                                                editor: this.alamakCombo()
                                            }
                                        ]
                                    },
                                    {
                                        text:'پیش فرض های نمایش و ارجاع عملیات ها',
                                        columns:[
                                            {
                                                xtype: 'gridcolumn',
                                                dataIndex: 'currentActDisplayInt',
                                                text: 'بازه ی نمایش عملیاتهای جاری (برحسب هفته)',
                                                editor:{
                                                    xtype: 'numberfield'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                dataIndex: 'jobReferenceCounter',
                                                width:150,
                                                text: 'تعداد شماره انداز ارجاع کار در هر ماه',
                                                editor:{
                                                    xtype: 'numberfield'
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype:'gridcolumn',
                                text:'ارگان مسئول',
                                dataIndex:'parent',
                                width:300,
                                renderer:function(value){
                                    var postName;
                                    var post = value;
                                    if(post){
                                        if(post.name){
                                            postName = post.name;
                                        }else{
                                            var combo = Ext.getCmp('organListCombo');
                                            var rec = combo.findRecord(combo.valueField , post);
                                            if(rec){
                                                postName = rec.data.name;
                                            }else{
                                                postName = '---';
                                            }
                                        }

                                    }else{
                                        postName = '---';
                                    }
                                    return postName;
                                },
                                editor:{
                                    xtype:'combobox',
                                    id: 'organListCombo',
                                    emptyText: 'ارگان ها',
                                    store:Ext.create('MyDesktop.app.store.Organs',{}),
                                    displayField: 'name',
                                    valueField:'id',
                                    pageSize:20,
                                    emptyText: 'ساختار سازمانی'
                                }
                            },
                            {
                                xtype: 'actioncolumn',
                                items: [{
                                    icon: 'resources/images/icons/fam/delete.gif',
                                    tooltip: 'Delete Plant',
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
                                store:MyDesktop.app.util.GlobalVariables.gOrganStore,
                                displayInfo: true,
                                emptyMsg: 'داده ای برای نمایش وجود ندارد',
                                firstText: 'صفحه اول',
                                lastText: 'صحفه آخر',
                                nextText: 'صفحه بعدی'
                            }
                        ],
                        tbar:[{
                            text:'اضافه کردن ساختار سازمانی',
                            tooltip:'اضافه کردن سطر جدید',
                            iconCls:'add',
                            handler:function(){
                                var grid = Ext.getCmp('organGridList');
                                var rec = Ext.create('MyDesktop.app.model.OrganModel');
                                grid.store.insert(0,rec);
                            }

                        },'-',{
                            text:'ثبت تغییرات',
                            id:'save',
                            tooltip:'ثبت تغییرات',
                            iconCls:'save',
                            handler:function(){
                                var grid = Ext.getCmp('organGridList');
                                var modifiedRecords = grid.store.getModifiedRecords();
                                var updateArray = [];
                                for(var i=0;i<modifiedRecords.length;i++){
                                    if(modifiedRecords[i].get('parent')){
                                        if(modifiedRecords[i].get('parent').name){
                                        }else{
                                            var id = modifiedRecords[i].get('parent');
                                            var parent = grid.store.findRecord('id',id);
                                            var ids = [];
                                            ids.push(id);
                                            if(parent == null){
                                                var organ;
                                                Ext.Ajax.request({
                                                    url : 'organ/getById.action',
                                                    method: 'POST',
                                                    async:false,
                                                    params:{ids : ids},
                                                    success: function (response) {
                                                        organ = Ext.JSON.decode(response.responseText);
                                                        modifiedRecords[i].set('parent',organ[0]);
                                                    },
                                                    failure: function (response) {
                                                        var jsonResp = Ext.JSON.decode(response.responseText);
                                                        Ext.Msg.alert("Error",jsonResp.error);
                                                    }
                                                });
                                            }else{
                                                modifiedRecords[i].set('parent',parent.data);
                                            }
                                        }
                                    }else{
                                        modifiedRecords[i].set('parent',null);
                                    }
                                    updateArray.push(modifiedRecords[i].data);
                                }
                                Ext.Ajax.request({
                                    url : 'organ/batchUpdate.action',
                                    method: 'POST',
                                    /*headers:{'Content-Type' : 'text/html'},*/
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
                        },'-',{
                            text:'نمایش/عدم نمایش رویه های کلان',
                            tooltip:'Remove the selected item',
                            handler:function(){
                                function findColumnByDataIndex(grid, dataIndex) {
                                    var selector = "gridcolumn[text=" + dataIndex + "]";
                                    return grid.down(selector);
                                };
                                var grid = this.up("grid");
                                var columnToHide = findColumnByDataIndex(grid, 'رویه های کلان');
                                if (columnToHide) {
                                    if (columnToHide.isHidden()) {
                                        columnToHide.show();
                                    } else {
                                        columnToHide.hide();
                                    }
                                }
                            }
                        },'-',{
                            text:'نمایش/عدم نمایش پیش فرض ها',
                            tooltip:'Remove the selected item',
                            handler:function(){
                                function findColumnByDataIndex(grid, dataIndex) {
                                    var selector = "gridcolumn[text=" + dataIndex + "]";
                                    return grid.down(selector);
                                };
                                var grid = this.up("grid");
                                var columnToHide = findColumnByDataIndex(grid, 'پیش فرض ها');
                                if (columnToHide) {
                                    if (columnToHide.isHidden()) {
                                        columnToHide.show();
                                    } else {
                                        columnToHide.hide();
                                    }
                                }
                            }
                        }]

                    }
                ]

            });
        me.callParent(arguments);
    }
});