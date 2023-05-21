import LinkComponent from "@/components/LinkComponent";

export const revalidate = 100;
const SharePage = async ({
  params: { pageId },
}: {
  params: { pageId: string };
}) => {
  const page = await prisma?.page.findFirst({
    where: { id: pageId },
    include: { links: true, user: { select: { name: true } } },
  });
  if (page) {
    return (
      <main>
        <h1>{page.title}</h1>
        <h3>by {page.user.name}</h3>
        {page.links.length > 0
          ? page.links.map((link) => <LinkComponent LinkData={link} />)
          : null}
      </main>
    );
  }
};
export default SharePage;
