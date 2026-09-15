"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

/** The QR sits on pure white inside a graphite frame — scanners want maximum
 *  contrast, and the frame is the brand doing the job rather than decorating. */
export function QrCode({ value, size = 208 }: { value: string; size?: number }) {
  const [src, setSrc] = useState<string>("");

  useEffect(() => {
    let alive = true;
    QRCode.toDataURL(value, {
      margin: 1,
      width: size * 2,
      color: { dark: "#141714", light: "#ffffff" },
      errorCorrectionLevel: "M",
    })
      .then((url) => alive && setSrc(url))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [value, size]);

  return (
    <div
      className="grid place-items-center border-[6px] border-ink bg-white p-3"
      style={{ width: size + 36, height: size + 36 }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="eSIM activation QR code" width={size} height={size} />
      ) : (
        <span className="skeleton block size-full" aria-label="Generating QR code" />
      )}
    </div>
  );
}
