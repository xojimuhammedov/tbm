import { Outlet } from "react-router-dom";
import { ThemeToggle } from "dgz-ui-shared/components/theme";

const CommonLayout = () => {
  return (
    <div
      className={
        "text flex size-full min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat"
      }
      style={{
        backgroundImage:
          "url(/images/login_backgroud.png), url(/images/login_background.jpg)",
      }}
    >
      <div className={"fixed top-0 right-0 p-3"}>
        <ThemeToggle className={"bg-blue-600 text-white dark:bg-blue-400"} />
      </div>
      <Outlet />
    </div>
  );
};

export default CommonLayout;
