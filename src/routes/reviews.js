//import { Router } from "express";
import express from 'express';
import getReviews from "../services/reviews/getReviews.js";
import createReview from "../services/reviews/createReview.js";
import getReviewtById from "../services/reviews/getReviewById.js";
import deleteReviewById from "../services/reviews/deleteReviewById.js";
import updateReviewById from "../services/reviews/updateReviewById.js";
import auth from "../middleware/auth.js";

//const router = Router();
const router = express.Router();
router.get("/", async (req, res, next) => {
  try {
    const { id, userId, propertyId,  rating, comment } = req.query;
    //console.log("id:",id)
   // console.log("name:",name)
    const reviews = await getReviews(id, userId, propertyId,  rating, comment );
   // console.log("users:", users)
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const {
              
      userId,
      propertyId,
      rating,
      comment,

    } = req.body;
    const newReview = await createReview(
             
     userId,
     propertyId,
     rating,
     comment,
    );
    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await getReviewtById(id);

    if (!review) {
      res.status(404).json({ message: `Review with id ${id} not found` });
    } else {
      res.status(200).json(review);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await deleteReviewById(id);

    if (review) {
      res.status(200).send({
        message: `Review with id ${id} successfully deleted`,
      });
    } else {
      res.status(404).json({
        message: `Review with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      userId, propertyId,  rating, comment

    } = req.body;
    const review = await updateReviewById(id, {
       userId, propertyId,  rating, comment
    });

    if (review) {
      res.status(200).send({
        message: `Review with id ${id} successfully updated`,
      });
    } else {
      res.status(404).json({
        message: `Review with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;