export default async function IntroDynamicPromise() {
  interface User {
    id: string;
    name: string;
    email: string;
  }
  const userPromiseCache = new Map<string, Promise<User>>();

  function fetchUser(id: string) {
    const userPromise = userPromiseCache.get(id) ?? fetchUserImpl(id);
    userPromiseCache.set(id, userPromise);
    return userPromise;
  }

  async function fetchUserImpl(id: string) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
    );
    if (!response.ok) {
      return Promise.reject(new Error(await response.text()));
    }
    const user = await response.json();
    return user as User;
  }

  const user = await fetchUser('7');

  return (
    <div>
      <h2>Intro Dynamic Promise</h2>
      <a
        className="text-gray-400 mb-4 block hover:text-blue-600"
        href="https://github.com/brunar/epic-br/tree/main/src/app/suspense/intro-dynamic-promise"
        target="_blank"
      >
        (See readme.mdx)
      </a>
      <div>Username from API:</div>
      <a
        className="text-sm mb-4 block text-gray-500"
        href="https://jsonplaceholder.typicode.com/users/"
        target="_blank"
      >
        https://jsonplaceholder.typicode.com/users/
      </a>
      <p>
        Username: <b>{user.name}</b>
      </p>
      <p>Email: {user.email}</p>
      <p>Id: {user.id}</p>
    </div>
  );
}
