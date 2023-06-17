import { app, sequelize } from "../express"
import request from "supertest"

describe("E2E test for Product", ()=> {
    beforeEach( async () => {
        await sequelize.sync({ force: true })
    })

    afterAll(async () =>{
        await sequelize.close()
    })

    it("shoud create a product", async ()=> {
        const response = await request(app)
            .post("/products")
            .send({
                name: "Produto 1",
                price: 1250.00,
            })
        
        expect(response.status).toBe(201)
        expect(response.body.id).toBeDefined()
    })


    it("shoud not create a product when name is empty", async ()=> {
        const response = await request(app)
        .post("/products")
        .send({
            name: "",
            price: 1250.00,
        })

        expect(response.status).toBe(400)
    })

    
    it("shoud list all product", async ()=> {
        const response = await request(app)
            .post("/products")
            .send({
                name: "Produto 1",
                price: 1250.00,
            })
        expect(response.status).toBe(201)

        const response2 = await request(app)
            .post("/products")
            .send({
                name: "Produto 2",
                price: 150.00,
            })
        expect(response2.status).toBe(201)

        const listResponse = await request(app).get("/products").send()

        expect(listResponse.status).toBe(200)
        expect(listResponse.body.products.length).toBe(2)

        expect(listResponse.body.products[0].name).toBe("Produto 1")
        expect(listResponse.body.products[0].price).toBe(1250.00)

        expect(listResponse.body.products[1].name).toBe("Produto 2")
        expect(listResponse.body.products[1].price).toBe(150.00)
    })


    it("shoud get a product", async ()=> {
        const response = await request(app)
            .post("/products")
            .send({
                name: "Produto 10",
                price: 2250.00,
            })
        expect(response.status).toBe(201)

        const listResponse = await request(app).get(`/products/${response.body.id}`).send()

        expect(listResponse.status).toBe(200)

        expect(listResponse.body.id).toBe(response.body.id)
        expect(listResponse.body.name).toBe("Produto 10")
        expect(listResponse.body.price).toBe(2250.00)
    })


    it("shoud not find a product", async ()=> {
        const listResponse = await request(app).get("/products/c59b8639-bde5-4710-968f-8063e2a627ef").send()

        expect(listResponse.status).toBe(404)

        expect(listResponse.body.globalError).toBe("Não encontrado")
    })


    it("shoud update a product", async ()=> {
        const response = await request(app)
            .post("/products")
            .send({
                name: "Algarismo significativo",
                price: 42,
            })

        let productId = response.body.id

        const listResponse = await request(app).get(`/products/${productId}`).send()

        expect(listResponse.status).toBe(200)

        expect(listResponse.body.id).toBe(productId)
        expect(listResponse.body.name).toBe("Algarismo significativo")
        expect(listResponse.body.price).toBe(42)
        

        const responseUpdated = await request(app)
            .put(`/products/${productId}`)
            .send({
                name: "Algarismo duvidoso",
                price: 22.22,
            })

        expect(responseUpdated.status).toBe(204)

        const listResponseUpdated = await request(app).get(`/products/${productId}`).send()

        expect(listResponseUpdated.status).toBe(200)

        expect(listResponseUpdated.body.id).toBe(productId)
        expect(listResponseUpdated.body.name).toBe("Algarismo duvidoso")
        expect(listResponseUpdated.body.price).toBe(22.22)
    })


    it("shoud not update a product when name is empty", async ()=> {
        const response = await request(app)
            .put(`/products/c59b8639`)
            .send({
                name: "",
                price: 0.03,
            })
            
        expect(response.status).toBe(400)

        expect(response.body.globalError).toBe("Campo(s) inválido(s)")
    })
})