//= wrapped
//= require /angular/angular 
//= require /angular/angular-ui-router
//= require /angular/angular-resource
//= require /finance/core/finance.core
//= require /finance/account/finance.account
//= require /finance/operationType/finance.operationType
//= require_self
//= require_tree services
//= require_tree controllers
//= require_tree directives
//= require_tree domain
//= require_tree templates

angular.module("finance.operation", [
    "ui.router",
    "ngResource",
    "finance.core",
    "finance.account",
    "finance.operationType"
]).config(config);

function config($stateProvider) {
    $stateProvider
        .state('operation', {
            url: "/operation",
            abstract: true,
            template: "<div ui-view></div>"
        })
        .state('operation.list', {
            url: "",
            templateUrl: "/finance/operation/list.html",
            controller: "OperationListController as vm"
        })
        .state('operation.create', {
            url: "/create",
            templateUrl: "/finance/operation/create.html",
            controller: "OperationCreateController as vm"
        })
        .state('operation.edit', {
            url: "/edit/:id",
            templateUrl: "/finance/operation/edit.html",
            controller: "OperationEditController as vm"
        })
        .state('operation.show', {
            url: "/show/:id",
            templateUrl: "/finance/operation/show.html",
            controller: "OperationShowController as vm"
        });
}
