/**
 * Ext JS Library 4.0.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 *	
 * Sample project presented at BrazilJS
 * Brazilian JavaScript Conference
 * Fortaleza - Ceará - 13-14 May 2011
 * http://braziljs.com.br/2011
 * 
 * @author Loiane Groner
 * http://loianegroner.com (English)
 * http://loiane.com (Portuguese)
 */
// Ext.Loader.setConfig({
//     enabled: true,
//     paths: {
//         'Extensible': '../../WebContent',
//         'Extensible.example': '../../'
//     }
// });
 
Ext.application({
    name: 'HSE',

    controllers: [
        'HSE.controller.Main'
    ],
    requires: [
	    'Ext.state.CookieProvider',
	    'Ext.window.MessageBox',
	    'Ext.tip.QuickTipManager',
	    'HSE.view.*'
    ],
    autoCreateViewport: true,
    launch: function() {
	
	    Ext.tip.QuickTipManager.init();
	    Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));

    	Ext.data.writer.Json.override({
        	    /*
        	     * This function overrides the default implementation of json writer. Any hasMany relationships will be submitted
        	     * as nested objects. When preparing the data, only children which have been newly created, modified or marked for
        	     * deletion will be added. To do this, a depth first bottom -> up recursive technique was used.
        	     */
        	    getRecordData: function(record) {
        	        //Setup variables
        	        var me = this, i, association, childStore, data = {};
        	        if(record.proxy.writer.writeAllFields){
        	            data = record.data;
        	        }
        	        else {
        	            var changes, name,  field, fields = record.fields, nameProperty = this.nameProperty, key;
        	            changes = record.getChanges();
        	            for (key in changes) {
        	                if (changes.hasOwnProperty(key)) {
        	                    field = fields.get(key);
        	                    name = field[nameProperty] || field.name;
        	                    data[name] = changes[key];
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


        	                /*
        	                 * If the child was marked dirty or phantom it must be added. If there was data returned that was neither
        	                 * dirty or phantom, this means that the depth first recursion has detected that it has a child which is
        	                 * either dirty or phantom. For this child to be put into the prepared data, it's parents must be in place whether
        	                 * they were modified or not.
        	                 */
        	                if (childRecord.dirty | childRecord.phantom | (childData != null)){
        	                    data[association.name].push(childData);
        	                    record.setDirty();
        	                }
        	            }, me);


        	            /*
        	             * Iterate over all the removed records and add them to the preparedData. Set a flag on them to show that
        	             * they are to be deleted
        	             */
        	            Ext.each(childStore.removed, function(removedChildRecord) {
        	                //Set a flag here to identify removed records
        	                removedChildRecord.set('forDeletion', true);
        	                var removedChildData = this.getRecordData.call(this, removedChildRecord);
        	                data[association.name].push(removedChildData);
        	                record.setDirty();
        	            }, me);
        	            }
        	            
        	            
        	        }


        	        //Only return data if it was dirty, new or marked for deletion.
        	        if (record.dirty | record.phantom | record.get('forDeletion')){
        	            return data;
        	        }
        	    }
        	});

    }
   
});
