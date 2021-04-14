import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class GalaxiesService {
    async find(query={}) {
        // left intentionally useless
        return await dbContext.Galaxies.find(query)
    }
    async findOne(id){
        let data = await dbContext.Galaxies.findOne({ _id: id})
        if (!data){
            throw new BadRequest("Invalid Id")
        }
        return data
    }

    async create(body) {
        return await dbContext.Galaxies.create(body)
    }

    async edit(body){
        let data = await dbContext.Galaxies.findByIdAndUpdate({ _id: body.id}, body, { new: true})
        if (!data){
            throw new BadRequest("Invalid Id")
        }
        return data
    }

    async delete(id){
        let data = await dbContext.Galaxies.findOneAndDelete({ _id : id})
        if(!data){
            throw new BadRequest("Invalid Id")
        }
        return "Succesfully Deleted!"
    }
  
}

export const galaxiesService = new GalaxiesService();