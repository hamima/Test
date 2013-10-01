Ext.define('MyDesktop.app.view.capsule.CapsuleForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.capsuleForm',
    requires:['MyDesktop.app.store.CapsuleLocationStore','MyDesktop.app.util.GlobalVariables'],
    height: 356,
    rtl: true,
    closable:true,
    autoScroll: true,
    width: 400,
    bodyPadding: 10,
    title: 'مشخصات کپسول ها',
    capsuleTypeCombo:function(){
        // The data store containing the list of capsule types
        var capsuleType = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"ONE", "name":"نوع یک"},
                {"value":"TWO", "name":"نوع دو"},	        //...
                {"value":"THREE", "name":"نوع سه"},
                {"value":"FOUR", "name":"نوع چهار"},
                {"value":"FIVE", "name":"نوع پنج"}
            ]
        });

        // Create the combo box, attached to the states data store
        var combo = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'نوع کپسول',
            id: 'capsuleTypeCombo',
            store: capsuleType,
            queryMode: 'local',
            name:'type',
            displayField: 'name',
            valueField: 'value',
            renderTo: Ext.getBody()
        });

        return combo;
    },
    onComboboxSelect: function(combo, records, eOpts) {

    },
/*    createSearchPanel:function(){
        var panel = Ext.create('Ext.panel.Panel', {
            renderTo: Ext.getBody(),
            animCollapse: true,
            collapsible: true,
            title: 'جستجو',
            width: 600,

            bodyPadding: 5,
            layout: 'anchor',

            items: [{
                xtype: 'combo',
                store: MyDesktop.app.util.GlobalVariables.gCapsuleStore,
                displayField: ' ',
                typeAhead: false,
                hideLabel: true,
                hideTrigger:true,
                submitValue: false,
                queryMode:'remote',
                anchor: '50%',

                listConfig: {
                    loadingText: 'در حال جستجو ....',
                    emptyText: 'موردی یافت نشد.',

                    // Custom rendering template for each item
                    getInnerTpl: function() {
                        return '<a class="search-item" >' +
                            '<h3><span>{id}</span>{model}</h3>' +
                            '{post.name}' +
                            '</a>';
                    }
                },
                pageSize: 10,
                listeners: {
                    select: {
                        fn: this.onComboboxSelect,
                        scope: this
                    }
                }
            }, {
                xtype: 'component',
                style: 'margin-top:10px',
                html: 'نام مورد جستجو را وارد کنید'
            }]
        } );
        return panel; },*/
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldset',
                    title: 'مشخصات کلی تجهیز',
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
                                    fieldLabel:'شماره تجهیز',
                                    name: 'eqNumber'

                                },
                                {
                                    xtype: 'textfield',
                                    anchor: '50%',
                                    fieldLabel:'شماره پیمان',
                                    name: 'shomarePeyman'
                                },
                                {
                                    xtype: 'textareafield',
                                    anchor: '50%',
                                    fieldLabel:'آدرس',
                                    name: 'address'
                                },
                                {
                                    xtype: 'textfield',
                                    anchor: '50%',
                                    fieldLabel:'اجرا کننده',
                                    name: 'executer'
                                },
                                {
                                    xtype: 'textfield',
                                    anchor: '50%',
                                    fieldLabel:'طول جغرافیایی',
                                    name: 'longtitute'
                                },
                                {
                                    xtype: 'textfield',
                                    anchor: '50%',
                                    fieldLabel:'عرض جغرافیایی',
                                    name: 'latitute'
                                },
                                {
                                    xtype: 'textfield',
                                    anchor: '50%',
                                    fieldLabel:'ارتفاع',
                                    name: 'height'
                                },
                                {
                                    anchor: '50%',
                                    fieldLabel:'جمع آوری شده',
                                    name: 'gathered',
                                    boxLabel: '',
                                    xtype: 'checkboxfield',
                                    checked   : false,
                                    value: 1,
                                    inputValue: 'YES',
                                    uncheckedValue: 'NO'
                                },
                                {
                                    xtype: 'textareafield',
                                    anchor: '50%',
                                    fieldLabel:'نکات جمع آوری',
                                    name: 'gatheringNotes'
                                },
                                {
                                    xtype: 'datefield',
                                    anchor: '50%',
                                    plugins: ['jalalidate'],
                                    format:'d/m/Y',
                                    fieldLabel:'تاریخ بهره برداری',
                                    name: 'lunchTime'
                                },
                                {
                                    xtype: 'datefield',
                                    anchor: '50%',
                                    plugins: ['jalalidate'],
                                    format:'d/m/Y',
                                    fieldLabel:'تاریخ جمع آوری',
                                    name: 'gatheringDate'
                                },
                                {
                                    xtype: 'textfield',
                                    anchor: '50%',
                                    fieldLabel:'قفل',
                                    name: 'locked'
                                },
                                {
                                    xtype:'combobox',
                                    fieldLabel:'ساختار جریان',
                                    id: 'equipFlowCombo',
                                    emptyText: 'ساختار جریان',
                                    name:'flows',
                                    anchor:'50%',
                                    multiSelect: true,
                                    store:Ext.create('MyDesktop.app.store.FlowStructureStore',{}),
                                    displayField: 'name'
                                },
                                {
                                    xtype:'combobox',
                                    fieldLabel:'ساختار کشوری',
                                    id: 'equipCSCombo',
                                    emptyText: 'ساختار کشوری',
                                    name:'countryStructure',
                                    anchor:'50%',
                                    store:Ext.create('MyDesktop.app.store.CountryStructureStore',{}),
                                    displayField: 'name'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'مشخصات کلی تجهیز',
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
                                            name:'model',
                                            fieldLabel: 'مدل کپسول'
                                        },
                                        {
                                            xtype: 'textfield',
                                            anchor: '50%',
                                            name:'serialNumber',
                                            fieldLabel: 'شماره سریال'
                                        },
                                        this.capsuleTypeCombo(),
                                        {
                                            xtype: 'textfield',
                                            anchor: '50%',
                                            fieldLabel: 'ظرفیت',
                                            name: 'capacity'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            anchor: '50%',
                                            fieldLabel: 'رزرو',
                                            name: 'reserve',
                                            checked   : false,
                                            value: 1,
                                            inputValue: 'YES',
                                            uncheckedValue: 'NO'
                                        },
                                        {
                                            xtype: 'datefield',
                                            anchor: '50%',
                                            plugins: ['jalalidate'],
                                            format:'d/m/Y',
                                            fieldLabel: 'تاریخ اسقاط',
                                            name: 'droppingDate'
                                        },
                                        ,
                                        {
                                            xtype:'combobox',
                                            fieldLabel:'مکان کپسول',
                                            id: 'capsuleLocationCombo',
                                            emptyText: 'مکان کپسول',
                                            name:'locations',
                                            anchor:'50%',
                                            multiSelect: true,
                                            store:Ext.create('MyDesktop.app.store.CapsuleLocationStore',{}),
                                            displayField: 'buildingName'

                                        }
                                    ]

                                }
                            ]
                        }


                    ]
                },
                {
                    xtype:'combobox',
                    fieldLabel:'موقعیت کپسول ها',
                    id: 'capsuleCapsuleLocationCombo',
                    emptyText: 'موقعیت کپسول ها',
                    name:'capsuleLocation',
                    anchor:'50%',
                    multiSelect: true,
                    store:Ext.create('MyDesktop.app.store.CapsuleLocationStore',{}),
                    displayField: 'name'
                },

                {
                    xtype: 'button',
                    text: 'ثبت',
                    handler: function(button, event) {
                        var record = Ext.create('MyDesktop.app.model.CapsuleModel'),
                            values = me.getValues(),
                            store = MyDesktop.app.util.GlobalVariables.gCapsuleStore;

                        var combo = Ext.getCmp('capsuleCapsuleLocationCombo');

                        var v = combo.getValue();
                        record.set(values);
                        var capsuleLocation = [];
                        for (var i=0; i< v.length;i++){
                            var rec = combo.findRecord(combo.valueField || combo.displayField, v[i]);
                            capsuleLocation.add(rec.data);
                        };

                        for (var i = 0; i < capsuleLocation.data.items.length; i++) {
                            capsuleLocation.data.items[i].setDirty();
                        };
                        record.setDirty();
                        record.set('capsuleLocation',capsuleLocation);

                        console.log(record);
                        store.add(record);
                        store.sync();
                    }
                }
            ],
            tbar:[

            ]
        });

        me.callParent(arguments);
    }

});