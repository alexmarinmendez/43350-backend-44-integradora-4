import PizzaModel from '../models/pizza.model.js'
import { logger } from '../utils/logger.js'

export default class PizzaService {
    get = async() => await PizzaModel.find()
    getById = async(id) => await PizzaModel.findById(id)
    create = async(object) => {
        try {
            if (!object.name) throw "Must get a name"
            return await PizzaModel.create(object)
        } catch(err) {
            logger.error(err)
            return {}
        }
    }
    update = async(id, object) => await PizzaModel.updateOne({ _id: id }, { $set: object })
    delete = async(id) => await PizzaModel.deleteOne({ _id: id })
}