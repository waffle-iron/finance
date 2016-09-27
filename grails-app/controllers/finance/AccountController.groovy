package finance

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class AccountController {

    def accountService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Account.list(params), model: [accountCount: Account.count()]
    }

    def show(Account account) {
        respond account
    }

    @Transactional
    def save(Account account) {
        if (account == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        accountService.save account

        if (account.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond account.errors, view: 'create', status: UNPROCESSABLE_ENTITY
            return
        }

//        account.save flush: true

        respond account, [status: CREATED, view: "show"]
    }

    @Transactional
    def update(Account account) {
        if (account == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (account.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond account.errors, view: 'edit', status: UNPROCESSABLE_ENTITY
            return
        }

        account.save flush: true

        respond account, [status: OK, view: "show"]
    }

    @Transactional
    def delete(Account account) {

        if (account == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        accountService.delete account

        if (account.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond account.errors, status: FAILED_DEPENDENCY
            return
        }

//        account.delete flush: true

        render status: NO_CONTENT
    }
}
