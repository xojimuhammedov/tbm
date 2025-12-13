import {
  MyLimitSelect,
  MyPagination,
} from "dgz-ui-shared/components/pagination";
import { DEFAULT_CARD_ITEMS_LIMIT_OPTIONS } from "@/shared/constants/page.constants.ts";
import { DataTableProps } from "dgz-ui-shared/components/datatable";
import { PaginationInterface } from "@/shared/interfaces/pagination.interface.ts";

export type CardItemsPaginationProps = Pick<
  DataTableProps<unknown, PaginationInterface<unknown>>,
  "onParamChange" | "params"
> & {
  totalPages?: number;
};

const CardItemsPagination = ({
  onParamChange,
  params,
  totalPages = 0,
}: CardItemsPaginationProps) => {
  return (
    <div className="flex shrink-0 flex-col items-center justify-between gap-3 py-4 lg:flex-row">
      <div className="text-sm">
        <MyLimitSelect
          options={DEFAULT_CARD_ITEMS_LIMIT_OPTIONS}
          onLimitChange={(limit) =>
            onParamChange?.({ ...params, limit, page: 1 })
          }
          defaultValue={Number(
            params?.limit || DEFAULT_CARD_ITEMS_LIMIT_OPTIONS,
          )}
        />
      </div>
      <div>
        <MyPagination
          onPageChange={(page) => onParamChange?.({ ...params, page })}
          currentPage={Number(params?.page || 1)}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default CardItemsPagination;
