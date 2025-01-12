import getAccessToken from "./getAccessToken";
import { BASE_URL } from "./swr";
// import fetch from 'unfetch'

export async function loginFetcher(url:string) {
  const accessToken = await getAccessToken();
  if(!accessToken || accessToken === undefined) {
    return {
      statusCode: 401,
      name: "UnauthorizedException",
      message: "User does not logined"
    }
  }
  else {
    return fetch(BASE_URL + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": accessToken,
      },
      body: JSON.stringify({
        token: accessToken + ''
      })
    }).then((response) => response.json())
  }
}