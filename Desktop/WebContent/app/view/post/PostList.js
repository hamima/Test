Ext.define('MyDesktop.app.view.post.PostList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.postList',
    requires:['MyDesktop.app.store.Posts'],
    rtl: true,
    closable:true,
    title: 'پست سازمانی',
    yesNoCombo:function(){
        // The data store containing the list of states
        var yesOrno = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"YES", "name":"بله"},
                {"value":"NO", "name":"خیر"}	        //...
            ]
        });

        // Create the combo box, attached to the states data store
        var combo;
        combo = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '',
            store: yesOrno,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'value',
            renderTo: Ext.getBody()
        });

        return combo;
    },
    initComponent: function() {
        var me = this;
        var filters = new Ext.ux.grid.FiltersFeature({
            // encode and local configuration options defined previously for easier reuse
            encode: true, // json encode the filter query
            local: false,   // defaults to false (remote filtering)
            filters: [{
                type: 'string',
                dataIndex: 'name'
            }, {
                type: 'list',
                dataIndex: 'hseunderControl',
                labelField: 'name',
                options: [
                            {id: 'YES', name:'بله'},
                            {id: 'NO', name:'خیر'}
                         ]
            } ]
        });
        Ext.applyIf(me, {
            items:
                [
                    {
                        xtype:'grid',
                        id:'postGridList',
                        columnLines:true,
                        store:MyDesktop.app.util.GlobalVariables.gPostStore,
                        height:600,
                        columns:  [
                            /*{
                                xtype: 'rownumberer',
                                locked: true,
                                editable:false
                                *//*renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                                    var rowspan = this.rowspan;
                                    if (rowspan){
                                        metaData.tdAttr = 'rowspan="' + rowspan + '"';
                                    }

                                    metaData.tdCls = Ext.baseCSSPrefix + 'grid-cell-special';

                                    console.log(store.indexOfTotal(record));
                                    console.log(store.getTotalCount());
                                    console.log(store.data.items.length);
                                    console.log(record);
                                    console.log('**');
                                    return store.indexOfTotal(record) + 1;
                                }*//*
                            },*/
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'name',
                                text: 'نام',
                                editor:{
                                    allowBlank:false,
                                    blankText: 'پر کردن ای فیلد اجباری است',
                                    xtype:'textfield'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                text: 'پست مسئول',
                                width:300,
                                emptyCellText: '---',
                                dataIndex:'parent',
                                renderer: function(value){//1.
                                    var parentName;
                                    var parent = value;
                                    if(parent){
                                        if(parent.name){
                                            parentName = parent.name;

                                        }else{
                                            var combo = Ext.getCmp('postListCombo');
                                            var rec = combo.findRecord(combo.valueField , value);
                                            if(rec){
                                                parentName = rec.data.name;
                                            }else{
                                                parentName = '---';
                                            }
                                        }
                                    }
                                    else{
                                        parentName = '---';
                                    }
                                    return parentName;
                                },
                                editor: {
                                    xtype: 'combobox',
                                    id:'postListCombo',
                                    store:Ext.create('MyDesktop.app.store.Posts'),
                                    displayField: 'name',
                                    valueField:'id',
                                    emptyText: 'پست سازمانی',
                                    pageSize:20
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                renderer:function(value,meta,record){
                                    var ret;
                                    if(record.get('hseunderControl') == 'NO'){
                                        ret = 'خیر';
                                    }else{
                                        ret = 'بله';
                                    }
                                    return ret;
                                },
                                dataIndex: 'hseunderControl',
                                text: 'تحت کنترل HSE',
                                editor:this.yesNoCombo()
                            },
                            {
                                xtype: 'actioncolumn',
                                text: 'تعیین اقلام محافظتی ویژه پست',
                                id: 'addProtectGoodPostId',
                                itemId: 'addProtectGoodPostId',
                                renderer: function (value, metadata, record) {
                                    if (record.get('hseunderControl') == 'YES') {
                                        Ext.getCmp('addProtectGoodPostId').items[0].icon = 'resources/images/icons/fam/delete.gif';
                                    } else {
                                        Ext.getCmp('addProtectGoodPostId').items[0].icon = '';
                                    }
                                },
                                items: [
                                    {
                                //        icon: 'resources/images/icons/fam/delete.gif',
                                        handler: function(grid, rowIndex){
                                            var rec = grid.getStore().getAt(rowIndex);
                                            var currentPost = rec.data;
                                            var protectGoodsPostWindow = Ext.create('MyDesktop.app.view.protectGoodsPost.ProtectGoodsPostWindow',{
                                                post: currentPost
                                            });
                                            var winGrid = Ext.getCmp('protectGoodPostList');
                                            if(rec.data){
                                                winGrid.store.load({
                                                    params: {
                                                        postId: currentPost.id,
                                                        start: 0,
                                                        limit: 20
                                                    }
                                                });
                                            } else {
                                                winGrid.store.load();
                                            }
                                            protectGoodsPostWindow.post = currentPost;
                                            protectGoodsPostWindow.show();
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'actioncolumn',
                                items: [
                                    {
                                        icon: 'resources/images/icons/fam/delete.gif',
                                        tooltip: 'حذف',
                                        scope: this,
                                        handler: function(grid, rowIndex) {
                                            var rec = grid.getStore().getAt(rowIndex);
                                            rec.setDirty();
                                            grid.getStore().remove(rec);
                                            grid.getStore().sync();
                                        }
                                    }
                                ]
                            }
                        ],
                        selModel: Ext.create('Ext.selection.CellModel', {

                        }),
                        features: [filters],
                        plugins: [
                            Ext.create('Ext.grid.plugin.CellEditing', {
                                triggerEvent: 'celldblclick',
                                autoCancel: false
                            })
                        ],
                        dockedItems: [
                            {
                                xtype: 'pagingtoolbar',
                                dock: 'bottom',
                                rtl: true,
                                width: 360,
                                store:MyDesktop.app.util.GlobalVariables.gPostStore,
                                displayInfo: true,
                                emptyMsg: 'داده ای برای نمایش وجود ندارد',
                                firstText: 'صفحه اول',
                                lastText: 'صحفه آخر',
                                nextText: 'صفحه بعدی'
                            }
                        ],
                        tbar:[{
                            text:'اضافه کردن پست سازمانی',
                            tooltip:'اضافه کردن پست سازمانی',
                            iconCls:'add',
                            handler:function(){
                                var grid =  Ext.getCmp('postGridList');
                                var rec = Ext.create('MyDesktop.app.model.Post');
                                grid.store.insert(0,rec);
                            }
                        },'-',{
                            text:'ثبت تغییرات',
                            tooltip:'Remove the selected item',
                            iconCls:'save',
                            handler:function(){
                                var grid =  Ext.getCmp('postGridList');
                                var modifiedRecords = grid.store.getModifiedRecords();
                                var updateArray = [];
                                for(var i=0;i<modifiedRecords.length;i++){
                                    if(modifiedRecords[i].get('parent')){
                                        if(modifiedRecords[i].get('parent').name){

                                        }else{
                                            var id = modifiedRecords[i].get('parent');
                                            var parent = grid.store.findRecord('id',id);
                                            if(parent == null){
                                                var post;
                                                Ext.Ajax.request({
                                                    url : 'post/getById.action',
                                                    method: 'POST',
                                                    async:false,
                                                    params:{id : id},
                                                    success: function (response) {
                                                        post = Ext.JSON.decode(response.responseText);
                                                        modifiedRecords[i].set('parent',post);
                                                    },
                                                    failure: function (response) {
                                                        var jsonResp = Ext.JSON.decode(response.responseText);
                                                        Ext.Msg.alert("Error",jsonResp.error);
                                                    }
                                                });
                                            }else{
                                                modifiedRecords[i].set('parent',parent.data);
                                            }
                                        }
                                    }else{
                                        updateArray.push(modifiedRecords[i].data);
                                    }
                                    updateArray.push(modifiedRecords[i].data);
                                }
                                Ext.Ajax.request({
                                    url : 'post/batchUpdate.action',
                                    method: 'POST',
                                    /*headers:{'Content-Type' : 'text/html'},*/
                                    jsonData:updateArray,
                                    success: function (response) {
                                        var jsonResp = Ext.JSON.decode(response.responseText);
                                        grid.store.commitChanges();
                                        grid.store.load();
                                        grid.getView().refresh();
                                    },
                                    failure: function (response) {
                                        grid.store.rejectChanges();
                                        var jsonResp = Ext.JSON.decode(response.responseText);
                                        Ext.Msg.alert("Error",jsonResp.error);
                                    }
                                });

                            }
                        }]
                    }
                ]


        });

        me.callParent(arguments);
    }

});