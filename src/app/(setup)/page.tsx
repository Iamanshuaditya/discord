import InitalModel from "@/components/models/initial-model";
import { db } from "@/lib/db";
import { intialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

async function SetupPage() {
  const profile = await intialProfile();
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return <InitalModel />;
}

export default SetupPage;
