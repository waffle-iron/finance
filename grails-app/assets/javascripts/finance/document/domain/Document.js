//= wrapped
//= require /angular/angular-resource

angular
    .module("finance.document")
    .factory("Document", Document);

function Document($resource) {
    var Document = $resource(
        "document/:id",
        {"id": "@id"},
        {
            "update": {method: "PUT"},
            "query": {method: "GET", isArray: true},
            "get": {method: 'GET'}
        }
    );

    Document.list = Document.query;

    Document.prototype.toString = function () {
        return 'finance.Document : ' + (this.id ? this.id : '(unsaved)');
    };

    return Document;
}
