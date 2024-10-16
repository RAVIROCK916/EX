import { Provider } from "react-redux";
import { routeTree } from "./routeTree.gen";
import { RouterProvider, createRouter } from "@tanstack/react-router";

import store from "./state/store";

export const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// TanStack Router Devtools
// const TanStackRouterDevtools =
// 	process.env.NODE_ENV === "production"
// 		? () => null // Render nothing in production
// 		: React.lazy(() =>
// 				// Lazy load in development
// 				import("@tanstack/router-devtools").then((res) => ({
// 					default: res.TanStackRouterDevtools,
// 					// For Embedded Mode
// 					// default: res.TanStackRouterDevtoolsPanel
// 				}))
// 			);

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
  /* <TanStackRouterDevtools router={router} /> */
};
export default App;
