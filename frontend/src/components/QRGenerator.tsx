"use client";

import { QRCodeCanvas } from "qrcode.react";

interface QRGeneratorProps {
  value: string;
}

export default function QRGenerator({ value }: QRGeneratorProps) {
  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-lg">
      <QRCodeCanvas value={value} size={200} level={"H"} />
      <p className="mt-4 text-xs text-gray-500 break-all font-mono max-w-[200px] text-center">
        {value}
      </p>
    </div>
  );
}
