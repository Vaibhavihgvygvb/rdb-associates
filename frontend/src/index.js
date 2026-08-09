import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import App from "@/App";

// No data-fetching client here on purpose. The site's only two network calls
// are the consultation and newsletter form posts, both one-shot `axios.post`s
// with their own local loading state — there is nothing to cache, invalidate
// or refetch. A QueryClientProvider used to wrap the app with no `useQuery` or
// `useMutation` anywhere beneath it, paying for the library in the initial
// bundle to provide a context nothing read.

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
