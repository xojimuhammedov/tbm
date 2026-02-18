import i18n from "./i18n";
import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { I18nextProvider } from "react-i18next";
import dayjs from "dayjs";

(window as any).dayjs = dayjs;

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Suspense fallback={<div />}>
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </I18nextProvider>
    </Suspense>
  </BrowserRouter>,
);
