import {  PrismaClient , Post } from "@prisma/client";
const prisma = new PrismaClient();

export  async function getPosts() {
  return prisma.post.findMany();
}
export  async function getPostsHome() {
    return prisma.post.findMany({
        select :{
            slug:true ,
            title:true
        }
    });
  }

export function getPostBasedSlug(slug:string)
{
    return prisma.post.findUnique({
        where:{slug}
    })
}
export async function createPost(post : Pick<Post,"slug"| "title" | "markdown">)
{
   return prisma.post.create({data:post})
}