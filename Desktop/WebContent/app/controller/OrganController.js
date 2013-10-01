/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 7/28/13
 * Time: 5:10 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('MyDesktop.app.controller.OrganController', {
    extend: 'Ext.app.Controller',

    stores: ['MyDesktop.app.store.Organs'],

    models: ['MyDesktop.app.model.OrganModel'],

    views: ['MyDesktop.app.view.organ.OrganForm', 'organ.OrganList'],

    refs: [{
        ref: 'organPanel',
        selector: 'panel'
    },{
        ref: 'organlist',
        selector: 'organlist'
    }
    ],

    init: function() {
        this.control({
            'organlist dataview': {
                itemdblclick: this.editUser
            },
            'organlist button[action=add]': {
                click: this.editUser
            },
            'organlist button[action=delete]': {
                click: this.deleteUser
            },
            'organedit button[action=save]': {
                click: this.updateUser
            }
        });
    },

    editUser: function(grid, record) {
        var edit = Ext.create('HSE.view.organ.Edit').show();

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
            record = Ext.create('HSE.model.OrganModel');
            var parent = Ext.create('HSE.model.OrganModel');
            var combo = Ext.getCmp('organCombo');
            var v = combo.getValue();
            var rec = combo.findRecord(combo.valueField || combo.displayField, v);
            parent.set(rec.data);
            record.set(values);
            record.set('parent',parent.data);
            record.setId(0);
            console.log(record);
            this.getHSEStoreOrgansStore().add(record);
        }

        win.close();
        this.getHSEStoreOrgansStore().sync();
    },

    deleteUser: function(button) {

        var grid = this.getOrganlist(),
            record = grid.getSelectionModel().getSelection(),
            store = this.getHSEStoreOrgansStore();

        store.remove(record);
        this.getHSEStoreOrgansStore().sync();
    }
});
