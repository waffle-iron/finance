package finance

import grails.transaction.Transactional

import java.time.Period

@Transactional
class OperationService {

    def closeCurrentPeriod() {
        def previousPeriod = Period.ofYears(Calendar.getInstance().get(Calendar.YEAR) - 1)
        def currentPeriod = Period.ofYears(Calendar.getInstance().get(Calendar.YEAR))

        // find operations for current period
        def operations = Operation.list()
        def incomeOperations = operations.findAll { Operation operation -> operation.period == currentPeriod && operation.type == OperationType.INCOME }
        def expenseOperations = operations.findAll { Operation operation -> operation.period == currentPeriod && operation.type == OperationType.EXPENSE }

        // find balances for previous period
        // def previousBalances = Balance.list().findAll { Balance balance -> balance.period == previousPeriod }

        // find accounts
        def accounts = Account.list()

        // for all account:
        accounts.each { account ->
            //  - calculate income for current period
            def incomeAmount = incomeOperations.sum { Operation operation -> operation.amount } as BigDecimal

            //  - calculate expense for current period
            def expenseAmount = expenseOperations.sum { Operation operation -> operation.amount } as BigDecimal

            //  - create balance for current period
            def currentBalance = new Balance(
                    date: new Date(),
                    amount: (account.balance.amount + incomeAmount - expenseAmount)
            )

            account.balance = currentBalance

            if (!account.validate()) {
                log.error "Can not save new balance: $account.errors"
                return
            }
            account.save flush: true
        }
    }
}
