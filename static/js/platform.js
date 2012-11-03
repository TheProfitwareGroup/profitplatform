dojo.require("dojox.rpc.Service");
dojo.require("dojox.rpc.JsonRPC");

/**
 * Main profitPlatform AJAX-client class
 * 
 * @param {String} target
 * @return {Object}
 * @api public
 */
 
var profitPlatform = function(target){
    if(target === undefined)
        target = '/';
    
    self = this;
    
    self.target = target;

    /*
     * This is core service for handle core
     * calls to methods
     */

    self.coreService = new dojox.rpc.Service({
        envelope : "JSON-RPC-2.0",
        transport : "POST",
        target : self.target,
        services : {
            'platform.common.getsession' : {
                parameters:[]
            },
            'platform.common.schemalist' : {
                parameters:[]
            },
            'platform.common.localize' : {
                parameters:[]
            },
            'platform.common.checksession' : {
                parameters:[]   
            }
        }
    });
    
    self.platformService = undefined;
    
    self.apikey = '';
    self.language = 'en';
    
    /**
     * Creates platform service after initialization for
     * handle any requests to given schemas and methods
     * Callback function gets apikey back
     * 
     * @param {Function} callback
     * @api public
     */
    
    self.doCreatePlatformService = function(callback){
        /*
         * Here we use schemaObject to determine which schemas are usable
         * after user logins
         */
        var schemaObject = self.coreService.platform.common.schemalist(self.apikey);
        schemaObject.addCallback(function(result){
            var svc = {};
            result.forEach(function(i){
                svc[i] = {parameters : []}; 
            });
            self.platformService = new dojox.rpc.Service({
                envelope : "JSON-RPC-2.0",
                transport : "POST",
                target : self.target,
                services : svc
            });
            callback(self.apikey); 
        });
    };
    
    /**
     * Logins user with given credentials and after
     * that creates platform service. Uses callback
     * to pass apikey back
     * 
     * @param {String} user
     * @param {String} password
     * @param {Function} callback
     * @param {Function} errback
     * @api public
     */
    
    self.doLogin = function(user, password, callback, errback){
        var loginObject = self.coreService.platform.common.getsession(self.apikey, user, password);
        loginObject.addCallback(function(loginResult){
            self.apikey = loginResult;
            self.doCreatePlatformService(callback);
        });
        
        loginObject.addErrback(errback);
    };
    
    /**
     * Localization function. Localizes an array of
     * localizable strings for given language
     * 
     * @param {String} lng
     * @param {Array} strings
     * @param {Function} callback
     * @api public
     */
    
    self.doLocalize = function(lng, strings, callback){
        var localizeObject = self.coreService.platform.common.localize(self.apikey, lng, strings);
        
        localizeObject.addCallback(callback);
    };
    
    /**
     * Checks session. Apikey must be set in order callback
     * to be executed
     * 
     * @param {Function} callback
     * @param {Function} errback
     * @api public
     */
    
    self.doCheckSession = function(callback, errback){
        var sessionObject = self.coreService.platform.common.checksession(self.apikey);
      
        sessionObject.addCallback(callback);
        sessionObject.addErrback(errback);
    };
    
    return this;
};