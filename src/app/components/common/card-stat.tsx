export default function CardStat({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div
      className="rounded-xl border border-sky-100 bg-white px-4 py-3 shadow-sm"
      data-oid="d27ykow"
    >
      <p className="text-xs text-slate-500" data-oid="g6svb_y">
        {title}
      </p>
      <p className="text-sm font-semibold" data-oid="672-5_9">
        {value}
      </p>
    </div>
  );
}
