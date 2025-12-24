"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CreditCard, ShieldCheck, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PRODUCTS } from "@/lib/data";

export default function CheckoutPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // Mock Cart Data for display
    const cartItems = [PRODUCTS[0], PRODUCTS[2]];
    const total = cartItems.reduce((acc, item) => acc + item.price, 0);

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate processing
        await new Promise((resolve) => setTimeout(resolve, 1500));
        router.push("/order-success");
    };

    return (
        <div className="min-h-screen bg-[#F9F9F9] p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-black transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Shop
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Checkout Form */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-serif text-[#1d1d1f] mb-2">Checkout</h1>
                            <p className="text-gray-500">Complete your purchase securely.</p>
                        </div>

                        <form onSubmit={handleCheckout} className="space-y-6">
                            <Card className="border-white/60 shadow-sm bg-white/80 backdrop-blur">
                                <CardHeader>
                                    <CardTitle>Delivery Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input id="firstName" placeholder="John" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input id="lastName" placeholder="Doe" required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" placeholder="john@example.com" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="address">Address</Label>
                                        <Input id="address" placeholder="123 Orchard Road" required />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="postal">Postal Code</Label>
                                            <Input id="postal" placeholder="238888" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="city">City</Label>
                                            <Input id="city" defaultValue="Singapore" disabled />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-white/60 shadow-sm bg-white/80 backdrop-blur">
                                <CardHeader>
                                    <CardTitle>Payment Method</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="p-4 border border-indigo-100 bg-indigo-50/30 rounded-lg flex items-center gap-3">
                                        <ShieldCheck className="w-5 h-5 text-indigo-600" />
                                        <span className="text-sm text-indigo-900 font-medium">All transactions are secure and encrypted.</span>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="card">Card Number</Label>
                                        <div className="relative">
                                            <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input id="card" placeholder="0000 0000 0000 0000" className="pl-10" required />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="expiry">Expiry</Label>
                                            <Input id="expiry" placeholder="MM/YY" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="cvc">CVC</Label>
                                            <Input id="cvc" placeholder="123" required />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Button type="submit" className="w-full h-12 text-lg bg-[#1d1d1f] hover:bg-black text-white" disabled={isLoading}>
                                {isLoading ? "Processing..." : `Pay S$${total.toLocaleString()}`}
                            </Button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div>
                        <Card className="border-none shadow-none bg-transparent md:bg-white md:shadow-sm md:sticky md:top-8">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <ShoppingBag className="w-5 h-5" /> Order Summary
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="h-16 w-16 bg-gray-100 rounded-md overflow-hidden relative">
                                            <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-sm">{item.name}</h4>
                                            <p className="text-xs text-gray-500">{item.brand}</p>
                                            <p className="text-sm font-medium mt-1">S${item.price.toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}

                                <div className="border-t pt-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Subtotal</span>
                                        <span>S${total.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Shipping</span>
                                        <span className="text-green-600 font-medium">Free</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold pt-2 border-t mt-2">
                                        <span>Total</span>
                                        <span>S${total.toLocaleString()}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
