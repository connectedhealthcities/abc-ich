'use strict';

angular.module('utils').service('ConfigService', ConfigService);

ConfigService.$inject = [];

function ConfigService() {

    var config;
    this.getConfig = function(){
        return config;
    };
    this.getHospitalId = function(){
      return config.selectedHospital.label;  
    };
    this.getEmailAddress = function(){
      return config.email;  
    };
    this.saveConfig = function(cnfg){
        
        //localStorage.setItem("config", JSON.stringify(config));  
    };
    this.init = function(){
        //
      config = JSON.parse("{\"selectedHospital\":{\"id\":2,\"label\":\"HS-1235\"},\"email\":\"ed.t@g.com\"}");// (localStorage.config) ? JSON.parse(localStorage.getItem("config")) : {};  
    };
    this.init();
    return { "getConfig": this.getConfig,
             "getHospitalId": this.getHospitalId,
             "getEmailAddress": this.getEmailAddress,
             "saveConfig": this.saveConfig,
             "init": this.init};
}
