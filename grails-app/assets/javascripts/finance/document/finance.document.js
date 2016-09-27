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

angular.module("finance.document", ["ui.router", "ngResource", "finance.core"]).config(config);

function config($stateProvider) {
    $stateProvider
        .state('document', {
            url: "/document",
            abstract: true,
            template: "<div ui-view></div>"
        })
        .state('document.list', {
            url: "",
            templateUrl: "/finance/document/list.html",
            controller: "DocumentListController as vm"
        })
        .state('document.create', {
            url: "/create",
            templateUrl: "/finance/document/create.html",
            controller: "DocumentCreateController as vm"
        })
        .state('document.edit', {
            url: "/edit/:id",
            templateUrl: "/finance/document/edit.html",
            controller: "DocumentEditController as vm"
        })
        .state('document.show', {
            url: "/show/:id",
            templateUrl: "/finance/document/show.html",
            controller: "DocumentShowController as vm"
        });
}
