"use client";

import { useState } from "react";
import { deviceBrands, modelsForBrand } from "@/lib/data/devices";
import { Check, Close } from "@/components/ui/icons";
import { ChipOutline } from "@/components/ui/Chip";
import { MicroPlate } from "@/components/ui/Plate";
import { cn } from "@/lib/utils";

const selectCls =
  "field h-11 w-full px-3 text-sm focus:border-ink focus:outline-none disabled:opacity-50";

/**
 * A spec lookup, styled as one: brand → model → verdict. The result is a
 * mono readout line with a PASS / FAIL plate, not a celebratory card.
 */
export function CompatibilityChecker() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const models = brand ? modelsForBrand(brand) : [];
  const selected = models.find((m) => m.model === model);

  return (
    <div className="card-flat mx-auto max-w-2xl p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4 border-b-2 border-ink pb-5">
        <div>
          <p className="eyebrow text-ink">Device check</p>
          <h2 className="t-h2 mt-2 text-ink">Will your phone take an eSIM?</h2>
        </div>
        <ChipOutline className="h-10 w-12 shrink-0 text-ink" />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Brand">
          <select
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value);
              setModel("");
            }}
            className={selectCls}
          >
            <option value="">Select brand…</option>
            {deviceBrands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </Field>

        <Field label="Model">
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            disabled={!brand}
            className={selectCls}
          >
            <option value="">{brand ? "Select model…" : "Pick a brand first"}</option>
            {models.map((m) => (
              <option key={m.model} value={m.model}>{m.model}</option>
            ))}
          </select>
        </Field>
      </div>

      {/* The verdict — a readout line, then the plate. */}
      {selected ? (
        <div className="mt-6 border-t border-hairline pt-5" role="status">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="readout text-ink">
              {selected.brand.toUpperCase()} · {selected.model.toUpperCase()}
            </p>
            <span
              className={cn(
                "inline-flex items-center gap-2 px-2.5 py-1.5 font-mono text-[0.7rem] font-bold uppercase tracking-[0.18em]",
                selected.esimSupported
                  ? "bg-lime text-on-lime"
                  : "bg-danger-plate text-[#2b1715]",
              )}
            >
              {selected.esimSupported ? <Check className="size-3.5" /> : <Close className="size-3.5" />}
              {selected.esimSupported ? "Pass" : "Fail"}
            </span>
          </div>

          <p className="t-h2 mt-4 text-ink">
            {selected.esimSupported ? "Compatible — you're good to go" : "This model has no eSIM"}
          </p>

          {selected.note ? <p className="mt-3 text-pretty text-ink-muted">{selected.note}</p> : null}
          {selected.esimSupported ? (
            <p className="mt-3 text-pretty text-ink-muted">
              Check the handset is carrier-unlocked too. Then pick a destination — you&apos;ll be
              online in about a minute.
            </p>
          ) : null}
        </div>
      ) : (
        <div className="mt-6 border-t border-hairline pt-5">
          <MicroPlate tone="outline">Awaiting input</MicroPlate>
          <p className="mt-3 text-sm text-ink-muted">
            Select a brand and model for an instant verdict. The lookup covers{" "}
            {deviceBrands.length} brands and dozens of models.
          </p>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow mb-2 block">{label}</span>
      {children}
    </label>
  );
}
