import BLOG from "blog.config";
import Vercel from "components/Vercel";
import clsx from "clsx";
import { Akhyla } from "./Icon";
type Props = {
  fullWidth?: boolean;
};

const Footer: React.FC<Props> = (fullWidth) => {
  const d = new Date();
  const y = d.getFullYear();
  const from = +BLOG.since;
  return (
    <div
      className={clsx(
        "mt-6 flex-shrink-0 m-auto w-full text-gray-500 dark:text-gray-400 transition-all",
        {
          "px-4 md:px-24": fullWidth,
          "max-w-2xl px-4": !fullWidth,
        }
      )}
    >
      <hr className="border-gray-200 dark:border-gray-600" />
      <div className="my-4 text-sm leading-6">
        <div className="flex align-baseline justify-between flex-wrap">
          <p>
            © {BLOG.author} {from === y || !from ? y : `${from} - ${y}`}
          </p>
          <Akhyla className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
