/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 8/11/13
 * Time: 2:46 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyDesktop.app.view.organ.Option2', {
    extend: 'Ext.window.Window',
    requires: ['Ext.form.Panel','MyDesktop.app.util.GlobalVariables'],
    height: 250,
    width: 400,
    title: 'رویه های کلان',
    modal: true,
    rtl:true,
    layout: 'fit',
    autoShow: true,
    autoScroll:true,
    organ:null,
    initComponent: function() {
        var me = this;
        this.items = [
            {
                xtype: 'form',
                id:'myform',
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

                items: [                {
                    xtype: 'fieldset',
                    collapsible: true,
                    title: 'پیش فرض ها',
                    items: [
                        {
                            xtype: 'fieldset',
                            collapsible: true,
                            title: 'پیش فرض ها',
                            items: [
                                {
                                    xtype: 'fieldset',
                                    title: 'پیش فرض های شناسنامه',
                                    items: [ this.alamakCombo()
//
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    title: 'پیش فرض های نمایش و ارجاع عملیات ها',
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
                        }
                    ]
                }]
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