import { BLOG } from "blog.config";
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
        "m-auto mt-6 w-full flex-shrink-0 text-gray-500 transition-all dark:text-gray-400",
        {
          "px-4 md:px-24": fullWidth,
          "max-w-2xl px-4": !fullWidth,
        }
      )}
    >
      <hr className="border-gray-200 dark:border-gray-600" />
      <div className="my-4 text-sm leading-6">
        <div className="flex flex-wrap justify-between align-baseline">
          <p>
            © {BLOG.author} {from === y || !from ? y : `${from} - ${y}`}
          </p>
          <Akhyla className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
