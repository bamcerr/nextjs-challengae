import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  id?: number
}

export const getSession = async () => getIronSession<SessionContent>(cookies(), {
  cookieName: "user",
  password: process.env.COOKIE_PASSWORD!
});

export const loginSession = async (id: number) => {
  const session = await getSession();
  session.id = id;
  await session.save();
}

export const logoutSession = async () => {
  const session = await getSession();
  await session.destroy()
}