import { getProfile, logout } from "./actions";

export default async function Profile() {
  const user = await getProfile();

  return (<>
    <ul>
      <li>username: {user?.username}</li>
      <li>email: {user?.email}</li>
      <li>bio: {user?.bio}</li>
    </ul>

    <form action={logout}>
      <button>log out</button>
    </form>
  </>)
}