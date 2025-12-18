"use server"

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getMessages() {
  try {
    const messages = await prisma.transmission.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return messages
  } catch (error) {
    console.error("Database Error:", error)
    return []
  }
}