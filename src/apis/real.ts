import axios from "./base"
import { UserLoginDTO, UserLoginVO } from "./type";

export const apisReal = {
  /**
   * /api/user-login
   */
  userLogin: (data: UserLoginDTO) => axios.post<UserLoginVO>("/api/user-login", data),
}

export default apisReal