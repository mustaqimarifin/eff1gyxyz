import { Comment } from "hooks/api";
import React, { createContext, useContext, useMemo, useState } from "react";

interface ReplyManagerContextApi {
  replyingTo: Comment | null;
  setReplyingTo: (comment: Comment | null) => void;
}

const ReplyManagerContext = createContext<ReplyManagerContextApi | null>(null);

export const useReplyManager = () => {
  return useContext(ReplyManagerContext);
};

const ReplyManagerProvider = ({ children }: { children: React.ReactNode }) => {
  const [replyingTo, setReplyingTo] = useState<Comment | null>(null);

  const api = useMemo(
    () => ({
      replyingTo,
      setReplyingTo,
    }),
    [replyingTo, setReplyingTo]
  );
  return (
    <ReplyManagerContext.Provider value={api}>
      {children}
    </ReplyManagerContext.Provider>
  );
};

export default ReplyManagerProvider;
