import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
export const revalidate = 0;

const Protected = async () => {
  const session = await getServerSession(authOptions);
  const updateName = async (formData: FormData) => {
    "use server";
    await prisma.user.update({
      where: { id: session?.user.id as string },
      data: { name: formData.get("name")?.toString() },
    });
    revalidatePath("/protected");
  };
  return (
    <main>
      <p>This page requires you to be signed in</p>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <div className="border-t-2 border-slate-100 my-4 py-4">
        <h3>Update Profile</h3>{" "}
        <form action={updateName}>
          <div>
            <label>Name</label>
            <input
              type="text"
              defaultValue={(session?.user.name as string) ?? ""}
              name="name"
            />
          </div>
          <div>
            <input type="submit" className="btn-primary" />
          </div>
        </form>
      </div>
    </main>
  );
};
export default Protected;
