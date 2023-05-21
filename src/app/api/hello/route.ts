// example route with each action you'd need...

// import { prisma } from "@/lib/prisma";
// export async function POST(request: Request) {
//   const { userId } = await request.json();
//   const post = await prisma.note.create({
//     data: {
//       title: "New note!",
//       content: "<h1>This is a new note!</h1>",
//       owner: { connect: { id: userId } },
//     },
//   });
//   return new Response(JSON.stringify(post));
// }
// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const id = searchParams.get("id");
//   const ownerId = searchParams.get("ownerId");
//   const post = await prisma.note.findFirst({
//     where: { AND: { id: id as string, ownerId: ownerId as string } },
//   });
//   return new Response(JSON.stringify(post));
// }
//
// export async function PUT(request: Request) {
//   const { id, updatedTitle, updatedContent } = await request.json();
//   if (updatedTitle) {
//     const post = await prisma.note.update({
//       where: { id },
//       data: { title: updatedTitle },
//     });
//     return new Response(JSON.stringify(post));
//   } else if (updatedContent) {
//     const post = await prisma.note.update({
//       where: { id },
//       data: { content: updatedContent },
//     });
//     return new Response(JSON.stringify(post));
//   } else
//     return new Response(JSON.stringify({ id, updatedTitle, updatedContent }));
// }
//
// export async function DELETE(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const id = searchParams.get("id");
//   const post = await prisma.note.delete({ where: { id: id as string } });
//   return new Response(JSON.stringify(post));
// }
