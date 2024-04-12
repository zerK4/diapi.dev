"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { createPortal } from "react-dom";

function AddKey() {
  const [teleport, setTeleport] = useState<Element | null>(null);

  useEffect(() => {
    const el = document.getElementById("page-banner-children");
    if (!el) {
      setTeleport(null);
      return;
    }
    setTeleport(el);

    createPortal(
      <div id='added-key'>
        <Button>
          <Plus size={16} />
          Add API Key
        </Button>
      </div>,
      el as Element
    );

    console.log(el, teleport, "ads");
  }, [teleport]);

  return null;
}

export default AddKey;
