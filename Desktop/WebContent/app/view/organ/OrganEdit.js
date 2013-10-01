/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 8/27/13
 * Time: 12:18 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyDesktop.app.view.organ.OrganEdit', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.organEdit',
    requires:['MyDesktop.app.store.Organs'],
    height: 554,
    rtl: true,
    width: 678,
    closable:true,
    autoScroll: true,
    bodyPadding: 10,
    collapseFirst: false,
    collapsed: false,
    frameHeader: false,
    title: 'ساختار سازمانی',
    titleAlign: 'right',
    titleCollapse: true,
    layout:{
        type:'vbox',
        align: 'stretch'
    },
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
    organList:function(){
        var organList = Ext.create('MyDesktop.app.view.organ.OrganList',{
            header:false,
            collapsible:true
        });
        return organList;
    }
    ,
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
                    xtype:'form',
                    border:false,
                    autoScroll:true,
                    id:'organBaseForm',
                    items:
                        [
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
                                allowBlank:false,
                                blankText: 'پر کردن ای فیلد اجباری است',
                                fieldLabel: 'نام'
                            },
                            {
                                xtype: 'textfield',
                                anchor: '50%',
                                name:'stateName',
                                allowBlank:false,
                                blankText: 'پر کردن ای فیلد اجباری است',
                                fieldLabel: 'نام استان'
                            },
                            {
                                xtype: 'textfield',
                                anchor: '50%',
                                name:'stateCode',
                                allowBlank:false,
                                blankText: 'پر کردن ای فیلد اجباری است',
                                fieldLabel: 'کد استان'
                            },
                            {
                                xtype: 'fieldset',
                                collapsible: true,
                                title: 'رویه های کلان',
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        collapsed: true,
                                        collapsible: true,
                                        title: 'آپشن های تأییدات',
                                        layout:{
                                            type:'hbox'
                                        },
                                        items: [
                                            {
                                                xtype: 'checkboxfield',
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
                                        layout:{
                                            type:'hbox',
                                            align: 'stretch',
                                            padding: 4
                                        },
                                        items: [
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
                                        collapsed: true,
                                        collapsible: true,
                                        title: 'آپشن های اعلام انجام کار',
                                        items: [
                                            {
                                                xtype:'fieldcontainer',
                                                layout:{
                                                    type:'hbox',
                                                    align: 'stretch',
                                                    padding: 4
                                                },
                                                items:[
                                                    {
                                                        xtype: 'checkboxfield',
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
                                                        fieldLabel: '',
                                                        name:'workDeclareEnough',
                                                        boxLabel: 'اعلام انجام کار کفایت می کند '
                                                        ,checked   : false,
                                                        value: 1,
                                                        inputValue: 'YES',
                                                        uncheckedValue: 'NO'
                                                    }
                                                ]

                                            },
                                            {
                                                xtype:'fieldcontainer',
                                                layout:{
                                                    type:'hbox',
                                                    align: 'stretch',
                                                    padding: 4
                                                },
                                                items:[
                                                    {
                                                        xtype: 'checkboxfield',
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
                                                        fieldLabel: '',
                                                        name:'workMustEnterSubActPrice',
                                                        boxLabel: 'مجری موظف به درج ریز اطلاعات هزینه ی هر عملیات است'
                                                        ,checked   : false,
                                                        value: 1,
                                                        inputValue: 'YES',
                                                        uncheckedValue: 'NO'
                                                    }]
                                            }
                                            ,
                                            {
                                                xtype:'fieldcontainer',
                                                layout:{
                                                    type:'hbox',
                                                    align: 'stretch',
                                                    padding: 4
                                                },
                                                items:[
                                                    {
                                                        xtype: 'checkboxfield',
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
                                                        fieldLabel: '',
                                                        name:'workMustEnterEquipment',
                                                        boxLabel: 'مجری موظف به درج اطلاعات اقلام مصرف است'
                                                        ,checked   : false,
                                                        value: 1,
                                                        inputValue: 'YES',
                                                        uncheckedValue: 'NO'
                                                    }
                                                ]
                                            },
                                            {
                                                xtype:'fieldcontainer',
                                                layout:{
                                                    type:'hbox',
                                                    align: 'stretch',
                                                    padding: 4
                                                },
                                                items:[
                                                    {
                                                        xtype: 'checkboxfield',
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
                                    }
                                ]
                            },
                            {
                                xtype: 'fieldset',
                                collapsible: true,
                                title: 'پیش فرض ها',
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        title: 'پیش فرض های شناسنامه',
                                        items: [
                                            this.alamakCombo()
                                        ]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        title: 'پیش فرض های نمایش و ارجاع عملیات ها',
                                        layout:{
                                            type:'table',
                                            column:2
                                        },
                                        items: [
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
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype:'combobox',
                                fieldLabel:'تحت کنترل',
                                id: 'organCombo',
                                emptyText: 'Organs',
                                name:'parent',
                                store:Ext.create('MyDesktop.app.store.Organs',{}),
                                displayField: 'name',
                                valueField:'id',
                                pageSize:10
                            },
                            {
                                xtype: 'button',
                                text: 'ثبت',
                                handler: function() {
                                    var record = Ext.create('MyDesktop.app.model.OrganModel'),
                                        store = MyDesktop.app.util.GlobalVariables.gOrganStore;
                                    var values =  Ext.getCmp('organBaseForm').getValues();
                                    /*if(Ext.getCmp('organBaseForm').getValues().length > 1){
                                        values =  Ext.getCmp('organBaseForm').getValues()[Ext.getCmp('organBaseForm').getValues().length - 1];
                                    }else{
                                        [0];
                                    }*/
                                    var combo = Ext.getCmp('organCombo');
                                    var v = combo.getValue();
                                    record.set(values);
                                    if(v == null){
                                        record.set('parent',null);
                                    } else{
                                        var rec = combo.findRecord(combo.valueField || combo.displayField, v);
                                        record.set('parent',rec.data);
                                    }
                                    if(record.get('alamak') == ""){
                                        record.set('alamak','IRON');
                                    }
                                    record.setDirty();
                                    record.setId(0);
                                    store.add(record);
                                    store.sync({
                                        success: function (proxy, operations) {
                                            Ext.getCmp('organBaseForm').getForm().reset();
                                        }, failure: function (proxy, operations) {
                                            // resume records
                                        }
                                    });

                                }
                            }
                        ]
                }/*,
                {
                    xtype: 'splitter'
                },
                {
                    xtype:'grid',
                    height:500,
                    id:'organEditList',
                    store:MyDesktop.app.util.GlobalVariables.gOrganStore,
                    columns: [
                        {
                            xtype: 'rownumberer',
                            locked: true
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'name',
                            text: 'نام',
                            editor:{
                                xtype:'textfield'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'stateName',
                            text: 'نام استان',
                            editor:{
                                xtype:'textfield'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'stateCode',
                            text: 'کد استان',
                            editor:{
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
                            columns:[
                                {
                                    text:'پیش فرض های شناسنامه',
                                    columns:[
                                        {
                                            xtype: 'gridcolumn',
                                            renderer:function(value){
                                                var alamakType;
                                                if(value == 'IRON'){
                                                    alamakType = 'آهنی';
                                                }else{
                                                    alamakType = 'پلی اتیلن';
                                                }
                                                return alamakType;
                                            },
                                            dataIndex:'alamak',
                                            text:'علمک',
                                            displayField:'name',
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
                            renderer:function(value){
                                var postName;
                                var post = value;
                                if(post){
                                    if(post.name){
                                        postName = post.name;
                                    }else{
                                        var combo = Ext.getCmp('organEditCombo');
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
                                id: 'organEditCombo',
                                emptyText: 'ارگان ها',
                                store:Ext.create('MyDesktop.app.store.Organs',{}),
                                displayField: 'name',
                                valueField:'id'
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
                            store:MyDesktop.app.util.GlobalVariables.gOrganStore,
                            displayInfo: true,
                            emptyMsg: 'داده ای برای نمایش وجود ندارد',
                            firstText: 'صفحه اول',
                            lastText: 'صحفه آخر',
                            nextText: 'صفحه بعدی'
                        }
                    ],
                    tbar:[*//*{
                        text:'اضافه کردن ساختار سازمانی',
                        tooltip:'اضافه کردن سطر جدید',
                        iconCls:'add',
                        handler:function(){
                            var rec = Ext.create('MyDesktop.app.model.OrganModel');
                            var store = Ext.getCmp('organEditList').store;
                            store.insert(0,rec);
                        }
                    },'-',{
                        text:'ثبت تغییرات',
                        tooltip:'ثبت تغییرات',
                        iconCls:'save',
                        handler:function(){
                            var modifiedRecords = me.store.getModifiedRecords();
                            var updateArray = [];
                            for(var i=0;i<modifiedRecords.length;i++){
                                if(modifiedRecords[i].get('parent')){
                                    if(modifiedRecords[i].get('parent').name){
                                        updateArray.push(modifiedRecords[i].data);
                                    }else{
                                        var id = modifiedRecords[i].get('parent');
                                        var parent = me.store.findRecord('id',id);
                                        modifiedRecords[i].set('parent',parent.data);
                                        updateArray.push(modifiedRecords[i].data);
                                    }
                                }else{
                                    updateArray.push(modifiedRecords[i].data);
                                }
                            }
                            Ext.Ajax.request({
                                url : 'organ/batchUpdate.action',
                                method: 'POST',
                                *//**//*headers:{'Content-Type' : 'text/html'},*//**//*
                                jsonData:updateArray,
                                success: function (response) {
                                     var jsonResp = Ext.JSON.decode(response.responseText);
                                    *//**//* Ext.Msg.alert("Info","UserName from Server : "+jsonResp.username);*//**//*
                                    Ext.getCmp('organEditList').store.commitChanges();
                                    Ext.getCmp('organEditList').getView().refresh();
                                },
                                failure: function (response) {
                                    var jsonResp = Ext.JSON.decode(response.responseText);
                                    Ext.Msg.alert("Error",jsonResp.error);
                                }
                            });
                        }
                    },'-',*//*{
                        text:'نمایش رویه های کلان',
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
                        text:'نمایش پیش فرض ها',
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
                }*/
            ]
        });

        me.callParent(arguments);
    },
    onSelectionChange: function(model, records) {
        var rec = records[0];
        if (rec) {
            Ext.getCmp('organBaseForm').loadRecord(rec);
        }
    }

});