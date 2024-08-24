export class NumberUtil {
  public static currency(number: number | string): string {
    return Number(number).toLocaleString('vi-VI')
  }
}
