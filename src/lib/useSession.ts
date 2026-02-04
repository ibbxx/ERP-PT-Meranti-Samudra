"use client";

import { useEffect, useState } from "react";
import type { Session } from "./session";
import { readSession } from "./session";

export const useSession = () => {
  const [session, setSession] = useState<Session>({});

  useEffect(() => {
    setSession(readSession());
  }, []);

  return session;
};
