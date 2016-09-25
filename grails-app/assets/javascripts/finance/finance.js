//= wrapped
//= require /angular/angular
//= require /angular/ui-bootstrap-tpls
//= require /finance/core/finance.core
//= require /finance/index/finance.index
//= require /finance/account/finance.account

angular.module("finance", [
    "finance.core",
    "finance.index",
    "finance.account",
    "ui.bootstrap"
]);
