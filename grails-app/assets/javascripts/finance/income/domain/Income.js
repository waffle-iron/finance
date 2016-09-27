//= wrapped
//= require /angular/angular-resource

angular
    .module("finance.income")
    .factory("Income", Income);

function Income($resource) {
    var Income = $resource(
        "document/:id",
        {"id": "@id"},
        {
            "update": {method: "PUT"},
            "query": {method: "GET", isArray: true},
            "get": {method: 'GET'}
        }
    );

    Income.list = Income.query;

    Income.prototype.toString = function () {
        return 'finance.Income : ' + (this.id ? this.id : '(unsaved)');
    };

    return Income;
}
