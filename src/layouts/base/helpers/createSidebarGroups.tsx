import { MenuGroupInterface } from "@/layouts/base/interfaces/menu-group.interface.ts";
import { TranslationArgsType } from "dgz-ui-shared/types";
import {
  ChartBarBig,
  Database,
  FileLock,
  Settings,
  ShieldUser,
  SmartphoneCharging,
  Tv,
  User,
  Users,
  BarChart3,
    Inbox,
} from "lucide-react";

const createSidebarGroups = (
  t: (...args: TranslationArgsType) => string,
  isActive: (path: string) => boolean,
): MenuGroupInterface[] => [
  {
    title: t("Incoming / Outgoing Documents"),
    items: [
      {
        title: t("In & Out Documents"),
        url: "inout",
        icon: Inbox,
        isActive: isActive("inout"),
        children: [
          {
            title: t("17-96 ex/in document"),
            url: "exin-96",
          },
          {
            title: t("17-97 ex/out document"),
            url: "exout-97",
          },
          {
            title: t("17-98 loc/in document"),
            url: "locin-98",
          },
          {
            title: t("17-99 loc/out document"),
            url: "locout-99",
          },
        ]
      }
    ]
  },
  {
    title: t("NM information"),
    items: [
      // {
      //   title: t("Documents received"),
      //   url: "received-documents",
      //   icon: Download,
      //   isActive: isActive("received-documents"),
      // },
      {
        title: t("RTSI"),
        url: "rtsi",
        icon: ChartBarBig,
        isActive: isActive("rtsi"),
        children: [
          {
            title: t("Application"),
            url: "application",
          },
          {
            title: t("F-51 document"),
            url: "f-51",
          },
          {
            title: t("F-56 document"),
            url: "f-56",
          },
          {
            title: t("F-54 document"),
            url: "f-54",
          },
          {
            title: t("17-96 document"),
            url: "eid-96",
          },
        ],
      },
      {
        title: t("RTTSI"),
        url: "rttsi",
        icon: SmartphoneCharging,
        isActive: isActive("rttsi"),
      },
      {
        title: t("Operational work"),
        url: "operational-work",
        icon: FileLock,
        isActive: isActive("operational-work"),
      },
      {
        title: t("Television"),
        url: "television",
        icon: Tv,
        isActive: isActive("television"),
      },
    ],
  },
  {
    title: t("Rahbariyat hujjatlari"),
    items: [
      {
        title: t("RH"),
        url: "rh",
        icon: BarChart3,
        isActive: isActive("rtsi"),
        children: [
          {
            title: t("RH-143"),
            url: "rh-143",
          },
          {
            title: t("RH-091"),
            url: "rh-091",
          },
          {
            title: t("RH-218"),
            url: "rh-218",
          },
          {
            title: t("RH-226-1"),
            url: "rh-226-1",
          },
          {
            title: t("RH-226-2"),
            url: "rh-226-2",
          },
          {
            title: t("RH-249"),
            url: "rh-249",
          },
          {
            title: t("RH-251"),
            url: "rh-251",
          },
          {
            title: t("RH-260"),
            url: "rh-260",
          },
        ],
      },
    ],
  },
  {
    title: t("NM information"),
    items: [
      {
        title: t("RH-252"),
        url: "rh-252",
        icon: ChartBarBig,
        isActive: isActive("rh-252"),
        children: [
          {
            title: t("A-Application"),
            url: "a-252",
          },
          {
            title: t("3.3 Application"),
            url: "rh-3_3",
          },
          {
            title: t("C Application"),
            url: "c-252",
          },
          {
            title: t("D Application"),
            url: "d-252",
          },
          {
            title: t("F Application"),
            url: "f-252",
          },
        ],
      },
      {
        title: t("RH-231"),
        url: "rh-231",
        icon: ChartBarBig,
        isActive: isActive("rh-231"),
        children: [
          {
            title: t("A-Application"),
            url: "a-231",
          },
        ]
      }
    ],
  },
  // {
  //   title: t("NM information"),
  //   items: [
  //     // {
  //     //   title: t("Documents received"),
  //     //   url: "received-documents",
  //     //   icon: Download,
  //     //   isActive: isActive("received-documents"),
  //     // },
  //     // {
  //     //   title: t("RH 231"),
  //     //   url: "gras",
  //     //   icon: ChartBarBig,
  //     //   isActive: isActive("gras"),
  //     //   children: [
  //     //     {
  //     //       title: t("A application"),
  //     //       url: "a-231",
  //     //     },
  //     //     {
  //     //       title: t("B application"),
  //     //       url: "b-231",
  //     //     },
  //     //     {
  //     //       title: t("C application"),
  //     //       url: "c-231",
  //     //     },
  //     //     {
  //     //       title: t("D application"),
  //     //       url: "d-231",
  //     //     },
  //     //     {
  //     //       title: t("E application"),
  //     //       url: "e-231",
  //     //     },
  //     //   ],
  //     // },
  //   ],
  // },
  {
    title: t("Resource Database"),
    items: [
      // {
      //   title: t("Nokia"),
      //   url: "nokia",
      //   icon: Database,
      //   isActive: isActive("nokia"),
      // },
      // {
      //   title: t("ZTE"),
      //   url: "zte",
      //   icon: Database,
      //   isActive: isActive("zte"),
      // },
      // {
      //   title: t("Huawei P30 pro"),
      //   url: "huawei-p30-pro",
      //   icon: Database,
      //   isActive: isActive("huawei-p30-pro"),
      // },
      // {
      //   title: t("Huawei P30 lite"),
      //   url: "huawei-p30-lite",
      //   icon: Database,
      //   isActive: isActive("huawei-p30-lite"),
      // },
      {
        title: t("Channels(5_3)"),
        url: "channels-5_3",
        icon: Database,
        isActive: isActive("channels-5_3"),
      },
      {
        title: t("Channels ID"),
        url: "channels-id",
        icon: Database,
        isActive: isActive("channels-id"),
      },
      {
        title: t("Flows(5_1)"),
        url: "flows-5_1",
        icon: Database,
        isActive: isActive("flows-5_1"),
      },
      {
        title: t("Flows ID"),
        url: "flows-id",
        icon: Database,
        isActive: isActive("flows-id"),
      },
      {
        title: t("Card index"),
        url: "card-indexes",
        icon: Database,
        isActive: isActive("card-indexes"),
      },
    ],
  },
  {
    title: t("Administration"),
    items: [
      {
        title: t("Staff"),
        url: "staff",
        icon: User,
        isActive: isActive("staff"),
      },
      {
        title: t("Groups"),
        url: "groups",
        icon: Users,
        isActive: isActive("groups"),
      },
      {
        title: t("Settings"),
        url: "settings",
        icon: Settings,
        isActive: isActive("settings"),
        children: [
          {
            title: t("Roles"),
            url: "roles",
            icon: ShieldUser,
          },
        ],
      },
    ],
  },
];

export default createSidebarGroups;
