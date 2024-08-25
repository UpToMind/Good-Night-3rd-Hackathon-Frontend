import { ReactNode } from "react";
import WishTreeMain from "@/pages/WishTreeMain";

interface Route {
  path: string;
  component: ReactNode;
}

export const routes: Route[] = [{ path: "/", component: <WishTreeMain /> }];
