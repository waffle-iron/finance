//= wrapped
//= require /angular/angular
//= require /angular/ui-bootstrap-tpls
//= require /finance/core/finance.core
//= require /finance/index/finance.index
//= require /finance/account/finance.account
//= require /finance/balance/finance.balance
//= require /finance/operation/finance.operation
//= require /finance/operationType/finance.operationType
//= require /finance/expense/finance.expense
//= require /finance/income/finance.income
//= require /finance/exchange/finance.exchange

angular.module("finance", [
    "finance.core",
    "finance.index",
    "finance.account",
    "finance.balance",
    "finance.operation",
    "finance.operationType",
    "finance.expense",
    "finance.income",
    "finance.exchange",
    "ui.bootstrap"
]);
