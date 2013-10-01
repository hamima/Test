Ext.define('MyDesktop.app.view.consumingGoodsGroup.ConsumingGoodsGroupForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.consumingGoodsGroupForm',
    requires:['MyDesktop.app.store.ConsumingGoodsGroupStore'],
    autoScroll: true,
    height: 400,
    rtl: true,
    closable:true,
    width: 400,
    bodyPadding: 10,
    title: 'گروه اقلام حفاظت',
    rastehCombo:function(){
        // The data store containing the list of states
        var rasteh;
        //noinspection JSValidateTypes
        rasteh = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data: [
                {"value": "PERSONALPROTECTION", "name": "حفاظت فردی"},
                {"value": "TECHNICAL", "name": "فنی"},
                {"value": "OFFICEEQUIPMENT", "name": "تأسیسات"},
                {"value": "MACHINERY", "name": "ماشینی"},
                {"value": "ENVIRONMENTAL", "name": "زیست محیطی"}
            ]
        });

        // Create the combo box, attached to the states data store
        var combo;
        combo = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'رسته',
            store: rasteh,
            anchor: '50%',
            name: 'rasteh',
            queryMode: 'local',
            displayField: 'name',
            valueField: 'value'
        });

        return combo;
    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldset',
                    title: 'گروه قلم مصرفی',
                    items: [
	                    {
						    xtype: 'textfield',
						    name : 'id',
						    fieldLabel: 'id',
						    hidden:true
						},
                        {
                            xtype: 'textfield',
                            anchor: '50%',
                            name:'description',
                            fieldLabel: 'توضیحات گروه قلم مصرفی'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '50%',
                            name:'code',
                            fieldLabel: 'کد'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '50%',
                            name:'metric',
                            fieldLabel: 'معیار سنجش'
                        },
                        {
                            xtype: ''
                        }
                    ]
                },
                {
                    xtype: 'button',
                    text: 'ثبت',
                    id:'createPost',
                    handler: function(button, event) {
                        var record = Ext.create('MyDesktop.app.model.ConsumingGoodsGroupModel'),
                            values = me.getValues(),
                            store = MyDesktop.app.util.GlobalVariables.gConsumingGoodsGroupStore;
                        record.set(values);
                        store.add(record);
                        store.sync();
                    }
                }
            ]
        });

        me.callParent(arguments);
    }

});