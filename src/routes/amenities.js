//import { Router } from "express";
import express from 'express';
import getAmenities from "../services/amenities/getAmenities.js";
import createAmenity from "../services/amenities/createAmenity.js";
import getAmenityById from "../services/amenities/getAmenityById.js";
import deleteAmenityById from "../services/amenities/deleteAmenityById.js";
import updateAmenityById from "../services/amenities/updateAmenityById.js";
import auth from "../middleware/auth.js";


//const router = Router();
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const {  name } = req.query;
    //console.log("id:",id)
    //console.log("name:",name)
    const amenities = await getAmenities( name);
    //console.log("amenities:", amenities)
    res.json(amenities);
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const {name} = req.body;
    const newAmenity = await createAmenity (name);
    res.status(201).json(newAmenity);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const amenity = await getAmenityById(id);

    if (!amenity) {
      res.status(404).json({ message: `Event with id ${id} not found` });
    } else {
      res.status(200).json(amenity);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const amenity = await deleteAmenityById(id);

    if (amenity) {
      res.status(200).send({
        message: `Amenity with id ${id} successfully deleted`,
      });
    } else {
      res.status(404).json({
        message: `Amenity with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const {name} = req.body;
    const amenity = await updateAmenityById(id, {name});

    if (amenity) {
      res.status(200).send({
        message: `Amenity with id ${id} successfully updated`,
      });
    } else {
      res.status(404).json({
        message: `Amenity with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;