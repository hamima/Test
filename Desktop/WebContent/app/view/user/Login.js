Ext.define('MyDesktop.app.view.user.Login', {
    extend: 'Ext.window.Window',
    alias: 'widget.addloginwin',
 /*   requires:['MyDesktop.app.util.GlobalVariables'],*/
    autoHeight: true,
    modal: true,
    draggable: false,
    closable: false,
    rtl:true,
    resizable: false,
    id: 'AddLoginWin',
    width: 350,
    height: 330,
    layout: {
        type: 'border'
    },
    title: 'سیستم ورود کاربران',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
				{
                    xtype: 'panel',
                    border: false,
                    id: 'panel_img',
                    region: 'north',
                    html: '<div style="text-align:center;padding:3px"><img src="resources/images/logo.png"/></div>',
                    height: 95
                },
                {
                    xtype: 'form',
                    border: false,
                    autoScroll: true,
                    region: 'center',
                    id: 'FormLogin',
                    bodyPadding: 10,
                    method: 'POST',
                    url: 'user/login.action',
                    items: [
                        {
                            xtype: 'textfield',
                            id: 'LoginLogin',
                            name: 'loginuser',
                            fieldLabel: 'شناسه کاربری',
                            allowBlank: false,
                            labelWidth: 60,
                            anchor: '100%'
                        },
                        {
                            xtype: 'textfield',
                            id: 'senha',
                            inputType: 'password',
                            name: 'userpass',
                            fieldLabel: 'کلمه عبور',
                            labelWidth: 60,
                            allowBlank: false,
                            anchor: '100%'
                        },
						{
                            xtype: 'radiogroup',
                            id: 'LocaleLogin',
							labelWidth: 60,
                            fieldLabel: 'تعیین زبان',
                            items: [
                                {
                                    xtype: 'radiofield',
                                    name: 'locale',
                                    inputValue: 'fa',
                                    boxLabel: 'فارسی',
                                    checked: true
                                },
								{
                                    xtype: 'radiofield',
                                    name: 'locale',
                                    inputValue: 'en',
                                    boxLabel: 'انگلیسی'
                                }
                            ],
							listeners: {
								change: me.setLanguage,
                                scope: me
							}
                        },
                        {
							xtype: 'hiddenfield',
							hidden: true,
							id: 'tipo_usuario',
							name: 'tipo',
							value: 'administrador'
                        },
                        {
							xtype: 'hiddenfield',
							hidden: true,
							name: 'action',
							id: 'action_login',
							value: 'LOGIN_USER'
                        } 
                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    rtl:true,
                    items: [
                        
						{
						    xtype: 'button',
						    iconCls: 'bt_cancel',
							id: 'button_restart_login',
						    text: 'پاک کردن ',
						    handler: function(){
						    	Ext.getCmp('FormLogin').getForm().reset();
						    }
						},
						{
							xtype: 'tbseparator'
						},
                        {
                            xtype: 'button',
                            iconCls: 'bt_login',
							id: 'button_connect_login',
                            text: 'ورود به سیستم',
                            listeners: {
                                click: {
                                    fn: me.LoginSys,
                                    scope: me
                                }
                            }
                        }
                    /*    {
                            xtype: 'tbseparator'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'bt_login',
                            id: 'button_connect_login',
                            text: 'ثبت نام در سیستم',
                            handler: function(){
                                var win = Ext.getCmp('');
                                if(!win) win = Ext.widget('addcadastrowin');
                                win.show();
                            }
                        }*/
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },
	
	setEn: function(){
		Ext.getCmp('button_resetar_login').setText('Reset');
		Ext.getCmp('button_connectar_login').setText('Connect');
		
		Ext.getCmp('LocaleLogin').setFieldLabel('Translate');
		Ext.getCmp('SenhaLogin').setFieldLabel('Password');
		Ext.getCmp('LoginLogin').setFieldLabel('Login');
		
		Ext.getCmp('AddLoginWin').setTitle('Login System');
		
//		Ext.define("Ext.locale.en.cadastro.Edit", {
//			override: "ShSolutions.view.cadastro.Edit",
//			
//			title: 'Sign Up',
//			reset: 'Reset',
//			aguarde: 'Wait...',
//			save: 'Save',
//			nome: 'Name',
//			login: 'Login',
//			pass: 'Password',
//			email: 'E-mail',
//			invalid_email: 'E-mail Invalid...'
//		});
	},
	
	setFa: function(){
		Ext.getCmp('button_resetar_login').setText('پاک کردن');
		Ext.getCmp('button_connectar_login').setText('ورود به سیستم');
		
		Ext.getCmp('LocaleLogin').setFieldLabel('تعیین زبان ورودی');
		Ext.getCmp('SenhaLogin').setFieldLabel('کلمه عبور');
		Ext.getCmp('LoginLogin').setFieldLabel('شناسه کاربری');
		
		Ext.getCmp('AddLoginWin').setTitle('سیستم ورود کاربران');
			
//		Ext.define("Ext.locale.en.cadastro.Edit", {
//			override: "ShSolutions.view.cadastro.Edit",
//			
//			title: 'Registre-se',
//			reset: 'Resetar',
//			aguarde: 'Aguarde...',
//			save: 'Salvar',
//			nome: 'Nome',
//			login: 'Login',
//			pass: 'Senha',
//			email: 'E-mail',
//			invalid_email: 'E-mail Inv&aacute;lido...'
//		});
		
	},
	
	setLanguage: function(comp, nv, ov){
		var me = this;
		if(nv.locale=='en'){
			me.setEn();
		}
		else{
			me.setFa();
		}
	},

    LoginSys: function(button, e, options) {
        var me = this;
    	if(!Ext.getCmp('FormLogin').getForm().isValid()){
    		return true;
    	}
    	/*Ext.Ajax.request({
			url : 'user/login.action',
			method: 'POST',
			headers: {'Content-Type': 'text/html'},
			params : { 'rolename' : 'testParam' },
			success: function (response) {
			var jsonResp = Ext.util.JSON.decode(response.responseText);
			Ext.Msg.alert("Info","UserName from Server : "+jsonResp.username);
			},
			failure: function (response) {
			var jsonResp = Ext.util.JSON.decode(response.responseText);
			Ext.Msg.alert("Error",jsonResp.error);
			}
		});*/
    	button.setDisabled(true);
    	Ext.getCmp('FormLogin').getEl().mask('صبر کنید ....');
        Ext.getCmp('FormLogin').getForm().submit({
            success: function(f, o){
                if(o.result.success===true){
                    MyDesktop.app.util.GlobalVariables.loggedInUser = o.result.data[0];
                    var myDesktop = new MyDesktop.App();
                    me.destroy();
                   /* myDesktop.show();*/
                    /*window.location = 'desktop.html';*/
                }
                else{
                    Ext.Msg.alert('خطا', o.result.msg);
                    button.setDisabled(false);
                    Ext.getCmp('FormLogin').getEl().unmask();
                }
            },
            failure: function(f, o){
				console.info(o);
                Ext.Msg.alert('خطا', o.result.msg);
                button.setDisabled(false);
                Ext.getCmp('FormLogin').getEl().unmask();
            }
        });
    },
    register: function(button, e, options) {
        if(!Ext.getCmp('FormLogin').getForm().isValid()){
            return true;
        }
//    	Ext.Ajax.request({
//			url : 'user/login.action',
//			method: 'POST',
//			headers: {'Content-Type': 'text/html'},
//			params : { 'rolename' : 'testParam' },
//			success: function (response) {
//			var jsonResp = Ext.util.JSON.decode(response.responseText);
//			Ext.Msg.alert("Info","UserName from Server : "+jsonResp.username);
//			},
//			failure: function (response) {
//			var jsonResp = Ext.util.JSON.decode(response.responseText);
//			Ext.Msg.alert("Error",jsonResp.error);
//			}
//		});
        button.setDisabled(true);
        Ext.getCmp('FormLogin').getEl().mask('صبر کنید ...');
        Ext.getCmp('FormLogin').getForm().submit({
            success: function(f, o){
                if(o.result.success===true){
                    /*window.location = 'desktop.html';*/

                }
                else{
                    Ext.Msg.alert('خطا', o.result.msg);
                    button.setDisabled(false);
                    Ext.getCmp('FormLogin').getEl().unmask();
                }
            },
            failure: function(f, o){
                console.info(o);
                Ext.Msg.alert('خطا', o.result.msg);
                button.setDisabled(false);
                Ext.getCmp('FormLogin').getEl().unmask();
            }
        });
    }

});