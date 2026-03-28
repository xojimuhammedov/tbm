import { IsGuest, IsLoggedIn, HasAccess } from "@/shared/guards";
import { lazy } from "react";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import useUserStore from "@/shared/store/useUserStore.ts";

const CommonLayout = lazy(() => import("./layouts/CommonLayout"));
const BaseLayout = lazy(() => import("./layouts/base/BaseLayout"));

// Error pages
const ForbiddenPage = lazy(() => import("./layouts/error/forbidden/Forbidden"));
const NotFoundPage = lazy(() => import("./layouts/error/not-found/NotFound"));

// Login
const LoginPage = lazy(() => import("./layouts/auth/login/Login"));

// Dashboard Pages
const DashboardPage = lazy(() => import("./pages/dashboard/Page"));
const Verify = lazy(() => import("./pages/check-document/Page.tsx"));

// External incoming documents
const Eid_17_96_Page = lazy(
  () =>
    import("@/pages/in & out documents/17-96 external inbound document/Page.tsx"),
);
const Eid_17_96_FormPage = lazy(
  () =>
    import("@/pages/in & out documents/17-96 external inbound document/pages/FormPage.tsx"),
);
const Eid_17_97 = lazy(
  () =>
    import("@/pages/in & out documents/17-97 external outbound document/Page.tsx"),
);
const Eid_17_97_FormPage = lazy(
  () =>
    import("@/pages/in & out documents/17-97 external outbound document/pages/FormPage.tsx"),
);
const Eid_17_98 = lazy(
  () =>
    import("@/pages/in & out documents/17-98 local inbound document/Page.tsx"),
);
const Eid_17_98_FormPage = lazy(
  () =>
    import("@/pages/in & out documents/17-98 local inbound document/pages/FormPage.tsx"),
);
const Eid_17_99 = lazy(
  () =>
    import("@/pages/in & out documents/17-99 local outbound document/Page.tsx"),
);
const Eid_17_99_FormPage = lazy(
  () =>
    import("@/pages/in & out documents/17-99 local outbound document/pages/FormPage.tsx"),
);

// Journals Pages

const OrdersPage = lazy(() => import("@/pages/Journals/orders/Page.tsx"));
const OrdersFormPage = lazy(
  () => import("@/pages/Journals/orders/pages/FormPage.tsx"),
);
const OrdersTbpPage = lazy(
  () => import("@/pages/Journals-tbp/orders-tbp/Page.tsx"),
);
const OrdersTbpFormPage = lazy(
  () => import("@/pages/Journals-tbp/orders-tbp/pages/FormPage.tsx"),
);
const DecreesPage = lazy(() => import("@/pages/Journals/decrees/Page.tsx"));
const DecreesFormPage = lazy(
  () => import("@/pages/Journals/decrees/pages/FormPage.tsx"),
);
const DecreesTbpPage = lazy(
  () => import("@/pages/Journals-tbp/decrees-tbp/Page.tsx"),
);
const DecreesTbpFormPage = lazy(
  () => import("@/pages/Journals-tbp/decrees-tbp/pages/FormPage.tsx"),
);
const NotifyPage = lazy(() => import("@/pages/Journals/notify/Page.tsx"));
const NotifyFormPage = lazy(
  () => import("@/pages/Journals/notify/pages/FormPage.tsx"),
);
const NotifyTbpPage = lazy(
  () => import("@/pages/Journals-tbp/notify-tbp/Page.tsx"),
);
const NotifyTbpFormPage = lazy(
  () => import("@/pages/Journals-tbp/notify-tbp/pages/FormPage.tsx"),
);
const OutgoingPage = lazy(() => import("@/pages/Journals/outgoing/Page.tsx"));
const OutgoingFormPage = lazy(
  () => import("@/pages/Journals/outgoing/pages/FormPage.tsx"),
);
const OutgoingTbpPage = lazy(
  () => import("@/pages/Journals-tbp/outgoing-tbp/Page.tsx"),
);
const OutgoingTbpFormPage = lazy(
  () => import("@/pages/Journals-tbp/outgoing-tbp/pages/FormPage.tsx"),
);

const JournalsOrdersRoute = () => {
  const { me } = useUserStore();
  const userRole = (me as any)?.role?.name;
  return userRole === "tbp" ? <OrdersTbpPage /> : <OrdersPage />;
};

const JournalsOrdersFormRoute = () => {
  const { me } = useUserStore();
  const userRole = (me as any)?.role?.name;
  return userRole === "tbp" ? <OrdersTbpFormPage /> : <OrdersFormPage />;
};

const JournalsDecreesRoute = () => {
  const { me } = useUserStore();
  const userRole = (me as any)?.role?.name;
  return userRole === "tbp" ? <DecreesTbpPage /> : <DecreesPage />;
};

const JournalsDecreesFormRoute = () => {
  const { me } = useUserStore();
  const userRole = (me as any)?.role?.name;
  return userRole === "tbp" ? <DecreesTbpFormPage /> : <DecreesFormPage />;
};

const JournalsNotifyRoute = () => {
  const { me } = useUserStore();
  const userRole = (me as any)?.role?.name;
  return userRole === "tbp" ? <NotifyTbpPage /> : <NotifyPage />;
};

const JournalsNotifyFormRoute = () => {
  const { me } = useUserStore();
  const userRole = (me as any)?.role?.name;
  return userRole === "tbp" ? <NotifyTbpFormPage /> : <NotifyFormPage />;
};

const JournalsOutgoingRoute = () => {
  const { me } = useUserStore();
  const userRole = (me as any)?.role?.name;
  return userRole === "tbp" ? <OutgoingTbpPage /> : <OutgoingPage />;
};

const JournalsOutgoingFormRoute = () => {
  const { me } = useUserStore();
  const userRole = (me as any)?.role?.name;
  return userRole === "tbp" ? <OutgoingTbpFormPage /> : <OutgoingFormPage />;
};

// NM Information Pages
const ReceivedDocumentsPage = lazy(() => import("@/pages/inbox/Page"));
const RTSIPage = lazy(() => import("@/pages/staff/Page"));
const F51Page = lazy(() => import("@/pages/rtsi/f-51/Page"));
const F51FormPage = lazy(() => import("@/pages/rtsi/f-51/page/FormPage.tsx"));
const F54Page = lazy(() => import("@/pages/rtsi/f-54/Page"));
const F54FormPage = lazy(() => import("@/pages/rtsi/f-54/page/FormPage.tsx"));
const F56Page = lazy(() => import("@/pages/rtsi/f-56/Page"));
const F56FormPage = lazy(() => import("@/pages/rtsi/f-56/pages/FormPage.tsx"));
const RTTSIPage = lazy(() => import("@/pages/rttsi/Page"));
const RTTSIFormPage = lazy(() => import("@/pages/rttsi/pages/FormPage.tsx"));
const OperationalWorkPage = lazy(() => import("@/pages/operative/Page"));
const OperativeFormPage = lazy(
  () => import("@/pages/operative/pages/FormPage.tsx"),
);
const TelevisionPage = lazy(() => import("@/pages/television/Page"));
const TelevisionFormPage = lazy(
  () => import("@/pages/television/pages/FormPage.tsx"),
);
const ApplicationPage = lazy(() => import("@/pages/rtsi/application/Page"));
const ApplicationFormPage = lazy(
  () => import("@/pages/rtsi/application/pages/FormPage.tsx"),
);

// RH menu section
const Rh_143_Page = lazy(() => import("@/pages/rh/rh-143/Page.tsx"));
const Rh_091_Page = lazy(() => import("@/pages/rh/rh-091/Page.tsx"));
const Rh_218_Page = lazy(() => import("@/pages/rh/rh-218/Page.tsx"));
const Rh_249_Page = lazy(() => import("@/pages/rh/rh-249/Page.tsx"));
const Rh_251_Page = lazy(() => import("@/pages/rh/rh-251/Page.tsx"));
const Rh_226_1_Page = lazy(() => import("@/pages/rh/rh-226-1/Page.tsx"));
const Rh_226_2_Page = lazy(() => import("@/pages/rh/rh-226-2/Page.tsx"));
const Rh_260_Page = lazy(() => import("@/pages/rh/rh-260/Page.tsx"));
// Resource Database Pages
const NokiaPage = lazy(() => import("@/pages/staff/Page"));
const ZTEPage = lazy(() => import("@/pages/staff/Page"));
const HuaweiP30ProPage = lazy(() => import("@/pages/staff/Page"));
const HuaweiP30LitePage = lazy(() => import("@/pages/staff/Page"));
const Channels51Page = lazy(() => import("@/pages/channels-5_3/Page"));
const Channels51FormPage = lazy(
  () => import("@/pages/channels-5_3/pages/FormPage.tsx"),
);
const Flows53Page = lazy(() => import("@/pages/flows-5_1/Page"));
const Flows53FormPage = lazy(
  () => import("@/pages/flows-5_1/pages/FormPage.tsx"),
);
const CardIndexesPage = lazy(() => import("@/pages/card-indexes/Page"));
const CardIndexesFormPage = lazy(
  () => import("@/pages/card-indexes/pages/FormPage.tsx"),
);

const FlowsIdPage = lazy(() => import("@/pages/flows-id/Page"));
const FlowsIdCreatePage = lazy(() => import("@/pages/flows-id/pages/FormPage"));

const ChannelsIdPage = lazy(() => import("@/pages/channels-id/Page"));
const ChannelsCreatePage = lazy(
  () => import("@/pages/channels-id/pages/FormPage"),
);

const B231Page = lazy(() => import("@/pages/gras/b-231/Page"));
const B231FormPage = lazy(() => import("@/pages/gras/b-231/page/FormPage.tsx"));
const C231Page = lazy(() => import("@/pages/gras/c-231/Page"));
const C231FormPage = lazy(() => import("@/pages/gras/c-231/page/FormPage.tsx"));
const D231Page = lazy(() => import("@/pages/gras/d-231/Page"));
const D231FormPage = lazy(
  () => import("@/pages/gras/d-231/pages/FormPage.tsx"),
);
const E231Page = lazy(() => import("@/pages/gras/e-231/Page"));
const E231FormPage = lazy(
  () => import("@/pages/gras/e-231/pages/FormPage.tsx"),
);

const A252Page = lazy(() => import("@/pages/rh-252/a-252/Page"));
const A252FormPage = lazy(() => import("@/pages/rh-252/a-252/pages/FormPage"));

const HujjatlarPage = lazy(() => import("@/pages/tbp/hujjatlar/Page"));
const HujjatlarFormPage = lazy(
  () => import("@/pages/tbp/hujjatlar/pages/FormPage"),
);

const RH3_3Page = lazy(() => import("@/pages/rh-252/rh-3_3/Page"));
const RH3_3FormPage = lazy(() => import("@/pages/rh-252/rh-3_3/page/FormPage"));
const RH_CDocument = lazy(() => import("@/pages/rh-252/c-252/Page"));
const RH_CFormDocument = lazy(
  () => import("@/pages/rh-252/c-252/page/FormPage"),
);

const RH_D_Application = lazy(() => import("@/pages/rh-252/d-252/Page"));
const RH_D_ApplicationForm = lazy(
  () => import("@/pages/rh-252/d-252/page/FormPage"),
);

const F252_Application = lazy(() => import("@/pages/rh-252/f-252/Page"));
const F252_ApplicationForm = lazy(
  () => import("@/pages/rh-252/f-252/page/FormPage"),
);

// Administration Pages
const StaffPage = lazy(() => import("@/pages/staff/Page"));
const GroupPage = lazy(() => import("@/pages/groups/Page"));
const OrganizationsPage = lazy(() => import("@/pages/organizations/Page.tsx"));
const SettingsPage = lazy(() => import("@/pages/staff/Page"));
const RolesPage = lazy(() => import("@/pages/role/Page"));
const PositionsPage = lazy(() => import("@/pages/position/Page"));

// E-imzo
const EImzoSignPage = lazy(
  () => import("@/shared/components/e-imzo/EImzoSignPage.tsx"),
);
// Progress document
const ProgreesDoc = lazy(() => import("@/pages/imzolash/page.tsx"));
const AgreementDecreesPage = lazy(
  () => import("@/pages/agreement-decrees/Page"),
);
const AgreementDecreesFormPage = lazy(
  () => import("@/pages/agreement-decrees/pages/FormPage"),
);
const HujjatlarniImzolashPage = lazy(
  () => import("@/pages/hujjatlarni-imzolash/Page"),
);
const HujjatlarniImzolashFormPage = lazy(
  () => import("@/pages/hujjatlarni-imzolash/pages/FormPage"),
);

function Router() {
  const routes: RouteObject[] = [
    {
      path: "/auth",
      element: (
        <IsGuest>
          <CommonLayout />
        </IsGuest>
      ),
      children: [
        {
          index: true,
          element: <LoginPage />,
        },
      ],
    },
    {
      path: "verify",
      element: <Verify />,
    },
    {
      path: "/",
      element: (
        <IsLoggedIn>
          <BaseLayout />
        </IsLoggedIn>
      ),

      children: [
        {
          index: true,
          element: <Navigate to={"dashboard"} replace />,
        },
        {
          path: "dashboard",
          element: <DashboardPage />,
        },
        {
          path: "verify",
          element: <Verify />,
        },
        //External incoming documents

        {
          path: "inout/exin-96",
          element: (
            <HasAccess roles={["admin", "tbp", "superadmin"]}>
              <Eid_17_96_Page />
            </HasAccess>
          ),
        },
        {
          path: "inout/exin-96/create",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <Eid_17_96_FormPage />
            </HasAccess>
          ),
        },
        {
          path: "inout/exin-96/edit/:id",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <Eid_17_96_FormPage />
            </HasAccess>
          ),
        },
        {
          path: "inout/exout-97",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <Eid_17_97 />
            </HasAccess>
          ),
        },
        {
          path: "inout/exout-97/create",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <Eid_17_97_FormPage />
            </HasAccess>
          ),
        },
        {
          path: "inout/exout-97/edit/:id",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <Eid_17_97_FormPage />
            </HasAccess>
          ),
        },
        {
          path: "inout/locin-98",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <Eid_17_98 />
            </HasAccess>
          ),
        },
        {
          path: "inout/locin-98/create",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <Eid_17_98_FormPage />
            </HasAccess>
          ),
        },
        {
          path: "inout/locin-98/edit/:id",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <Eid_17_98_FormPage />
            </HasAccess>
          ),
        },
        {
          path: "inout/locout-99",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <Eid_17_99 />
            </HasAccess>
          ),
        },
        {
          path: "inout/locout-99/create",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <Eid_17_99_FormPage />
            </HasAccess>
          ),
        },
        {
          path: "inout/locout-99/edit/:id",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <Eid_17_99_FormPage />
            </HasAccess>
          ),
        },

        //Journals
        {
          path: "journals/orders",
          element: (
            <HasAccess roles={["admin", "tbp", "superadmin"]}>
              <JournalsOrdersRoute />
            </HasAccess>
          ),
        },
        {
          path: "journals/orders/create",
          element: (
            <HasAccess roles={["admin", "tbp", "superadmin"]}>
              <JournalsOrdersFormRoute />
            </HasAccess>
          ),
        },
        {
          path: "journals/orders/edit/:id",
          element: (
            <HasAccess roles={["admin", "tbp", "superadmin"]}>
              <JournalsOrdersFormRoute />
            </HasAccess>
          ),
        },
        {
          path: "journals/decrees",
          element: (
            <HasAccess roles={["admin", "tbp", "superadmin"]}>
              <JournalsDecreesRoute />
            </HasAccess>
          ),
        },
        {
          path: "journals/decrees/create",
          element: (
            <HasAccess roles={["admin", "tbp", "superadmin"]}>
              <JournalsDecreesFormRoute />
            </HasAccess>
          ),
        },
        {
          path: "journals/decrees/edit/:id",
          element: (
            <HasAccess roles={["admin", "tbp", "superadmin"]}>
              <JournalsDecreesFormRoute />
            </HasAccess>
          ),
        },
        {
          path: "journals/notify",
          element: (
            <HasAccess roles={["admin", "tbp", "superadmin"]}>
              <JournalsNotifyRoute />
            </HasAccess>
          ),
        },
        {
          path: "journals/notify/create",
          element: (
            <HasAccess roles={["admin", "tbp", "superadmin"]}>
              <JournalsNotifyFormRoute />
            </HasAccess>
          ),
        },
        {
          path: "journals/notify/edit/:id",
          element: (
            <HasAccess roles={["admin", "tbp", "superadmin"]}>
              <JournalsNotifyFormRoute />
            </HasAccess>
          ),
        },
        {
          path: "journals/outgoing",
          element: (
            <HasAccess roles={["admin", "tbp", "superadmin"]}>
              <JournalsOutgoingRoute />
            </HasAccess>
          ),
        },
        {
          path: "journals/outgoing/create",
          element: (
            <HasAccess roles={["admin", "tbp", "superadmin"]}>
              <JournalsOutgoingFormRoute />
            </HasAccess>
          ),
        },
        {
          path: "journals/outgoing/edit/:id",
          element: (
            <HasAccess roles={["admin", "tbp", "superadmin"]}>
              <JournalsOutgoingFormRoute />
            </HasAccess>
          ),
        },

        // Journals TBP Routes
        {
          path: "journals/orders-tbp",
          element: (
            <HasAccess roles={["admin", "tbp", "superadmin"]}>
              <OrdersTbpPage />
            </HasAccess>
          ),
        },
        {
          path: "journals/orders-tbp/create",
          element: (
            <HasAccess roles={["admin", "tbp", "superadmin"]}>
              <OrdersTbpFormPage />
            </HasAccess>
          ),
        },
        {
          path: "journals/orders-tbp/edit/:id",
          element: (
            <HasAccess roles={["admin", "tbp", "superadmin"]}>
              <OrdersTbpFormPage />
            </HasAccess>
          ),
        },
        {
          path: "journals/decrees-tbp",
          element: (
            <HasAccess roles={["admin", "tbp", "superadmin"]}>
              <DecreesTbpPage />
            </HasAccess>
          ),
        },
        {
          path: "journals/decrees-tbp/create",
          element: (
            <HasAccess roles={["admin", "tbp", "superadmin"]}>
              <DecreesTbpFormPage />
            </HasAccess>
          ),
        },
        {
          path: "journals/decrees-tbp/edit/:id",
          element: (
            <HasAccess roles={["admin", "tbp", "superadmin"]}>
              <DecreesTbpFormPage />
            </HasAccess>
          ),
        },
        {
          path: "journals/notify-tbp",
          element: (
            <HasAccess roles={["admin", "tbp", "superadmin"]}>
              <NotifyTbpPage />
            </HasAccess>
          ),
        },
        {
          path: "journals/notify-tbp/create",
          element: (
            <HasAccess roles={["admin", "tbp", "superadmin"]}>
              <NotifyTbpFormPage />
            </HasAccess>
          ),
        },
        {
          path: "journals/notify-tbp/edit/:id",
          element: (
            <HasAccess roles={["admin", "tbp", "superadmin"]}>
              <NotifyTbpFormPage />
            </HasAccess>
          ),
        },
        {
          path: "journals/outgoing-tbp",
          element: (
            <HasAccess roles={["admin", "tbp", "superadmin"]}>
              <OutgoingTbpPage />
            </HasAccess>
          ),
        },
        {
          path: "journals/outgoing-tbp/create",
          element: (
            <HasAccess roles={["admin", "tbp", "superadmin"]}>
              <OutgoingTbpFormPage />
            </HasAccess>
          ),
        },
        {
          path: "journals/outgoing-tbp/edit/:id",
          element: (
            <HasAccess roles={["admin", "tbp", "superadmin"]}>
              <OutgoingTbpFormPage />
            </HasAccess>
          ),
        },

        // NM Information Routes
        {
          path: "received-documents",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <ReceivedDocumentsPage />
            </HasAccess>
          ),
        },
        {
          path: "rtsi",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <RTSIPage />
            </HasAccess>
          ),
        },
        {
          path: "rtsi/application",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <ApplicationPage />
            </HasAccess>
          ),
        },
        {
          path: "rtsi/application/create",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <ApplicationFormPage />
            </HasAccess>
          ),
        },
        {
          path: "rtsi/application/edit/:id",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <ApplicationFormPage />
            </HasAccess>
          ),
        },
        {
          path: "rtsi/f-51",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <F51Page />
            </HasAccess>
          ),
        },
        {
          path: "rtsi/f-51/create",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <F51FormPage />
            </HasAccess>
          ),
        },
        {
          path: "rtsi/f-51/edit/:id",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <F51FormPage />
            </HasAccess>
          ),
        },
        {
          path: "rtsi/f-54",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <F54Page />
            </HasAccess>
          ),
        },
        {
          path: "rtsi/f-54/create",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <F54FormPage />
            </HasAccess>
          ),
        },
        {
          path: "rtsi/f-54/edit/:id",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <F54FormPage />
            </HasAccess>
          ),
        },
        {
          path: "rtsi/f-56",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <F56Page />
            </HasAccess>
          ),
        },
        {
          path: "rtsi/f-56/create",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <F56FormPage />
            </HasAccess>
          ),
        },
        {
          path: "rtsi/f-56/edit/:id",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <F56FormPage />
            </HasAccess>
          ),
        },
        // RH files section
        {
          path: "rh/rh-143",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <Rh_143_Page />
            </HasAccess>
          ),
        },
        {
          path: "rh/rh-091",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <Rh_091_Page />
            </HasAccess>
          ),
        },

        {
          path: "rh/rh-218",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <Rh_218_Page />
            </HasAccess>
          ),
        },
        {
          path: "rh/rh-249",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <Rh_249_Page />
            </HasAccess>
          ),
        },
        {
          path: "rh/rh-251",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <Rh_251_Page />
            </HasAccess>
          ),
        },
        {
          path: "rh/rh-226-1",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <Rh_226_1_Page />
            </HasAccess>
          ),
        },
        {
          path: "rh/rh-226-2",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <Rh_226_2_Page />
            </HasAccess>
          ),
        },
        {
          path: "rh/rh-260",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <Rh_260_Page />
            </HasAccess>
          ),
        },

        // RTTSI sectioni
        {
          path: "rttsi",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <RTTSIPage />
            </HasAccess>
          ),
        },
        {
          path: "rttsi/create",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <RTTSIFormPage />
            </HasAccess>
          ),
        },
        {
          path: "rttsi/edit/:id",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <RTTSIFormPage />
            </HasAccess>
          ),
        },
        {
          path: "operational-work",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <OperationalWorkPage />
            </HasAccess>
          ),
        },
        {
          path: "operational-work/create",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <OperativeFormPage />
            </HasAccess>
          ),
        },
        {
          path: "operational-work/edit/:id",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <OperativeFormPage />
            </HasAccess>
          ),
        },
        {
          path: "television",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <TelevisionPage />
            </HasAccess>
          ),
        },
        {
          path: "television/create",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <TelevisionFormPage />
            </HasAccess>
          ),
        },
        {
          path: "television/edit/:id",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <TelevisionFormPage />
            </HasAccess>
          ),
        },
        // Resource Database Routes
        {
          path: "nokia",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <NokiaPage />
            </HasAccess>
          ),
        },
        {
          path: "zte",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <ZTEPage />
            </HasAccess>
          ),
        },
        {
          path: "huawei-p30-pro",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <HuaweiP30ProPage />
            </HasAccess>
          ),
        },
        {
          path: "huawei-p30-lite",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <HuaweiP30LitePage />
            </HasAccess>
          ),
        },

        {
          path: "channels-5_3",
          children: [
            {
              index: true,
              element: (
                <HasAccess roles={["admin", "superadmin"]}>
                  <Channels51Page />
                </HasAccess>
              ),
            },
            {
              path: "create",
              element: (
                <HasAccess roles={["admin", "superadmin"]}>
                  <Channels51FormPage />
                </HasAccess>
              ),
            },
            {
              path: "edit/:id",
              element: (
                <HasAccess roles={["admin", "superadmin"]}>
                  <Channels51FormPage />
                </HasAccess>
              ),
            },
          ],
        },
        {
          path: "flows-5_1",
          children: [
            {
              index: true,
              element: (
                <HasAccess roles={["admin", "superadmin"]}>
                  <Flows53Page />
                </HasAccess>
              ),
            },
            {
              path: "create",
              element: (
                <HasAccess roles={["admin", "superadmin"]}>
                  <Flows53FormPage />
                </HasAccess>
              ),
            },
            {
              path: "edit/:id",
              element: (
                <HasAccess roles={["admin", "superadmin"]}>
                  <Flows53FormPage />
                </HasAccess>
              ),
            },
          ],
        },
        {
          path: "channels-5_3",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <Channels51Page />
            </HasAccess>
          ),
        },
        {
          path: "channels-5_3/create",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <Channels51FormPage />
            </HasAccess>
          ),
        },
        {
          path: "channels-5_3/edit/:id",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <Channels51FormPage />
            </HasAccess>
          ),
        },
        {
          path: "flows-5_1",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <Flows53Page />
            </HasAccess>
          ),
        },
        {
          path: "flows-5_1/create",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <Flows53FormPage />
            </HasAccess>
          ),
        },
        {
          path: "flows-5_1/edit/:id",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <Flows53FormPage />
            </HasAccess>
          ),
        },
        {
          path: "card-indexes",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <CardIndexesPage />
            </HasAccess>
          ),
        },
        {
          path: "card-indexes/create",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <CardIndexesFormPage />
            </HasAccess>
          ),
        },
        {
          path: "card-indexes/edit/:id",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <CardIndexesFormPage />
            </HasAccess>
          ),
        },
        // Administration Routes
        {
          path: "staff",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <StaffPage />
            </HasAccess>
          ),
        },
        {
          path: "groups",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <GroupPage />
            </HasAccess>
          ),
        },
        {
          path: "organizations",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <OrganizationsPage />
            </HasAccess>
          ),
        },
        {
          path: "settings",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <SettingsPage />
            </HasAccess>
          ),
        },
        // Settings -> Roles route
        {
          path: "settings/roles",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <RolesPage />
            </HasAccess>
          ),
        },
        // Settings -> Positions route
        {
          path: "settings/positions",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <PositionsPage />
            </HasAccess>
          ),
        },
        // {
        //   path: "gras",
        //   element: <GrasPage />,
        // },
        {
          path: "gras/b-231",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <B231Page />
            </HasAccess>
          ),
        },
        {
          path: "gras/b-231/create",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <B231FormPage />
            </HasAccess>
          ),
        },
        {
          path: "gras/b-231/edit/:id",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <B231FormPage />
            </HasAccess>
          ),
        },
        {
          path: "gras/c-231",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <C231Page />
            </HasAccess>
          ),
        },
        {
          path: "gras/c-231/create",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <C231FormPage />
            </HasAccess>
          ),
        },
        {
          path: "gras/c-231/edit/:id",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <C231FormPage />
            </HasAccess>
          ),
        },
        {
          path: "gras/d-231",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <D231Page />
            </HasAccess>
          ),
        },
        {
          path: "gras/d-231/create",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <D231FormPage />
            </HasAccess>
          ),
        },
        {
          path: "gras/d-231/edit/:id",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <D231FormPage />
            </HasAccess>
          ),
        },
        {
          path: "gras/e-231",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <E231Page />
            </HasAccess>
          ),
        },
        {
          path: "gras/e-231/create",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <E231FormPage />
            </HasAccess>
          ),
        },
        {
          path: "gras/e-231/edit/:id",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <E231FormPage />
            </HasAccess>
          ),
        },
        {
          path: "flows-id",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <FlowsIdPage />
            </HasAccess>
          ),
        },
        {
          path: "flows-id/create",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <FlowsIdCreatePage />
            </HasAccess>
          ),
        },
        {
          path: "flows-id/edit/:id",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <FlowsIdCreatePage />
            </HasAccess>
          ),
        },
        {
          path: "channels-id",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <ChannelsIdPage />
            </HasAccess>
          ),
        },
        {
          path: "channels-id/create",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <ChannelsCreatePage />
            </HasAccess>
          ),
        },
        {
          path: "rh-252/a-252",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <A252Page />
            </HasAccess>
          ),
        },
        {
          path: "rh-252/a-252/create",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <A252FormPage />
            </HasAccess>
          ),
        },
        {
          path: "rh-252/a-252/edit/:id",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <A252FormPage />
            </HasAccess>
          ),
        },
        {
          path: "rh-252/a-252/sign/:id",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <EImzoSignPage />
            </HasAccess>
          ),
        },
        {
          path: "rh-252/a-252/progress/:id",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <ProgreesDoc />
            </HasAccess>
          ),
        },
        {
          path: "tbp/hujjatlar",
          element: (
            <HasAccess roles={["admin", "tbp", "superadmin"]}>
              <HujjatlarPage />
            </HasAccess>
          ),
        },
        {
          path: "tbp/hujjatlar/create",
          element: (
            <HasAccess roles={["admin", "tbp", "superadmin"]}>
              <HujjatlarFormPage />
            </HasAccess>
          ),
        },
        {
          path: "tbp/hujjatlar/edit/:id",
          element: (
            <HasAccess roles={["admin", "tbp", "superadmin"]}>
              <HujjatlarFormPage />
            </HasAccess>
          ),
        },
        {
          path: "tbp/hujjatlar/sign/:id",
          element: (
            <HasAccess roles={["admin", "tbp", "superadmin"]}>
              <EImzoSignPage />
            </HasAccess>
          ),
        },
        {
          path: "tbp/hujjatlar/progress/:id",
          element: (
            <HasAccess roles={["admin", "tbp", "superadmin"]}>
              <ProgreesDoc />
            </HasAccess>
          ),
        },
        {
          path: "tbp/imzolanadigan-hujjatlar",
          element: (
            <HasAccess roles={["admin", "tbp", "superadmin"]}>
              <HujjatlarniImzolashPage />
            </HasAccess>
          ),
        },
        {
          path: "tbp/imzolanadigan-hujjatlar/:id/shared/:sharedId",
          element: (
            <HasAccess roles={["admin", "tbp", "superadmin"]}>
              <HujjatlarniImzolashFormPage />
            </HasAccess>
          ),
        },
        {
          path: "rh-252/rh-3_3",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <RH3_3Page />
            </HasAccess>
          ),
        },
        {
          path: "rh-252/rh-3_3/create",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <RH3_3FormPage />
            </HasAccess>
          ),
        },
        {
          path: "rh-252/rh-3_3/edit/:id",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <RH3_3FormPage />
            </HasAccess>
          ),
        },
        {
          path: "rh-252/c-252",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <RH_CDocument />
            </HasAccess>
          ),
        },
        {
          path: "rh-252/c-252/create",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <RH_CFormDocument />
            </HasAccess>
          ),
        },
        {
          path: "rh-252/d-252",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <RH_D_Application />
            </HasAccess>
          ),
        },
        {
          path: "rh-252/d-252/create",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <RH_D_ApplicationForm />
            </HasAccess>
          ),
        },
        {
          path: "rh-252/d-252/edit/:id",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <RH_D_ApplicationForm />
            </HasAccess>
          ),
        },
        {
          path: "rh-252/f-252",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <F252_Application />
            </HasAccess>
          ),
        },
        {
          path: "rh-252/f-252/create",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <F252_ApplicationForm />
            </HasAccess>
          ),
        },
        {
          path: "rh-252/f-252/edit/:id",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <F252_ApplicationForm />
            </HasAccess>
          ),
        },
        {
          path: "rh-252/agreement-decrees",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <AgreementDecreesPage />
            </HasAccess>
          ),
        },
        {
          path: "rh-252/agreement-decrees/:id/shared/:sharedId",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <AgreementDecreesFormPage />
            </HasAccess>
          ),
        },
        {
          path: "rh-252/hujjatlarni-imzolash",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <HujjatlarniImzolashPage />
            </HasAccess>
          ),
        },
        {
          path: "rh-252/hujjatlarni-imzolash/:id/shared/:sharedId",
          element: (
            <HasAccess roles={["admin", "superadmin"]}>
              <HujjatlarniImzolashFormPage />
            </HasAccess>
          ),
        },
      ],
    },
    {
      path: "error",
      element: <CommonLayout />,
      children: [
        {
          path: "not-found",
          element: <NotFoundPage />,
        },
        {
          path: "forbidden",
          element: <ForbiddenPage />,
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to={"/error/not-found"} />,
    },
  ];

  return useRoutes(routes);
}

export default Router;
