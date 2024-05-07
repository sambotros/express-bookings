import { PrismaClient } from "@prisma/client";
import BadRequestError from "../../middleware/BadRequestError.js";
const createReview = async (
  userId,
  propertyId,
  rating,
  comment,) => {
    const ontbrekendeVelden = []
  if (!rating) {
     ontbrekendeVelden.push('crating');
  }
  
  if (ontbrekendeVelden.length > 0) {
      throw new BadRequestError("Er ontbreekt een veld");
  }
  const prisma = new PrismaClient();
  const newReview = {
    userId,
    propertyId,
    rating,
    comment,
  };
  
  const review = await prisma.review.create({
    data: newReview,
  });

  return review;
};

export default createReview;