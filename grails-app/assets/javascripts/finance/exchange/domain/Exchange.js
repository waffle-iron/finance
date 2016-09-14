//= wrapped
//= require /angular/angular-resource

angular
    .module("finance.exchange")
    .factory("Exchange", Exchange);

function Exchange($resource, domainListConversion, domainToManyConversion) {
    var Exchange = $resource(
        "exchange/:id",
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

    Exchange.list = Exchange.query;

    Exchange.prototype.toString = function () {
        return 'finance.Exchange : ' + (this.id ? this.id : '(unsaved)');
    };

    return Exchange;
}
