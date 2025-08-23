import {
  LucideMail,
  LucideMapPin,
  LucidePhone,
  LucideShield,
} from "lucide-react";

export default function OfficeInfo() {
  return (
    <section id="office" className="mx-auto max-w-7xl px-4 py-14 md:py-20">
      <div className="grid lg:grid-cols-2 gap-8 items-stretch">
        <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-800">
            Visit our office
          </h2>
          <p className="mt-2 text-slate-600">
            123 Smile Ave, Suite 200, Springfield, ST 00000
          </p>

          <div className="mt-4 flex flex-col gap-3 text-sm">
            <div className="flex items-center gap-2">
              <LucideMapPin className="h-5 w-5 text-sky-600" />
              <a
                className="hover:text-sky-700 underline underline-offset-4 text-slate-600"
                href="https://maps.google.com/?q=123+Smile+Ave+Springfield"
                target="_blank"
                rel="noreferrer"
              >
                Get Directions
              </a>
            </div>
            <div className="flex items-center gap-2">
              <LucidePhone className="h-5 w-5 text-sky-600" />
              <a
                className="hover:text-sky-700 text-slate-600"
                href="tel:+15551234567"
              >
                (555) 123-4567
              </a>
            </div>
            <div className="flex items-center gap-2">
              <LucideMail className="h-5 w-5 text-sky-600" />
              <a
                className="hover:text-sky-700 text-slate-600"
                href="mailto:hello@brightsmile.example"
              >
                hello@brightsmile.example
              </a>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-medium text-slate-800">Hours</h3>
            <ul className="mt-2 grid grid-cols-2 gap-2 text-sm text-slate-600">
              <li>Mon–Thu: 8:00a–5:00p</li>
              <li>Fri: 8:00a–2:00p</li>
              <li>Sat: By appointment</li>
              <li>Sun: Closed</li>
            </ul>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <LucideShield className="h-4 w-4" />
            Most PPO insurance accepted • Flexible financing available
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border border-sky-100 bg-white shadow-sm">
          <iframe
            title="BrightSmile Dental Map"
            className="h-[360px] md:h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=123%20Smile%20Ave%20Springfield&output=embed"
          />
        </div>
      </div>
    </section>
  );
}
