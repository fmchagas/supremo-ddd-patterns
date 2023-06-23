import Notification from "./Notification"

describe("Unit testes for notificatons", ()=> {
  

    it("shold create erros and filter by context", ()=> {
        const notification = new Notification()
        
        const errorContextCustomer = {
            message: "Name is required",
            context: "customer"
        }

        notification.addError(errorContextCustomer)

        expect(notification.messages("customer")).toBe("customer: Name is required,")

        const errorContextCustomer2 = {
            message: "error message2",
            context: "customer"
        }

        notification.addError(errorContextCustomer2)

        expect(notification.messages("customer")).toBe("customer: Name is required,customer: error message2,")


        const errorContextProduct = {
            message: "Price is required",
            context: "product"
        }

        notification.addError(errorContextProduct)

        expect(notification.messages("customer")).toBe("customer: Name is required,customer: error message2,")
        expect(notification.messages("product")).toBe("product: Price is required,")

        expect(notification.messages()).toBe("customer: Name is required,customer: error message2,product: Price is required,")
    })

    it("shold check if notification has least one error", ()=> {
        const notification = new Notification()
        
        const errorContextCustomer = {
            message: "Name is required",
            context: "customer"
        }

        notification.addError(errorContextCustomer)

        expect(notification.hasErrors()).toBe(true)
    })

    it("shold get all errors props", ()=> {
        const notification = new Notification()
        
        const errorContextCustomer = {
            message: "Name is required",
            context: "customer"
        }

        notification.addError(errorContextCustomer)

        expect(notification.errors()).toEqual([errorContextCustomer])
    })
})