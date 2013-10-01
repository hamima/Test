/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.App', {
    extend: 'Ext.ux.desktop.App',
    rtl:true,
    requires: [
        'Ext.window.MessageBox',

        'Ext.ux.desktop.ShortcutModel',
        /*'MyDesktop.SystemStatus',
        'MyDesktop.VideoWindow',*/
        'MyDesktop.GridWindow',
     /*   'MyDesktop.app.view.HSEPortal',
        'MyDesktop.TabWindow',
        'MyDesktop.AccordionWindow',
        'MyDesktop.Notepad',
        'MyDesktop.BogusMenuModule',
        'MyDesktop.BogusModule',*/

//        'MyDesktop.Blockalanche',
        'MyDesktop.app.store.PersonalInfoStore',
        'MyDesktop.Settings'
    ],

    init: function() {
        // custom logic before getXYZ methods get called...
      /*  Ext.data.writer.Json.override({
            *//*
             * This function overrides the default implementation of json writer. Any hasMany relationships will be submitted
             * as nested objects. When preparing the data, only children which have been newly created, modified or marked for
             * deletion will be added. To do this, a depth first bottom -> up recursive technique was used.
             *//*
            getRecordData: function(record) {
                //Setup variables
                var me = this, i, association, childStore, data = {};
                if(record.proxy.writer.writeAllFields){
                    data = record.data;
                }
                else {
                    var changes, name,  field, fields = record.fields, nameProperty = this.nameProperty, key,keys;
                    changes = record.getChanges();
                    for (key in changes) {
                        if (changes.hasOwnProperty(key)) {
                            field = fields.get(key);
                            name = field[nameProperty] || field.name;
                            if(changes[key] === 'false'){
                                data[name] = 'NO';
                            }else if(changes[key] === 'false'){
                                data[name] = 'YES';
                            }else{
                                data[name] = changes[key];
                            }
                        }
                    }
                    if (!record.phantom) {
                        // always include the id for non phantoms
//            	                data[record.idProperty] = record.getId();
                    }
                }


                //Iterate over all the hasMany associations
                for (i = 0; i < record.associations.length; i++) {
                    association = record.associations.get(i);
                    if (association.type == 'hasMany')  {
                        data[association.name] = [];
                        childStore = record[association.storeName];


                        //Iterate over all the children in the current association
                        childStore.each(function(childRecord) {


                            //Recursively get the record data for children (depth first)
                            var childData = this.getRecordData.call(this, childRecord);


                            *//*
                             * If the child was marked dirty or phantom it must be added. If there was data returned that was neither
                             * dirty or phantom, this means that the depth first recursion has detected that it has a child which is
                             * either dirty or phantom. For this child to be put into the prepared data, it's parents must be in place whether
                             * they were modified or not.
                             *//*
                            if (childRecord.dirty | childRecord.phantom | (childData != null)){
                                data[association.name].push(childData);
                                record.setDirty();
                            }
                        }, me);


                        *//*
                         * Iterate over all the removed records and add them to the preparedData. Set a flag on them to show that
                         * they are to be deleted
                         *//*
                        Ext.each(childStore.removed, function(removedChildRecord) {
                            //Set a flag here to identify removed records
                            removedChildRecord.set('forDeletion', true);
                            var removedChildData = this.getRecordData.call(this, removedChildRecord);
                            data[association.name].push(removedChildData);
                            record.setDirty();
                        }, me);
                    } else {
                        if(record.get(association.name) == null){

                        }else{
                            data[association.name]= record.get(association.name);
                        }

                    }


                }


                //Only return data if it was dirty, new or marked for deletion.
                if (record.dirty | record.phantom | record.get('forDeletion')){
                    return data;
                }
                return null;
            }
        });*/

        this.callParent();

        // now ready...
    },

    getModules : function(){
        return [
           /* new MyDesktop.VideoWindow(),
            new MyDesktop.app.view.HSEPortal(),
            new MyDesktop.SystemStatus(),*/
            new MyDesktop.GridWindow()
//            new MyDesktop.TabWindow(),
//            new MyDesktop.AccordionWindow(),
//            new MyDesktop.Notepad(),
//            new MyDesktop.BogusMenuModule(),
//            new MyDesktop.BogusModule()
        ];
    },

    getDesktopConfig: function () {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            //cls: 'ux-desktop-black',

            contextMenuItems: [
                { text: 'تغییر پیش فرض ها ی سیستم', handler: me.onSettings, scope: me }
            ],

            shortcuts: Ext.create('Ext.data.Store', {
                model: 'Ext.ux.desktop.ShortcutModel',
                data: [
                    { name: 'پرتال HSE', iconCls: 'grid-shortcut', module: 'grid-win' }
                    /*{ name: 'Accordion Window', iconCls: 'accordion-shortcut', module: 'acc-win' },
                    { name: 'Notepad', iconCls: 'notepad-shortcut', module: 'notepad' },
                    { name: 'System Status', iconCls: 'cpu-shortcut', module: 'systemstatus'}*/
                ]
            }),

            wallpaper: 'wallpapers/Wood-Sencha.jpg',
            wallpaperStretch: false
        });
    },

    // config for the start menu
    getStartConfig : function() {
        var me = this, ret = me.callParent();
        var title = '';
        if(MyDesktop.app.util.GlobalVariables.loggedInUser != null){
            title = MyDesktop.app.util.GlobalVariables.loggedInUser.firstName +' ' +MyDesktop.app.util.GlobalVariables.loggedInUser.lastName;
        }else{
            title = 'میهمان';
        }

        return Ext.apply(ret, {
            title: title,
            iconCls: 'user',
            height: 300,
            toolConfig: {
                width: 100,
                items: [
                    {
                        text:'تنظیمات',
                        iconCls:'settings',
                        handler: me.onSettings,
                        scope: me
                    },
                    '-',
                    {
                        text:'خروج',
                        iconCls:'logout',
                        handler: me.onLogout,
                        scope: me
                    }
                ]
            }
        });
    },

    getTaskbarConfig: function () {
        var ret = this.callParent();

        return Ext.apply(ret, {
            quickStart: [
//                { name: 'Accordion Window', iconCls: 'accordion', module: 'acc-win' },
                { name: 'پرتال HSE', iconCls: 'icon-grid', module: 'grid-win' }
            ],
            trayItems: [
                { xtype: 'trayclock', flex: 1 }
            ]
        });
    },

    onLogout: function () {
        Ext.Msg.confirm('خروج از سیستم', 'آیا مابل به خروج از سیستم هستید؟', function(btn){
               if(btn == 'yes'){
                   MyDesktop.app.util.GlobalVariables.loggedInUser = null;
                   window.location = "desktop.html";
               }
        });
    },

    onSettings: function () {
        var dlg = new MyDesktop.Settings({
            desktop: this.desktop
        });
        dlg.show();
    }
});
