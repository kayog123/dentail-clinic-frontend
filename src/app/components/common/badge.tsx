export default function Badge({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-slate-700 ring-1 ring-sky-100 shadow-sm"
      data-oid="f-8l1-t"
    >
      {icon}
      <span className="text-xs font-medium" data-oid="_nlykip">
        {text}
      </span>
    </div>
  );
}
