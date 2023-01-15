import { prisma, PrismaClient } from "@prisma/client";

export default async function getPosts() {
  const prisma = new PrismaClient();
  return prisma.post.findMany();
}

export function getPostBasedSlug(slug:string)
{
    const prisma = new PrismaClient();
    return prisma.post.findUnique({
        where:{slug}
    })
}