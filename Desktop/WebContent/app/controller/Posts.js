/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 7/28/13
 * Time: 5:10 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('HSE.controller.Posts', {
    extend: 'Ext.app.Controller',

    stores: ['Posts'],

    models: ['Post'],

    views: ['post.Edit', 'post.List'],

    refs: [{
        ref: 'postPanel',
        selector: 'panel'
    },{
        ref: 'postlist',
        selector: 'postlist'
    }
    ],

    init: function() {
        this.control({
            'postlist dataview': {
                itemdblclick: this.editUser
            },
            'postlist button[action=add]': {
                click: this.editUser
            },
            'postlist button[action=delete]': {
                click: this.deleteUser
            },
            'postedit button[action=save]': {
                click: this.updateUser
            }
        });
    },

    editUser: function(grid, record) {
        var edit = Ext.create('HSE.view.post.Edit').show();

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
            record = Ext.create('HSE.model.Post');
            var parent = Ext.create('HSE.model.Post');
            var combo = Ext.getCmp('postCombo');
            var v = combo.getValue();
            var rec = combo.findRecord(combo.valueField || combo.displayField, v);
            parent.set(rec.data);
            record.set(values);
            record.set('parent',parent.data);
            record.setId(0);
            console.log(record);
            this.getPostsStore().add(record);
        }

        win.close();
        this.getPostsStore().sync();
    },

    deleteUser: function(button) {

        var grid = this.getPostlist(),
            record = grid.getSelectionModel().getSelection(),
            store = this.getPostsStore();

        store.remove(record);
        this.getPostsStore().sync();
    }
});
