Ext.define('MyDesktop.app.view.post.PostForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.postForm',
    requires:['MyDesktop.app.store.Posts'],
    autoScroll: true,
    height: 182,
    rtl: true,
    closable:true,
    width: 400,
    bodyPadding: 10,
    title: 'فرم سمت سازمانی',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldset',
                    title: 'سمت سازمانی',
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
                            name:'name',
                            fieldLabel: 'نام سمت'
                        },
                        {
                            xtype: 'combobox',
                            id:'parentCombo',
                            anchor: '50%',
                            fieldLabel: 'سمت مسئول',
	                        name:'parent',
	                        store:Ext.create('MyDesktop.app.store.Posts',{}),
	                        displayField: 'name'
                        },
                        {
                            anchor: '50%',
                            name:'hseunderControl',
                            fieldLabel: 'تحت اختیار HSE',
                            boxLabel: '',
                            xtype: 'checkboxfield',
	                        checked   : false,
	                        value: 1,
	                        inputValue: 'YES',
	                        uncheckedValue: 'NO'
                        }
                    ]
                },
                {
                    xtype: 'button',
                    text: 'ایجاد پست',
                    id:'createPost',
                    handler: function(button, event) {
                        var record = Ext.create('MyDesktop.app.model.Post'),
                            values = me.getValues(),
                            store = MyDesktop.app.util.GlobalVariables.gPostStore,
                            parent = Ext.create('MyDesktop.app.model.Post');
                        var combo = Ext.getCmp('parentCombo');
                        var v = combo.getValue();
                        record.set(values);
                      if(v == null){
                          record.set('parent',{});
                      } else{
                          var rec = combo.findRecord(combo.valueField || combo.displayField, v);
                          parent.set('id',rec.get('id'));

                          parent.set('hseunderControl',rec.get('hseunderControl'));
                          parent.set('name',rec.get('name'));
                          parent.set('parent',null);
                          record.set('parent',parent.data);
                      }
                        record.set('id',null);
                        console.log(record);

                       /* record.set('name',Ext.JSON.encode(record.data));*/
                        store.add(record);
                        store.sync();
                    }
                },
                {
                    xtype: 'button',
                    text: 'پاک کردن فیلدها',
                    id:'reset'
                }
            ]
        });
        me.callParent(arguments);
    }
});