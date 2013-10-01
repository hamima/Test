Ext.define('MyDesktop.app.view.equipmentType.EquipmentTypeForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.equipTypeForm',
    requires:['MyDesktop.app.store.EquipmentTypeStore'],
    height: 356,
    rtl: true,
    closable:true,
    autoScroll: true,
    width: 400,
    bodyPadding: 10,
    title: 'ساخت تیپ کپسول',
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
            fieldLabel: 'نوع کپسول',
            id: 'capsuleTypeCombo',
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
    equipTypeCombo:function(){
        // The data store containing the list of capsule types
        var capsuleType;
        capsuleType = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data: [
                {"value": "CAPSULE", "name": "کپسول"}
            ]
        });

        // Create the combo box, attached to the states data store
        var combo;
        combo = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'نوع تجهیز',
            id: 'equipTypeCombo',
            store: capsuleType,
            queryMode: 'local',
            name: 'type',
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
                    xtype: 'fieldset',
                    title: 'مشخصات تیپ تجهیزات',
                    items: [
                        {
                            xtype: 'textfield',
                            name:'id',
                            hidden:true,
                            id:'idValue'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '50%',
                            name:'name',
                            fieldLabel: 'نام تیپ',
                            id:'name'
                        },
                        this.equipTypeCombo()
                    ]
                },
                {
                    xtype:'form',
                    id:'capsuleForm',
                    header: false,
                    border: false,
                    items:[
                        {
                            xtype: 'fieldset',
                            animCollapse: true,
                            collapsible: true,
                            title: 'مشخصات کپسول',
                            items: [
                                {
                                    xtype:'fieldcontainer',
                                    layout:{
                                        type:'hbox'
                                    },
                                    items:
                                        [
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
                                            }


                                        ]

                                },
                                {
                                    xtype:'fieldcontainer',
                                    layout:{
                                        type:'hbox'
                                    },
                                    items:
                                        [
                                            this.capsuleTypeCombo(),
                                            {
                                                xtype: 'textfield',
                                                anchor: '50%',
                                                fieldLabel: 'ظرفیت',
                                                name: 'capacity'
                                            }

                                        ]
                                },
                                {
                                    xtype:'fieldcontainer',
                                    layout:{
                                        type:'hbox'
                                    },
                                    items:
                                        [
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
                                            }
                                        ]
                                }

                               /* {
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
                                    fieldLabel:'توضیحات جمع آوری',
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
                                    xtype: 'checkboxfield',
                                    anchor: '50%',
                                    fieldLabel:'قفل شده',
                                    name: 'locked',
                                    checked   : false,
                                    value: 1,
                                    inputValue: 'YES',
                                    uncheckedValue: 'NO'
                                },
                                {
                                    xtype: 'textfield',
                                    anchor: '50%',
                                    name:'id',
                                    hidden:true
                                },*/

                                /*{
                                    xtype:'combobox',
                                    fieldLabel:'?????? ?????',
                                    id: 'equipFlowCombo',
                                    emptyText: '?????? ?????',
                                    name:'flows',
                                    anchor:'50%',
                                    multiSelect: true,
                                    store:Ext.create('MyDesktop.app.store.FlowStructureStore',{}),
                                    displayField: 'name'
                                },
                                {
                                    xtype:'combobox',
                                    fieldLabel:'?????? ?????',
                                    id: 'equipCSCombo',
                                    emptyText: '?????? ?????',
                                    name:'countryStructure',
                                    anchor:'50%',
                                    store:Ext.create('MyDesktop.app.store.CountryStructureStore',{}),
                                    displayField: 'name'
                                },
                                {
                                    xtype:'combobox',
                                    fieldLabel:'???? ?????',
                                    id: 'capsuleLocationCombo',
                                    emptyText: '???? ?????',
                                    name:'locations',
                                    anchor:'50%',
                                    multiSelect: true,
                                    store:Ext.create('MyDesktop.app.store.CapsuleLocationStore',{}),
                                    displayField: 'buildingName'

                                }*/
                            ]

                      }
                    ]
                },
                {
                    xtype: 'button',
                    text: 'ثبت',
                    handler: function() {
                        var record = Ext.create('MyDesktop.app.model.EquipmentTypeModel'),
                            capsuleModel = Ext.create('MyDesktop.app.model.CapsuleModel'),
                            store = MyDesktop.app.util.GlobalVariables.gEquipmentTypeStore;
                        record.set('name',Ext.getCmp('name').value);
                        record.set('type',Ext.getCmp('equipTypeCombo').getValue());
                        /*var locationJSON = new Array();
                        var flowsJSON = new Array();
                        var countryJSON;

                        capsuleModel.setDirty();

                        var flowcombo = Ext.getCmp('equipFlowCombo');
                        var locationcombo = Ext.getCmp('capsuleLocationCombo');
                        var countrycombo = Ext.getCmp('equipCSCombo');
                        var flow = capsuleModel.flows();
                        var v = flowcombo.getValue();
                        var l = locationcombo.getValue();
                        var c = countrycombo.getValue();
                        for (var i=0; i< v.length;i++){
                            var rec = flowcombo.findRecord(flowcombo.valueField || flowcombo.displayField, v[i]);
                            flow.add(rec.data);
                            flowsJSON[i] =  JSON.stringify(rec.data);
                        }
                        for (var i=0; i< flow.data.items.length;i++){
                            flow.data.items[i].setDirty();
                        }

                        var country = countrycombo.findRecord(countrycombo.valueField || countrycombo.displayField, c);
                        countryJSON = JSON.stringify(country.data);
                        var locations = capsuleModel.locations();
                        for (var i=0; i< l.length;i++){
                            var location = locationcombo.findRecord(locationcombo.valueField || locationcombo.displayField, l[i]);
                            locations.add(location.data);
                            locationJSON[i] = JSON.stringify(location.data);
                        }
                        for (var i=0; i< locations.data.items.length;i++){
                            locations.data.items[i].setDirty();
                        }*/
                        var capsuleJSON;
                        var capsuleForm = Ext.getCmp('capsuleForm');
                        capsuleModel.set(capsuleForm.getValues());
                        var valueForm = capsuleForm.getValues();
                        var droppingDate = valueForm.droppingDate;
                        droppingDate = droppingDate.split('/');
                        var dropping = new Date(Ext.Date.JalaliConverter.jalaliToGregorian(droppingDate)).getTime();
                        capsuleModel.set('droppingDate',dropping);
                        var flows = null;
                        var locations = null;
                        var country = null;
                        capsuleModel.set('flows',flows);
                        capsuleModel.set('locations',locations);
                        capsuleModel.set('countryStructure',country);
                        capsuleJSON = JSON.stringify(capsuleModel.data);
                        /* capsuleJSON = capsuleJSON.replace(/\\/g,'');
                        capsuleJSON = capsuleJSON.replace(/\[\"{/g, '[{');
                        capsuleJSON = capsuleJSON.replace(/\}"\]/g, '}]');
                        capsuleJSON = capsuleJSON.replace(/\}",\"{/g, '},{');
                        capsuleJSON = capsuleJSON.replace(/\}",/g, '},');
                        capsuleJSON = capsuleJSON.replace(/\:"{/g, ':{');*/
                       /* capsuleJSON = capsuleJSON.replace(/\\/g,'');
                        capsuleJSON = capsuleJSON.replace(/\[\"{/g, '[{');
                        capsuleJSON = capsuleJSON.replace(/\}"\]/g, '}]');
                        capsuleJSON = capsuleJSON.replace(/\}",\"{/g, '},{');
                        capsuleJSON = capsuleJSON.replace(/\}",/g, '},');
                        capsuleJSON = capsuleJSON.replace(/\:"{/g, ':{');*/
                        record.set('defaults',capsuleJSON);
                        record.setDirty();
                        record.setId(0);
                        store.add(record);
                        store.sync({
                            success: function (proxy, operations) {
                                Ext.getCmp('capsuleForm').getForm().reset();
                                me.getForm().reset()
                            }, failure: function (proxy, operations) {
                                // resume records
                            }
                        });
                    }
                }
            ],
            tbar:[
               /* this.createSearchPanel()*/
            ]
        });

        me.callParent(arguments);
    }

});