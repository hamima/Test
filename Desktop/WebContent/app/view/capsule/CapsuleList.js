Ext.define('MyDesktop.app.view.capsule.CapsuleList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.capsuleList',
    requires:['MyDesktop.app.store.CapsuleStore'],
    height: 400,
    rtl: true,
    closable:true,
    width: 400,
    title: 'لیست کپسول ها',
    yesNoCombo:function(){
        var yesOrno = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"YES", "name":"بله"},
                {"value":"NO", "name":"خیر"}
            ]
        });

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
    capsuleTypeCombo:function(){
        // The data store containing the list of capsule types
        var capsuleType;
        capsuleType = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data: [
                {"value": "ONE", "name": "نوع اول"},
                {"value": "TWO", "name": "نوع دوم"},	        //...
                {"value": "THREE", "name": "نوع سوم"},
                {"value": "FOUR", "name": "نوع چهارم"},
                {"value": "FIVE", "name": "نوع پنجم"}
            ]
        });

        // Create the combo box, attached to the states data store
        var combo;
        combo = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '',
            store: capsuleType,
            queryMode: 'local',
            name: 'type',
            displayField: 'name',
            emptyText:'نوع کپسول',
            valueField: 'value',
            renderTo: Ext.getBody()
        });

        return combo;
    },
    flowDockedItems:function(rowIndex) {
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
                            var rec = Ext.getCmp('capsuleGridList').store.getAt(rowIndex);
                            rec.set('flows',Ext.getCmp('flowSelector').value);
                            Ext.getCmp('FlowWindow').close();
                        }
                    }]
            }];
    },
    locationDockItems:function(rowIndex) {
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
                            Ext.getCmp('LocationWindow').close();
                        }
                    },
                    {
                        text: 'ثبت',
                        handler: function(){
                            var rec = Ext.getCmp('capsuleGridList').store.getAt(rowIndex);
                            rec.set('locations',Ext.getCmp('locationSelector').value);
                            Ext.getCmp('LocationWindow').close();
                        }
                    }]
            }];
    },
    showItemSelector:function(inputs,rowIndex){
        var isForm = Ext.create('Ext.window.Window', {
            title: 'انتخاب مکان کپسول',
            id:'LocationWindow',
            width: 600,
            bodyPadding: 10,
            height: 300,
            layout: 'fit',
            closable:true,
            items:[{
                xtype: 'itemselector',
                name: 'itemselector',
                id: 'locationSelector',
                anchor: '100%',
                fieldLabel: 'مکان کپسول',
                store: MyDesktop.app.util.GlobalVariables.gCapsuleLocationStore,
                displayField: 'buildingName',
                valueField: 'id',
                value: inputs,
                msgTarget: 'side',
                fromTitle: 'لیست مکان کپسول',
                toTitle: 'مکان های انتخاب شده'
            }],
            dockedItems: this.locationDockItems(rowIndex)
        });
        return isForm;
    },
    flowSelector:function(inputs,rowIndex){
        var isForm = Ext.create('Ext.window.Window', {
            title: 'ساختار جریان',
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
                fieldLabel: 'ساختار جریان',
                store: MyDesktop.app.util.GlobalVariables.gFlowStructStore,
                displayField: 'name',
                valueField: 'id',
                value: inputs,
                msgTarget: 'side',
                fromTitle: 'لیست جریان ها ی ورودی',
                toTitle: 'جریان های انتخاب شده'
            }],
            dockedItems: this.flowDockedItems(rowIndex)
        });
        return isForm;
    },
    dateRenderer:function(value){
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
    initComponent: function() {
        var me = this;
        var filters = new Ext.ux.grid.FiltersFeature({
            // encode and local configuration options defined previously for easier reuse
            encode: true, // json encode the filter query
            local: false,   // defaults to false (remote filtering)
            filters:
                [
                    {
                        dataIndex: 'eqNumber',
                        type: 'string'
                    },
                    {
                        dataIndex: 'shomarePeyman',
                        type: 'string'
                    },
                    {
                        dataIndex: 'address',
                        type: 'string'
                    },
                    {
                        dataIndex: 'executer',
                        type: 'string'
                    },
                    {
                        dataIndex: 'longtitute',
                        type: 'string'
                    },
                    {
                        dataIndex: 'latitute',
                        type: 'string'
                    },
                    {
                        dataIndex: 'height',
                        type: 'numeric'
                    },
                    {
                        dataIndex: 'gathered',
                        type: 'list',
                        labelField:'name',
                        options:
                            [
                                {id: 'YES', name:'بله'},
                                {id: 'NO', name:'خیر'}
                            ]
                    },
                    {
                        dataIndex: 'lunchTime',
                        type: 'date',
                        dateFormat: 'Y/m/d',  // default
                        beforeText: 'قبل', // default
                        afterText: 'بعد',   // default
                        onText: 'در',         // default
                        pickerOpts: {
                            plugins:['jalalidate']
                        }
                    },
                    {
                        dataIndex: 'gatheringDate',
                        type: 'date',
                        dateFormat: 'Y/m/d',  // default
                        beforeText: 'قبل', // default
                        afterText: 'بعد',   // default
                        onText: 'در',         // default
                        pickerOpts: {
                            plugins:['jalalidate']
                        }
                    },
                    {
                        dataIndex: 'locked',
                        type: 'list',
                        labelField:'name',
                        options:
                            [
                                {id: 'YES', name:'بله'},
                                {id: 'NO', name:'خیر'}
                            ]
                    },
                    {
                        dataIndex: 'model',
                        type: 'string'
                    },
                    {
                        dataIndex: 'serialNumber',
                        type: 'string'
                    },
                    {
                        dataIndex: 'reserve',
                        type: 'list',
                        labelField:'name',
                        options:
                            [
                                {id: 'YES', name:'بله'},
                                {id: 'NO', name:'خیر'}
                            ]
                    },
                    {
                        dataIndex: 'droppingDate',
                        type: 'date',
                        dateFormat: 'Y/m/d',  // default
                        beforeText: 'قبل', // default
                        afterText: 'بعد',   // default
                        onText: 'در',         // default
                        pickerOpts: {
                            plugins:['jalalidate']
                        }
                    },
                    {
                        dataIndex: 'type',
                        type: 'list',
                        labelField:'name',
                        options:
                            [
                                {id: "ONE", "name": "نوع اول"},
                                {id: "TWO", "name": "نوع دوم"},	        //...
                                {id: "THREE", "name": "نوع سوم"},
                                {id: "FOUR", "name": "نوع چهارم"},
                                {id: "FIVE", "name": "نوع پنجم"}
                            ]
                    },
                    {
                        dataIndex: 'capacity',
                        type: 'numeric'
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
                        id:'capsuleGridList',
                        store:MyDesktop.app.util.GlobalVariables.gCapsuleStore,
                        columns: [
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'eqNumber',
                                text: 'شماره تجهیز',
                                editor: {
                                    xtype: 'textfield'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'shomarePeyman',
                                text: 'شماره پیمان',
                                editor: {
                                    xtype: 'textfield'
                                }

                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'address',
                                text: 'آدرس',
                                editor: {
                                    xtype: 'textareafield'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'longtitute',
                                text: 'طول جغرافیایی',
                                editor: {
                                    xtype: 'textfield'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'latitute',
                                text: 'عرض جغرافیایی',
                                editor: {
                                    xtype: 'textfield'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'height',
                                text: 'ارتفاع',
                                editor: {
                                    xtype: 'textfield'
                                }
                            },
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
                                dataIndex: 'gathered',
                                text: 'جمع آوری شده',
                                editor:this.yesNoCombo()
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'gatheringNotes',
                                text: 'نکات جمع آوری',
                                editor: {
                                    xtype: 'textareafield'
                                }
                            },
                            {
                                xtype: 'datecolumn',
                                dataIndex: 'gatheringDate',
                                text: 'مدل',
                                renderer: function(value){
                                    return me.dateRenderer(value);
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
                                dataIndex: 'lunchTime',
                                text: 'تاریخ بهره برداری',
                                renderer: function(value){
                                    return me.dateRenderer(value);
                                },
                                editor: {
                                    xtype: 'datefield',
                                    anchor: '50%',
                                    plugins: ['jalalidate'],
                                    format:'d/m/Y'
                                }
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
                                dataIndex: 'locked',
                                text: 'قفل',
                                editor:this.yesNoCombo()
                            },
                            {
                                xtype:'gridcolumn',
                                dataIndex:'countryStructure',
                                text:'ساختار کشوری',
                                width:300,
                                renderer:function(value){
                                    var csName;
                                    var countryStructure = value;
                                    if(countryStructure){
                                        if(countryStructure.name){
                                            csName = countryStructure.name;
                                        }else{
                                            var combo = Ext.getCmp('equipCSListCombo');
                                            var rec = combo.findRecord(combo.valueField , countryStructure);
                                            if(rec){
                                                csName = rec.data.name;
                                            }else{
                                                csName = '---';
                                            }
                                        }
                                    }
                                    else{
                                        csName = '---';
                                    }
                                    return csName;
                                },
                                editor:
                                {
                                    xtype:'combobox',
                                    id: 'equipCSListCombo',
                                    emptyText: 'ساختار کشوری',
                                    name:'',
                                    store:Ext.create('MyDesktop.app.store.CountryStructureStore',{}),
                                    displayField: 'name',
                                    valueField:'id',
                                    pageSize:10
                                }

                            },
                            {
                                xtype: 'actioncolumn',
                                text:'ساختار جریان',
                                items: [
                                    {
                                        icon: 'resources/images/icons/fam/cog_edit.png',
                                        tooltip: 'ساختار جریان',
                                        scope: this,
                                        handler: function(grid, rowIndex) {
                                            var rec = grid.getStore().getAt(rowIndex);
                                            var inputs = [];
                                            if(rec.get('flows')){
                                                for(var i = 0;i<rec.get('flows').length;i++){
                                                    inputs.push(rec.get('flows')[i].id);
                                                }
                                            }else{

                                            }
                                            var selectedItem = this.flowSelector(inputs,rowIndex);
                                            selectedItem.show();
                                        }
                                    }
                                ]
                            },
                            {
                                text:'مشخصات کپسول',
                                columns:[{
                                    xtype: 'gridcolumn',
                                    dataIndex: 'model',
                                    text: 'مدل',
                                    editor: {
                                        xtype: 'textfield'
                                    }
                                },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'serialNumber',
                                        text: 'شماره سریال',
                                        editor: {
                                            xtype: 'textfield'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'reserve',
                                        renderer:function(value){
                                            var ret;
                                            if(value == 'NO'){
                                                ret = 'خیر';
                                            }else{
                                                ret = 'بله';
                                            }
                                            return ret;
                                        },
                                        text: 'رزرو',
                                        editor:this.yesNoCombo()
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'type',
                                        text: 'نوع',
                                        editor: {
                                            xtype: 'textfield'
                                        }
                                    },
                                    {
                                        xtype: 'datecolumn',
                                        dataIndex: 'droppingDate',
                                        text: 'تاریخ اسقاط',
                                        renderer: function(value){
                                           return me.dateRenderer(value);
                                        },
                                        editor: {
                                            xtype: 'datefield',
                                            anchor: '50%',
                                            plugins: ['jalalidate'],
                                            format:'d/m/Y'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'type',
                                        renderer:function(value){
                                            var type;
                                            if(value == 'ONE'){
                                                type = 'نوع اول';
                                            }else if(value == 'TWO'){
                                                type = 'نوع دوم';
                                            }else if(value == 'THREE'){
                                                type = 'نوع سوم';
                                            }else if(value == 'FOUR'){
                                                type = 'نوع چهارم';
                                            }else {
                                                type = 'نوع پنجم';
                                            }
                                            return type;
                                        },
                                        text: 'نوع کپسول',
                                        editor: this.capsuleTypeCombo()
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'capacity',
                                        text: 'ظرفیت',
                                        editor: {
                                            xtype: 'textfield'
                                        }
                                    },
                                    {
                                        xtype: 'actioncolumn',
                                        text:'لیست موقعیت های کپسول',
                                        items: [
                                            {
                                                icon: 'resources/images/icons/fam/cog_edit.png',
                                                tooltip: 'لیست موقعیت های کپسول',
                                                scope: this,
                                                handler: function(grid, rowIndex) {
                                                    var rec = grid.getStore().getAt(rowIndex);
                                                    var inputs = [];
                                                    if(rec.get('locations')){
                                                        for(var i = 0;i<rec.get('locations').length;i++){
                                                            inputs.push(rec.get('locations')[i].id);
                                                        }
                                                    }else{

                                                    }
                                                    var selectedItem = this.showItemSelector(inputs,rowIndex);
                                                    selectedItem.show();
                                                }
                                            }
                                        ]
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
                        selModel: Ext.create('Ext.selection.CellModel', {
                        }),
                        features: [filters],
                        plugins: [
                            Ext.create('Ext.grid.plugin.CellEditing', {
                                clicksToEdit: 2,
                                autoCancel: false
                            })
                        ],
                        dockedItems: [
                            {
                                xtype: 'pagingtoolbar',
                                dock: 'bottom',
                                rtl: true,
                                width: 360,
                                store:MyDesktop.app.util.GlobalVariables.gCapsuleStore,
                                displayInfo: true,
                                emptyMsg: 'داده ای برای نمایش وجود ندارد',
                                firstText: 'صفحه اول',
                                lastText: 'صحفه آخر',
                                nextText: 'صفحه بعدی'
                            }
                        ],
                        tbar:[
                            {
                                text:'به روز رسانی تغییرات اعمال شده',
                                tooltip:'به روز رسانی',
                                iconCls:'save',
                                handler : function() {
                                    var store = Ext.create('MyDesktop.app.store.CapsuleStore');
                                    var grid = Ext.getCmp('capsuleGridList');
                                    var modifiedRecords = grid.store.getModifiedRecords();
                                    var updateArray = [];
                                    for(var i=0;i<modifiedRecords.length;i++){
                                        if(modifiedRecords[i].get('countryStructure')){
                                            if(modifiedRecords[i].get('countryStructure').name){
                                            }else{
                                                var id = modifiedRecords[i].get('countryStructure');
                                                var post;
                                                var ids = [];
                                                ids.push(id);
                                                Ext.Ajax.request({
                                                    url : 'countryStructure/getById.action',
                                                    method: 'POST',
                                                    async:false,
                                                    params:{ids : ids},
                                                    success: function (response) {
                                                        post = Ext.JSON.decode(response.responseText);
                                                        modifiedRecords[i].set('countryStructure',post);
                                                    },
                                                    failure: function (response) {
                                                        var jsonResp = Ext.JSON.decode(response.responseText);
                                                        Ext.Msg.alert("Error",jsonResp.error);
                                                    }
                                                });
                                            }
                                        }else{
                                            modifiedRecords[i].set('countryStructure',null);
                                        }
                                        if(modifiedRecords[i].get('locations')){
                                            if(modifiedRecords[i].get('locations').length > 0){
                                                if(modifiedRecords[i].get('locations')[0].name){

                                                }else{

                                                    var id = modifiedRecords[i].get('locations');
                                                    var locations;
                                                    Ext.Ajax.request({
                                                        url : 'capsuleLocation/getById.action',
                                                        method: 'POST',
                                                        async:false,
                                                        params:{ids : id},
                                                        success: function (response) {
                                                            locations = Ext.JSON.decode(response.responseText);
                                                            modifiedRecords[i].set('locations',locations);
                                                        },
                                                        failure: function (response) {
                                                            var jsonResp = Ext.JSON.decode(response.responseText);
                                                            Ext.Msg.alert("Error",jsonResp.error);
                                                        }
                                                    });
                                                }
                                            }else{
                                                modifiedRecords[i].set('locations', []);
                                            }
                                        }else{
                                            modifiedRecords[i].set('locations', []);
                                        }
                                        if(modifiedRecords[i].get('flows')){
                                            if(modifiedRecords[i].get('flows').length > 0){
                                                if(modifiedRecords[i].get('flows')[0].name){

                                                }else{

                                                    var id = modifiedRecords[i].get('flows');
                                                    var locations;
                                                    Ext.Ajax.request({
                                                        url : 'flow/getById.action',
                                                        method: 'POST',
                                                        async:false,
                                                        params:{ids : id},
                                                        success: function (response) {
                                                            locations = Ext.JSON.decode(response.responseText);
                                                            modifiedRecords[i].set('flows',locations);
                                                        },
                                                        failure: function (response) {
                                                            var jsonResp = Ext.JSON.decode(response.responseText);
                                                            Ext.Msg.alert("Error",jsonResp.error);
                                                        }
                                                    });
                                                }
                                            }else{
                                                modifiedRecords[i].set('flows', []);
                                            }
                                        }else{
                                            modifiedRecords[i].set('flows', []);
                                        }
                                       /* modifiedRecords[i].setDirty();
                                        store.add(modifiedRecords[i]);

                                        store.sync();*/
                                        updateArray.push(modifiedRecords[i].data);
                                    }
                                    Ext.Ajax.request({
                                        url : 'capsule/batchUpdate.action',
                                        method: 'POST',
                                        jsonData:updateArray,
                                        success: function (response) {
                                            var jsonResp = Ext.JSON.decode(response.responseText);
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