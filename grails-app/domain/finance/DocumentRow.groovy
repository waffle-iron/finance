package finance

class DocumentRow {

    String product
    BigDecimal amount

    static belongsTo = [
            document: Document
    ]

    static constraints = {
    }
}
