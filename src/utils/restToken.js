import axios from "axios";

export default async function getSessionToken() {
  let response;
  try {
    response = await axios.get(`${process.env.GATSBY_DRUPAL_URI}/session/token`);
    return response.data;
  } catch (err) {
    throw new Error("Error in getting X-CSRF-Token");
  }
}
