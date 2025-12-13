import { PaginationInterface as DgzPaginationInterface } from "dgz-ui-shared/components/datatable";

export interface PaginationInterface<TData>
  extends DgzPaginationInterface<TData> {
  data: TData[];
  message: string;
  totalDocs: number;
  results: number;
}
