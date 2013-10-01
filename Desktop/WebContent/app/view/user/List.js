Ext.define('HSE.view.user.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.userlist',
    //requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'User List',
    store: 'HSE.store.Users',

    columns: [
        {
	    	header: "NAME",
			width: 170,
			flex:1,
			dataIndex: 'firstName'
		},
		{
	    	header: "Family",
			width: 170,
			flex:1,
			dataIndex: 'lastName'
		},
		{
			header: "Post",
			width: 170,
			flex:1,
			dataIndex: 'postId'
		}
	],
	
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
            store: 'HSE.store.Users',
            displayInfo: true,
            displayMsg: 'Displaying contacts {0} - {1} of {2}',
            emptyMsg: "No contacts to display"
        }];
		
		this.callParent(arguments);
	}
});
