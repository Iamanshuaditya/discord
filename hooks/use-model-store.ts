import { Channel, ChannelType, Server } from "@prisma/client";
import { create } from "zustand";

export type ModelType = "createServer" | "invite" | "editServer" | "members" | "createChannel" | "leaveServer" | "deleteServer" | "deleteChannel" | "editChannel" | "messageFile" | "deleteMessage"

interface ModalData {
    server?: Server;
    channel?: Channel;
    channelType?: ChannelType;
    apiUrl?: string;
    query?: Record< string ,any>

}

interface ModelStore {
    type: ModelType | null;
    data: ModalData
    isOpen: boolean;
    onOpen: (type: ModelType,data?:ModalData) => void
    onClose: () => void
}

export const useModel = create<ModelStore>((set)=>({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type,data = {}) => set({ isOpen: true, type,data }),
    onClose:  () => set({type: null, isOpen: false})

}))