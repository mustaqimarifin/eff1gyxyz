import { useEffect } from 'react';
import useSWR from 'swr';

import { fetcher, yespls } from 'lib/utils';
export type Views = {
  total: number;
};
export default function ViewCounter({ slug }: { slug: string }) {
  const { data } = useSWR<Views>(`/api/page/${slug}`, fetcher);
  const views = new Number(data?.total);

  useEffect(() => {
    const registerView = () =>
      fetch(`/api/page/${slug}`, {
        method: 'POST',
      });

    registerView();
  }, [slug]);

  return <span>{`${views > 0 ? views.toLocaleString() : '–––'} views`}</span>;
}
