import { IsGuest, IsLoggedIn } from "@/shared/guards";
import { lazy } from "react";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";

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
const DecreesPage = lazy(() => import("@/pages/Journals/decrees/Page.tsx"));
const DecreesFormPage = lazy(
  () => import("@/pages/Journals/decrees/pages/FormPage.tsx"),
);
const NotifyPage = lazy(() => import("@/pages/Journals/notify/Page.tsx"));
const NotifyFormPage = lazy(
  () => import("@/pages/Journals/notify/pages/FormPage.tsx"),
);
const OutgoingPage = lazy(() => import("@/pages/Journals/outgoing/Page.tsx"));
const OutgoingFormPage = lazy(
  () => import("@/pages/Journals/outgoing/pages/FormPage.tsx"),
);

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
const SettingsPage = lazy(() => import("@/pages/staff/Page"));
const RolesPage = lazy(() => import("@/pages/role/Page"));

// E-imzo
const EImzoSignPage = lazy(() => import("@/shared/components/e-imzo/EImzoSignPage.tsx"));
// Progress document
const ProgreesDoc = lazy(() => import("@/pages/imzolash/page.tsx"));

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
      element: <Verify/>,
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
          element: <Verify/>,
        },
        //External incoming documents

        {
          path: "inout/exin-96",
          element: <Eid_17_96_Page />,
        },
        {
          path: "inout/exin-96/create",
          element: <Eid_17_96_FormPage />,
        },
        {
          path: "inout/exin-96/edit/:id",
          element: <Eid_17_96_FormPage />,
        },
        {
          path: "inout/exout-97",
          element: <Eid_17_97 />,
        },
        {
          path: "inout/exout-97/create",
          element: <Eid_17_97_FormPage />,
        },
        {
          path: "inout/exout-97/edit/:id",
          element: <Eid_17_97_FormPage />,
        },
        {
          path: "inout/locin-98",
          element: <Eid_17_98 />,
        },
        {
          path: "inout/locin-98/create",
          element: <Eid_17_98_FormPage />,
        },
        {
          path: "inout/locin-98/edit/:id",
          element: <Eid_17_98_FormPage />,
        },
        {
          path: "inout/locout-99",
          element: <Eid_17_99 />,
        },
        {
          path: "inout/locout-99/create",
          element: <Eid_17_99_FormPage />,
        },
        {
          path: "inout/locout-99/edit/:id",
          element: <Eid_17_99_FormPage />,
        },

        //Journals
        {
          path: "journals/orders",
          element: <OrdersPage />,
        },
        {
          path: "journals/orders/create",
          element: <OrdersFormPage />,
        },
        {
          path: "journals/orders/edit/:id",
          element: <OrdersFormPage />,
        },
        {
          path: "journals/decrees",
          element: <DecreesPage />,
        },
        {
          path: "journals/decrees/create",
          element: <DecreesFormPage />,
        },
        {
          path: "journals/decrees/edit/:id",
          element: <DecreesFormPage />,
        },
        {
          path: "journals/notify",
          element: <NotifyPage />,
        },
        {
          path: "journals/notify/create",
          element: <NotifyFormPage />,
        },
        {
          path: "journals/notify/edit/:id",
          element: <NotifyFormPage />,
        },
        {
          path: "journals/outgoing",
          element: <OutgoingPage />,
        },
        {
          path: "journals/outgoing/create",
          element: <OutgoingFormPage />,
        },
        {
          path: "journals/outgoing/edit/:id",
          element: <OutgoingFormPage />,
        },

        // NM Information Routes
        {
          path: "received-documents",
          element: <ReceivedDocumentsPage />,
        },
        {
          path: "rtsi",
          element: <RTSIPage />,
        },
        {
          path: "rtsi/application",
          element: <ApplicationPage />,
        },
        {
          path: "rtsi/application/create",
          element: <ApplicationFormPage />,
        },
        {
          path: "rtsi/application/edit/:id",
          element: <ApplicationFormPage />,
        },
        {
          path: "rtsi/f-51",
          element: <F51Page />,
        },
        {
          path: "rtsi/f-51/create",
          element: <F51FormPage />,
        },
        {
          path: "rtsi/f-51/edit/:id",
          element: <F51FormPage />,
        },
        {
          path: "rtsi/f-54",
          element: <F54Page />,
        },
        {
          path: "rtsi/f-54/create",
          element: <F54FormPage />,
        },
        {
          path: "rtsi/f-54/edit/:id",
          element: <F54FormPage />,
        },
        {
          path: "rtsi/f-56",
          element: <F56Page />,
        },
        {
          path: "rtsi/f-56/create",
          element: <F56FormPage />,
        },
        {
          path: "rtsi/f-56/edit/:id",
          element: <F56FormPage />,
        },
        // RH files section
        {
          path: "rh/rh-143",
          element: <Rh_143_Page />,
        },
        {
          path: "rh/rh-091",
          element: <Rh_091_Page />,
        },

        {
          path: "rh/rh-218",
          element: <Rh_218_Page />,
        },
        {
          path: "rh/rh-249",
          element: <Rh_249_Page />,
        },
        {
          path: "rh/rh-251",
          element: <Rh_251_Page />,
        },
        {
          path: "rh/rh-226-1",
          element: <Rh_226_1_Page />,
        },
        {
          path: "rh/rh-226-2",
          element: <Rh_226_2_Page />,
        },
        {
          path: "rh/rh-260",
          element: <Rh_260_Page />,
        },

        // RTTSI sectioni
        {
          path: "rttsi",
          element: <RTTSIPage />,
        },
        {
          path: "rttsi/create",
          element: <RTTSIFormPage />,
        },
        {
          path: "rttsi/edit/:id",
          element: <RTTSIFormPage />,
        },
        {
          path: "operational-work",
          element: <OperationalWorkPage />,
        },
        {
          path: "operational-work/create",
          element: <OperativeFormPage />,
        },
        {
          path: "operational-work/edit/:id",
          element: <OperativeFormPage />,
        },
        {
          path: "television",
          element: <TelevisionPage />,
        },
        {
          path: "television/create",
          element: <TelevisionFormPage />,
        },
        {
          path: "television/edit/:id",
          element: <TelevisionFormPage />,
        },
        // Resource Database Routes
        {
          path: "nokia",
          element: <NokiaPage />,
        },
        {
          path: "zte",
          element: <ZTEPage />,
        },
        {
          path: "huawei-p30-pro",
          element: <HuaweiP30ProPage />,
        },
        {
          path: "huawei-p30-lite",
          element: <HuaweiP30LitePage />,
        },

        {
          path: "channels-5_3",
          children: [
            {
              index: true,
              element: <Channels51Page />,
            },
            {
              path: "create",
              element: <Channels51FormPage />,
            },
            {
              path: "edit/:id",
              element: <Channels51FormPage />,
            },
          ],
        },
        {
          path: "flows-5_1",
          children: [
            {
              index: true,
              element: <Flows53Page />,
            },
            {
              path: "create",
              element: <Flows53FormPage />,
            },
            {
              path: "edit/:id",
              element: <Flows53FormPage />,
            },
          ],
        },
        {
          path: "channels-5_3",
          element: <Channels51Page />,
        },
        {
          path: "channels-5_3/create",
          element: <Channels51FormPage />,
        },
        {
          path: "channels-5_3/edit/:id",
          element: <Channels51FormPage />,
        },
        {
          path: "flows-5_1",
          element: <Flows53Page />,
        },
        {
          path: "flows-5_1/create",
          element: <Flows53FormPage />,
        },
        {
          path: "flows-5_1/edit/:id",
          element: <Flows53FormPage />,
        },
        {
          path: "card-indexes",
          element: <CardIndexesPage />,
        },
        {
          path: "card-indexes/create",
          element: <CardIndexesFormPage />,
        },
        {
          path: "card-indexes/edit/:id",
          element: <CardIndexesFormPage />,
        },
        // Administration Routes
        {
          path: "staff",
          element: <StaffPage />,
        },
        {
          path: "groups",
          element: <GroupPage />,
        },
        {
          path: "settings",
          element: <SettingsPage />,
        },
        // Settings -> Roles route
        {
          path: "settings/roles",
          element: <RolesPage />,
        },
        // {
        //   path: "gras",
        //   element: <GrasPage />,
        // },
        {
          path: "gras/b-231",
          element: <B231Page />,
        },
        {
          path: "gras/b-231/create",
          element: <B231FormPage />,
        },
        {
          path: "gras/b-231/edit/:id",
          element: <B231FormPage />,
        },
        {
          path: "gras/c-231",
          element: <C231Page />,
        },
        {
          path: "gras/c-231/create",
          element: <C231FormPage />,
        },
        {
          path: "gras/c-231/edit/:id",
          element: <C231FormPage />,
        },
        {
          path: "gras/d-231",
          element: <D231Page />,
        },
        {
          path: "gras/d-231/create",
          element: <D231FormPage />,
        },
        {
          path: "gras/d-231/edit/:id",
          element: <D231FormPage />,
        },
        {
          path: "gras/e-231",
          element: <E231Page />,
        },
        {
          path: "gras/e-231/create",
          element: <E231FormPage />,
        },
        {
          path: "gras/e-231/edit/:id",
          element: <E231FormPage />,
        },
        {
          path: "flows-id",
          element: <FlowsIdPage />,
        },
        {
          path: "flows-id/create",
          element: <FlowsIdCreatePage />,
        },
        {
          path: "flows-id/edit/:id",
          element: <FlowsIdCreatePage />,
        },
        {
          path: "channels-id",
          element: <ChannelsIdPage />,
        },
        {
          path: "channels-id/create",
          element: <ChannelsCreatePage />,
        },
        {
          path: "rh-252/a-252",
          element: <A252Page />,
        },
        {
          path: "rh-252/a-252/create",
          element: <A252FormPage />,
        },
        {
          path: "rh-252/a-252/edit/:id",
          element: <A252FormPage />,
        },
        {
          path:"rh-252/a-252/sign/:id",
          element: <EImzoSignPage />,
        },
        {
          path:"rh-252/a-252/progress/:id",
          element: <ProgreesDoc />,
        },
        {
          path: "rh-252/rh-3_3",
          element: <RH3_3Page />,
        },
        {
          path: "rh-252/rh-3_3/create",
          element: <RH3_3FormPage />,
        },
        {
          path: "rh-252/rh-3_3/edit/:id",
          element: <RH3_3FormPage />,
        },
        {
          path: "rh-252/c-252",
          element: <RH_CDocument />,
        },
        {
          path: "rh-252/c-252/create",
          element: <RH_CFormDocument />,
        },
        {
          path: "rh-252/d-252",
          element: <RH_D_Application />,
        },
        {
          path: "rh-252/d-252/create",
          element: <RH_D_ApplicationForm />,
        },
        {
          path: "rh-252/d-252/edit/:id",
          element: <RH_D_ApplicationForm />,
        },
        {
          path: "rh-252/f-252",
          element: <F252_Application />,
        },
        {
          path: "rh-252/f-252/create",
          element: <F252_ApplicationForm />,
        },
        {
          path: "rh-252/f-252/edit/:id",
          element: <F252_ApplicationForm />,
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
