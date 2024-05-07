import { PrismaClient } from "@prisma/client";
import BadRequestError from "../../middleware/BadRequestError.js";
const createProperty = async (
    title,
    description,
    location,
    pricePerNight,
    bedroomCount,
    bathRoomCount,
    maxGuestCount,
    hostId,
    rating,) => {
  const prisma = new PrismaClient();
  const ontbrekendeVelden = []
if (!title) {
   ontbrekendeVelden.push('title');
}

if (ontbrekendeVelden.length > 0) {
    throw new BadRequestError("Er ontbreekt een veld");
}
  const newProperty = {
    title,
    description,
    location,
    pricePerNight,
    bedroomCount,
    bathRoomCount,
    maxGuestCount,
    hostId,
    rating,
  };

  const property = await prisma.property.create({
    data: newProperty,
  });

  return property;
};

export default createProperty;