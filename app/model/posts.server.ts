import { prisma, PrismaClient } from "@prisma/client";

export  async function getPosts() {
  const prisma = new PrismaClient();
  return prisma.post.findMany();
}
export  async function getPostsHome() {
    const prisma = new PrismaClient();
    return prisma.post.findMany({
        select :{
            slug:true ,
            title:true
        }
    });
  }

export function getPostBasedSlug(slug:string)
{
    const prisma = new PrismaClient();
    return prisma.post.findUnique({
        where:{slug}
    })
}