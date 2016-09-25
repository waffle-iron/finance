package finance

class Document {

    DocumentType type
    Account account
    Date date
    BigDecimal amount
    String description
    Set rows

    static hasMany = [
            rows: DocumentRow
    ]

    static constraints = {
    }
}
