import { Link as LinkType } from "@prisma/client";
import Link from "next/link";

const LinkComponent = ({ LinkData }: { LinkData: LinkType }) => {
  return (
    <div className="bg-slate-100 p-4 my-2">
      <div>{LinkData.title}</div>
      <div>
        <Link href={LinkData.url}>{LinkData.url}</Link>
      </div>
    </div>
  );
};
export default LinkComponent;
