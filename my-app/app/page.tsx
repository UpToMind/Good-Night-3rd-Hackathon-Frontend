import { routes } from "./routes";

export default function Home() {
  const wishTreeMain = routes.find((route) => route.path === "/")?.component;
  return wishTreeMain;
}
