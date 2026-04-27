import { MenuGroupInterface } from "@/layouts/base/interfaces/menu-group.interface.ts";
import { TranslationArgsType } from "dgz-ui-shared/types";
import {
  BarChart3,
  Building,
  ChartBarBig,
  Database,
  FileLock,
  FileSignature,
  Inbox,
  Settings,
  ShieldUser,
  SmartphoneCharging,
  Tv,
  User,
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
            roles: ["admin", "superadmin"],
          },
          {
            title: t("17-97 ex/out document"),
            url: "exout-97",
            roles: ["admin", "superadmin"],
          },
          {
            title: t("17-98 loc/in document"),
            url: "locin-98",
            roles: ["admin", "superadmin"],
          },
          {
            title: t("17-99 loc/out document"),
            url: "locout-99",
            roles: ["admin", "superadmin"],
          },
        ],
      },
    ],
  },
  {
    title: t("Jurnallar"),
    items: [
      {
        title: t("Jurnallar"),
        url: "journals",
        icon: FileSignature,
        isActive: isActive("journals"),
        children: [
          {
            title: t("Buyruqlar"),
            url: "orders",
            roles: ["admin", "superadmin"],
          },
          {
            title: t("Farmoyishlar"),
            url: "decrees",
            roles: ["admin", "superadmin"],
          },
          {
            title: t("Xabarnoma va farmoyish"),
            url: "notify",
            roles: ["admin", "superadmin"],
          },
          {
            title: t("Chiquvchi hujjatlar"),
            url: "outgoing",
            roles: ["admin", "superadmin"],
          },
        ],
      },
    ],
  },
  {
    title: t("TBP Jurnallar"),
    items: [
      {
        title: t("Jurnallar"),
        url: "journals",
        icon: FileSignature,
        isActive: isActive("journals"),
        children: [
          {
            title: t("12-22 ex/in document"),
            url: "exin-96",
            roles: ["tbp"],
          },
          {
            title: t("12-23 ex/out document"),
            url: "exout-97",
            roles: ["tbp"],
          },
          {
            title: t("12-24 loc/in document"),
            url: "locin-98",
            roles: ["tbp"],
          },
          {
            title: t("12-25 loc/out document"),
            url: "locout-99",
            roles: ["tbp"],
          },
        ],
      },
    ],
  },
  {
    title: t("NM information"),
    items: [
      {
        title: t("RTSI"),
        url: "rtsi",
        icon: ChartBarBig,
        isActive: isActive("rtsi"),
        children: [
          {
            title: t("Application"),
            url: "application",
            roles: ["admin", "superadmin"],
          },
          {
            title: t("F-51 document"),
            url: "f-51",
            roles: ["admin", "superadmin"],
          },
          {
            title: t("F-56 document"),
            url: "f-56",
            roles: ["admin", "superadmin"],
          },
          {
            title: t("F-54 document"),
            url: "f-54",
            roles: ["admin", "superadmin"],
          },
          {
            title: t("17-96 document"),
            url: "eid-96",
            roles: ["admin", "superadmin"],
          },
        ],
      },
      {
        title: t("RTTSI"),
        url: "rttsi",
        icon: SmartphoneCharging,
        isActive: isActive("rttsi"),
        roles: ["admin", "superadmin"],
      },
      {
        title: t("Operational work"),
        url: "operational-work",
        icon: FileLock,
        isActive: isActive("operational-work"),
        roles: ["admin", "superadmin"],
      },
      {
        title: t("Television"),
        url: "television",
        icon: Tv,
        isActive: isActive("television"),
        roles: ["admin", "superadmin"],
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
            roles: ["admin", "superadmin"],
          },
          {
            title: t("RH-091"),
            url: "rh-091",
            roles: ["admin", "superadmin"],
          },
          {
            title: t("RH-218"),
            url: "rh-218",
            roles: ["admin", "superadmin"],
          },
          {
            title: t("RH-226-1"),
            url: "rh-226-1",
            roles: ["admin", "superadmin"],
          },
          {
            title: t("RH-226-2"),
            url: "rh-226-2",
            roles: ["admin", "superadmin"],
          },
          {
            title: t("RH-249"),
            url: "rh-249",
            roles: ["admin", "superadmin"],
          },
          {
            title: t("RH-251"),
            url: "rh-251",
            roles: ["admin", "superadmin"],
          },
          {
            title: t("RH-260"),
            url: "rh-260",
            roles: ["admin", "superadmin"],
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
            roles: ["admin", "superadmin"],
          },
          {
            title: t("Kelishuv farmoyishlar"),
            url: "agreement-decrees",
            roles: ["admin", "superadmin"],
          },
          {
            title: t("Imzolanadigan hujjatlar"),
            url: "hujjatlarni-imzolash",
            roles: ["admin", "superadmin"],
          },
          {
            title: t("3.3 Application"),
            url: "rh-3_3",
            roles: ["admin", "superadmin"],
          },
          {
            title: t("C Application"),
            url: "c-252",
            roles: ["admin", "superadmin"],
          },
          {
            title: t("D Application"),
            url: "d-252",
            roles: ["admin", "superadmin"],
          },
          {
            title: t("F Application"),
            url: "f-252",
            roles: ["admin", "superadmin"],
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
            roles: ["admin", "superadmin"],
          },
        ],
      },
    ],
  },
  {
    title: t("TBP hujjatlari"),
    items: [
      {
        title: t("TBP"),
        url: "tbp",
        icon: ChartBarBig,
        isActive: isActive("tbp"),
        children: [
          {
            title: t("Hujjatlar"),
            url: "hujjatlar",
            roles: ["admin", "tbp", "superadmin"],
          },
          {
            title: t("Imzolanadigan hujjatlar"),
            url: "imzolanadigan-hujjatlar",
            roles: ["admin", "tbp", "superadmin"],
          },
        ],
      },
    ],
  },
  {
    title: t("MBB hujjatlari"),
    items: [
      {
        title: t("MBB"),
        url: "mbb",
        icon: ChartBarBig,
        isActive: isActive("mbb"),
        children: [
          {
            title: t("Hujjatlar"),
            url: "talabnoma",
            roles: ["admin", "mbb", "superadmin"],
          },
          {
            title: t("Imzolanadigan hujjatlar"),
            url: "mbb-imzolanadigan-hujjatlar",
            roles: ["admin", "mbb", "superadmin"],
          },
        ],
      },
      {
        title: t("MBB Reg Documents"),
        url: "mbb/mbb-reg-documents",
        icon: FileSignature,
        isActive: isActive("mbb-reg-documents"),
        children: [
          {
            title: t("Kirish hujjatlari"),
            url: "internal-inbound",
            roles: ["admin", "mbb", "superadmin"],
          },
          {
            title: t("Chiqish hujjatlari"),
            url: "internal-outbound",
            roles: ["admin", "mbb", "superadmin"],
          },
          {
            title: t("Telekommunikatsiya tarmog‘i"),
            url: "telecom-operative",
            roles: ["admin", "mbb", "superadmin"],
          },
          {
            title: t("Reja/rejadan tashqari tamirlash"),
            url: "maintenance-log",
            roles: ["admin", "mbb", "superadmin"],
          },
          {
            title: t("AI-7, AI-9/AI-98 ijarasida"),
            url: "channel-status",
            roles: ["admin", "mbb", "superadmin"],
          },
          {
            title: t("TV/RV chiqishlar"),
            url: "tv-rv-output-log",
            roles: ["admin", "mbb", "superadmin"],
          },
          {
            title: t("3.3-ma'lumotnoma"),
            url: "document-mbb-3-3",
            roles: ["admin", "mbb", "superadmin"],
          },
        ],
      },
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
    title: t("Documents"),
    items: [
      {
        title: t("Aylanma hujjatlar"),
        url: "turnover-documents",
        icon: Building,
        isActive: isActive("turnover-documents"),
        roles: ["admin", "superadmin", "mbb", "tbp", "tbm"],
      },
    ],
  },

  {
    title: t("Resource Database"),
    items: [
      {
        title: t("Channels"),
        url: "",
        icon: Database,
        isActive: isActive("channels"),
        children: [
          {
            title: t("Channels(5_3)"),
            url: "channels-5_3",
            roles: ["admin", "superadmin"],
          },
          {
            title: t("Channels ID"),
            url: "channels-id",
            roles: ["admin", "superadmin"],
          },
        ],
      },
      {
        title: t("Flows"),
        url: "",
        icon: Database,
        isActive: isActive("flows"),
        children: [
          {
            title: t("Flows(5_1)"),
            url: "flows-5_1",
            roles: ["admin", "superadmin"],
          },
          {
            title: t("Flows ID"),
            url: "flows-id",
            roles: ["admin", "superadmin"],
          },
        ],
      },
      {
        title: t("Card index"),
        url: "card-indexes",
        icon: Database,
        isActive: isActive("card-indexes"),
        roles: ["admin", "superadmin"],
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
        roles: ["admin", "superadmin"],
      },
      // {
      //   title: t("Groups"),
      //   url: "groups",
      //   icon: Users,
      //   isActive: isActive("groups"),
      //   roles: ["admin", 'superadmin'],
      // },
      {
        title: t("Organizations"),
        url: "organizations",
        icon: Building,
        isActive: isActive("organizations"),
        roles: ["admin", "superadmin"],
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
            roles: ["admin", "superadmin"],
          },
          {
            title: t("Positions"),
            url: "positions",
            icon: ShieldUser,
            roles: ["admin", "superadmin"],
          },
        ],
      },
    ],
  },
];

export default createSidebarGroups;
