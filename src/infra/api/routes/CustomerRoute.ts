import express, { Request, Response } from "express"
import CreateCustomerUseCase from "../../../usecase/customer/create/CreateCustomerUseCase"
import ListCustomerUseCase from "../../../usecase/customer/list/ListCustomerUseCase"
import CustomerRepository from "../../customer/repository/sequelize/CustomerRepository"
import CustomerPresenter from "../presenters/CustomerPresenter"


export const customerRoute = express.Router()

customerRoute.post('/', async (req: Request, res: Response) => {

    const usecase = new CreateCustomerUseCase(new CustomerRepository())

    try {
        const customerDto = {
            name: req.body.name,
            active: false,
            address: {
                street: req.body.address.street,
                number: req.body.address.number,
                zip:  req.body.address.zip,
                city: req.body.address.city
            }
        }

        await usecase.execute(customerDto)

        res.status(201).send()
    } catch (err) {
        res.status(500).send()
    }
})

customerRoute.get('/', async (req: Request, res: Response) => {

    const usecase = new ListCustomerUseCase(new CustomerRepository())
    const customers = await usecase.execute()
    
    // O retorno do DTO <> Resultado API
    // Tudo é JSON. E se eu quiser o resultado em XML?

    res.format({
        json: async () => res.send(customers),
        xml: async () => res.send(CustomerPresenter.listXML(customers))
    })
})