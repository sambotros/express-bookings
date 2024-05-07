import { PrismaClient } from "@prisma/client";
import BadRequestError from "../../middleware/BadRequestError.js";
const createUser = async (username, password, name, email, phoneNumber, profilePicture) => {
  
  const ontbrekendeVelden = []
  if (!username) {
     ontbrekendeVelden.push('username');
  }
  if (!password) {
      ontbrekendeVelden.push('password');
  }
  if (ontbrekendeVelden.length > 0) {
    throw new BadRequestError("Er ontbreekt een veld");
  }
  const prisma = new PrismaClient();
  const newUser = {
    username, 
    password, 
    name, 
    email, 
    
    phoneNumber, 
    profilePicture
  };
  const user = await prisma.user.create({
    data: newUser,
  });

  return user;
};

export default createUser;