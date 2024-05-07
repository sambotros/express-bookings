import { PrismaClient } from "@prisma/client";
import BadRequestError from "../../middleware/BadRequestError.js";
const createBooking = async (
  userId,
  propertyId,
    checkinDate,
    checkoutDate,
    numberOfGuests,
    totalPrice,
    bookingStatus,) => {
  const prisma = new PrismaClient();
  const ontbrekendeVelden = []
  if (!checkinDate) {
     ontbrekendeVelden.push('checkinDate');
  }
  
  if (ontbrekendeVelden.length > 0) {
      throw new BadRequestError("Er ontbreekt een veld");
  }
  const newBooking = {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
  };

  const booking = await prisma.booking.create({
    data: newBooking,
  });
  
  return booking;
};

export default createBooking;