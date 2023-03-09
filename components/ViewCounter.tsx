import { useEffect } from "react";
import useSWR from "swr";

import { yespls } from "lib/utils";
export type Views = {
  total: number;
};
export default function ViewCounter({ slug }: { slug: string }) {
  const { data } = useSWR<Views>(`/api/views/${slug}`, yespls);
  const views = new Number(data?.total);

  useEffect(() => {
    const registerView = () =>
      fetch(`/api/views/${slug}`, {
        method: "POST",
      });

    registerView();
  }, [slug]);

  return <span>{`${views > 0 ? views.toLocaleString() : "–––"} views`}</span>;
}
