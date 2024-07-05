import { db } from "@/lib/db"
export const getOrCreateConversations = async (memberOneId: string, memberTwoId: string) => { 
    let conversation = await findConversation(memberOneId,memberTwoId) || await findConversation(memberTwoId,memberOneId)
    if (!conversation) {
    conversation = await createNewConversations(memberOneId,memberTwoId)  
    }
    return conversation
}
const findConversation = async (memberOneId: string, memberTwoId: string) => {
    try {
        return await db.conversation.findFirst({
            where: {
                AND: [
                    { memberOneId: memberOneId },
                    {memberTwoId: memberTwoId}
                ]
            },
            include:{
                memberOne: {
                    include: {
                       profile: true
                   }
                }, 
                memberTwo: {
                    include: {
                        profile: true
                    }
                }
            }
        })
    } catch (error) {
       return null
    }
 
}

const createNewConversations = async (memberOneId: string, memberTwoId: string) => {
    try {
        return db.conversation.create({
            data: {
                memberOneId,
                memberTwoId
            },
            include: {
                memberOne: {
                    include: {
                        profile: true
                    }
                },
                memberTwo: {
                    include: {
                        profile: true
                    }
                }
            }
        })
    } catch (error) {
        return null
    }
 }