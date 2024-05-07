import { PrismaClient } from "@prisma/client";

const getProperties = async (location,
  pricePerNight, amenities ) => {
  console.log("loction:", location)
  const prisma = new PrismaClient();
  const properties = await prisma.property.findMany({
    where: {
      location: location ? { contains: location } : undefined,
      pricePerNight: parseFloat(pricePerNight) ? parseFloat(pricePerNight) : undefined,
    }
    })

  console.log("properties:", properties);
  return properties;
};

export default getProperties;