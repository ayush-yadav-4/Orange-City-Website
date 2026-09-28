export function SameDayDeliveryBar() {
  return (
    <div
      className="relative z-10 border-b border-yellow-300/50 bg-yellow-50 dark:bg-yellow-950/40"
      role="status"
      aria-label="Same day delivery in Nagpur — order before 6 PM"
    >
      <div className="container-page flex items-center justify-center px-2 py-1 sm:px-3">
        <p
          className="animate-delivery-blink text-center text-[10px] font-extrabold uppercase leading-tight tracking-wide [text-shadow:0_1px_2px_rgba(194,65,12,0.45)] sm:text-sm sm:[text-shadow:none] md:text-base"
        >
          Same day delivery in Nagpur · Order before 6 PM
        </p>
      </div>
    </div>
  );
}
