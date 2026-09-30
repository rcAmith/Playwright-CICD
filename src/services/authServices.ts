import { buildLoginPayload } from "../utils/apiHelpers";
import { ApiService } from "./apiService";

export class AuthService {
  constructor(private apiService: ApiService) {}

  async login({ email, password }: { email: string; password: string }) {
    return this.apiService.post(
      "/verifyLogin",
      buildLoginPayload(email, password),
    );
  }
}
