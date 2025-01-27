import jwtDecode, { JwtPayload } from "jwt-decode";
import { getValueFor, saveItem } from "./SecureStore";
import { BASE_URL } from "./swr";

interface decodedToken {
  exp:number;
  iat:number;
  id:string;
}

export default async function getAccessToken() {
  try {
    const accessToken = await getValueFor("accessToken");

    // console.log(accessToken, 'accessToken')

    return accessToken;
  } catch(err) {
    // console.log(err)
  }
}