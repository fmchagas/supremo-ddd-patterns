import express, { Request, Response } from "express"
import CreateProductUseCase from "../../../usecase/product/create/CreateProductUseCase"
import ProductRepository from "../../product/repository/sequelize/ProductRepository"
import ListProductUseCase from "../../../usecase/product/list/ListProductUseCase"
import FindProductUseCase from "../../../usecase/product/find/FindProductUseCase"
import UpdateProductUseCase from "../../../usecase/product/update/UpdateProductUseCase"

export const productRoute = express.Router()

productRoute.post('/', async (req: Request, res: Response) => { 
    const usecase = new CreateProductUseCase(new ProductRepository())

    try {
        const productDto = {
            name: req.body.name,
            price: req.body.price
        }

        const output = await usecase.execute(productDto)

        res.status(201).send(output)
    } catch (err) {
        res.status(400).send()
    }
})

productRoute.get('/', async (req: Request, res: Response) => { 
    const usecase = new ListProductUseCase(new ProductRepository())
    const output = await usecase.execute()

    res.send(output) 
})

productRoute.get('/:id', async (req: Request, res: Response) => { 
    const usecase = new FindProductUseCase(new ProductRepository())
    
    try {
        const output = await usecase.execute({ id: req.params.id })

        res.send(output)
    } catch (err) {
        res.status(404).send({ "globalError": "Não encontrado" })
    }
})

productRoute.put('/:id', async (req: Request, res: Response) => { 
    const usecase = new UpdateProductUseCase(new ProductRepository())
    
    try {
        const productDto = {
            id: req.params.id,
            name: req.body.name,
            price: req.body.price
        }

        await usecase.execute(productDto)

        res.status(204).send()
    } catch (err) {
        res.status(400).send({ "globalError": "Campo(s) inválido(s)" })
    }
})