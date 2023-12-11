import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useUser() {
  const { data, error, mutate } = useSWR("api/users/me");
  //   const { data, error, mutate } = useSWR("api/users/me", fetcher);
  const router = useRouter();

  useEffect(() => {
    if (data && !data.ok) router.replace("/enter");
  }, [data]);

  return { user: data?.profile, isLoading: !data && !error };
  //   const [user, setUser] = useState();
  //   useEffect(() => {
  //     fetch("api/users/me")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (!data.ok) return router.replace("/enter");
  //         setUser(data.profile);
  //       });
  //   }, [router]);

  //   return user;
}
