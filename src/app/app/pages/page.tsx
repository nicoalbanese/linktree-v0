"use client";
import AddPageButton from "@/components/AddPageButton";
import { useQuery } from "react-query";
import { fetch } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { Page } from "@prisma/client";
import Link from "next/link";

const Pages = () => {
  const session = useSession();
  const { data: pages, status: queryStatus } = useQuery({
    queryKey: "pages",
    queryFn: async () => {
      const res = await fetch.get("/api/pages", {
        params: { userId: session.data?.user.id },
      });
      return res.data as Page[];
    },
    enabled: session.status === "authenticated",
  });
  if (queryStatus == "success") {
    return (
      <main>
        <div className="flex justify-between">
          <h1>Pages</h1>
          <AddPageButton />
        </div>
        <div className="mt-2">
          {(pages?.length as number) > 0 ? (
            <ul>
              {pages?.map((page) => (
                <li key={page.id}>
                  <Link href={`/app/pages/${page.id}`}>{page.title}</Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No pages yet...</p>
          )}
        </div>
      </main>
    );
  } else {
    return <main>loading...</main>;
  }
};

export default Pages;
