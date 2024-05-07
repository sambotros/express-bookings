import { PrismaClient } from "@prisma/client";

const getUsers = async (username, email) => {
  //console.log("getUsers function");
  const prisma = new PrismaClient();
  
  const users = await prisma.user.findMany({
    where: {
      username: username ? { contains: username } : undefined,
      email: email ? { contains: email } : undefined,
    }
    })
 // console.log("getUsers users:", users)
  return users;
};

export default getUsers;

