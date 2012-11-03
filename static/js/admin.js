dojo.require("dijit.form.TextBox");
dojo.require("dijit.form.Button");
dojo.require("dijit.Tooltip");

dojo.require("dojo.cookie");

var isAdminPage = /.*admin\.html.*/.test(window.location);
var profitObject;

/**
 * An array strings' ids to be localized
 */

var localizeArray = [
    'platform.admin.logintitle',
    'platform.admin.login',
    'platform.admin.password',
    'platform.admin.enter',
    'platform.admin.exit',
    'platform.admin.user',
    'platform.admin.version',
    'platform.admin.availschema'
];

var animArgs = {
    node : 'fform1',
    duration : 250
};

var nullFcn = function(){};

/**
 * Function localized all elements ids of which are in
 * localize array
 * 
 * @param {String} language
 * @api private
 */

var localize = function(language){
    profitObject.doLocalize(language, localizeArray, function(result) {
        for(var i in result){
            try{
                dojo.byId(i).innerHTML = result[i];  
            }catch(e){
            }
        }
        dojo.fadeIn(animArgs).play();
    });
};

/**
 * Functino emits if login succeeded
 * with apikey parameter in result
 * 
 * @param {String} result
 * @api private
 */

var loginSuccess = function(result){
        dojo.cookie('profitplatform_auth', result, { 
            expires : 1
        });
        dojo.fadeOut(animArgs).play().onEnd = function(){
            window.location = '/admin.html';
        };
};

/**
 * Function emits if login fails
 * 
 * @param {Object} err
 * @api private
 */

var loginFail = function(err){
       dojo.byId('t1').value = '';
       dojo.byId('t2').value = '';
       dijit.byId('t1').focus();
};

/**
 * Function checks session in order
 * to determine if user has access
 * to admin page. If not it changes
 * the location to login page.
 * 
 * @api private
 */

var sessionCheck = function(){
    profitObject.doCheckSession(
        function(result){
            prohibitAdminPage = false;
            if(profitObject.language == 'ru')
                toggleLanguage();
            dojo.fadeIn(animArgs).play();
            dijit.byId('platform.admin.exit').onClick = tryLogout;
            doInitAdminPage();
        }, function(){
            prohibitAdminPage = true;
            dojo.fadeOut(animArgs).play().onEnd = function(){
                window.location = '/';
            };
        }
    );
};

var setContent = function(content){
      dojo.byId('content').innerHTML = content;
};

var span = function(lObj, pObj) {
    return '<span id="platform.admin.' + lObj + '"></span><span style="text-align: right">' + pObj + '</span><br/>';
};


var getInfoPage = function(){
    doInitSchema('info', function(ret){
        var ver = ret.version + (ret.debug ? ' [ debug ]' : '');
        dojo.byId('version').innerHTML = ver;
        setContent(
            span('version', ver) +
            span('user', ret.user[0].login)
        );
        localize(profitObject.language);
    });
};

var getSchemaPage = function(){
    doInitSchema('schemalist', function(ret){
        setContent('<span id="platform.admin.availschema"></span><br/><span>' + ret.join('</span><br/><span>') + '</span>');
        localize(profitObject.language);
    });
}

var changePage = function(fcn){
    dojo.fadeOut(animArgs).play().onEnd = function(){
        fcn();
    };
};

/**
 * Function inits admin page with info schema
 * and sets the first subpage of admin interface to
 * allow user view any type of information on first page.
 * It also localizes page if needed.
 * 
 * @api private
 */

var doInitAdminPage = function(){
    getInfoPage();
    dojo.byId('s_home').onClick = getInfoPage;
    dojo.byId('s_private').onClick = getSchemaPage;
};

/**
 * Inits schema by its short name using callback function parameter
 * to pass any parameters returned back by schema
 * 
 * @param {String} schema
 * @param {Function} callback
 * @api private
 */

// TODO: Write schemas

var doInitSchema = function(schema, callback){
    profitObject.doCheckSession(function(result){
        var schemaObject;
        switch(schema){
            case 'info': schemaObject = profitObject.platformService.platform.admin.getinfo(profitObject.apikey); break;
            case 'schemalist': schemaObject = profitObject.platformService.platform.common.schemalist(profitObject.apikey); break;
            default: callback(); return;
        }
        schemaObject.addCallback(callback);
    }, function(err){
        alert('Session ended');   
        tryLogout();
    });
};

/**
 * Toggles language. For now toggles only ru-en
 * 
 * @api private
 */

var toggleLanguage = function(){
    locl = function(){
        var language = profitObject.language;
        dojo.byId('toggleLanguage').innerHTML = language.toUpperCase();
        if(language == 'en')
            language = 'ru';
        else
            language = 'en';
        profitObject.language = language;
        localize(language);
        dojo.cookie('profitplatform_language', language, {expires : 1});
        if(!isAdminPage)
            dijit.byId('t1').focus();
    }
    if(isAdminPage)
        profitObject.doCheckSession(function(result){
            locl();
        },  function(err){
            alert('Session ended');
            tryLogout();
        });
    else
        locl();
};

/**
 * Tries to login with credentials given by user input
 * Emits loginSuccess on success and loginFail otherwise
 * 
 * @api private
 */

var tryLogin = function(){
    if ((dojo.byId('t1').value !== '') && (dojo.byId('t2').value !== ''))
        profitObject.doLogin(
            dojo.byId('t1').value,
            dojo.byId('t2').value,
            loginSuccess,
            loginFail
        );
    else
        dijit.byId('t1').focus();
};

/**
 * Tries to logout user setting cookies to none
 * 
 * @api private
 */

var tryLogout = function(){
    dojo.cookie('profitplatform_auth', '', {expires: -1});
    dojo.fadeOut(animArgs).play().onEnd = function(){
        window.location = '/';
    };
};

/*
 * Emits function on dojo loads
 */

dojo.addOnLoad(function(){
    var lng = dojo.cookie('profitplatform_language'),
        prohibitAdminPage = false;
    profitObject = new profitPlatform('/');
    if(isAdminPage){
        profitObject.apikey = dojo.cookie('profitplatform_auth');
        if(profitObject.apikey === undefined)
            window.location = '/';
        profitObject.doCreatePlatformService(sessionCheck);
    }else{
        if(lng == 'ru')
            toggleLanguage();
        dojo.fadeIn(animArgs).play();
        dijit.byId('t1').focus();
    }
    dijit.byId('toggleLanguage').onClick = function(){
        dojo.fadeOut(animArgs).play().onEnd = function(){
            toggleLanguage();
        };
    };
});