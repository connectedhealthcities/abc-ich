/* !!! IMPORTANT: Rename "mymodule" below and add your module to Angular Modules above. */

angular.module('api', [])

.service('API', [function(){
    this.getHospitalIds = function(){
        return [{"id": 1, "label":"HS-1234"},{"id": 2, "label":"HS-1235"},{"id": 3, "label":"HS-1236"}]
    };
    
    return {"getHospitalIds": this.getHospitalIds};
}]);