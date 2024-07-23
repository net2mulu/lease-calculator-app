export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/home", "/home/shared", "/home/create", "/home/my"],
};
