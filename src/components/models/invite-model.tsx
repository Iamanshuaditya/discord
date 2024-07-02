"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { useModel } from "../../../hooks/use-model-store";

function InviteModal() {
  const { isOpen, onClose, type } = useModel();

  const isModelOpen = isOpen && type === "invite";

  return (
    <Dialog open={isModelOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Customize your server
          </DialogTitle>
          <DialogDescription className="text-ellipsis text-zinc-500">
            Give Your server a personality with a name and an image.You can
            always change it later.
          </DialogDescription>
        </DialogHeader>
        Invite Modal!
      </DialogContent>
    </Dialog>
  );
}

export default InviteModal;
