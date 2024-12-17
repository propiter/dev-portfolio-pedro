import { StorageBase } from "./storageBase";

class AuthStorage extends StorageBase {
  verifyCredentials({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    const data = this.getData();
    if (data.auth.username === username && data.auth.password === password) {
      return { token: crypto.randomUUID() };
    }
    throw new Error("Invalid credentials");
  }
}

export const authStorage = new AuthStorage();
