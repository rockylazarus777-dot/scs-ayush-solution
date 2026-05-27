"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { SERVICES } from "@/lib/utils";
import { cn } from "@/lib/utils";

const schema = z.object({
  service: z.string().min(1, "Please select a service"),
  hospitalSize: z.string().min(1, "Please select hospital size"),
  urgency: z.string().min(1, "Please select urgency"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter valid 10-digit Indian mobile number"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const HOSPITAL_SIZES = [
  { value: "small", label: "Small (< 30 beds)" },
  { value: "medium", label: "Medium (30–100 beds)" },
  { value: "large", label: "Large (100–300 beds)" },
  { value: "corporate", label: "Corporate (300+ beds)" },
];

const URGENCY_LEVELS = [
  { value: "immediate", label: "🔴 Immediate (within 1 week)", desc: "Urgent regulatory or compliance issue" },
  { value: "soon", label: "🟡 Soon (1–4 weeks)", desc: "Planning ahead but need quick action" },
  { value: "planned", label: "🟢 Planned (1–3 months)", desc: "Strategic initiative with timeline" },
  { value: "exploring", label: "🔵 Exploring (just researching)", desc: "Want to understand options" },
];

const steps = [
  { id: 1, label: "Service", description: "What do you need help with?" },
  { id: 2, label: "Hospital", description: "Tell us about your facility" },
  { id: 3, label: "Urgency", description: "How soon do you need this?" },
  { id: 4, label: "Contact", description: "How can we reach you?" },
];

export default function EnquiryForm({ className }: { className?: string }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const watchedValues = watch();

  const nextStep = async () => {
    const fieldsToValidate: Record<number, (keyof FormData)[]> = {
      1: ["service"],
      2: ["hospitalSize"],
      3: ["urgency"],
    };
    const valid = await trigger(fieldsToValidate[step]);
    if (valid) setStep((s) => s + 1);
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className={cn("glass-card rounded-3xl p-8 text-center", className)}>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15 }}
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/30">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-2">Enquiry Received! 🎉</h3>
          <p className="text-slate-500 mb-6">
            Thank you for reaching out. Our team will contact you within <strong>24 hours</strong>.
            Check your email for a confirmation.
          </p>
          <div className="glass-card rounded-2xl p-4 text-left">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-slate-400 text-xs mb-0.5">Service</p>
                <p className="font-semibold text-slate-800">{watchedValues.service}</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs mb-0.5">Urgency</p>
                <p className="font-semibold text-slate-800">{watchedValues.urgency}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={cn("glass-card rounded-3xl overflow-hidden", className)}>
      {/* Step indicator */}
      <div className="px-6 pt-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2 mb-3">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <button
                onClick={() => step > s.id && setStep(s.id)}
                className={cn(
                  "w-8 h-8 rounded-lg text-xs font-bold transition-all duration-300 flex items-center justify-center",
                  step === s.id
                    ? "bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-md"
                    : step > s.id
                    ? "bg-emerald-100 text-emerald-700 cursor-pointer hover:bg-emerald-200"
                    : "bg-slate-100 text-slate-400"
                )}
              >
                {step > s.id ? <CheckCircle className="w-4 h-4" /> : s.id}
              </button>
              {i < steps.length - 1 && (
                <div className={cn(
                  "h-0.5 flex-1 rounded-full transition-all duration-500",
                  step > s.id ? "bg-emerald-400" : "bg-slate-100"
                )} />
              )}
            </div>
          ))}
        </div>
        <div>
          <p className="text-xs text-slate-400 font-medium">Step {step} of {steps.length}</p>
          <p className="font-bold text-slate-800 text-sm mt-0.5">
            {steps[step - 1]?.description}
          </p>
        </div>
      </div>

      {/* Form content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {/* Step 1 — Service */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SERVICES.map((svc) => (
                  <button
                    key={svc.id}
                    type="button"
                    onClick={() => setValue("service", svc.title, { shouldValidate: true })}
                    className={cn(
                      "text-left p-4 rounded-2xl border transition-all duration-200 hover:shadow-sm",
                      watchedValues.service === svc.title
                        ? "border-blue-400 bg-blue-50 shadow-glow-sm"
                        : "border-slate-200 hover:border-blue-200 bg-white"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{svc.icon}</span>
                      <div>
                        <p className="text-sm font-semibold text-slate-800 leading-tight">{svc.title}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{svc.shortDesc.substring(0, 45)}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              {errors.service && (
                <p className="text-red-500 text-xs mt-2">{errors.service.message}</p>
              )}
            </motion.div>
          )}

          {/* Step 2 — Hospital Size */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 gap-3"
            >
              {HOSPITAL_SIZES.map((size) => (
                <button
                  key={size.value}
                  type="button"
                  onClick={() => setValue("hospitalSize", size.value, { shouldValidate: true })}
                  className={cn(
                    "p-5 rounded-2xl border text-center transition-all duration-200 hover:shadow-sm",
                    watchedValues.hospitalSize === size.value
                      ? "border-blue-400 bg-blue-50 shadow-glow-sm"
                      : "border-slate-200 hover:border-blue-200 bg-white"
                  )}
                >
                  <p className="text-sm font-bold text-slate-800">{size.label}</p>
                </button>
              ))}
              {errors.hospitalSize && (
                <p className="text-red-500 text-xs col-span-2 mt-1">{errors.hospitalSize.message}</p>
              )}
            </motion.div>
          )}

          {/* Step 3 — Urgency */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              {URGENCY_LEVELS.map((level) => (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => setValue("urgency", level.value, { shouldValidate: true })}
                  className={cn(
                    "w-full text-left p-4 rounded-2xl border transition-all duration-200 hover:shadow-sm",
                    watchedValues.urgency === level.value
                      ? "border-blue-400 bg-blue-50 shadow-glow-sm"
                      : "border-slate-200 hover:border-blue-200 bg-white"
                  )}
                >
                  <p className="text-sm font-bold text-slate-800">{level.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{level.desc}</p>
                </button>
              ))}
              {errors.urgency && (
                <p className="text-red-500 text-xs mt-1">{errors.urgency.message}</p>
              )}
            </motion.div>
          )}

          {/* Step 4 — Contact */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Full Name *</label>
                <input
                  {...register("name")}
                  placeholder="Dr. Your Name"
                  className="input-premium"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Email Address *</label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="you@hospital.com"
                  className="input-premium"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Mobile Number *</label>
                <input
                  {...register("phone")}
                  placeholder="10-digit mobile number"
                  className="input-premium"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Message (Optional)</label>
                <textarea
                  {...register("message")}
                  placeholder="Any specific requirements or questions..."
                  rows={3}
                  className="input-premium resize-none"
                />
              </div>
              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                  {error}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex gap-3 mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          )}
          {step < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="btn-primary flex-1 flex items-center justify-center gap-2 text-sm py-3 rounded-xl text-white"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={loading}
              className="btn-primary flex-1 flex items-center justify-center gap-2 text-sm py-3 rounded-xl text-white disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Enquiry <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>

        <p className="text-xs text-slate-400 text-center mt-4">
          🔒 Your information is completely secure and never shared.
        </p>
      </div>
    </div>
  );
}
