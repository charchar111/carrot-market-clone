import React, { use, useEffect, useState } from "react";
import { Header } from "./headers";
import { TabBar } from "./tabBars";
import { totalmem } from "os";
import { makeClassName } from "@/libs/client/utils";
import useUser from "@/libs/client/useUser";

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
  authorize?: {
    user: boolean;
    resultState?: [any, React.Dispatch<React.SetStateAction<any>>];
  };
}

export const Layout = function ({
  title,
  canGoBack,
  hasTabBar,
  children,
  authorize = { user: true },
}: LayoutProps) {
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (authorize.resultState && !isLoading) {
      const [authorized, setAuthorized] = authorize.resultState;

      setAuthorized((date: any) => {
        if (user) return user;
        return undefined;
      });
    }
  }, [user]);

  return (
    <div className="outter-layout min-h-screen bg-gray-100">
      <div className="layout mx-auto min-h-screen  max-w-lg bg-white">
        <Header title={title} canGoBack={canGoBack} />
        <div className={makeClassName("pt-14", hasTabBar ? "pb-16" : "")}>
          {children}
        </div>
        {hasTabBar ? <TabBar authorizedId={user} /> : null}
      </div>
    </div>
  );
};
