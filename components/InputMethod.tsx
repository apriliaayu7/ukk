"use client"

import React from 'react';
import { Scan, Image as ImageIcon, Keyboard, Lightbulb, ChevronRight, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface InputMethodProps {
  onNext?: () => void;
  onCancel?: () => void;
}

export function InputMethod({ onNext, onCancel }: InputMethodProps) {
  const router = useRouter()

  const methods = [
    {
      id: 'scan',
      title: 'Scan Struk',
      description: 'Directly scan your physical receipt using your camera. Our AI will automatically extract items and prices.',
      icon: Scan,
      color: 'bg-secondary-container',
      textColor: 'text-on-surface',
      buttonText: 'Open Camera',
      buttonClass: 'bg-secondary text-white hover:bg-secondary-dim',
      action: () => router.push('/dashboard/scan')
    },
    {
      id: 'upload',
      title: 'Upload Foto',
      description: "Already took a photo? Upload it from your gallery and we'll handle the parsing in seconds.",
      icon: ImageIcon,
      color: 'bg-gradient-to-br from-primary-container to-primary',
      textColor: 'text-white',
      buttonText: 'Choose Image',
      buttonClass: 'bg-white text-primary hover:bg-cyan-50',
      isPrimary: true,
      action: () => router.push('/dashboard/upload')
    },
    {
      id: 'manual',
      title: 'Input Manual',
      description: 'Feeling old school? Enter items, quantities, and prices manually for total control.',
      icon: Keyboard,
      color: 'bg-tertiary-container',
      textColor: 'text-on-surface',
      buttonText: 'Start Typing',
      buttonClass: 'bg-surface-container text-on-surface hover:bg-surface-container-high',
      action: () => router.push('/dashboard/create-bill')
    }
  ];

  return (
    <div className="p-12 max-w-7xl mx-auto">
      <header className="mb-12">
        <h2 className="text-4xl font-extrabold text-on-surface mb-2 tracking-tight font-headline">
          Pilih Cara Input
        </h2>
        <p className="text-on-surface-variant text-lg max-w-2xl">
          Ready to split? Choose how you want to add your bill items. Our AI can read receipts, or you can do it manually.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {methods.map((method, index) => {
          const Icon = method.icon;
          return (
            <motion.div 
              key={method.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`group relative rounded-xl p-8 flex flex-col justify-between overflow-hidden shadow-sm transition-all hover:-translate-y-2 ${
                method.isPrimary ? method.color : 'bg-surface-container-lowest hover:shadow-[0_32px_64px_rgba(0,52,64,0.1)]'
              }`}
            >
              {!method.isPrimary && (
                <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl group-hover:opacity-100 transition-opacity opacity-50 ${method.color}`}></div>
              )}

              {method.isPrimary && (
                <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors"></div>
              )}

              <div>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner ${
                  method.isPrimary ? 'bg-white/20 backdrop-blur-md text-white' : `${method.color} ${method.textColor}`
                }`}>
                  <Icon className="w-8 h-8" />
                </div>

                <h3 className={`text-2xl font-bold mb-3 font-headline ${method.textColor}`}>
                  {method.title}
                </h3>

                <p className={`leading-relaxed mb-8 ${
                  method.isPrimary ? 'text-white/80' : 'text-on-surface-variant'
                }`}>
                  {method.description}
                </p>
              </div>

              <button 
                onClick={method.action}
                className={`w-full py-4 font-bold rounded-full transition-all active:scale-95 flex items-center justify-center gap-2 ${method.buttonClass}`}
              >
                {method.buttonText}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* PRO TIP */}
      <div className="relative bg-surface-container-low rounded-xl p-8 overflow-hidden border border-outline-variant/10">
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="w-24 h-24 flex-shrink-0 bg-white rounded-full overflow-hidden shadow-md">
            <img 
              alt="Pro Tip Illustration" 
              src="https://picsum.photos/seed/abstract/200/200" 
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-5 h-5 text-primary" />
              <h4 className="font-bold text-lg text-primary font-headline">
                Pro Tip: Clearer is Better
              </h4>
            </div>

            <p className="text-on-surface-variant leading-relaxed max-w-3xl">
              For the best AI recognition, ensure the receipt is flat and well-lit.
            </p>
          </div>

          <div className="md:ml-auto">
            <a className="text-primary font-bold flex items-center gap-1 hover:underline">
              Learn more <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-16 pt-8 flex items-center justify-between">
        <button 
          onClick={() => onCancel ? onCancel() : router.push('/dashboard')}
          className="px-8 py-3 rounded-full border border-outline-variant/30 text-on-surface-variant font-semibold hover:bg-surface-container-low transition-colors"
        >
          Cancel
        </button>

        <div className="flex items-center gap-4">
          <span className="text-sm text-outline font-medium">
            Need help? Chat with Patungin Support
          </span>
          <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md text-primary hover:scale-110 transition-transform">
            <HelpCircle className="w-6 h-6 fill-current" />
          </button>
        </div>
      </div>
    </div>
  );
}