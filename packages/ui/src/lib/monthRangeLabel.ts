export function monthRangeLabel(ms: number[]) {
  if (!ms?.length) return "—";
  const names = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const s = [...new Set(ms)].filter(n=>n>=1&&n<=12).sort((a,b)=>a-b);
  if (!s.length) return "—";
  const first = names[s[0]-1], last = names[s[s.length-1]-1];
  return s.length > 1 ? `${first}–${last}` : first;
}