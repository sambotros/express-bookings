import { PrismaClient } from "@prisma/client";

const getHosts = async (username, name) => {
  const prisma = new PrismaClient();
  const hosts = await prisma.host.findMany({
    where: {
      username:{
        contains: username
      },
    name:{
      contains: name, 
    },
    
   
    }
  })
  return hosts;
}
  //return hosts;


export default getHosts;