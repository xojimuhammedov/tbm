declare module "numeral" {
  interface NumeralInstance {
    format(format?: string): string;
    value(): number | null;
  }
  function numeral(value?: number | string | null): NumeralInstance;
  export default numeral;
}
