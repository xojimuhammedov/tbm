import { Toaster } from "@/shared/components/atoms/toast/toaster.tsx";
import Router from "@/router.tsx";
import { ThemeProvider } from "dgz-ui-shared/providers";
import LoadingBar, { LoadingBarContainer } from "react-top-loading-bar";
import { useDocumentTitle } from "dgz-ui-shared/hooks";
import { config } from "@/shared/utils/config.ts";
import "dgz-ui-shared/styles.css";
import "dgz-ui/styles.css";
import "./index.css";
import { ToastContainer } from "react-toastify/unstyled";
import { ConfirmContainer } from "dgz-ui-shared/components/confirm";

function App() {
  useDocumentTitle(config.APP.NAME ?? "TBM");

  return (
    <ThemeProvider storageKey="dlp-ui-theme">
      <LoadingBarContainer>
        <div className={"bg-bg-secondary"}>
          <LoadingBar color={"#1380EDFF"} shadow />
          <Router />
          <Toaster />
          <ToastContainer />
          <ConfirmContainer />
        </div>
      </LoadingBarContainer>
    </ThemeProvider>
  );
}

export default App;
