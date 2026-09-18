"use client";

export function ContactForm() {
  return (
    <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium">Name</label>
        <input type="text" id="name" className="input-field mt-1" placeholder="Your name" />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
        <input type="tel" id="phone" className="input-field mt-1" placeholder="Your phone number" />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium">Message</label>
        <textarea id="message" rows={4} className="input-field mt-1" placeholder="How can we help?" />
      </div>
      <button type="button" className="btn-primary w-full">
        Submit Request
      </button>
    </form>
  );
}
