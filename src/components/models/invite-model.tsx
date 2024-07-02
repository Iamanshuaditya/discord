"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useModel } from "../../../hooks/use-model-store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "../../../hooks/use-origin";
import axios from "axios";

function InviteModal() {
  const { onOpen, isOpen, onClose, type, data } = useModel();
  const origin = useOrigin();
  const isModelOpen = isOpen && type === "invite";
  const { server } = data;
  const [copied, setCopied] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onNew = async () => {
    try {
      setisLoading(true);
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`
      );
      onOpen("invite", { server: response.data });
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
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs text-zinc-500 font-bold dark:text-secondary/70">
            Server invite link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              disabled={isLoading}
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              value={inviteUrl}
            />
            <Button disabled={isLoading} size={"icon"} onClick={onCopy}>
              {copied ? <Check /> : <Copy className="w-4 h-4" />}
            </Button>
            <Button
              onClick={onNew}
              disabled={isLoading}
              variant="link"
              size="sm"
              className="text-xs text-zinc-500 mt-4"
            >
              Generate a new link
              <RefreshCw className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default InviteModal;
