//= wrapped
//= require /angular/angular-resource

angular
    .module("finance.operation")
    .factory("Operation", Operation);

function Operation($resource, domainListConversion, domainConversion) {
    var Operation = $resource(
        "operation/:id",
        {"id": "@id"},
        {
            "update": {method: "PUT"},
            "query": {
                method: "GET",
                isArray: true,
                transformResponse: [angular.fromJson, domainListConversion("Account", "credit", "domainConversion"), domainListConversion("OperationType", "type", "domainConversion"), domainListConversion("Account", "debit", "domainConversion")]
            },
            "get": {
                method: 'GET',
                transformResponse: [angular.fromJson, domainConversion("Account", "credit"), domainConversion("OperationType", "type"), domainConversion("Account", "debit")]
            }
        }
    );

    Operation.list = Operation.query;

    Operation.prototype.toString = function () {
        return 'finance.Operation : ' + (this.id ? this.id : '(unsaved)');
    };

    return Operation;
}
