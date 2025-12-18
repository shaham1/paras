import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  
  const newMessage = await prisma.transmission.create({
    data: {
      sender: body.sender,
      message: body.message,
    }
  });

  return NextResponse.json(newMessage);
}