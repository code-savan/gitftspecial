import React from 'react'
import { X } from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'

export default function Modal({
  isOpen,
  onClose,
  children,
  ctaText,
  ctaLink,
  backgroundImage
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/80" />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-[15px] overflow-hidden flex items-center  md:h-[320px] border-[#2f165a] border-4">
        {/* Background with gradient */}
        <div className="relative h-full w-full  flex">
          {backgroundImage && (
            <Image
              src={backgroundImage}
              alt="Background"
              fill
              className="object-cover"
            />
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 rounded-full bg-[#2f165ac3] hover:bg-[#2f165aee] transition-colors z-10"
          >
            <X className="h-6 w-6 text-white" />
          </button>

          {/* Content */}
          <div className="relative p-6 flex flex-col min-h-[200px] mt-12">
            <div className="flex-1 text-white">
              {children}
            </div>

            {/* CTA Button */}
            <div className="mt-4">
              <Link href={ctaLink} className="block w-full">
                <button
                  className="w-full py-6 text-[20px] md:text-[25px] font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-[15px]"
                >
                  {ctaText}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
