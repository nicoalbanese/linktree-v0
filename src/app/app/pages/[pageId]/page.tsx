"use client";
import AddLinkButton from "@/components/AddLinkButton";
import LinkEditor from "@/components/LinkEditor";
import { client } from "@/lib/ReactQuery";
import { fetch } from "@/lib/axios";
import { Page, Link as LinkType } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "react-query";

interface PageWithLinks extends Page {
  links: LinkType[];
}

const IndividualPage = ({
  params: { pageId },
}: {
  params: { pageId: string };
}) => {
  const router = useRouter();
  const { data: pageData, status } = useQuery({
    queryKey: pageId,
    queryFn: async () => {
      const res = await fetch.get("/api/pages", { params: { pageId } });
      return res.data as PageWithLinks;
    },
  });

  const deletePageMutation = useMutation({
    onSuccess: () => {
      client.invalidateQueries();
      router.push("/app/pages");
    },
    mutationFn: async ({ pageId }: { pageId: string }) => {
      await fetch.delete("/api/pages", { params: { pageId } });
    },
  });
  if (status == "loading") {
    return <div></div>;
  }

  return (
    <main>
      <Link href="/app/pages">back</Link>
      <div className="flex justify-between">
        <h1>{pageData?.title}</h1>
        <AddLinkButton pageId={pageId} />
      </div>
      <div>
        {pageData?.links.map((link) => (
          <LinkEditor key={link.id} LinkData={link} />
        ))}
      </div>
      <div>
        <button
          className="btn-primary mr-2"
          onClick={() => {
            navigator.clipboard.writeText(
              `${process.env.NEXT_PUBLIC_DOMAIN}/share/${pageId}`
            );
          }}
        >
          Copy Share Link
        </button>
        <button
          className="btn-danger"
          onClick={() => {
            deletePageMutation.mutate({ pageId });
          }}
        >
          Delete page
        </button>
      </div>
    </main>
  );
};
export default IndividualPage;
