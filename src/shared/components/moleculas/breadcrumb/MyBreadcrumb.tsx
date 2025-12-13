import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbInterface,
} from "dgz-ui/breadcrumb";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import BreadcrumbLink from "@/shared/components/moleculas/breadcrumb/BreadcrumbLink.tsx";
import { isEmpty } from "lodash";

export interface MyBreadcrumbProps {
  breadcrumbs?: BreadcrumbInterface[];
}

const MyBreadcrumb = ({ breadcrumbs = [] }: MyBreadcrumbProps) => {
  const { t } = useTranslation();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink to="/">{t("Dashboard")}</BreadcrumbLink>
        </BreadcrumbItem>
        {!isEmpty(breadcrumbs) && <BreadcrumbSeparator />}
        {breadcrumbs
          .reduce((arr: BreadcrumbInterface[], item, index) => {
            if (index && item.path) {
              item = {
                ...item,
                path: [arr[index - 1].path, item.path].join("/"),
              };
            }
            arr.push(item);
            return arr;
          }, [])
          .map((item, index) => (
            <Fragment key={index}>
              <BreadcrumbItem>
                {!item.isActive ? (
                  <BreadcrumbLink to={item.path}>{item.name}</BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{item.name}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {index + 1 !== breadcrumbs.length && <BreadcrumbSeparator />}
            </Fragment>
          ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default MyBreadcrumb;
