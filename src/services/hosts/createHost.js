import { PrismaClient } from "@prisma/client";
import BadRequestError from "../../middleware/BadRequestError.js";
const createHost = async (
  username,
  password,
  name,
  email,
  phoneNumber, 
  profilePicture,
  aboutMe,) => {
  const prisma = new PrismaClient();
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
  const newHost = {
    username,
    password,
    name,
    email,
    phoneNumber, 
    profilePicture,
    aboutMe,
     };

  const host = await prisma.host.create({
    data: newHost,
  });

  return host;
};

export default createHost;