/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 8/11/13
 * Time: 10:33 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyDesktop.app.view.organ.OrganMiniList', {
    extend: 'Ext.window.Window',
    requires: ['Ext.grid.Panel','MyDesktop.app.util.GlobalVariables'],
    height: 250,
    width: 400,
    title: 'لیست ادارات تحت عملکرد',
    modal: true,
    rtl:true,
    layout: 'fit',
    autoShow: true,
    organ:null,
    initComponent: function() {
        var me = this;
        this.items = [

            {
                xtype: 'gridpanel',
                header: false,
                id:'organGrid',
                /*store:'MyDesktop.app.store.Organs',*/
                columns: [
                    {
                        xtype: 'rownumberer',
                        locked:true
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'name',
                        text: 'String'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'stateName',
                        text: 'String'
                    }

                ]
                ,
                selModel: Ext.create('Ext.selection.CheckboxModel', {
                    listeners: {
                        select: {
                            fn: me.onCheckboxModelSelect,
                            scope: me
                        },
                        deselect: {
                            fn: me.onCheckboxModelDeselect,
                            scope: me
                        }
                    }
                })
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
                text: 'ثبت',
                handler:this.setOrgan
            },{
                iconCls: 'icon-reset',
                text: 'بستن پنجره',
                scope: this,
                handler: this.close
            }]
        }];
        me.callParent(arguments);
    },
    setOrgan:function(){
        /* MyDesktop.app.util.GlobalVariables.organStore = Ext.create('MyDesktop.app.model.OrganModel');*/
        MyDesktop.app.util.GlobalVariables.organStore = this.down('#myform').getValues();
    }

});