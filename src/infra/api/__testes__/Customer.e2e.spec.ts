import { app, sequelize } from "../express"
import request from "supertest"

describe("E2E test for customer", ()=> {
    beforeEach( async () => {
        await sequelize.sync({ force: true })
    })

    afterAll(async () =>{
        await sequelize.close()
    })

    it("shoud create a customer", async ()=> {
        const response = await request(app)
            .post("/customers")
            .send({
                name: "Fer",
                address: {
                    street: "Street",
                    number: "S/N",
                    zip:  "75804360",
                    city: "Jataí"
                }
            })

        expect(response.status).toBe(201)
    })


    it("shoud not create a customer", async ()=> {
        const response = await request(app)
            .post("/customers")
            .send({
                name: "Fer"
            })

        expect(response.status).toBe(500)
    })

    it("shoud list all customer", async ()=> {
        const response = await request(app)
            .post("/customers")
            .send({
                name: "Fer",
                address: {
                    street: "Street",
                    number: "S/N",
                    zip:  "75804360",
                    city: "Jataí"
                }
            })
        expect(response.status).toBe(201)

        const response2 = await request(app)
            .post("/customers")
            .send({
                name: "Lidy",
                address: {
                    street: "Street2",
                    number: "2",
                    zip:  "75804361",
                    city: "Jataí2"
                }
            })
        expect(response.status).toBe(201)

        const listResponse = await request(app).get("/customers").send()

        expect(listResponse.status).toBe(200)
        expect(listResponse.body.customers.length).toBe(2)

        expect(listResponse.body.customers[0].name).toBe("Fer")
        expect(listResponse.body.customers[0].address.street).toBe("Street")
        expect(listResponse.body.customers[0].address.number).toBe("S/N")
        expect(listResponse.body.customers[0].address.zip).toBe("75804360")
        expect(listResponse.body.customers[0].address.city).toBe("Jataí")

        expect(listResponse.body.customers[1].name).toBe("Lidy")
        expect(listResponse.body.customers[1].address.street).toBe("Street2")
        expect(listResponse.body.customers[1].address.number).toBe("2")
        expect(listResponse.body.customers[1].address.zip).toBe("75804361")
        expect(listResponse.body.customers[1].address.city).toBe("Jataí2")

        const listResponseXML = await request(app)
            .get("/customers")
            .set("Accept", "application/xml")
            .send()

        expect(listResponseXML.status).toBe(200)
        expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`)
        expect(listResponseXML.text).toContain(`<customers>`)
        expect(listResponseXML.text).toContain(`<customer>`)
        expect(listResponseXML.text).toContain(`<name>Fer</name>`)
        expect(listResponseXML.text).toContain(`<address>`)
        expect(listResponseXML.text).toContain(`<street>Street</street>`)
        expect(listResponseXML.text).toContain(`<number>S/N</number>`)
        expect(listResponseXML.text).toContain(`<city>Jataí</city>`)
        expect(listResponseXML.text).toContain(`<zip>75804360</zip>`)
        expect(listResponseXML.text).toContain(`</address>`)
        expect(listResponseXML.text).toContain(`</customers>`)
    })
})