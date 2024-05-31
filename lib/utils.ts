export function dateFormat(date: Date | undefined) {
  if (date === undefined) return '';
  return new Intl.DateTimeFormat(['ko-KR']).format(date).replaceAll(" ", "")
}