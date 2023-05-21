import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const pageId = searchParams.get("pageId");
  if (pageId) {
    const page = await prisma.page.findFirst({
      where: { id: pageId },
      include: { links: true },
    });
    return new Response(JSON.stringify(page));
  } else {
    const pages = await prisma.page.findMany({
      where: { userId: userId as string },
    });
    return new Response(JSON.stringify(pages));
  }
}

export async function POST(request: Request) {
  const { userId, title } = await request.json();
  const page = await prisma.page.create({
    data: {
      title,
      user: { connect: { id: userId } },
    },
  });
  return new Response(JSON.stringify(page));
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageId = searchParams.get("pageId");
  const page = await prisma.page.delete({ where: { id: pageId as string } });
  return new Response(JSON.stringify(page));
}
