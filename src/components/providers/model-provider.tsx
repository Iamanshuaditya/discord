"use client";
import { useEffect, useState } from "react";
import CreateServerModel from "../models/create-server-model";
import InviteModal from "../models/invite-model";
import EditServerModal from "../models/edit-server-modal";
import MembersModel from "../models/members-modal";
import CreateChannelModal from "../models/create-channel-modal";
import LeaveServerModal from "../models/leave-server-modal";
import DeleteServerModal from "../models/delete-server-modal";

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
      <EditServerModal />
      <MembersModel />
      <CreateChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
    </>
  );
};

export default ModelProvider;
