import { getToken } from '#auth'

export default defineEventHandler(async (event) => {
    const token = await getToken({ event })
    if(!token) return { code: 401, status: 'Missing token'}
    const query = await useQuery(event);
    const config = useRuntimeConfig();



    const settings = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token.email
      },
    };
  
    const { data } = await $fetch(
      `${config.STRAPI_BASE_URL}/api/profiles`, settings);
    return data;
  });
  