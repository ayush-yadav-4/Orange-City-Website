import { Phone } from "lucide-react";
import { SITE } from "@/lib/utils";

function formatPhoneDisplay(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("91") && digits.length === 12) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  }
  return phone;
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
      />
    </svg>
  );
}

export function HelpCtaBanner() {
  const phoneDisplay = formatPhoneDisplay(SITE.phone);

  return (
    <section className="mt-20 bg-brand-600 text-white" aria-label="Need help choosing a battery?">
      <div className="container-page py-6 md:py-7">
        <div className="flex flex-col items-stretch gap-6 md:flex-row md:items-center md:gap-0">
          {/* Left — heading */}
          <div className="flex flex-1 flex-col justify-center md:max-w-[36%] md:pr-8">
            <h2 className="font-display text-xl font-extrabold uppercase tracking-wide sm:text-2xl lg:text-3xl">
              Need Any Help
            </h2>
            <p className="mt-0.5 text-sm font-medium text-white/95 sm:text-base">
              to choose the right product for you
            </p>
          </div>

          {/* Center divider */}
          <div className="hidden items-center self-stretch md:flex md:px-6">
            <div className="relative flex h-full min-h-[4.5rem] items-center">
              <div className="h-full w-px bg-white/80" />
              <div
                className="absolute left-1/2 top-1/2 h-0 w-0 -translate-x-1/2 -translate-y-1/2 border-y-[6px] border-l-[9px] border-y-transparent border-l-white"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Right — contact */}
          <div className="flex flex-1 flex-col md:pl-2">
            <p className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-white/95 sm:text-xs">
              Feel Free To Call
            </p>
            <div className="mx-auto mt-2 h-px w-full max-w-sm bg-white/70" />

            <div className="mt-4 grid grid-cols-2 gap-4 sm:gap-8 md:gap-10">
              <a
                href={`tel:${SITE.phone}`}
                className="group flex flex-col items-center text-center transition hover:opacity-90"
              >
                <Phone
                  size={28}
                  strokeWidth={1.75}
                  className="mb-2 text-white transition group-hover:scale-105"
                />
                <span className="text-[11px] font-medium text-white/85 sm:text-xs">Our helpline</span>
                <span className="mt-0.5 text-base font-bold tracking-tight sm:text-lg">{phoneDisplay}</span>
              </a>

              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center text-center transition hover:opacity-90"
              >
                <WhatsAppIcon className="mb-2 h-7 w-7 text-white transition group-hover:scale-105" />
                <span className="text-[11px] font-medium text-white/85 sm:text-xs">SMS on whatsapp chat</span>
                <span className="mt-0.5 text-base font-bold tracking-tight sm:text-lg">{phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
