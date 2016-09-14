//= wrapped
//= require /angular/angular-resource

angular
    .module("finance.balance")
    .factory("Balance", Balance);

function Balance($resource, domainListConversion, domainConversion) {
    var Balance = $resource(
        "balance/:id",
        {"id": "@id"},
        {
            "update": {method: "PUT"},
            "query": {
                method: "GET",
                isArray: true,
                transformResponse: [angular.fromJson, domainListConversion("Account", "account", "domainConversion")]
            },
            "get": {method: 'GET', transformResponse: [angular.fromJson, domainConversion("Account", "account")]}
        }
    );

    Balance.list = Balance.query;

    Balance.prototype.toString = function () {
        return 'finance.Balance : ' + (this.id ? this.id : '(unsaved)');
    };

    return Balance;
}
