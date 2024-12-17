import { useState } from "react";
import { localStorageService } from "../services/localStorageService";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    try {
      const isValid = localStorageService.verifyCredentials(username, password);
      if (isValid) {
        setIsAuthenticated(true);
        setError(null);
        return true;
      } else {
        setError("Invalid credentials");
        return false;
      }
    } catch (err) {
      setError("An error occurred during login");
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    error,
    login,
    logout,
  };
};
