/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.GridWindow', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.data.ArrayStore',
        'Ext.data.TreeStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.panel.Panel',
        'Ext.grid.RowNumberer',
        'Ext.tree.Panel',
        'Ext.ux.form.ItemSelector',
        'Ext.ux.TabCloseMenu',
        'Ext.ux.Jalali',
        'Ext.ux.JalaliDate',
        'Ext.ux.JalaliDatePlugin',
        'Ext.ux.JalaliDatePlugin-fa_IR',
        'Ext.ux.grid.FiltersFeature',
        'MyDesktop.app.util.GlobalVariables',
        'MyDesktop.app.view.organ.OrganForm',
        'MyDesktop.app.view.organ.OrganEdit',
        'MyDesktop.app.view.organ.OrganList',
        'MyDesktop.app.view.user.UserForm',
        'MyDesktop.app.view.user.UserEdit',
        'MyDesktop.app.view.user.UserList',
        'MyDesktop.app.view.protectGoodsPost.ProtectGoodsPostForm',
        'MyDesktop.app.view.personalInfo.PersonalInfoForm',
        'MyDesktop.app.view.personalInfo.PersonalInfoEdit',
        'MyDesktop.app.view.personalInfo.PersonalInfoList',
        'MyDesktop.app.view.hsePass.HSEPassForm',
        'MyDesktop.app.view.hsePass.HSEPassEdit',
        'MyDesktop.app.view.hsePass.HSEPassList',
        'MyDesktop.app.view.post.PostForm',
        'MyDesktop.app.view.post.PostEdit',
        'MyDesktop.app.view.post.PostList',
        'MyDesktop.app.view.flow.FlowSList',
        'MyDesktop.app.view.flow.FlowSForm',
        'MyDesktop.app.view.flow.FlowSEdit',
        'MyDesktop.app.view.countryStructure.CountrySList',
        'MyDesktop.app.view.countryStructure.CountrySForm',
        'MyDesktop.app.view.countryStructure.CountrySEdit',
        'MyDesktop.app.view.capsule.CapsuleForm',
        'MyDesktop.app.view.capsule.CapsuleEdit',
        'MyDesktop.app.view.capsule.CapsuleCreateForm',
        'MyDesktop.app.view.capsule.CapsuleList',
        'MyDesktop.app.view.equipmentType.EquipmentTypeForm',
        'MyDesktop.app.view.equipmentType.EquipTypeEdit',
        'MyDesktop.app.view.equipmentType.EquipmentTypeList',
        'MyDesktop.app.view.capsuleLocation.CapsuleLocationForm',
        'MyDesktop.app.view.capsuleLocation.CapsuleLocationEdit',
        'MyDesktop.app.view.consumingGoodsGroup.ConsumingGoodsGroupForm',
        'MyDesktop.app.view.consumingGoodsGroup.ConsumingGoodsGroupList',
        'MyDesktop.app.view.consumingGood.ConsumingGoodForm',
        'MyDesktop.app.view.consumingGood.ConsumingGoodList',
        'MyDesktop.app.view.warehouse.WarehouseForm',
        'MyDesktop.app.view.warehouse.WarehouseList',
        'Ext.tab.Panel'
    ],

    id:'grid-win',

    init : function(){
        this.launcher = {
            text: 'HSE پرتال',
            iconCls:'icon-grid'
        };
    },
    createTree : function(){
        var tree = Ext.create('Ext.tree.Panel', {
            id:'im-tree',
            title: 'پیش فرض ها',
            rootVisible:false,
            rtl:true,
            lines:false,
            autoScroll:true,

            listeners: {
            selectionchange: {
                fn: this.onNavSelectionChange,
                    scope: this
            }
            }
            ,
            store: Ext.create('Ext.data.TreeStore', {
                root: {
                    text:'پیش فرض ها',
                    expanded: true,
                    children:[{
                        text:'پیش فرض های کلی',
                    leaf:true
                    },{
                        text:'پیش فرض گروه های داده',
                    leaf:true
                    }]
                }
            })
        });

        return tree;
    },
        onNavSelectionChange: function(selModel, records) {
            var record = records[0],
                text = record.get('text'),
                xtype = record.get('id'),
                alias = 'widget.' + xtype,
                contentPanel = Ext.getCmp('main-window'),
                cmp;

            if (xtype) { // only leaf nodes have ids
                contentPanel.removeAll(true);

                var className = Ext.ClassManager.getNameByAlias(alias);
                var ViewClass = Ext.ClassManager.get(className);
                var clsProto = ViewClass.prototype;
               /* if (clsProto.themes) {
                    clsProto.themeInfo = clsProto.themes[themeName];
                    if (themeName === 'gray' || themeName === 'access') {
                        clsProto.themeInfo = Ext.applyIf(clsProto.themeInfo || {}, clsProto.themes.classic);
                    }
                }
*/
                cmp = new ViewClass();
                contentPanel.add(cmp);
                cmp.show();
                /*if (cmp.floating) {
                    cmp.show();
                } else {
                    this.centerContent();
                }*/

                contentPanel.setTitle(text);

                /*document.title = document.title.split(' - ')[0] + ' - ' + text;
                location.hash = xtype;*/

                /*this.updateDescription(clsProto);

                if (clsProto.exampleCode) {
                    this.updateCodePreview(clsProto.exampleCode);
                } else {
                    this.updateCodePreviewAsync(clsProto, xtype);
                }*/
            }
        },
    createTree1 : function(){
        var tree = Ext.create('Ext.tree.Panel', {
            id:'im-tree1',
            title: 'داده های اولیه ',
            rootVisible:false,
            lines:false,
            autoScroll:true,
            /*tools:[{
                type: 'refresh',
                handler: function(c, t) {
                    tree.setLoading(true, tree.body);
                    var root = tree.getRootNode();
                    root.collapseChildren(true, false);
                    Ext.Function.defer(function() { // mimic a server call
                        tree.setLoading(false);
                        root.expand(true, true);
                    }, 1000);
                }
            }],*/
            listeners: {
                selectionchange: {
                    fn: this.onNavSelectionChange,
                    scope: this
             }
            },
            store: Ext.create('Ext.data.TreeStore', {
                root: {
                    text:'داده های اولیه',
                    expanded: true ,
                    children:[
                        {text:'معرفی ساختار اداری',expanded:false, children:[{id: 'organEdit',text:'ساخت ساختار اداری',leaf:true},{id:'organList',text:'لیست ساختارهای اداری',leaf:true}]},
                        {text:'معرفی ساختار کشوری',expanded:false, children:[{id: 'countryEdit',text:'ساخت ساختار کشوری',leaf:true},{id:'countryList',text:'لیست ساختار کشوری',leaf:true}]},
                        {text:'معرفی ساختار  جریان',expanded:false, children:[{id: 'flowEdit',text:'ساخت ساختار جریان',leaf:true},{id:'flowList',text:'لیست ساختارهای جریان',leaf:true}]},
                        {text:'معرفی پست سازمانی',expanded:false, children:[{id: 'postEdit',text:'ساخت سمت سازمانی',leaf:true},{id:'postList',text:'لیست سمت های سازمانی',leaf:true}] },
                        {text:'فهرست اطلاعات فردی',expanded:false, children:[{id: 'personalInfoEdit',text:'ساخت شخص حقیقی',leaf:true},{id:'personalInfoList',text:'لیست اطلاعات فردی',leaf:true}]},
                        {text:'معرفی کاربران',expanded:false, children:[{id: 'userEdit',text:'ساخت کاربر',leaf:true},{id:'userList',text:'لیست کاربران',leaf:true}]},
                        {id:'protectGoodsPostForm',text:'قیمت پایه صورت مقادیر کار',leaf:true},
                        {id:'consumingGoodsGroupForm', text:'لیست گروه های اجناسسن',leaf:true},
                        {id:'consumingGoodForm', text:'فرم کالا',leaf:true},
                        {id:'consumingGoodList', text:'لیست کالاها',leaf:true},
                       /* {id:'warehouseForm', text:'فرم انبار',leaf:true},
                        {id:'warehouseList', text:'لیست انبار',leaf:true},*/
                        {text:'معرفی محل اعتبار',leaf:true },
                        {text:'معرفی ردیف هزینه',leaf:true },
                        {text:'معرفی اقلام مصرف',leaf:true}]
                }
            })
        });

        return tree;
    }
    ,shenasnameTree : function(){
        //noinspection JSValidateTypes
        var tree;
        tree = Ext.create('Ext.tree.Panel', {
            id: 'shenasnameTree',
            title: 'شناسنامه تجهیزات',
            rootVisible: false,
            lines: false,
            autoScroll: true,
            /*tools:[{
             type: 'refresh',
             handler: function(c, t) {
             tree.setLoading(true, tree.body);
             var root = tree.getRootNode();
             root.collapseChildren(true, false);
             Ext.Function.defer(function() { // mimic a server call
             tree.setLoading(false);
             root.expand(true, true);
             }, 1000);
             }
             }],*/
            listeners: {
                selectionchange: {
                    fn: this.onNavSelectionChange,
                    scope: this
                }
            },
            store: Ext.create('Ext.data.TreeStore', {
                root: {
                    text: 'شناسنامه تجهیزات',
                    expanded: true,
                    children: [
                        {text: 'کپسول', expanded: false, children: [
                            {id: 'capsuleCreateForm', text: 'ساخت کپسول', leaf: true},
                            {id: 'capsuleList', text: 'لیست کپسول ها', leaf: true}
                        ]},
                        {text: 'تیپ کپسول', expanded: false, children: [
                            {id: 'equipTypeForm', text: 'ساخت تیپ', leaf: true},
                            {id: 'equipTypeList', text: 'لیست تیپ ها', leaf: true}
                        ]},
                        {text: 'موقعیت کپسول', expanded: false, children: [
                            {id: 'capsuleLocationForm', text: 'موقعیت کپسول ', leaf: true},
                            {id: 'capsuleLocationList', text: 'لیست موقعیت ها', leaf: true}
                        ]}
                    ]
                }
            })
        });

        return tree;
    }
    ,
    createTree2 : function(){
        var tree;
        tree = Ext.create('Ext.tree.Panel', {
            id: 'im-tree2',
            title: 'حفاظت فردی',
            rootVisible: false,
            lines: false,
            autoScroll: true,
            listeners: {
                selectionchange: {
                    fn: this.onNavSelectionChange,
                    scope: this
                }
            },
            /*           tools:[{
             type: 'refresh',
             handler: function(c, t) {
             tree.setLoading(true, tree.body);
             var root = tree.getRootNode();
             root.collapseChildren(true, false);
             Ext.Function.defer(function() { // mimic a server call
             tree.setLoading(false);
             root.expand(true, true);
             }, 1000);
             }
             }],*/
            store: Ext.create('Ext.data.TreeStore', {
                root: {
                    text: 'پیش فرض ها',
                    expanded: true,
                    children: [
                        {
                            text: 'شناسنامه اقلام حفاظت فردی',
                            expanded: true
                        },
                        { text: 'شناسنامه HSE کارمندان',
                            expanded: false, children: [
                            {id: 'hsePassForm', text: 'ساخت شناسنامه HSE کارمندان', leaf: true},
                            {id: 'hsePassList', text: 'لیست شناسنامه HSE کارمندان', leaf: true}
                        ]
                        },
                        {
                            text: 'برنامه ی تحویل آتی',
                            expanded: true
                        },
                        {
                            text: 'آمار تحویل آتی',
                            expanded: true
                        }
                    ]
                }
            })
        });

        return tree;
    },
    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('grid-win');
        if(!win){
            win = desktop.createWindow({
                id: 'grid-win',
                title:'پرتال HSE',
                width:1000,
                height:600,
                iconCls: 'icon-grid',
                animCollapse:false,
                constrainHeader:true,
                layout: 'border',

                items: [
                   /* {
                        border: false,
	                    region: 'north',
                        xtype: 'panel',
                        split: true,
                        animCollapse: true,
                        collapseDirection: 'up',
                        collapsible: true,
                        height:100,
	                    layout : 'fit',
                        html:'<img src="resources/images/LogoGaz.jpg" align="right" width="1400" style="max-height:100%; max-width:100%;" />'
                    }, */
                    //this.createtabs()
                    {
                    	xtype:'tabpanel',
                    	id:'main-window',
	                    region: 'center',
                        header: false,

	                    height:428,
	                    rtl:true,
	                    activeTab:0,
	                    bodyStyle: 'padding: 5px;',
	
	                    items: [{xtype:'panel', title:'صحفه اصلی', html:'به نرم افزار  HSE خوش آمدید'}
	                        ],
                        plugins: Ext.create('Ext.ux.TabCloseMenu', {
                            extraItemsTail: [
                                '-',
                                {
                                    text: 'Closable',
                                    checked: true,
                                    hideOnClick: true,
                                    handler: function (item) {
                                        currentItem.tab.setClosable(item.checked);
                                    }
                                },
                                '-',
                                {
                                    text: 'Enabled',
                                    checked: true,
                                    hideOnClick: true,
                                    handler: function(item) {
                                        currentItem.tab.setDisabled(!item.checked);
                                    }
                                }
                            ],
                            listeners: {
                                beforemenu: function (menu, item) {
                                    var enabled = menu.child('[text="Enabled"]');
                                    menu.child('[text="Closable"]').setChecked(item.closable);
                                    if (item.tab.active) {
                                        enabled.disable();
                                    } else {
                                        enabled.enable();
                                        enabled.setChecked(!item.tab.isDisabled());
                                    }

                                    currentItem = item;
                                }
                            }
                        })
                    }
                    ,{
                    	xtype:'panel',
	                    region: 'east',
	                    height: 428,
	                    width:200,
	                    rtl:true,
	                    split: true,
	                    animCollapse: true,
	                    collapseDirection: 'right',
	                    collapsible: true,
	                	title:'منو',
	                    layout:{
	                        type: 'accordion',
	                        animate: true
	                    },
	                    items: [this.createTree() ,this.createTree1(),{
	                        title:'تنظیمات اولیه',
	                        border: false,
	                        autoScroll: true,
	                        iconCls: 'settings'
	                    },{
	                        title:'تنظیمات کلاینت و کاربر',
	                        border: false,
	                        autoScroll: true,
	                        iconCls: 'settings'
	                    },this.shenasnameTree({
                            iconCls: 'settings'
                        }),{
	                        title:'شناسنامه تجهیزات',
	                        border: false,
	                        autoScroll: true,
	                        iconCls: 'settings'
	                    },{
	                        title:'عملیات',
	                        border: false,
	                        autoScroll: true,
	                        iconCls: 'settings'
	                    },{
	                        title:'گزارشات ارقامی',
                        //html: content,
	                        border: false,
	                        autoScroll: true,
	                        iconCls: 'settings'
	                    },{
	                        title:'ارزیابی',
		                    //html: content,
		                    border: false,
		                    autoScroll: true,
		                    iconCls: 'settings'
	                    },this.createTree2(),{
	                        title:'بهداشت و سلامتی',
		                    //html: content,
		                    border: false,
		                    autoScroll: true,
		                    iconCls: 'settings'
	                    }]
                    }
                ]
            });
        }
        return win;
    }
});

