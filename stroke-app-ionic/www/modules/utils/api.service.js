'use strict';

angular.module('utils').service('API', API);

API.$inject = [];

function API() {

    this.getHospitalIds = function(){
        return [{"id": 1, "label":"HS-1234"},{"id": 2, "label":"HS-1235"},{"id": 3, "label":"HS-1236"}]
    };
    
    return {"getHospitalIds": this.getHospitalIds};
}