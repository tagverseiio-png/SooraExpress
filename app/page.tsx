'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, User, Home, Clock, ChevronDown, ArrowRight, Package, LogOut } from 'lucide-react';
import LandingPage from '@/components/LandingPage';
import ProductCard from '@/components/ProductCard';
import Overlay from '@/components/Overlay';
import SlideToPay from '@/components/SlideToPay';
import { PRODUCTS, MOCK_USER, CATEGORIES } from '@/lib/data';
import { Product } from '@/lib/types';
import { useAuth } from '@/lib/AuthContext';
import HeroImage from '@/components/HeroImage';

export default function SooraApp() {
    const { user, signOut } = useAuth();
    const [cart, setCart] = useState<Product[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [showShop, setShowShop] = useState(false);
    const [activeCategory, setActiveCategory] = useState("All");

    const getItemCount = (productId: number) => cart.filter(item => item.id === productId).length;
    const addToCart = (product: Product) => setCart([...cart, product]);
    const removeFromCart = (product: Product) => {
        const index = cart.findIndex(item => item.id === product.id);
        if (index > -1) {
            const newCart = [...cart];
            newCart.splice(index, 1);
            setCart(newCart);
        }
    };
    const cartTotal = cart.reduce((acc, item) => acc + item.price, 0);

    const featuredProducts = PRODUCTS.filter(p => p.tags.includes("Featured") || p.tags.includes("Bestseller"));
    const displayedProducts = activeCategory === 'All'
        ? PRODUCTS
        : PRODUCTS.filter(p => p.category === activeCategory);

    const displayName = user?.name || user?.email || 'User';
    const userInitial = displayName.charAt(0).toUpperCase();

    if (!showShop) {
        return <LandingPage onEnter={() => setShowShop(true)} />;
    }

    return (
        <div className="min-h-screen bg-[#F9F9F9] font-sans text-[#1d1d1f] selection:bg-[#1d1d1f] selection:text-white animate-in slide-in-from-top-full duration-700">
            <header className="sticky top-0 z-40 w-full transition-all duration-300">
                <div className="absolute inset-0 bg-[#F9F9F9]/85 backdrop-blur-md border-b border-gray-200/50" />
                <div className="relative max-w-7xl mx-auto px-4 md:px-6 h-16 flex justify-between items-center">
                    <div className="flex items-center gap-8">
                        <img src="/logo.png" alt="Soora Logo" className="h-10 md:h-16 w-auto object-contain cursor-pointer" onClick={() => setShowShop(false)} />
                        <nav className="hidden md:flex items-center gap-8">
                            {CATEGORIES.slice(1).map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`text-[11px] font-bold uppercase tracking-[0.1em] transition-colors ${activeCategory === cat ? 'text-[#1d1d1f]' : 'text-gray-400 hover:text-[#1d1d1f]'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </nav>
                    </div>
                    <div className="flex items-center gap-2 md:gap-4">
                        <div className="flex items-center gap-1.5 cursor-pointer hover:opacity-70 transition-opacity bg-white/50 px-3 py-1.5 rounded-full border border-black/5">
                            <span className="text-[10px] text-gray-500 hidden sm:inline uppercase tracking-wider font-medium">Delivery to</span>
                            <span className="text-[12px] font-bold text-[#1d1d1f] flex items-center gap-1">Orchard, SG <ChevronDown className="w-3 h-3" /></span>
                        </div>
                        <div onClick={() => setIsSearchOpen(true)} className="hidden md:flex items-center gap-2 bg-white hover:bg-white/80 px-3 py-1.5 rounded-full border border-transparent hover:border-gray-200 transition-all cursor-pointer w-48 shadow-sm">
                            <Search className="w-4 h-4 text-gray-400 ml-1" />
                            <span className="text-[12px] text-gray-400 font-normal">Search Soora</span>
                        </div>
                        <button onClick={() => setIsSearchOpen(true)} className="md:hidden text-[#1d1d1f] hover:opacity-70 p-1"><Search className="w-5 h-5 stroke-[1.5]" /></button>
                        <button onClick={() => setIsProfileOpen(true)} className="text-[#1d1d1f] hover:text-[#0071e3] p-1"><User className="w-5 h-5 stroke-[1.5]" /></button>
                        <button onClick={() => setIsCartOpen(true)} className="relative text-[#1d1d1f] hover:text-[#0071e3] p-1">
                            <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                            {cart.length > 0 && <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#1d1d1f] rounded-full ring-2 ring-[#f5f5f7]" />}
                        </button>
                    </div>
                </div>

                <div className="md:hidden relative border-t border-gray-200/30">
                    <div className="flex gap-3 px-6 py-3 overflow-x-auto no-scrollbar">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`text-[11px] font-bold uppercase tracking-wider whitespace-nowrap px-4 py-2 rounded-full transition-all ${activeCategory === cat
                                    ? 'bg-[#1d1d1f] text-white shadow-md'
                                    : 'bg-white text-gray-500 border border-gray-100'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 md:px-6 pt-6 md:pt-12 pb-32">

                {activeCategory === 'All' ? (
                    <>
                        <div className="mb-16 md:mb-24 rounded-[4px] overflow-hidden relative h-[450px] md:h-[600px] shadow-2xl group">
                            <HeroImage
                                category="whisky"
                                alt="Hero"
                                className="w-full h-full"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent p-8 md:p-16 flex flex-col justify-end text-white">
                                <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-white/80">Holiday 2025</p>
                                <h2 className="text-5xl md:text-8xl font-serif leading-[0.9] mb-8 tracking-tight">The Art of <br /><span className="italic font-light opacity-80">Celebration.</span></h2>
                                <button className="bg-white text-black px-8 py-3.5 rounded-full self-start font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors">Shop Collection</button>
                            </div>
                        </div>

                        <div className="mb-20 md:mb-32">
                            <h3 className="text-3xl font-serif font-medium text-[#1d1d1f] mb-8 tracking-tight">Shop by Category</h3>
                            <div className="flex gap-6 overflow-x-auto no-scrollbar pb-8">
                                {CATEGORIES.slice(1).map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className="min-w-[160px] h-[220px] bg-white rounded-[4px] p-8 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1 transition-all border border-gray-100 group text-left"
                                    >
                                        <span className="text-2xl font-serif text-gray-900 group-hover:text-[#0071e3] transition-colors">{cat}</span>
                                        <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#1d1d1f] group-hover:border-[#1d1d1f] group-hover:text-white transition-all">
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-20 md:mb-32">
                            <div className="flex justify-between items-baseline mb-8">
                                <h3 className="text-3xl font-serif font-medium text-[#1d1d1f] tracking-tight">Curator&apos;s Choice</h3>
                                <button className="text-gray-500 text-xs font-bold uppercase tracking-widest hover:text-black transition-colors">View Editorial</button>
                            </div>
                            <div className="flex gap-6 md:gap-8 overflow-x-auto no-scrollbar pb-12 -mx-4 px-4 md:-mx-6 md:px-6">
                                {featuredProducts.map(product => (
                                    <div key={product.id} className="min-w-[280px] md:min-w-[340px]">
                                        <ProductCard
                                            product={product}
                                            count={getItemCount(product.id)}
                                            onAdd={addToCart}
                                            onRemove={removeFromCart}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-3xl font-serif font-medium text-[#1d1d1f] mb-8 tracking-tight">The Collection</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                                {displayedProducts.map(product => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        count={getItemCount(product.id)}
                                        onAdd={addToCart}
                                        onRemove={removeFromCart}
                                    />
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-6 mb-12">
                            <button onClick={() => setActiveCategory('All')} className="text-gray-400 hover:text-black transition-colors"><ArrowRight className="w-6 h-6 rotate-180" /></button>
                            <div>
                                <h2 className="text-5xl md:text-7xl font-serif text-[#1d1d1f] mb-2">{activeCategory}</h2>
                                <p className="text-sm text-gray-500 font-medium uppercase tracking-widest">{displayedProducts.length} Labels</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                            {displayedProducts.map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    count={getItemCount(product.id)}
                                    onAdd={addToCart}
                                    onRemove={removeFromCart}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </main>

            <div className="fixed bottom-8 left-0 right-0 z-40 flex justify-center pointer-events-none px-4">
                <nav className="pointer-events-auto bg-[#1d1d1f]/90 backdrop-blur-2xl p-2 rounded-full shadow-2xl flex items-center gap-2 border border-white/10 transition-transform hover:-translate-y-1 duration-300 ring-1 ring-black/5">
                    <button className="flex flex-col items-center justify-center w-16 h-14 rounded-full bg-white/10 text-white transition-all active:scale-95 shadow-inner" onClick={() => setActiveCategory('All')}>
                        <Home className="w-5 h-5 mb-0.5" strokeWidth={1.5} />
                        <span className="text-[9px] font-medium tracking-wide opacity-90">Home</span>
                    </button>
                    <button onClick={() => setIsProfileOpen(true)} className="flex flex-col items-center justify-center w-16 h-14 rounded-full text-gray-400 hover:bg-white/5 hover:text-white transition-all active:scale-95">
                        <Clock className="w-5 h-5 mb-0.5" strokeWidth={1.5} />
                        <span className="text-[9px] font-medium tracking-wide opacity-90">History</span>
                    </button>
                    <div className="w-px h-8 bg-white/10 mx-2"></div>
                    <button onClick={() => setIsCartOpen(true)} className="flex items-center gap-4 pl-6 pr-8 h-14 rounded-full bg-white text-black hover:bg-gray-100 transition-all active:scale-95 shadow-lg">
                        <div className="relative">
                            <ShoppingBag className="w-5 h-5 text-black" strokeWidth={1.5} />
                            {cart.length > 0 && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#1d1d1f] border-2 border-white rounded-full" />}
                        </div>
                        <div className="flex flex-col items-start leading-none gap-1">
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Cart</span>
                            <span className="text-[13px] font-bold tracking-tight">{cart.length} Items</span>
                        </div>
                    </button>
                </nav>
            </div>

            <Overlay isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} title="Shopping Bag">
                {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center">
                        <ShoppingBag className="w-12 h-12 text-gray-300 mb-4" />
                        <h3 className="text-[17px] font-semibold text-[#1d1d1f] mb-1">Your bag is empty.</h3>
                        <p className="text-[14px] text-gray-500 mb-6 max-w-xs">Free delivery on all orders over S$200. Start adding your favorites.</p>
                        <button onClick={() => setIsCartOpen(false)} className="text-[#0071e3] text-[14px] font-medium hover:underline">Continue Shopping</button>
                    </div>
                ) : (
                    <div className="flex flex-col h-full">
                        <div className="flex-1 space-y-8">
                            {Array.from(new Set(cart.map(i => i.id))).map(id => {
                                const item = cart.find(i => i.id === id)!;
                                const count = getItemCount(id);
                                return (
                                    <div key={id} className="flex gap-4">
                                        <div className="w-20 h-24 bg-[#f5f5f7] rounded-lg overflow-hidden flex-shrink-0">
                                            <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                                        </div>
                                        <div className="flex-1 py-1">
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className="text-[15px] font-semibold text-[#1d1d1f] leading-snug">{item.name}</h4>
                                                <span className="text-[15px] font-semibold text-[#1d1d1f]">S${(item.price * count).toLocaleString()}</span>
                                            </div>
                                            <p className="text-[13px] text-gray-500 mb-3">{item.brand}</p>
                                            <div className="flex items-center gap-4">
                                                <button onClick={() => removeFromCart(item)} className="text-[#0071e3] text-[13px] font-medium">Remove</button>
                                                <span className="text-[13px] text-gray-900">Qty {count}</span>
                                                <button onClick={() => addToCart(item)} className="text-[#0071e3] text-[13px] font-medium">Add</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <div className="flex justify-between mb-2">
                                <span className="text-[14px] text-gray-500">Subtotal</span>
                                <span className="text-[14px] font-medium text-[#1d1d1f]">S${cartTotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between mb-8">
                                <span className="text-[14px] text-gray-500">Shipping</span>
                                <span className="text-[14px] font-medium text-[#1d1d1f]">Free</span>
                            </div>
                            <SlideToPay total={cartTotal} onComplete={() => { alert('Purchased'); setCart([]); setIsCartOpen(false); }} />
                        </div>
                    </div>
                )}
            </Overlay>

            <Overlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} title="Search">
                <div className="relative mb-8">
                    <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                    <input type="text" placeholder="Search for products, brands..." className="w-full bg-[#f5f5f7] rounded-xl pl-12 pr-4 py-3 text-[17px] outline-none focus:ring-2 focus:ring-[#0071e3]/20 transition-all placeholder:text-gray-500" autoFocus />
                </div>
                <div>
                    <h3 className="text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-4">Trending</h3>
                    <div className="space-y-3">
                        {['Japanese Whisky', 'Gin & Tonic Kit', 'Gift Sets', 'Suntory'].map(term => (
                            <div key={term} className="flex items-center gap-3 text-[#1d1d1f] hover:text-[#0071e3] cursor-pointer py-1">
                                <Search className="w-4 h-4 text-gray-400" />
                                <span className="text-[15px]">{term}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </Overlay>

            <Overlay isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} title="Account">
                {!user ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-12">
                        <User className="w-16 h-16 text-gray-300 mb-6" />
                        <h3 className="text-[21px] font-semibold text-[#1d1d1f] mb-2">Sign in to your account</h3>
                        <p className="text-[14px] text-gray-500 mb-8 max-w-xs">Access your orders, saved addresses, and personalized recommendations.</p>
                        <div className="flex flex-col gap-3 w-full max-w-xs">
                            <Link href="/login" onClick={() => setIsProfileOpen(false)} className="w-full bg-[#1d1d1f] text-white py-3 rounded-xl font-semibold text-[14px] hover:bg-black transition-all text-center">
                                Sign in
                            </Link>
                            <Link href="/signup" onClick={() => setIsProfileOpen(false)} className="w-full bg-white text-[#1d1d1f] py-3 rounded-xl font-semibold text-[14px] border border-gray-200 hover:bg-gray-50 transition-all text-center">
                                Create account
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col items-center mb-8">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-2xl font-semibold text-gray-400 mb-4">
                                {userInitial}
                            </div>
                            <h3 className="text-[21px] font-semibold text-[#1d1d1f]">{user?.name || 'User'}</h3>
                            <p className="text-[14px] text-gray-500">{user?.email}</p>
                        </div>
                        <div className="space-y-8">
                            <div>
                                <div className="flex justify-between items-baseline mb-4">
                                    <h4 className="text-[17px] font-semibold text-[#1d1d1f]">Addresses</h4>
                                    <button className="text-[#0071e3] text-[13px] font-medium">Edit</button>
                                </div>
                                <div className="bg-[#f5f5f7] rounded-xl p-1 space-y-1">
                                    {MOCK_USER.addresses.map(addr => (
                                        <div key={addr.id} className="p-4 bg-white rounded-lg shadow-sm">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[12px] font-semibold text-gray-900 uppercase">{addr.type}</span>
                                                {addr.isDefault && <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[10px] font-medium">Default</span>}
                                            </div>
                                            <p className="text-[14px] text-gray-500 leading-normal">{addr.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="text-[17px] font-semibold text-[#1d1d1f] mb-4">Recent Orders</h4>
                                <div className="space-y-4">
                                    {MOCK_USER.orders.map(order => (
                                        <div key={order.id} className="flex gap-4 py-4 border-b border-gray-100 last:border-0">
                                            <div className="w-16 h-16 bg-[#f5f5f7] rounded-lg flex items-center justify-center"><Package className="w-6 h-6 text-gray-400" /></div>
                                            <div className="flex-1">
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-[15px] font-medium text-[#1d1d1f]">{order.items}</span>
                                                    <span className="text-[14px] text-gray-500">{order.status}</span>
                                                </div>
                                                <p className="text-[13px] text-gray-500">S${order.total} • {order.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button
                                onClick={async () => {
                                    await signOut();
                                    setIsProfileOpen(false);
                                }}
                                className="w-full flex items-center justify-center gap-2 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium text-[14px]"
                            >
                                <LogOut className="w-4 h-4" />
                                Sign out
                            </button>
                        </div>
                    </>
                )}
            </Overlay>

        </div>
    );
}
