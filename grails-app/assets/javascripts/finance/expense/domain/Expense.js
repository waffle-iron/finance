//= wrapped
//= require /angular/angular-resource

angular
    .module("finance.expense")
    .factory("Expense", Expense);

function Expense($resource) {
    var Expense = $resource(
        "document/:id",
        {"id": "@id"},
        {
            "update": {method: "PUT"},
            "query": {method: "GET", isArray: true},
            "get": {method: 'GET'}
        }
    );

    Expense.list = Expense.query;

    Expense.prototype.toString = function () {
        return 'finance.Expense : ' + (this.id ? this.id : '(unsaved)');
    };

    return Expense;
}
