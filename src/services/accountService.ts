import { ApiService } from "./apiService";
import {
  buildAccountPayload,
  buildDeletePayload,
  buildUpdatePayload,
} from "../utils/apiHelpers";

export class AccountService {
  constructor(private apiService: ApiService) {}

  async createUser(email: string,password: string = 'Password123') {
    const payload = buildAccountPayload(email, password);
    return this.apiService.post("/createAccount", payload);
  }

  async deleteUser(email: string,password: string = 'Password123') {
    const payload = buildDeletePayload(email, password);
    return this.apiService.delete("/deleteAccount", payload);
  }

  async updateUser(email: string, firstName: string, lastName: string) {
    const payload = buildUpdatePayload(email, firstName, lastName);

    return this.apiService.put("/updateAccount", payload);
  }

  async getUserByEmail(email: string) {
    return this.apiService.get("/getUserDetailByEmail", { email });
  }
}
