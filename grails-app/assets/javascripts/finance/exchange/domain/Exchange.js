//= wrapped
//= require /angular/angular-resource

angular
    .module("finance.exchange")
    .factory("Exchange", Exchange);

function Exchange($resource) {
    var Exchange = $resource(
        "document/:id",
        {"id": "@id"},
        {
            "update": {method: "PUT"},
            "query": {method: "GET", isArray: true},
            "get": {method: 'GET'}
        }
    );

    Exchange.list = Exchange.query;

    Exchange.prototype.toString = function () {
        return 'finance.Exchange : ' + (this.id ? this.id : '(unsaved)');
    };

    return Exchange;
}
