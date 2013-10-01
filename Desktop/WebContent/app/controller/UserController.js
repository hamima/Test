/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 7/28/13
 * Time: 5:10 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('HSE.controller.UserController', {
    extend: 'Ext.app.Controller',

    stores: ['HSE.store.Users'],

    models: ['HSE.model.UserModel'],

    views: ['user.Edit', 'user.List'],

    refs: [{
        ref: 'userPanel',
        selector: 'panel'
    },{
        ref: 'userlist',
        selector: 'userlist'
    }
    ],

    init: function() {
        this.control({
            'userlist dataview': {
                itemdblclick: this.editUser
            },
            'userlist button[action=add]': {
                click: this.editUser
            },
            'userlist button[action=delete]': {
                click: this.deleteUser
            },
            'useredit button[action=save]': {
                click: this.updateUser
            }
        });
    },

    editUser: function(grid, record) {
        var edit = Ext.create('HSE.view.user.Edit').show();

        if(record){
            edit.down('form').loadRecord(record);
        }
    },

    updateUser: function(button) {
        var win    = button.up('window'),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();


        if (values.id > 0){
            record.set(values);
        } else{
            record = Ext.create('HSE.model.UserModel');
            var parent = Ext.create('HSE.model.UserModel');
            var combo = Ext.getCmp('userOrganCombo');
            var postcombo = Ext.getCmp('userPostCombo');
            var v = combo.getValue();
            var post = postcombo.getValue();
            var rec = combo.findRecord(combo.valueField || combo.displayField, v);
            var recpost = postcombo.findRecord(postcombo.valueField || postcombo.displayField, post);
            parent.set(rec.data);
            record.set(values);
            var workingAt = record.workingAt();
            var post = recpost.data;
//            post.add(recPost.data);
            workingAt.add(rec.data);
            for (var i = 0; i <workingAt.data.items.length; i++) {
                workingAt.data.items[i].setDirty();
            };
            record.setDirty();
//            workingAt.sync();
//            record.setPost(post);
            record.set('post',post);
            record.set('workingAt',workingAt);
            record.setId(0);
            console.log(record);
            this.getHSEStoreUsersStore().add(record);
        }

        win.close();
        this.getHSEStoreUsersStore().sync();
    },

    deleteUser: function(button) {

        var grid = this.getPostlist(),
            record = grid.getSelectionModel().getSelection(),
            store = this.getHSEStoreUsersStore();

        store.remove(record);
        this.getHSEStoreUsersStore().sync();
    }
});
