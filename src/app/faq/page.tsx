"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Do you offer doorstep installation?",
    answer: "Yes! We provide free doorstep fitment for car and inverter batteries across Nagpur.",
  },
  {
    question: "How long does a typical battery last?",
    answer: "A standard car battery usually lasts between 3 to 5 years depending on usage, climate, and maintenance. Inverter batteries can last 3-6 years based on discharge cycles.",
  },
  {
    question: "Do you take old batteries in exchange?",
    answer: "Yes, we accept old batteries in exchange and offer an upfront discount on your new battery purchase.",
  },
  {
    question: "Are all your batteries genuine?",
    answer: "Absolutely. We only sell 100% genuine batteries from authorized brands with proper warranty cards and GST invoices.",
  },
  {
    question: "How can I claim warranty on my battery?",
    answer: "You can reach out to us with your invoice and warranty card. We will assist you with the warranty claim process through the respective brand's authorized service network.",
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="container-page py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-center font-display text-4xl font-bold tracking-tight text-[hsl(var(--foreground))] sm:text-5xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-center text-lg text-[hsl(var(--muted-foreground))]">
          Find answers to common questions about our products and services.
        </p>

        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] overflow-hidden"
            >
              <button
                className="flex w-full items-center justify-between px-6 py-4 text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-[hsl(var(--foreground))]">{faq.question}</span>
                <ChevronDown 
                  className={cn(
                    "h-5 w-5 text-[hsl(var(--muted-foreground))] transition-transform",
                    openIndex === index ? "rotate-180" : ""
                  )} 
                />
              </button>
              
              <div 
                className={cn(
                  "overflow-hidden transition-all duration-200 ease-in-out",
                  openIndex === index ? "max-h-[500px]" : "max-h-0"
                )}
              >
                <div className="px-6 pb-4 text-[hsl(var(--muted-foreground))]">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
