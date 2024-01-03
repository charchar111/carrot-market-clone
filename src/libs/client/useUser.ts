import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useUser() {
  const { data, isLoading, error } = useSWR("/api/users/me");
  const router = useRouter();
  useEffect(() => {
    if (data && !data.ok) router.replace("/enter");
  }, [data]);

  return { user: data?.profile, isLoading: isLoading, error };
}
