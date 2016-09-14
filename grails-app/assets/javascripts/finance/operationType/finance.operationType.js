//= wrapped
//= require /angular/angular 
//= require /angular/angular-ui-router
//= require /angular/angular-resource
//= require /finance/core/finance.core
//= require_self
//= require_tree services
//= require_tree controllers
//= require_tree directives
//= require_tree domain
//= require_tree templates

angular.module("finance.operationType", ["ui.router", "ngResource", "finance.core"]).config(config);

function config($stateProvider) {
    $stateProvider
        .state('operationType', {
            url: "/operationType",
            abstract: true,
            template: "<div ui-view></div>"
        })
        .state('operationType.list', {
            url: "",
            templateUrl: "/finance/operationType/list.html",
            controller: "OperationTypeListController as vm"
        })
        .state('operationType.create', {
            url: "/create",
            templateUrl: "/finance/operationType/create.html",
            controller: "OperationTypeCreateController as vm"
        })
        .state('operationType.edit', {
            url: "/edit/:id",
            templateUrl: "/finance/operationType/edit.html",
            controller: "OperationTypeEditController as vm"
        })
        .state('operationType.show', {
            url: "/show/:id",
            templateUrl: "/finance/operationType/show.html",
            controller: "OperationTypeShowController as vm"
        });
}
