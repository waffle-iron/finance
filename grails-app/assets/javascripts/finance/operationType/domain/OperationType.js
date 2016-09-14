//= wrapped
//= require /angular/angular-resource

angular
    .module("finance.operationType")
    .factory("OperationType", OperationType);

function OperationType($resource) {
    var OperationType = $resource(
        "operationType/:id",
        {"id": "@id"},
        {
            "update": {method: "PUT"},
            "query": {method: "GET", isArray: true},
            "get": {method: 'GET'}
        }
    );

    OperationType.list = OperationType.query;

    OperationType.prototype.toString = function () {
        return 'finance.OperationType : ' + (this.id ? this.id : '(unsaved)');
    };

    return OperationType;
}
