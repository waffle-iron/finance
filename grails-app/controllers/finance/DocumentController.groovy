package finance

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class DocumentController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Document.list(params), model:[documentCount: Document.count()]
    }

    def show(Document document) {
        respond document
    }

    @Transactional
    def save(Document document) {
        if (document == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (document.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond document.errors, view:'create'
            return
        }

        document.save flush:true

        respond document, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Document document) {
        if (document == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (document.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond document.errors, view:'edit'
            return
        }

        document.save flush:true

        respond document, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Document document) {

        if (document == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        document.delete flush:true

        render status: NO_CONTENT
    }
}
