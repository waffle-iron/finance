//= wrapped
//= require /angular/angular-resource

angular
    .module("finance.expense")
    .factory("Expense", Expense);

function Expense($resource, domainListConversion, domainToManyConversion) {
    var Expense = $resource(
        "expense/:id",
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

    Expense.list = Expense.query;

    Expense.prototype.toString = function () {
        return 'finance.Expense : ' + (this.id ? this.id : '(unsaved)');
    };

    return Expense;
}
