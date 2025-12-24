import { Minus, Plus } from 'lucide-react';
import { Product } from '@/lib/types';
import ProductImage from './ProductImage';

type ProductCardProps = {
  product: Product;
  count: number;
  onAdd: (p: Product) => void;
  onRemove: (p: Product) => void;
};

export default function ProductCard({ product, count, onAdd, onRemove }: ProductCardProps) {
  const ActionButton = () => (
    count === 0 ? (
      <button
        onClick={() => onAdd(product)}
        className="bg-[#1d1d1f] text-white text-[11px] font-semibold uppercase tracking-wider px-5 py-2 rounded-full hover:bg-black transition-all shadow-md active:scale-95"
      >
        Add
      </button>
    ) : (
      <div className="flex items-center gap-3 bg-[#f5f5f7] rounded-full px-2 py-1">
        <button onClick={() => onRemove(product)} className="w-7 h-7 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-900 hover:scale-105 transition-transform"><Minus className="w-3 h-3"/></button>
        <span className="text-xs font-semibold text-gray-900 w-4 text-center">{count}</span>
        <button onClick={() => onAdd(product)} className="w-7 h-7 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-900 hover:scale-105 transition-transform"><Plus className="w-3 h-3"/></button>
      </div>
    )
  );

  return (
    <>
    <div className="md:hidden py-6 border-b border-gray-100 last:border-0 flex gap-5 items-start">
        <div className="w-28 h-36 bg-[#F9F9F9] rounded-[4px] overflow-hidden flex-shrink-0 relative shadow-sm">
          <ProductImage 
            category={product.category.toLowerCase()}
            alt={product.name}
            className="w-full h-full"
          />
        </div>
        <div className="flex-1 min-h-[128px] flex flex-col justify-between py-1">
            <div>
                <div className="flex justify-between items-center mb-1.5">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.brand}</p>
                    <span className="text-[9px] font-medium text-gray-400">{product.volume}</span>
                </div>
                <h3 className="text-[18px] font-serif text-[#1d1d1f] leading-tight mb-2 tracking-tight">{product.name}</h3>
                <p className="text-[13px] text-gray-500 leading-normal line-clamp-2 font-light">{product.desc}</p>
            </div>
            <div className="flex items-center justify-between mt-3">
                <span className="text-[16px] font-medium text-[#1d1d1f]">S${product.price}</span>
                <ActionButton />
            </div>
        </div>
    </div>

    <div className="hidden md:flex flex-col bg-white rounded-[16px] overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)] transition-all duration-500 group cursor-pointer h-full border border-gray-50">
        <div className="relative aspect-[3/4] w-full bg-[#FAFAFA] flex items-center justify-center overflow-hidden">
          <ProductImage 
            category={product.category.toLowerCase()}
            alt={product.name}
            className="w-full h-full group-hover:scale-105 transition-all duration-700 ease-out"
          />
             {product.tags.includes("Bestseller") && (
                <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest text-[#1d1d1f] bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">Bestseller</span>
             )}

             <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-md border border-white/40 px-3 py-1.5 rounded-full shadow-sm flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                <span className="text-[10px] font-bold text-gray-900">{product.volume}</span>
                <span className="w-px h-2.5 bg-gray-300"></span>
                <span className="text-[10px] font-medium text-gray-500">{product.abv}</span>
             </div>
        </div>

        <div className="p-8 flex flex-col flex-1">
            <div className="flex justify-between items-start mb-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.brand}</p>
            </div>
            <h3 className="text-2xl font-serif text-[#1d1d1f] leading-tight mb-3 tracking-tight">{product.name}</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-8 line-clamp-2 font-light">{product.desc}</p>

            <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                <div>
                    <span className="block text-xl font-medium text-[#1d1d1f]">S${product.price}</span>
                </div>
                <ActionButton />
            </div>
        </div>
    </div>
    </>
  );
}
