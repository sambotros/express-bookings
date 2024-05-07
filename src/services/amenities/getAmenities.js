import { PrismaClient } from "@prisma/client";

const getAmenities = async (id) => {
  console.log("getAmenities function");
  const prisma = new PrismaClient();
  const amenities = await prisma.amenity.findMany({
    where: {
      id,
      
    }
  })
   
 // console.log("getAmenities amenities:", amenities);
  return amenities;
};

export default getAmenities;