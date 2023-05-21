"use client";

import { useState } from "react";
import AddLinkModal from "./AddLinkModal";

const AddLinkButton = ({ pageId }: { pageId: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="btn-primary" onClick={() => setOpen(true)}>
        +
      </button>
      <AddLinkModal open={open} setOpen={setOpen} pageId={pageId} />
    </>
  );
};

export default AddLinkButton;
