import {useQuery} from "@tanstack/react-query";
import {getUserById} from "../services/user-api.ts";

export function useUser(id: string | undefined) {
    return useQuery({
        queryKey: ['user', id],
        queryFn: () => getUserById(id || '0'),
    });
}