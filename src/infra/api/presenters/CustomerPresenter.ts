import { toXML } from "jstoxml"
import { OutputListCustomerDto } from "../../../usecase/customer/list/OutputListCustomerDto";

export default class CustomerPresenter {
    static listXML(data: OutputListCustomerDto): string {
        const xmlOptions = {
            header: true,
            indent: "  ",
            newline: "\n",
            allowEmpty: true,
        }

        return toXML(
            {
                customers: data.customers.map( it => ({
                    customer: {
                        id: it.id,
                        name: it.name,
                        address: {
                            street: it.address.street,
                            number: it.address.number,
                            city: it.address.city,
                            zip: it.address.zip
                        }
                    }
                }))
            },
            xmlOptions
        )
    }
}