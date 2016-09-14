//= wrapped
//= require /angular/angular-resource

angular
    .module("finance.account")
    .factory("Account", Account);

function Account($resource) {
    var Account = $resource(
        "account/:id",
        {"id": "@id"},
        {
            "update": {method: "PUT"},
            "query": {method: "GET", isArray: true},
            "get": {method: 'GET'}
        }
    );

    Account.list = Account.query;

    Account.prototype.toString = function () {
        return 'finance.Account : ' + (this.id ? this.id : '(unsaved)');
    };

    return Account;
}
