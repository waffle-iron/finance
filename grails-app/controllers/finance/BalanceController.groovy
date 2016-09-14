package finance

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class BalanceController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Balance.list(params), model: [balanceCount: Balance.count()]
    }

    def show(Balance balance) {
        respond balance
    }

    @Transactional
    def save(Balance balance) {
        if (balance == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (balance.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond balance.errors, view: 'create'
            return
        }

        balance.save flush: true

        respond balance, [status: CREATED, view: "show"]
    }

    @Transactional
    def update(Balance balance) {
        if (balance == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (balance.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond balance.errors, view: 'edit'
            return
        }

        balance.save flush: true

        respond balance, [status: OK, view: "show"]
    }

    @Transactional
    def delete(Balance balance) {

        if (balance == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        balance.delete flush: true

        render status: NO_CONTENT
    }
}
