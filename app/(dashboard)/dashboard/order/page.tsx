"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { ArrowRight, Paperclip, Link as LinkIcon, X } from "lucide-react";
import { oswald } from "@/app/(app)/fonts";
import PayPalButton from '@/app/(dashboard)/dashboard/components/PayPalButton';

type ModalType = "loading" | "success" | "error" | null;
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Define a service-to-amount mapping for the dropdown
const SERVICE_PRICING: Record<string, number> = {
  "Academic Writing Support": 10,
  "Research Assistance (Projects, Thesis, Dissertations)": 20,
  "Publication & Journal Support": 15,
  "Editing, Review & Proofreading": 12,
  "General Consultation": 8,
};

export default function OrderForm() {
  const searchParams = useSearchParams();

  const incomingService = searchParams.get("service") || "Custom Service";
  const incomingAmount = searchParams.get("amount");
  const unit = searchParams.get("unit") || "service";

  const isPreSelected = !!searchParams.get("service");
  const [selectedService, setSelectedService] = useState(incomingService);
  const [amount, setAmount] = useState<number>(
    incomingAmount ? parseFloat(incomingAmount) : SERVICE_PRICING[incomingService] || 0
  );

  const [modalState, setModalState] = useState<ModalType>(null);
  const [modalMessage, setModalMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Update amount if the dropdown changes
  useEffect(() => {
    if (!isPreSelected) {
      setAmount(SERVICE_PRICING[selectedService] || 0);
    }
  }, [selectedService, isPreSelected]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setModalState("loading");
    setModalMessage("Submitting your request...");

    const form = e.currentTarget;
    const formData = new FormData();

    Array.from(form.elements).forEach((el: any) => {
      if (!el.name || el.type === "file") return;
      formData.append(el.name, el.value);
    });

    if (isPreSelected) {
      formData.append("service", incomingService);
    }

    selectedFiles.forEach((file) => {
      formData.append("files[]", file, file.name);
    });

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error();

      setModalState("success");
      setModalMessage("Your request has been submitted successfully!");
      form.reset();
      setSelectedFiles([]);
      setTimeout(() => setModalState(null), 5000);
    } catch {
      setModalState("error");
      setModalMessage("Failed to submit request. Please try again.");
      setTimeout(() => setModalState(null), 6000);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="w-full bg-white/10 backdrop-blur-xl mt-16 rounded-2xl p-8 sm:p-10 shadow-2xl text-white border border-white/20"
      >
        {/* Service Selector */}
        <div className="mb-8">
          <label className={`${oswald.className} block mb-3 text-lg font-semibold`}>
            Service Type
          </label>

          {isPreSelected ? (
            <div
              className={`
                ${oswald.className}
                w-full p-4 rounded-xl bg-gray-800/40 text-gray-300
                border border-gray-500/50 cursor-not-allowed
                flex items-center justify-between
              `}
            >
              <span>{selectedService}</span>
              <span className="text-xs opacity-70">(pre-selected from pricing)</span>
            </div>
          ) : (
            <select
              name="service"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className={`${oswald.className} text-white w-full p-4 rounded-xl bg-white/10 border border-white/30 focus:ring focus:ring-[#E8B85F]/60 outline-none`}
            >
              {Object.keys(SERVICE_PRICING).map((service) => (
                <option key={service} value={service} className="text-black">
                  {service}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Name */}
        <div className="mb-6">
          <label className={`${oswald.className} block mb-2 font-semibold`}>Full Name</label>
          <input
            name="name"
            type="text"
            required
            className={`${oswald.className} w-full p-4 rounded-xl bg-white/10 border border-white/30 focus:ring focus:ring-[#E8B85F]/60 outline-none`}
            placeholder="Your full name"
          />
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className={`${oswald.className} block mb-2 font-semibold`}>Email Address</label>
          <input
            name="email"
            type="email"
            required
            className={`${oswald.className} w-full p-4 rounded-xl bg-white/10 border border-white/30 focus:ring focus:ring-[#E8B85F]/60 outline-none`}
            placeholder="you@example.com"
          />
        </div>

        {/* Details */}
        <div className="mb-8">
          <label className={`${oswald.className} block mb-2 font-semibold`}>
            Describe your project or request
          </label>
          <textarea
            name="details"
            rows={6}
            required
            className={`${oswald.className} w-full p-4 rounded-xl bg-white/10 border border-white/30 focus:ring focus:ring-[#E8B85F]/60 outline-none`}
            placeholder="Provide as much detail as possible…"
          />
        </div>

        {/* Attachments & Links */}
        {/* ... your file upload logic remains unchanged ... */}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={modalState === "loading"}
          className={`${oswald.className} w-full flex justify-center items-center gap-3 bg-[#E8B85F] text-[#1C1C30] font-bold text-lg py-4 rounded-full hover:bg-[#d4a44e] hover:scale-[1.02] transition-all disabled:opacity-70 disabled:cursor-not-allowed`}
        >
          {modalState === "loading" ? "Submitting..." : "Submit Request"} <ArrowRight className="w-5 h-5" />
        </button>

        {/* PayPal Button */}
        {amount > 0 && (
          <div className="mt-10 flex flex-col items-center gap-4">
            <p className={`${oswald.className} text-sm opacity-80 text-center`}>
              Suggested starting payment for <strong>{selectedService}</strong>: <strong>${amount.toFixed(2)}</strong> {unit === "page" ? "/ page" : ""}
            </p>
            <PayPalButton amount={amount} />
            <p className={`${oswald.className} text-xs opacity-60 mt-2 text-center`}>
              This is a suggested deposit — final amount may vary based on project details.
            </p>
          </div>
        )}
      </motion.form>

      {/* Modal Overlay */}
      <AnimatePresence>
        {modalState && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-lg" onClick={() => setModalState(null)} />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl max-w-md w-full p-10 text-center border border-gray-200"
            >
              <button
                onClick={() => setModalState(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-6 h-6" />
              </button>

              {modalState === "loading" && <div className="mx-auto w-16 h-16 border-4 border-[#E8B85F]/30 border-t-[#E8B85F] rounded-full animate-spin mb-6" />}
              {modalState === "success" && <FaCheckCircle className="mx-auto w-16 h-16 text-green-500 mb-6" />}
              {modalState === "error" && <FaExclamationCircle className="mx-auto w-16 h-16 text-red-500 mb-6" />}

              <h3 className={`${oswald.className} text-2xl font-bold text-gray-800 mb-3`}>
                {modalState === "loading" ? "Processing..." : modalState === "success" ? "Success!" : "Error"}
              </h3>
              <p className={`${oswald.className} text-gray-600 leading-relaxed`}>{modalMessage}</p>
              <div className="mt-8 h-1 w-24 mx-auto bg-gradient-to-r from-[#E8B85F] to-[#d4a44e] rounded-full" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
