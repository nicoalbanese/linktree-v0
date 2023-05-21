import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageId = searchParams.get("pageId");
  const links = await prisma.link.findFirst({
    where: { pageId: pageId as string },
  });
  return new Response(JSON.stringify(links));
}
export async function POST(request: Request) {
  const { pageId, title, url } = await request.json();
  const link = await prisma.link.create({
    data: {
      title,
      url,
      page: { connect: { id: pageId } },
    },
  });
  return new Response(JSON.stringify(link));
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const linkId = searchParams.get("linkId");
  const link = await prisma.link.delete({ where: { id: linkId as string } });
  return new Response(JSON.stringify(link));
}

export async function PUT(request: Request) {
  const { linkId, title, url } = await request.json();
  console.log("calling with", linkId, title, url);
  const link = await prisma.link.update({
    where: { id: linkId },
    data: { title, url },
  });
  return new Response(JSON.stringify(link));
}
