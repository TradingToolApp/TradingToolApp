import { NextRequest, NextResponse } from "next/server";

// import { withAuth } from "next-auth/middleware";

// export default withAuth(
//   function middleware(req: any) {
//     console.log(req.nextauth);
//     if (req.nextUrl.pathname === "/admin/dashboard" && req.nextauth.user.role !== "admin") {
//       return new NextResponse("Redirecting...", { status: 302, headers: { Location: "/login" } });
//     }
//   },
//   {
//     callbacks: {
//       authorized: async (params: any) => {
//         let { token } = params;
//         return Boolean(token);
//       },
//     },
//   }
// );

export { default } from "next-auth/middleware";
export const config = { matcher: ["/admin/"] };
