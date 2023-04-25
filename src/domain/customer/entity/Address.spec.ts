import Address from "./Address"

describe("Address unit tests", () => {
    
    it("should throw error when street is empty", () => {
        expect(() =>{
            new Address("", "n123", "75801360", "Jataí")
        }).toThrowError("Street is required")
    })

    it("should throw error when number is empty", () => {
        expect(() =>{
            new Address("Street", "", "75801360", "Jataí")
        }).toThrowError("Number is required")
    })

    it("should throw error when zip is empty", () => {
        expect(() =>{
            new Address("Street", "n123", "", "Jataí")
        }).toThrowError("Zip is required")
    })

    it("should throw error when city is empty", () => {
        expect(() =>{
            new Address("Street", "n123", "75801360", "")
        }).toThrowError("City is required")
    })

    it("should create an address", () => {
        const address = new Address("Street", "n123", "75801360", "Jataí")

        expect(address.street).toBe("Street")
        expect(address.number).toBe("n123")
        expect(address.zip).toBe("75801360")
        expect(address.city).toBe("Jataí")
    })

    it("should obtain complete address", () => {
        const address = new Address("Street", "n123", "75801360", "Jataí")

        expect(address.toString()).toBe("Street, n123, Jataí, zip - 75801360")
    })

    it("should obtain complete address", () => {
        const address = new Address("Street", "n123", "75801360", "Jataí")
        
        expect(address.toJson()).toMatchSnapshot()
    })
})