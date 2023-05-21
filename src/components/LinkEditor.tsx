import { useState } from "react";
import { Link as LinkType } from "@prisma/client";
import { fetch } from "@/lib/axios";
import { client } from "@/lib/ReactQuery";

const LinkEditor = ({ LinkData }: { LinkData: LinkType }) => {
  const [editing, setEditing] = useState(false);
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    //@ts-expect-error
    const submitEvent = event.nativeEvent.submitter.value as "Save" | "Delete";
    const form = new FormData(target);
    const formData = Object.fromEntries(form.entries()) as {
      title: string;
      url: string;
    };
    console.log(formData);

    if (submitEvent == "Delete") {
      await fetch.delete("/api/links", { params: { linkId: LinkData.id } });
    }
    if (submitEvent == "Save") {
      if (LinkData.title !== formData.title || LinkData.url !== formData.url)
        await fetch.put("/api/links", { ...formData, linkId: LinkData.id });
    }
    client.invalidateQueries();

    setEditing(false);
    target.reset();
  };

  if (editing) {
    return (
      <form className="my-4 py-4" onSubmit={handleSubmit}>
        <div>
          <label>Link Title</label>
          <input type="text" name="title" defaultValue={LinkData.title} />
        </div>
        <div>
          <label>URL</label>
          <input type="text" name="url" defaultValue={LinkData.url} />
        </div>
        <div className="flex">
          <div className="mr-2">
            <input type="submit" value="Save" className="btn-success" />
          </div>
          <div>
            <input type="submit" value="Delete" className="btn-danger" />
          </div>
        </div>
      </form>
    );
  }
  return (
    <div className="flex justify-between my-4 border-b border-slate-100 py-4">
      <div>
        <div>{LinkData.title}</div>
        <div>{LinkData.url}</div>
      </div>
      <div>
        <button className="btn-secondary" onClick={() => setEditing(true)}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default LinkEditor;
