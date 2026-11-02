import React from 'react';
import { X, ExternalLink, Download, FileText } from 'lucide-react';

interface ReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultFormula?: string;
}

export const ReferenceModal: React.FC<ReferenceModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const baseUrl = import.meta.env.BASE_URL || './';
  const pdfUrl = `${baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`}assets/aistudio/PT_and_All_Reference_Info_cb3c28c3.pdf`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-5xl h-[92vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-tight">
                Chemistry Reference Sheet
              </h3>
              <p className="text-[11px] text-slate-500">
                The Periodic Table of Elements &amp; Polyatomic Ion Chart
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors shadow-2xs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Open in New Tab</span>
            </a>
            <a
              href={pdfUrl}
              download="Periodic_Table_and_Reference_Info.pdf"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download</span>
            </a>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embedded PDF Viewport */}
        <div className="flex-1 w-full bg-slate-100 relative">
          <iframe
            src={`${pdfUrl}#toolbar=1&navpanes=0`}
            className="w-full h-full border-none"
            title="Chemistry Reference Document"
          />
        </div>

        {/* Quiet Footer */}
        <div className="px-5 py-2.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>Page 1: Periodic Table with Atomic Masses · Page 2: Polyatomic Ions &amp; Activity Series</span>
          <button
            onClick={onClose}
            className="px-3.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200/60 rounded-md transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
