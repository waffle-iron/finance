//= wrapped
//= require /angular/angular 
//= require /angular/angular-ui-router
//= require /angular/angular-resource
//= require /finance/core/finance.core
//= require /finance/account/finance.account
//= require_self
//= require_tree services
//= require_tree controllers
//= require_tree directives
//= require_tree domain
//= require_tree templates

angular.module("finance.balance", [
    "ui.router",
    "ngResource",
    "finance.core",
    "finance.account"
]).config(config);

function config($stateProvider) {
    $stateProvider
        .state('balance', {
            url: "/balance",
            abstract: true,
            template: "<div ui-view></div>"
        })
        .state('balance.list', {
            url: "",
            templateUrl: "/finance/balance/list.html",
            controller: "BalanceListController as vm"
        })
        .state('balance.create', {
            url: "/create",
            templateUrl: "/finance/balance/create.html",
            controller: "BalanceCreateController as vm"
        })
        .state('balance.edit', {
            url: "/edit/:id",
            templateUrl: "/finance/balance/edit.html",
            controller: "BalanceEditController as vm"
        })
        .state('balance.show', {
            url: "/show/:id",
            templateUrl: "/finance/balance/show.html",
            controller: "BalanceShowController as vm"
        });
}
