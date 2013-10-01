Ext.define('MyDesktop.app.view.personalInfo.PersonalInfoForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.personalInfoForm',
    requires:['MyDesktop.app.store.Posts'],
    height: 356,
    rtl: true,
    closable:true,
    autoScroll: true,
    width: 400,
    bodyPadding: 10,
    title: 'مشخصات فردی',
    onComboboxSelect: function(combo, records, eOpts) {

    },
    createSearchPanel:function(){
        var panel;
        //noinspection JSValidateTypes
        panel = Ext.create('Ext.panel.Panel', {
            renderTo: Ext.getBody(),
            animCollapse: true,
            collapsible: true,
            title: 'جستجو',
            width: 600,

            bodyPadding: 5,
            layout: 'anchor',

            items: [
                {
                    xtype: 'combo',
                    store: MyDesktop.app.util.GlobalVariables.gPersonStore,
                    displayField: 'firstName',
                    typeAhead: false,
                    hideLabel: true,
                    hideTrigger: true,
                    submitValue: false,
                    queryMode: 'remote',
                    anchor: '50%',

                    listConfig: {
                        loadingText: 'در حال جستجو ....',
                        emptyText: 'موردی یافت نشد.',

                        // Custom rendering template for each item
                        getInnerTpl: function () {
                            return '<a class="search-item" >' +
                                '<h3><span>{firstName}</span>{lastName}</h3>' +
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
                },
                {
                    xtype: 'component',
                    style: 'margin-top:10px',
                    html: 'نام مورد جستجو را وارد کنید'
                }
            ]
        });
        return panel},
    initComponent: function() {
        var me = this;

        //noinspection JSValidateTypes
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldset',
                    title: 'مشخصات فردی',
                    autoScroll:true,
                    items: [
                        {
                            xtype: 'textfield',
                            name : 'id',
                            fieldLabel: 'id',
                            hidden:true
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: {
                                align: 'stretch',
                                type: 'table',
                                columns: 3

                            },
                            fieldLabel: '',
                            items:[
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
                                    blankText: 'پر کردن ای فیلد اجباری است'
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

                                    colspan:3,
                                    xtype: 'combobox',
                                    anchor: '50%',
                                    fieldLabel: 'پست سازمانی',
                                    invalidText: 'مقدار وارد شده صحیح نیست',
                                    emptyText: 'پست سازمانی',
                                    id: 'personPostCombo',
                                    name:'post',
                                    store:Ext.create('MyDesktop.app.store.Posts',{}),
                                    displayField: 'name'

                                }

                            ]
                        }
                    ]
                },
                {
                    xtype: 'button',
                    text: 'ثبت',
                    handler: function() {
                        //noinspection JSValidateTypes
                        var record = Ext.create('MyDesktop.app.model.PersonalInfoModel'),
                            values = me.getValues(),
                            store = MyDesktop.app.util.GlobalVariables.gPersonStore;
                        var combo = Ext.getCmp('personPostCombo');
                        record.set(values);
                        var v = combo.getValue();
                        if(v == null){
                            record.set('post',{});
                        } else{
                            var rec = combo.findRecord(combo.valueField || combo.displayField, v);
                            record.set('post',rec.data);
                        }
                        record.setDirty();
                        record.setId(0);
                        store.add(record);
                        store.sync();
                    }
                }
            ],
            tbar:[
                this.createSearchPanel()
            ]
        });

        me.callParent(arguments);
    }

});