import { fetchCurrentUser } from "@/api/user";
import { useQuery } from "@tanstack/react-query";

export const currentUserKey = ["currentUser"];

export function useCurrentUser() {
  return useQuery({ queryKey: currentUserKey, queryFn: fetchCurrentUser });
}
