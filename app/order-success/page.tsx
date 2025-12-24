"use client";

import Link from "next/link";
import { CheckCircle, Home, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OrderSuccessPage() {
    return (
        <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="relative mx-auto w-24 h-24">
                    <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75"></div>
                    <div className="relative bg-white rounded-full w-24 h-24 flex items-center justify-center shadow-sm border border-green-100">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                </div>

                <div className="space-y-2">
                    <h1 className="text-4xl font-serif text-[#1d1d1f]">Thank you!</h1>
                    <p className="text-gray-500 text-lg">Your order has been placed successfully.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 text-left">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                        <span className="text-sm text-gray-500">Order Reference</span>
                        <span className="font-mono font-medium text-[#1d1d1f]">#ORD-{Math.floor(1000 + Math.random() * 9000)}</span>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Confirmation sent to</p>
                        <p className="font-medium text-[#1d1d1f]">john@example.com</p>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <Link href="/">
                        <Button className="w-full h-12 bg-[#1d1d1f] hover:bg-black text-white gap-2">
                            <ShoppingBag className="w-4 h-4" /> Continue Shopping
                        </Button>
                    </Link>
                    <Link href="/">
                        <Button variant="ghost" className="w-full text-gray-500 hover:text-[#1d1d1f]">
                            <Home className="w-4 h-4 mr-2" /> Back to Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
