"use client";

import { useState } from "react";
import AddPageModal from "./AddPageModal";

const AddPageButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="btn-primary" onClick={() => setOpen(true)}>
        +
      </button>
      <AddPageModal open={open} setOpen={setOpen} />
    </>
  );
};

export default AddPageButton;
