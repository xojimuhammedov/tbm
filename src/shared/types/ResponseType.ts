export interface ResponseType<TData> {
  title: string;
  message: {
    messageUzLatin: string;
    messageUzCyrillic: string;
    messageRu: string;
  };
  photo?: Record<string, string>;
  isTable: boolean;
  result: TData[];
}
