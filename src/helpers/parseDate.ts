export default function parseDate(date: string): Date {
  return new Date(new Date().setTime(Date.parse(date)));
}
