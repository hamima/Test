Ext.define('MyDesktop.app.view.hsePass.HSEPassList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.hsePassList',

    height: 429,
    closable:true,
    rtl: true,
    width: 683,
    title: 'شناسنامه HSE',
    bloodTypeCombo:function(){
	// The data store containing the list of states
	var alamak = Ext.create('Ext.data.Store', {
	    fields: ['value', 'name'],
	    data : [
	        {"value":"Ap", "name":"A+"},
	        {"value":"Am", "name":"A-"},
	        {"value":"Bp", "name":"B+"},
	        {"value":"Bm", "name":"B-"},
	        {"value":"Op", "name":"O+"},
	        {"value":"Om", "name":"O-"},
	        {"value":"ABp", "name":"AB+"},
	        {"value":"ABm", "name":"AB-"}
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
	clozeSizeCombo:function(){
		// The data store containing the list of states
		var alamak = Ext.create('Ext.data.Store', {
		    fields: ['value', 'name'],
		    data : [
		        {"value":"M", "name":"M"},
		        {"value":"L", "name":"L"},
		        {"value":"xL", "name":"XL"},
		        {"value":"xxL", "name":"XXL"}
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
                        {id:"M", "name":"M"},
                        {id:"L", "name":"L"},
                        {id:"xL", "name":"XL"},
                        {id:"xxL", "name":"XXL"}
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
                        {id:"Ap", "name":"A+"},
                        {id:"Am", "name":"A-"},
                        {id:"Bp", "name":"B+"},
                        {id:"Bm", "name":"B-"},
                        {id:"Op", "name":"O+"},
                        {id:"Om", "name":"O-"},
                        {id:"ABp", "name":"AB+"},
                        {id:"ABm", "name":"AB-"}
                    ]
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
                        height:600,
                        id:'hsePassGridList',
                        store:MyDesktop.app.util.GlobalVariables.gHSEPassStore,
                        columns: [

                            {
                                text: 'مشخصات فردی',
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
                                        text: 'شماره تلفن اداری',
                                        editor: {
                                            xtype: 'textfield'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'cellphone',
                                        text: 'شماره موبایل',
                                        editor: {
                                            xtype: 'textfield'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'emergencyPhone',
                                        text: 'شماره تلفن ضروری',
                                        editor: {
                                            xtype: 'textfield'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'post',
                                        width:300,
                                        text: 'سمت سازمانی',
                                        renderer: function(value,meta,record){//1.
                                            var postName;
                                            var post = value;
                                            if(post){
                                                if(post.name){
                                                    postName = post.name;
                                                }else{
                                                    var combo = Ext.getCmp('hsePostListCombo');
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
                                            id:'hsePostListCombo',
                                            name:'post',
                                            store:MyDesktop.app.util.GlobalVariables.gPostStore,
                                            displayField: 'name',
                                            valueField:'id',
                                            pageSize:20,
                                            emptyText: 'پست سازمانی'
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'medicalDocNumber',
                                text: 'شماره پرونده بهداشتی',
                                editor: {
                                    xtype: 'textfield'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'clothesSize',
                                text: 'سایز لباس',
                                editor: this.clozeSizeCombo()
                            },
                            {
                                xtype: 'numbercolumn',
                                dataIndex: 'footSize',
                                text: 'سایز کفش',
                                editor: {
                                    xtype: 'numberfield'
                                }
                            },
                            {
                                xtype: 'numbercolumn',
                                dataIndex: 'weight',
                                text: 'وزن',
                                editor: {
                                    xtype: 'numberfield'
                                }
                            },
                            {
                                xtype: 'numbercolumn',
                                dataIndex: 'height',
                                emptyCellText: '---',
                                text: 'قد',
                                editor: {
                                    xtype: 'numberfield'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'bloodType',
                                renderer:function(value){
                                    var bloodType;
                                    if(value === 'Ap'){
                                        bloodType = 'A+';
                                    }else if(value === 'Am'){
                                        bloodType = 'A-';
                                    }else if(value === 'Bm'){
                                        bloodType = 'B-';
                                    }else if(value === 'Bp'){
                                        bloodType = 'B+';
                                    }else if(value === 'Om'){
                                        bloodType = 'O-';
                                    }else if(value === 'Op'){
                                        bloodType = 'O+';
                                    }else if(value === 'ABm'){
                                        bloodType = 'AB-';
                                    }else if(value === 'ABp'){
                                        bloodType = 'AB+';
                                    }
                                    return bloodType;
                                },
                                text: 'گروه خونی',
                                rtl:false,
                                editor: this.bloodTypeCombo()
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
                                store:MyDesktop.app.util.GlobalVariables.gHSEPassStore,
                                displayInfo: true,
                                emptyMsg: 'داده ای برای نمایش وجود ندارد',
                                firstText: 'صفحه اول',
                                lastText: 'ص',
                                nextText: 'صفحه بعدی'
                            }
                        ]
                        ,
                        tbar:[{
                            text:'ایجاد شناسنامه',
                            tooltip:'اضافه کردن شناسنامه',
                            iconCls:'add',
                            handler:function(){
                                var grid = Ext.getCmp('hsePassGridList');
                                var rec = Ext.create('MyDesktop.app.model.PersonalInfoModel');
                                grid.store.insert(0,rec);
                            }
                        },'-',{
                            text:'ثبت تغییرات',
                            tooltip:'ثبت تغییرات انجام شده در جدول',
                            iconCls:'save',
                            handler:function(){
                                var grid = Ext.getCmp('hsePassGridList');
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
                        }
                        ]

                    }
                ]

        });

        me.callParent(arguments);
    }
});