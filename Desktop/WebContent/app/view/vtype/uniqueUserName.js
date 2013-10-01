/**
 * Created with JetBrains WebStorm.
 * User: mohammad
 * Date: 9/4/13
 * Time: 1:02 AM
 * To change this template use File | Settings | File Templates.
 */
// custom Vtype for vtype:'uniqueUserName'
Ext.apply(Ext.form.field.VTypes, {
    uniqueUserName: function(v) {
        var isValid = false;
        var errorText;
        if(v.length < 5){
            isValid = false;
            errorText = "طول شناسه کاربری باید بیش از5 کارامتر باشد";
        }else
        {
            Ext.Ajax.request({
                url: 'personalInfo/checkUserName.action',
                method: 'POST',
                params: {'username': v},
                success: function(o) {
                    if (o.responseText == 0) {
                        isValid = true;
                    }else{
                        isValid = false;
                        errorText = 'این شناسه قبلا مورد استفاده قرار گرفته شده است';
                    }
                }
            });
        }
        return isValid;
    },

    uniqueUserNameText: 'این شناسه قبلا مورد استفاده قرار گرفته شده است'
});

function setusernamevalidfalse() {
    Ext.apply(Ext.form.field.VTypes, {
        uniqueUserName : function(val, field) {
            var username = val;//Ext.getCmp('regUsername').getValue();
            Ext.Ajax.request({
                url: 'personalInfo/checkUserName.action',
                method: 'POST',
                params: 'username=' + username,
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
        uniqueUserName : function(val, field) {
            var username = val;//Ext.getCmp('regUsername').getValue();
            Ext.Ajax.request({
                url: 'personalInfo/checkUserName.action',
                method: 'POST',
                params: 'username=' + username,
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