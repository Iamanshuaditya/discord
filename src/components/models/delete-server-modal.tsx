"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useModel } from "../../../hooks/use-model-store";

import { Button } from "../ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

function DeleteServerModal() {
  const { isOpen, onClose, type, data } = useModel();
  const router = useRouter();
  const isModelOpen = isOpen && type === "deleteServer";
  const { server } = data;
  const [isLoading, setisLoading] = useState(false);
  const onClick = async () => {
    try {
      setisLoading(true);
      await axios.delete(`/api/servers/${server?.id}`);
      onClose();
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };
  return (
    <Dialog open={isModelOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-00">
            Are u sure you want to this? <br />
            <span className="font-semibold text-indigo-500">
              {server?.name} will be permantly deleted.
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-center w-full">
            <Button disabled={isLoading} onClick={onClose} variant={"ghost"}>
              Cancel
            </Button>
            <Button disabled={isLoading} variant={"primary"} onClick={onClick}>
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteServerModal;
