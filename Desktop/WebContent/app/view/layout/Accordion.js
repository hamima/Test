Ext.define('HSE.view.layout.Accordion', {
    extend: 'Ext.panel.Panel',
    
    requires: [
        'Ext.layout.container.Accordion',
        'Ext.grid.*'
    ],
    alias: 'widget.layout-accordion',
    
    themes: {
        classic: {
            colWidth: 75
        },
        
        neptune: {
            colWidth: 80
        }
    },
    //</example>
    
    layout: 'accordion',
    width: 200,
    height: 500,
    defaults: {
        bodyPadding: 5
    },
    
    initComponent: function() {
        Ext.apply(this, {
            items: [{
            	title: 'Accordion Item 1',
            	html: '<img src="resources/images/test.jpg" height="50" width="50" />'
            }, {
                title: 'Accordion Item 2',
                html: 'Empty'
            }, {
                title: 'Accordion Item 3',
                html: 'Empty'
            }, {
                title: 'Accordion Item 4',
                html: 'Empty'
            }, {
                title: 'Accordion Item 5',
                html: 'Empty'
            }]
        });
        this.callParent();
    }
    
//    changeRenderer: function(val) {
//        return '<span style="color:green;">' + val + '</span>';
//    },
//    
//    pctChangeRenderer: function(val){
//        return '<span style="color:red;">' + val + '%</span>';
//    }
});
