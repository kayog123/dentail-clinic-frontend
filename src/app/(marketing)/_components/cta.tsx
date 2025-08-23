import { LucideCalendar, LucidePhone } from "lucide-react";

/* -------------------- Schedule CTA -------------------- */
export default function CTA() {
  return (
    <section
      id="schedule"
      className="mx-auto max-w-7xl px-4 py-14 md:py-20"
      data-oid="de4zx5s"
    >
      <div
        className="rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 to-cyan-50 p-8 md:p-12 text-center shadow-sm"
        data-oid="le_egun"
      >
        <h2
          className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-800"
          data-oid="3iwlz8b"
        >
          Ready for a happier, healthier smile?
        </h2>
        <p className="mt-3 text-slate-600" data-oid="ps2:-rf">
          Book online in minutes or call and we&apos;ll help you find the
          perfect time.
        </p>
        <div
          className="mt-6 flex flex-col sm:flex-row gap-3 justify-center"
          data-oid="pgsa-c3"
        >
          <a
            href="mailto:hello@brightsmile.example?subject=Appointment%20Request&body=Name%3A%0APhone%3A%0APreferred%20Date%2FTime%3A%0AService%3A"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-600 px-6 py-3 text-white font-medium hover:bg-sky-700 transition"
            data-oid="aan.w3:"
          >
            <LucideCalendar className="h-5 w-5" data-oid="ijbofs7" />
            Request Appointment
          </a>
          <a
            href="tel:+15551234567"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-sky-200 bg-white px-6 py-3 text-sky-700 font-medium hover:bg-sky-50 transition"
            data-oid="mu80p2x"
          >
            <LucidePhone className="h-5 w-5" data-oid=".6-emyv" />
            Call (555) 123-4567
          </a>
        </div>
        <p className="mt-3 text-xs text-slate-500" data-oid="y-kdf7r">
          By requesting an appointment, you agree to be contacted to confirm
          your visit.
        </p>
      </div>
    </section>
  );
}
