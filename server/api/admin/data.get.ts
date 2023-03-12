import { getToken, getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) return { status: "unauthenticated!" };

  const config = useRuntimeConfig();
  const token = await getToken({ event });
  const query = await getQuery(event);

  const settings = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Ensure that the JWT tokens are encoded, when you are passing it around.
      Authorization: "Bearer " + token.email,
    },
  };

  const { data } = await $fetch(
    `${config.STRAPI_BASE_URL}/api/articles`,
    settings
  );
  return data;
});
