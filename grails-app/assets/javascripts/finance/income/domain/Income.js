//= wrapped
//= require /angular/angular-resource

angular
    .module("finance.income")
    .factory("Income", Income);

function Income($resource, domainListConversion, domainToManyConversion) {
    var Income = $resource(
        "income/:id",
        {"id": "@id"},
        {
            "update": {method: "PUT"},
            "query": {
                method: "GET",
                isArray: true,
                transformResponse: [angular.fromJson, domainListConversion("Operation", "operations", "domainToManyConversion")]
            },
            "get": {
                method: 'GET',
                transformResponse: [angular.fromJson, domainToManyConversion("Operation", "operations")]
            }
        }
    );

    Income.list = Income.query;

    Income.prototype.toString = function () {
        return 'finance.Income : ' + (this.id ? this.id : '(unsaved)');
    };

    return Income;
}
