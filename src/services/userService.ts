import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

export interface CreateUserRequest {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

class UserService {

  async createUser(user: CreateUserRequest) {

    return await axios.post(API_URL, user);

  }

}

export default new UserService();