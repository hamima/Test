/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 9/4/13
 * Time: 1:09 AM
 * To change this template use File | Settings | File Templates.
 */
// custom Vtype for vtype:'uniqueUserName'
Ext.apply(Ext.form.field.VTypes, {
    uniqueNationalCode: function(v) {
        Ext.Ajax.request({
            url: 'personalInfo/checkNationalCode',
            method: 'POST',
            params: 'nationalCode=' + v,
            success: function(o) {
                if (o.responseText == 0) {
                    setusernamevalidfalse(v);
                }
            }
        });
        return true;
    },

    uniqueUserNameText: 'این شناسه قبلا مورد استفاده قرار گرفته شده است'
});

function setusernamevalidfalse() {
    Ext.apply(Ext.form.field.VTypes, {
        uniqueNationalCode : function(val, field) {
            var username = val;//Ext.getCmp('regUsername').getValue();
            Ext.Ajax.request({
                url: 'personalInfo/checkNationalCode',
                method: 'POST',
                params: 'nationalCode=' + username,
                success: function(o) {
                    if (o.responseText == 0) {
                        setusernamevalidfalse(val);
                    } else {
                        setusernamevalidtrue(val);
                    }
                }
            });
            return false;
        }
    });
}

function setusernamevalidtrue() {
    Ext.apply(Ext.form.field.VTypes, {
        uniqueNationalCode : function(val, field) {
            var username = val;//Ext.getCmp('regUsername').getValue();
            Ext.Ajax.request({
                url: 'personalInfo/checkNationalCode',
                method: 'POST',
                params: 'nationalCode=' + username,
                success: function(o) {
                    if (o.responseText == 0) {
                        setusernamevalidfalse(val);
                    } else {
                        setusernamevalidtrue(val);
                    }
                }
            });
            return true;
        }
    });
}