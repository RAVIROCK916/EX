import { NotFoundRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "@/routes/__root.tsx";
import { LeftSidebar, RightSidebar, Toaster } from "@/components";

const Page404 = () => {
  return (
    <>
      <Toaster richColors theme="dark" position="top-right" />
      <div className="flex sm:grid sm:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_2fr_1fr]">
        <LeftSidebar />
        <div className="flex flex-col items-center gap-y-4 border-x border-x-neutral-800 px-4 pt-16">
          <h1 className="text-xl md:text-4xl">404</h1>
          <h6 className="text-base md:text-lg">
            Oops! The page you are looking for is not created yet.
          </h6>
        </div>
        <RightSidebar />
      </div>
    </>
  );
};

export const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: Page404,
});
