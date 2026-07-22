"use client";

import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogTrigger } from "../../_components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import UpsertProductDialogContent from "./upsert-dialog-content";

const upsertProductButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger
        render={
          <Button>
            <PlusIcon />
            Novo Produto
          </Button>
        }
      />

      <UpsertProductDialogContent
        onSuccessSubmit={() => setDialogIsOpen(false)}
      />
    </Dialog>
  );
};

export default upsertProductButton;
