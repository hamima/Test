Ext.define('HSE.view.post.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.postlist',
	plugins: [
	Ext.create('Ext.grid.plugin.RowEditing', {
	    clicksToEdit: 2
	})
	],
    //requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Post List',
    store: 'Posts',

    columns: [{
    	header: "NAME",
		width: 170,
		flex:1,
		dataIndex: 'name'
	},{
		header: "HSEUnderControl",
		width: 160,
		flex:1,
		dataIndex: 'hseunderControl',
		renderer:Ext.util.Boolean
	},{
		header: "Parent",
		width: 170,
		flex:1,
		dataIndex: 'parentId'
	}],
	
	initComponent: function() {
		
		this.dockedItems = [{
            xtype: 'toolbar',
            items: [{
                iconCls: 'icon-save',
                itemId: 'add',
                text: 'Add',
                action: 'add'
            },{
                iconCls: 'icon-delete',
                text: 'Delete',
                action: 'delete'
            }]
        },
        {
            xtype: 'pagingtoolbar',
            dock:'top',
            store: 'Posts',
            displayInfo: true,
            displayMsg: 'Displaying contacts {0} - {1} of {2}',
            emptyMsg: "No contacts to display"
        }];
		
		this.callParent(arguments);
	}
});
