package finance

class Balance {

    Date date
    BigDecimal amount

    static belongsTo = [
            account: Account
    ]

    static constraints = {
    }
}
