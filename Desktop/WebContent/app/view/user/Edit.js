Ext.define('HSE.view.user.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.useredit',

    requires: ['Ext.form.Panel','Ext.form.field.Text','HSE.store.Organs','HSE.store.Posts'],

    title : 'Edit User',
    layout: 'fit',
    autoShow: true,
    width: 280,
    
    iconCls: 'icon-user',

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                padding: '5 5 0 5',
                border: false,
                style: 'background-color: #fff;',
                
                fieldDefaults: {
                    anchor: '100%',
                    labelAlign: 'left',
                    allowBlank: false,
                    combineErrors: true,
                    msgTarget: 'side'
                },

                items: [
					{
					    xtype: 'textfield',
					    name : 'id',
					    fieldLabel: 'id',
					    hidden:true
					},    
                    {
                        xtype: 'textfield',
                        name : 'firstName',
                        fieldLabel: 'First Name'
                    },{
                        xtype: 'textfield',
	                    name : 'lastName',
	                    fieldLabel: 'Last Name'
	                    },
                    {
                        xtype: 'textfield',
                        name : 'email',
                        fieldLabel: 'Email'
                    },
                    {
                        xtype: 'textfield',
                        name : 'telephone',
                        fieldLabel: 'Telephone'
                    },
                    {
                        xtype: 'textfield',
                        name : 'nationalCode',
                        fieldLabel: 'National Code'
                    },
                    {
                        xtype: 'textfield',
                        name : 'personelCode',
                        fieldLabel: 'Personel Code'
                    },
                    {
                        xtype: 'textfield',
                        name : 'userName',
                        fieldLabel: 'UserName'
                    },
                    {
                        xtype: 'checkboxfield',
                        name : 'passMustBeChange',
                        fieldLabel: 'Pass Must Be Change',
                        checked   : true,
                        value: 1,
                        inputValue: 'YES',
                        uncheckedValue: 'NO'
                    },
                    {
                        xtype: 'checkboxfield',
                        name : 'blocked',
                        fieldLabel: 'Blocked',
                        checked   : false,
                        value: 1,
                        inputValue: 'YES',
                        uncheckedValue: 'NO'
                    },{
                        xtype:'combobox',
	                    fieldLabel:'Post',
	                    id: 'userPostCombo',
	                    name:'post',
	                    rtl:true,
	                    emptyText: 'پست سازمانی',
	                    store:'HSE.store.Posts',
	                    displayField: 'name'
                    },{
                        xtype:'combobox',
	                    fieldLabel:'Organ Structure',
	                    id: 'userOrganCombo',
	                    emptyText: 'Organs',
	                    name:'workingAt',
	                    store:'HSE.store.Organs',
	                    displayField: 'name'

                    }
                ]
            }
        ];
        
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            id:'buttons',
            ui: 'footer',
            items: ['->', {
                iconCls: 'icon-save',
                itemId: 'save',
                text: 'Save',
                action: 'save'
            },{
                iconCls: 'icon-reset',
                text: 'Cancel',
                scope: this,
                handler: this.close
            }]
        }];

        this.callParent(arguments);
    }
});
