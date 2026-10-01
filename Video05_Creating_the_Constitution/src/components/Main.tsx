import type { Child } from "hono/jsx";

export type MainProps = {
  children?: Child;
};

export function Main({ children }: MainProps) {
  return <main>{children}</main>;
}
