import { PrismaClient } from "@prisma/client";

const getBookings = async (userId) => {
  const prisma = new PrismaClient();
  console.log("userId:", userId)
  const bookings = await prisma.booking.findMany({
    where: {
     
      userId: {
       contains: userId, 
      },
     
    }
  })
  console.log("bookings:", bookings)
   return bookings;
   

};

export default getBookings;