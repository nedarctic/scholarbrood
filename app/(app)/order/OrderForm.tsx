"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaypal, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { ArrowRight, Paperclip, Link as LinkIcon, X } from "lucide-react";
import { oswald } from "../fonts";

type ModalType = "loading" | "success" | "error" | null;
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export default function OrderForm() {
    const searchParams = useSearchParams();

    const incomingService = searchParams.get("service") || "Custom Service";
    const amount = searchParams.get("amount") || "0";
    const unit = searchParams.get("unit") || "service";

    const isPreSelected = !!searchParams.get("service");
    const selectedService = incomingService;

    const [modalState, setModalState] = useState<ModalType>(null);
    const [modalMessage, setModalMessage] = useState("");
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

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

    const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=scholarbrood1@gmail.com&item_name=${encodeURIComponent(
        selectedService
    )}&amount=${amount}&currency_code=USD&no_shipping=1&no_note=1&lc=US&bn=PP-BuyNowBF`;

    return (
        <div className="flex flex-col items-center justify-center w-full">
            {/* Form Container */}
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
                        // Show as disabled input (looks like a greyed-out field)
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
                        // Normal selectable dropdown when no pre-selection
                        <select
                            name="service"
                            defaultValue="General Consultation"
                            className={`${oswald.className} text-white w-full p-4 rounded-xl bg-white/10 border border-white/30 focus:ring focus:ring-[#E8B85F]/60 outline-none`}
                        >
                            <option value="Academic Writing Support" className="text-black">Academic Writing Support</option>
                            <option value="Research Assistance (Projects, Thesis, Dissertations)" className="text-black">
                                Research Assistance (Projects, Thesis, Dissertations)
                            </option>
                            <option value="Publication & Journal Support" className="text-black">
                                Publication & Journal Support
                            </option>
                            <option value="Editing, Review & Proofreading" className="text-black">
                                Editing, Review & Proofreading
                            </option>
                            <option value="General Consultation" className="text-black">General Consultation</option>
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
                <div className="mb-10 space-y-6">
                    <div>
                        <label className={`${oswald.className} block mb-2 font-semibold`}>
                            Upload documents (PDF, DOCX, ZIP — max 10MB each)
                        </label>

                        {/* Upload Button */}
                        <label className="flex items-center justify-center gap-3 w-full p-4 rounded-xl bg-white/10 border border-dashed border-white/40 cursor-pointer hover:bg-white/20 transition">
                            <Paperclip className="w-5 h-5 opacity-80" />

                            <span className={`${oswald.className} text-sm opacity-90`}>
                                {selectedFiles.length === 0
                                    ? "Upload documents (PDF, DOCX, ZIP)"
                                    : "Add more files"}
                            </span>

                            <input
                                name="files"
                                type="file"
                                multiple
                                className="hidden"
                                onChange={(e) => {
                                    if (!e.target.files) return;

                                    const validFiles: File[] = [];
                                    const rejectedFiles: string[] = [];

                                    Array.from(e.target.files).forEach((file) => {
                                        if (file.size > MAX_FILE_SIZE) {
                                            rejectedFiles.push(file.name);
                                        } else {
                                            validFiles.push(file);
                                        }
                                    });

                                    if (rejectedFiles.length > 0) {
                                        setModalState("error");
                                        setModalMessage(
                                            `These files exceed the 10MB limit:\n${rejectedFiles.join(", ")}`
                                        );
                                        setTimeout(() => setModalState(null), 5000);
                                    }

                                    setSelectedFiles((prev) => [...prev, ...validFiles]);
                                    e.target.value = "";
                                }}
                            />
                        </label>

                        {/* File List */}
                        {selectedFiles.length > 0 && (
                            <ul className="mt-4 space-y-2">
                                {selectedFiles.map((file, index) => (
                                    <li
                                        key={`${file.name}-${index}`}
                                        className="flex items-center justify-between bg-white/10 rounded-lg px-4 py-2 text-sm"
                                    >
                                        <div className="flex items-center gap-3 truncate">
                                            <Paperclip className="w-4 h-4 opacity-70 shrink-0" />
                                            <span className={`${oswald.className} truncate max-w-[240px]`}>
                                                {file.name}
                                            </span>
                                            <span className={`${oswald.className} opacity-60 text-xs`}>
                                                {(file.size / 1024 / 1024).toFixed(2)} MB
                                            </span>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setSelectedFiles((prev) =>
                                                    prev.filter((_, i) => i !== index)
                                                )
                                            }
                                            className={`${oswald.className} text-red-400 hover:text-red-500 transition`}
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* External Links */}
                    <div>
                        <label className={`${oswald.className} block mb-2 font-semibold`}>
                            External links (optional)
                        </label>
                        <div className="relative">
                            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-70" />
                            <input
                                name="links"
                                type="url"
                                className={`${oswald.className} w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-white/30 focus:ring focus:ring-[#E8B85F]/60 outline-none`}
                                placeholder="Paste Google Docs, Drive, Dropbox, GitHub, etc."
                            />
                        </div>
                    </div>
                </div>


                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={modalState === "loading"}
                    className={`${oswald.className} w-full flex justify-center items-center gap-3 bg-[#E8B85F] text-[#1C1C30] font-bold text-lg py-4 rounded-full hover:bg-[#d4a44e] hover:scale-[1.02] transition-all disabled:opacity-70 disabled:cursor-not-allowed`}
                >
                    {modalState === "loading" ? "Submitting..." : "Submit Request"} <ArrowRight className="w-5 h-5" />
                </button>

                {/* PayPal Payment Option */}
                {amount !== "0" && (
                    <div className="mt-10 pt-6 border-t border-white/20 text-center space-y-3">
                        <p className={`${oswald.className} text-sm opacity-80`}>
                            Suggested starting payment for <strong>{selectedService}</strong>:{" "}
                            <strong>${amount}</strong> {unit === "page" ? "/ page" : ""}
                        </p>

                        <a
                            href={paypalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${oswald.className} inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#0070BA] text-white font-bold hover:bg-[#005ea6] transition`}
                        >
                            <FaPaypal className="w-6 h-6" />
                            Pay ${amount} with PayPal Now
                        </a>

                        <p className={`${oswald.className} text-xs opacity-60 mt-2`}>
                            This is a suggested deposit — final amount may vary based on project details.
                        </p>
                    </div>
                )}
            </motion.form>
            {/* Stylish Modal Overlay */}
            <AnimatePresence>
                {modalState && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center px-4"
                    >
                        {/* Backdrop Blur */}
                        <div className="absolute inset-0 bg-black/70 backdrop-blur-lg" onClick={() => setModalState(null)} />

                        {/* Modal Card */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: -20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl max-w-md w-full p-10 text-center border border-gray-200"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setModalState(null)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Icon */}
                            {modalState === "loading" && (
                                <div className="mx-auto w-16 h-16 border-4 border-[#E8B85F]/30 border-t-[#E8B85F] rounded-full animate-spin mb-6" />
                            )}
                            {modalState === "success" && (
                                <FaCheckCircle className="mx-auto w-16 h-16 text-green-500 mb-6" />
                            )}
                            {modalState === "error" && (
                                <FaExclamationCircle className="mx-auto w-16 h-16 text-red-500 mb-6" />
                            )}

                            {/* Message */}
                            <h3 className={`${oswald.className} text-2xl font-bold text-gray-800 mb-3`}>
                                {modalState === "loading" ? "Processing..." : modalState === "success" ? "Success!" : "Error"}
                            </h3>
                            <p className={`${oswald.className} text-gray-600 leading-relaxed`}>{modalMessage}</p>

                            {/* Accent Line */}
                            <div className="mt-8 h-1 w-24 mx-auto bg-gradient-to-r from-[#E8B85F] to-[#d4a44e] rounded-full" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    );
}
