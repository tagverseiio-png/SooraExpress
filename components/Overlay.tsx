import { X } from 'lucide-react';

type OverlayProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export default function Overlay({ isOpen, onClose, title, children }: OverlayProps) {
  return (
    <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className={`absolute inset-x-0 bottom-0 md:top-0 md:right-0 md:left-auto md:w-[480px] bg-white h-[90vh] md:h-full shadow-2xl transition-transform duration-500 cubic-bezier(0.32, 0.72, 0, 1) ${isOpen ? 'translate-y-0 md:translate-x-0' : 'translate-y-full md:translate-x-full'} rounded-t-[24px] md:rounded-none flex flex-col`}>
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white/80 backdrop-blur sticky top-0 z-10">
          <h2 className="text-[21px] font-semibold text-[#1d1d1f]">{title}</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center bg-[#f5f5f7] rounded-full text-gray-500 hover:bg-[#e8e8ed] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
