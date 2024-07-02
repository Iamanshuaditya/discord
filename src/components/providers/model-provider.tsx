"use client";
import { useEffect, useState } from "react";
import CreateServerModel from "../models/create-server-model";
import InviteModal from "../models/invite-model";

export const ModelProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <CreateServerModel />
      <InviteModal />
    </>
  );
};

export default ModelProvider;
