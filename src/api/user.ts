import { User } from "@/api/types";

const defaultUser: User = {
  id: 73,
  name: "Nathan Fielder",
  balance: 300,
  tier: "silver",
};
export async function fetchCurrentUser(): Promise<User> {
  return defaultUser;
}
