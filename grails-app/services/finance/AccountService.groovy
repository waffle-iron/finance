package finance

import grails.transaction.Transactional

@Transactional
class AccountService {

    def save(Account account) {
        if (!account.balance) {
            account.balance = new Balance(date: new Date(), amount: 0.00)
        }
        if (!account.balance.date) {
            account.balance.date = new Date()
        }
        if (account.validate()) {
            account.save(flush: true)
        } else {
            log.error("Can not save account: ${account.errors}")
        }
        account
    }

    def delete(Account account) {
        if (!account.operations) {
            account.delete flush: true
        } else {
            account.errors.reject('account.operation.notEmpty')
        }
    }
}
