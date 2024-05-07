import { PrismaClient } from "@prisma/client";
import BadRequestError from "../../middleware/BadRequestError.js";
const createAmenity = async ( name) => {
  
  const ontbrekendeVelden = []
  if (!name) {
     ontbrekendeVelden.push('name');
  }
  
  if (ontbrekendeVelden.length > 0) {
      throw new BadRequestError("Er ontbreekt een veld");
  }
  const prisma = new PrismaClient();
  const newAmenity = {
    name,
  };
  const amenity = await prisma.amenity.create({
    data: newAmenity,
  });

  return amenity;
};

export default createAmenity;