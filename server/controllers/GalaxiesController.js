import BaseController from "../utils/BaseController";
import { galaxiesService } from "../services/GalaxiesService";

export class GalaxiesController extends BaseController {
  constructor() {
    super("api/galaxies");
    this.router
      .get("", this.getAll)
      .get("/:id", this.getById)
      .get("/:id/stars", this.getStarsbyGalaxyId)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete("/:id", this.delete)
  }

  /**
   * Sends found galaxies to a client by request
   * @param {import("express").Request} req 
   * @param {import("express").Response} res 
   * @param {import("express").NextFunction} next 
   */
  async getAll(req, res, next) {
    try {
      const galaxies = await galaxiesService.find(req.query)
      return res.send(galaxies);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Sends found galaxy to a client by request provided the Id from params
   * @param {import("express").Request} req 
   * @param {import("express").Response} res 
   * @param {import("express").NextFunction} next 
   */
  async getById(req, res, next){
    try {
        const galaxies = await galaxiesService.findOne({ _id: req.params.id})
        return res.send(galaxies)
    } catch (error) {
        next(error);
    }
  }
/**
 * Sends found stars to a client by request provided the Id from params for the galaxy
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
  async getStarsbyGalaxyId(req, res, next){
    try {
        const stars = await starsService.findStars({ galaxy: req.params.id })
        return res.send(stars)
    } catch (error) {
        next(error)
    }
  }

  /**
   * Creates a value from request body and returns it
   * @param {import("express").Request} req 
   * @param {import("express").Response} res 
   * @param {import("express").NextFunction} next 
   */
  async create(req, res, next) {
    try {
      const galaxy = await galaxiesService.create(req.body)
      res.send(galaxy);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next){
      try {
          req.body.id = req.params.id
          let data = await galaxiesService.edit(req.body)
          return res.send(data)
      } catch (error) {
          next(error)
      }
  }

  async delete(req, res, next){
      try {
          let data = await galaxiesService.delete(req.params.id)
          return res.send(data)
      } catch (error) {
          next(error)
      }
  }
}