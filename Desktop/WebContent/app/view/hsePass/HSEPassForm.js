Ext.define('MyDesktop.app.view.hsePass.HSEPassForm', {
    extend: 'Ext.panel.Panel',
    alias:'widget.hsePassForm',
    requires:['MyDesktop.app.store.Posts','Ext.ux.form.SearchField'],
    rtl: true,
    closable:true,
    autoScroll: true,
    bodyPadding: 10,
    title: 'شناسنامه HSE کارمندان',
    bloodTypeCombo:function(){
	// The data store containing the list of states
        var bloodType;
        //noinspection JSValidateTypes
        bloodType = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data: [
                {"value": "Ap", "name": "A+"},
                {"value": "Am", "name": "A-"},
                {"value": "Bp", "name": "B+"},
                {"value": "Bm", "name": "B-"},
                {"value": "Op", "name": "O+"},
                {"value": "Om", "name": "O-"},
                {"value": "ABp", "name": "AB+"},
                {"value": "ABm", "name": "AB-"}
            ]
        });

	// Create the combo box, attached to the states data store
        var combo;
        combo = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'گروه خونی',
            store: bloodType,
            name: 'bloodType',
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
		        {"value":"XL", "name":"XL"},
		        {"value":"xxL", "name":"XXL"}
		    ]
			});

		// Create the combo box, attached to the states data store
        var combo;
        combo = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'سایز لباس',
            store: alamak,
            name: 'clothesSize',
            queryMode: 'local',
            displayField: 'name',
            valueField: 'value',
            renderTo: Ext.getBody()
        });
			
			return combo;
		},
    createSearchPanel:function(){
        var panel;
        panel = Ext.create('Ext.panel.Panel', {
            renderTo: Ext.getBody(),
            animCollapse: true,
            collapsible: true,
            title: 'جستجو',
            width: 600,
            bodyPadding: 5,
            items: [
                {
                    xtype: 'combo',
                    typeAhead: true,
                    triggerAction: 'query',
                    renderTo: Ext.getBody(),
                    submitValue: false,
                    minChars:2,
                    queryMode: 'remote',
                    width:300,
                    listConfig: {
                        loadingText: 'در حال جستجو ....',
                        emptyText: 'موردی یافت نشد.',
                        // Custom rendering template for each item
                        getInnerTpl: function () {
                            return '<a class="search-item" >' +
                                '<h3><span>{firstName}</span><span>{lastName}</span></h3>' +
                                '{post.name}' +
                                '</a>';
                        }
                    },
                    pageSize: 20,
                    listeners: {
                        select: {
                            fn: this.onComboboxSelect,
                            scope: this
                        }
                    }
                    ,store:Ext.create('Ext.data.Store',{
                    fields: [
                        {
                            name: 'id',
                            type: 'int'
                        },
                        {
                            name: 'firstName',
                            type: 'string'
                        },
                        {
                            name: 'lastName',
                            type: 'string'
                        },
                        {
                            name: 'email',
                            type: 'string'
                        },
                        {
                            name: 'cellphone',
                            type: 'string'
                        },
                        {
                            name: 'telephone',
                            type: 'string'
                        },
                        {
                            name: 'emergencyPhone',
                            type: 'string'
                        },
                        {
                            name: 'nationalCode',
                            type: 'string'
                        },
                        {
                            name: 'personelCode',
                            type: 'string'
                        },
                        {
                            name: 'post',
                            type: 'auto'
                        },
                        {
                            name: 'medicalDocNumber',
                            type: 'string'
                        },
                        {
                            name: 'clothesSize',
                            type: 'string',
                            defaultValue:'XL'
                        },
                        {
                            name: 'footSize',
                            type: 'int',
                            defaultValue:35
                        },
                        {
                            name: 'height',
                            type: 'float'
                        },
                        {
                            name: 'weight',
                            type: 'float'
                        },
                        {
                            name: 'bloodType',
                            type: 'string',
                            defaultValue:'Amm'
                        },
                        {
                            name: 'userName',
                            type: 'string'
                        },
                        {
                            name: 'password',
                            type: 'string'
                        },
                        {
                            name: 'passMustBeChange',
                            type: 'string',
                            defaultValue:'NO'
                        },
                        {
                            name: 'blocked',
                            type: 'string',
                            defaultValue:'NO'
                        },
                        {
                            name:'workingAt',
                            type:'auto'
                        }
                    ],
                    proxy: {
                        type: 'ajax',
                        url: 'personalInfo/searchByName.action',
                        listeners: {
                            exception: function(proxy, response, operation){
                                Ext.MessageBox.show({
                                    title: 'REMOTE EXCEPTION',
                                    msg: operation.getError(),
                                    icon: Ext.MessageBox.ERROR,
                                    buttons: Ext.Msg.OK
                                });
                            }
                        },
                        reader: {
                            type: 'json',
                            root: 'data',
                            totalProperty : 'total',
                            successProperty: 'success'
                        }
                    }

                })
                },
                {
                    xtype: 'component',
                    style: 'margin-top:10px',
                    html: 'نام مورد جستجو را وارد کنید'
                }
            ]
        });
        return panel
    },
    onComboboxSelect: function(combo, records, eOpts) {
        var rec = records[0];
        if (rec) {
            this.loadRecord(rec);
            this.workingAt = rec.get('workingAt');
            combo.reset();
        }
    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype:'form',
                    border:false,
                    items:[{
                        xtype: 'fieldset',
                        title: 'مشخصات فردی',
                        collapsible:true,
                        animCollapse:true,
                        items: [
                            {
                                xtype: 'fieldcontainer',
                                layout: {
                                    type: 'table',
                                    columns: 3

                                },
                                items:[
                                    {
                                        xtype: 'textfield',
                                        anchor: '50%',
                                        name:'id',
                                        hidden:true
                                    },
                                    {
                                        xtype: 'textfield',
                                        anchor: '50%',
                                        name:'firstName',
                                        fieldLabel: 'نام',
                                        invalidText: 'مقدار وارد شده صحیح نیست',
                                        blankText: 'پر کردن ای فیلد اجباری است'
                                    },
                                    {
                                        xtype: 'textfield',
                                        anchor: '50%',
                                        name:'lastName',
                                        fieldLabel: 'نام خانوادگی',
                                        invalidText: 'مقدار وارد شده صحیح نیست',
                                        blankText: 'پر کردن ای فیلد اجباری است'
                                    },
                                    {
                                        xtype: 'textfield',
                                        anchor: '50%',
                                        fieldLabel: 'کد ملی',
                                        name: 'nationalCode',
                                        invalidText: 'مقدار وارد شده صحیح نیست',
                                        blankText: 'پر کردن ای فیلد اجباری است',
                                        textValid: false,
                                        validator: function(){
                                            return this.textValid;
                                        },
                                        listeners : {
                                            'change' : function(field, newValue, oldValue) {
                                                var isValid = true;
                                                var errorText;
                                                if(newValue.length < 10){
                                                    errorText = "طول کد ملی باید 10 کراکتر باشد";
                                                    field.markInvalid(errorText);
                                                    field.textValid = false;
                                                }else if(newValue.length > 10){
                                                    errorText = "طول کد ملی باید 10 کراکتر باشد";
                                                    field.markInvalid(errorText);
                                                    field.textValid = false;
                                                }
                                                else{
                                                    Ext.Ajax.request({
                                                        url: 'personalInfo/checkNationalCode.action',
                                                        method: 'POST',
                                                        params: {'nationalCode': newValue},
                                                        success: function(o) {
                                                            if (o.responseText == 0) {
                                                                field.clearInvalid();
                                                                field.textValid = true;
                                                            }else{
                                                                errorText = 'فرد دیگری با این کد ملی ثبت شده است';
                                                                field.markInvalid(errorText);
                                                                field.textValid = false;
                                                            }
                                                        }
                                                    });
                                                }
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'textfield',
                                        anchor: '50%',
                                        fieldLabel: 'کد پرسنلی',
                                        name: 'personelCode',
                                        invalidText: 'مقدار وارد شده صحیح نیست',
                                        blankText: 'پر کردن ای فیلد اجباری است'
                                    },
                                    {
                                        xtype: 'textfield',
                                        anchor: '50%',
                                        fieldLabel: 'تلفن محل کار ',
                                        name: 'telephone',
                                        invalidText: 'مقدار وارد شده صحیح نیست',
                                        blankText: 'پر کردن ای فیلد اجباری است'
                                    },
                                    {
                                        xtype: 'textfield',
                                        anchor: '50%',
                                        fieldLabel: 'تلفن همراه',
                                        name: 'cellphone',
                                        invalidText: 'مقدار وارد شده صحیح نیست',
                                        blankText: 'پر کردن ای فیلد اجباری است'
                                    },
                                    {
                                        xtype: 'textfield',
                                        anchor: '50%',
                                        name: 'emergencyPhone',
                                        fieldLabel: 'تلفن ضروری',
                                        invalidText: 'مقدار وارد شده صحیح نیست'
                                    },
                                    {
                                        xtype: 'textfield',
                                        anchor: '50%',
                                        fieldLabel: 'پست الکترونیک',
                                        name: 'email',
                                        invalidText: 'مقدار وارد شده صحیح نیست',
                                        vtype: 'email'
                                    },
                                    {

                                        xtype: 'combobox',
                                        anchor: '50%',
                                        fieldLabel: 'پست سازمانی',
                                        invalidText: 'مقدار وارد شده صحیح نیست',
                                        emptyText: 'پست سازمانی',
                                        id: 'hsePostCombo',
                                        name:'post',
                                        store:Ext.create('MyDesktop.app.store.Posts',{}),
                                        displayField: 'name',
                                        valueField:'id',
                                        pageSize:20
                                    }
                                ]
                            }
                        ]
                    },
                        {
                            xtype: 'fieldset',
                            title: 'شناسنامه HSE',
                            collapsible:true,
                            animCollapse:true,
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items:
                                        [
                                            {
                                                xtype: 'textfield',
                                                fieldLabel: 'شماره پرونده بهداشتی',
                                                name: 'medicalDocNumber'
                                            },
                                            this.clozeSizeCombo(),
                                            {
                                                xtype: 'numberfield',
                                                fieldLabel: 'سایز کفش',
                                                name: 'footSize',
                                                maxValue: 45,
                                                minValue: 35
                                            }
                                        ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items:
                                        [
                                            {
                                                xtype: 'textfield',
                                                fieldLabel: 'قد',
                                                name: 'height'
                                            },
                                            {
                                                xtype: 'textfield',
                                                fieldLabel: 'وزن',
                                                name: 'weight'
                                            },
                                            this.bloodTypeCombo()
                                        ]
                                }
                            ]
                        },
                        {
                            xtype: 'button',
                            text: 'ثبت',
                            handler: function() {
                                var record = Ext.create('MyDesktop.app.model.PersonalInfoModel'),
                                    values = me.getValues(),
                                    store = MyDesktop.app.util.GlobalVariables.gPersonStore;
                                var combo = Ext.getCmp('hsePostCombo');

                                var v = combo.getValue();

                                record.set(values);

                                if(v == null){
                                    record.set('post',null);
                                } else{
                                    if(v.name){
                                    }else{

                                        var rec = combo.findRecord(combo.valueField || combo.displayField, v);
                                        if(rec){
                                            record.set('post',rec.data);
                                        }else{

                                        }
                                    }
                                }
                                record.setDirty();
                                record.set('workingAt', me.workingAt);
                                console.log(record);
                                var records = [];
                                records.push(record.data);
                                Ext.Ajax.request({
                                    url: 'personalInfo/batchUpdate.action',
                                    method: 'POST',
                                    jsonData: records,
                                    success: function(o) {
                                        store.load();
                                        me.getForm().reset();
                                    }
                                });
                                 store.add(record);
                                 store.sync();
                            }
                        }
                    ]
                }
            ],
            tbar:[
                this.createSearchPanel()
                /*'Search: ', ' ',
                Ext.create('Ext.ux.form.SearchField',{

                    store: Ext.create('Ext.data.Store',{
            fields: [
                {
                    name: 'id',
                    type: 'int'
                },
                {
                    name: 'firstName',
                    type: 'string'
                },
                {
                    name: 'lastName',
                    type: 'string'
                },
                {
                    name: 'email',
                    type: 'string'
                },
                {
                    name: 'cellphone',
                    type: 'string'
                },
                {
                    name: 'telephone',
                    type: 'string'
                },
                {
                    name: 'emergencyPhone',
                    type: 'string'
                },
                {
                    name: 'nationalCode',
                    type: 'string'
                },
                {
                    name: 'personelCode',
                    type: 'string'
                },
                {
                    name: 'post',
                    type: 'auto'
                },
                {
                    name: 'medicalDocNumber',
                    type: 'string'
                },
                {
                    name: 'clothesSize',
                    type: 'string',
                    defaultValue:'XL'
                },
                {
                    name: 'footSize',
                    type: 'int',
                    defaultValue:35
                },
                {
                    name: 'height',
                    type: 'float'
                },
                {
                    name: 'weight',
                    type: 'float'
                },
                {
                    name: 'bloodType',
                    type: 'string',
                    defaultValue:'Amm'
                },
                {
                    name: 'userName',
                    type: 'string'
                },
                {
                    name: 'password',
                    type: 'string'
                },
                {
                    name: 'passMustBeChange',
                    type: 'string',
                    defaultValue:'NO'
                },
                {
                    name: 'blocked',
                    type: 'string',
                    defaultValue:'NO'
                },
                {
                    name:'workingAt',
                    type:'auto'
                }
            ],
            proxy: {
                type: 'ajax',
                url: 'personalInfo/searchByName.action',
                listeners: {
                    exception: function(proxy, response, operation){
                        Ext.MessageBox.show({
                            title: 'REMOTE EXCEPTION',
                            msg: operation.getError(),
                            icon: Ext.MessageBox.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    }
                },
                reader: {
                    type: 'json',
                    root: 'data',
                    totalProperty : 'total',
                    successProperty: 'success'
                }
            }

        }),
                    width:320,
                    styleHtmlContent: true
                })*/
            ]
        });

        me.callParent(arguments);
    }

});