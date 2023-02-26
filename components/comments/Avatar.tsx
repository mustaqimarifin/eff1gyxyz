import React from "react";
import cn from "clsx";
//import { definitions } from 'types/supabase';
import Image from "next/image";

import { Komment } from "types";
import { User } from "@supabase/auth-helpers-nextjs"
import { DisplayUser } from "hooks/api"

interface Props {
  comment?: Komment;
  user?: DisplayUser
  className?: string | { [key: string]: any };
  isDeleted?: boolean;
  firstLetter?: string;
}

const Avatar = ({
  comment,
  user,
  className = "w-7 h-7 text-sm",
  isDeleted,
  firstLetter,
}: Props): JSX.Element => {
  if (isDeleted) {
    return (
      <div
        className={cn(
          "rounded-full border border-white shadow-sm bg-gray-500",
          className
        )}
      ></div>
    );
  }

  if (firstLetter) {
    return (
      <div
        className={cn(
          "rounded-full border border-white bg-indigo-600 text-white shadow-sm flex items-center justify-center capitalize font-light",
          className
        )}
      >
        {firstLetter}
      </div>
    );
  }
  if (comment?.image) {
    return (
      <Image
        src={comment.image}
        className={cn(
          "rounded-full border border-white shadow-sm object-cover",
          className
        )}
        alt={comment.name}
        width={28}
        height={28}
      />
    );
  }

  if (user?.avatar) {
    return (
      <Image
        src={user.avatar}
        className={cn(
          "rounded-full border border-white shadow-sm object-cover",
          className
        )}
        alt={user.name}
        width={28}
        height={28}
      />
    );
  }

  if (user?.name) {
    return (
      <div
        className={cn(
          "rounded-full border border-white bg-indigo-600 text-white shadow-sm flex items-center justify-center capitalize font-light",
          className
        )}
      >
        {user.name}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "skeleton rounded-full border border-white bg-indigo-600 text-white shadow-sm flex items-center justify-center capitalize font-light",
        className
      )}
    ></div>
  );
};

export default Avatar;
