import MySidebar from "@/layouts/base/components/MySidebar.tsx";
import {
  SidebarInset,
  SidebarProvider,
} from "@/layouts/base/components/sidebar.tsx";
import { Outlet } from "react-router-dom";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { registerPlugin } from "react-filepond";

registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize,
);

const BaseLayout = () => {
  // const { socket, connect } = useSocket();

  // useEffect(() => {
  //   if (!socket.connected) {
  //     connect();
  //   }
  //
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  return (
    <SidebarProvider>
      <MySidebar />
      <SidebarInset
        className={"bg-bg flex h-screen flex-1 flex-col overflow-auto"}
      >
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default BaseLayout;
