"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  CheckCircle,
  LayoutDashboard,
  Loader2,
  MapPin,
  PackageSearch,
  RefreshCw,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
  Star,
  History,
  UserCheck,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CATEGORIES, PRODUCTS } from "@/lib/data";
import { Product } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2 } from "lucide-react";

const MOCK_ORDERS = [
  {
    id: "ORD-1042", customer: "Chloe Lim", total: 412.4, items: 5, status: "PICKED_UP", channel: "Web", placed: "Dec 20, 19:12",
    stripe_payment_id: "pi_3M9uX2LkdIw8", stripe_status: "succeeded",
    lalamove_tracking_url: "https://lalamove.app/track/123456", lalamove_driver: { name: "Tan Wei Ming", phone: "+65 9123 4567", plate: "SJA 1234 X" },
    lalamove_status: "PICKED_UP"
  },
  {
    id: "ORD-1041", customer: "Ethan Tan", total: 176.5, items: 3, status: "ASSIGNING_DRIVER", channel: "iOS", placed: "Dec 20, 18:41",
    stripe_payment_id: "pi_3M9vY5PjdQz9", stripe_status: "succeeded",
    lalamove_tracking_url: "", lalamove_driver: null,
    lalamove_status: "ASSIGNING_DRIVER"
  },
  {
    id: "ORD-1040", customer: "Priya Nair", total: 285.0, items: 4, status: "ON_GOING", channel: "Web", placed: "Dec 20, 18:02",
    stripe_payment_id: "pi_3M9wZ8RkdSw1", stripe_status: "succeeded",
    lalamove_tracking_url: "https://lalamove.app/track/789012", lalamove_driver: { name: "Rajesh Kumar", phone: "+65 8234 5678", plate: "SKB 5678 Y" },
    lalamove_status: "ON_GOING"
  },
  {
    id: "ORD-1039", customer: "Marcus Lee", total: 98.0, items: 1, status: "COMPLETED", channel: "Android", placed: "Dec 20, 16:55",
    stripe_payment_id: "pi_3M9xA1TkdUy2", stripe_status: "succeeded",
    lalamove_tracking_url: "https://lalamove.app/track/345678", lalamove_driver: { name: "Lim Ah Seng", phone: "+65 9876 5432", plate: "SLC 9012 Z" },
    lalamove_status: "COMPLETED"
  },
  {
    id: "ORD-1038", customer: "Sarah Chen", total: 320.0, items: 2, status: "CANCELED", channel: "Web", placed: "Dec 20, 15:30",
    stripe_payment_id: "pi_3M9yB3VkdVz3", stripe_status: "failed",
    lalamove_tracking_url: "", lalamove_driver: null,
    lalamove_status: "CANCELED"
  },
];

const MOCK_USERS = [
  { id: "USR-201", name: "Chloe Lim", email: "chloe.lim@example.sg", tier: "Gold", orders: 18, spend: 4280, status: "Active" },
  { id: "USR-198", name: "Ethan Tan", email: "ethan.tan@example.sg", tier: "Silver", orders: 11, spend: 2150, status: "Active" },
  { id: "USR-176", name: "Priya Nair", email: "priya.nair@example.sg", tier: "Platinum", orders: 26, spend: 7120, status: "Active" },
  { id: "USR-155", name: "Marcus Lee", email: "marcus.lee@example.sg", tier: "Bronze", orders: 4, spend: 320, status: "Churn Risk" },
  { id: "USR-142", name: "Sofia Goh", email: "sofia.goh@example.sg", tier: "Silver", orders: 9, spend: 1440, status: "Invite Sent" },
];

const statusToBadge: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  Healthy: { label: "In stock", variant: "default" },
  Low: { label: "Low", variant: "destructive" },
  Hidden: { label: "Hidden", variant: "outline" },
  "ASSIGNING_DRIVER": { label: "Assigning Driver", variant: "outline" },
  "PICKED_UP": { label: "Picked Up", variant: "secondary" },
  "ON_GOING": { label: "Ongoing", variant: "default" },
  "COMPLETED": { label: "Completed", variant: "secondary" },
  "CANCELED": { label: "Canceled", variant: "destructive" },
  "EXPIRED": { label: "Expired", variant: "destructive" },
  Active: { label: "Active", variant: "default" },
  "Invite Sent": { label: "Invited", variant: "outline" },
  "Churn Risk": { label: "Churn risk", variant: "destructive" },
};

const buildInventory = (items: Product[]) =>
  items.map((product, idx) => {
    const stock = 8 + ((product.id * 11 + idx * 3) % 44);
    const status = product.price === 0 ? "Hidden" : stock < 12 ? "Low" : "Healthy";
    const margin = 32 + ((product.id + idx) % 18);
    return { ...product, stock, status, margin };
  });

const moduleLinks = [
  { name: "Overview", icon: LayoutDashboard },
  { name: "Products", icon: PackageSearch },
  { name: "Orders", icon: ShoppingBasket },
  { name: "Users", icon: Users },
];

export default function AdminPanel() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [activeView, setActiveView] = useState("Overview");

  // Order Management State
  const [orderSearch, setOrderSearch] = useState("");
  const [orderStatus, setOrderStatus] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState<typeof MOCK_ORDERS[0] | null>(null);
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");

  // User Management State
  const [userSearch, setUserSearch] = useState("");

  // Product Management State
  const [products, setProducts] = useState<Product[]>(() => buildInventory(PRODUCTS));
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});

  const pricedItems = products.filter((p) => p.price > 0);
  const avgPrice = pricedItems.reduce((sum, p) => sum + p.price, 0) / (pricedItems.length || 1);
  const totalStock = products.reduce((sum, item) => sum + item.stock, 0);
  const needsPricing = products.length - pricedItems.length;
  const totalGMV = MOCK_ORDERS.reduce((sum, order) => sum + order.total, 0);
  const ordersCount = MOCK_ORDERS.length;
  const avgOrderValue = totalGMV / (ordersCount || 1);
  const activeUsers = MOCK_USERS.filter((u) => u.status === "Active").length;
  const lowStock = products.filter((i) => i.status === "Low").length;
  const hidden = products.filter((i) => i.status === "Hidden").length;

  const filteredInventory = useMemo(
    () =>
      products.filter((item) => {
        const matchesSearch = `${item.name} ${item.brand}`
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchesCategory = category === "All" || item.category === category;
        return matchesSearch && matchesCategory;
      }),
    [products, search, category]
  );

  const filteredOrders = useMemo(() => {
    return MOCK_ORDERS.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
        order.customer.toLowerCase().includes(orderSearch.toLowerCase());

      let matchesStatus = true;
      if (orderStatus === "Assigning") matchesStatus = order.status === "ASSIGNING_DRIVER";
      else if (orderStatus === "Ongoing") matchesStatus = ["ON_GOING", "PICKED_UP"].includes(order.status);
      else if (orderStatus === "Completed") matchesStatus = order.status === "COMPLETED";
      else if (orderStatus === "Canceled") matchesStatus = ["CANCELED", "EXPIRED", "REJECTED"].includes(order.status);

      return matchesSearch && matchesStatus;
    });
  }, [orderSearch, orderStatus]);

  const filteredUsers = useMemo(() => {
    return MOCK_USERS.filter(user =>
      user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearch.toLowerCase())
    );
  }, [userSearch]);

  const handleSaveProduct = () => {
    if (!formData.name || !formData.category) return;

    const nextStock = formData.stock ?? editingProduct?.stock ?? 0;
    const nextPrice = formData.price ?? editingProduct?.price ?? 0;
    const computedStatus = nextPrice === 0 ? "Hidden" : nextStock < 12 ? "Low" : "Healthy";

    if (editingProduct) {
      const updatedProduct: Product = {
        ...editingProduct,
        ...formData,
        stock: nextStock,
        price: nextPrice,
        status: computedStatus,
        margin: 35,
        brand: formData.brand ?? editingProduct.brand,
        image: formData.image ?? editingProduct.image,
        volume: formData.volume ?? editingProduct.volume,
        abv: formData.abv ?? editingProduct.abv,
        desc: formData.desc ?? editingProduct.desc,
        tags: formData.tags ?? editingProduct.tags,
        time: formData.time ?? editingProduct.time,
      };

      setProducts((prev) =>
        prev.map((product) => (product.id === editingProduct.id ? updatedProduct : product))
      );
    } else {
      const newProduct: Product = {
        id: Math.max(...products.map((product) => product.id), 0) + 1,
        name: formData.name!,
        category: formData.category!,
        price: nextPrice,
        stock: nextStock,
        status: computedStatus,
        image: formData.image ?? "/placeholder.png",
        brand: formData.brand ?? "Soora",
        rating: formData.rating ?? 0,
        reviews: formData.reviews ?? 0,
        margin: 35,
        volume: formData.volume ?? "BOT",
        abv: formData.abv ?? "0%",
        desc: formData.desc ?? "",
        tags: formData.tags ?? [],
        time: formData.time ?? "Today",
      };

      setProducts((prev) => [newProduct, ...prev]);
    }

    setIsDialogOpen(false);
    setEditingProduct(null);
    setFormData({});
  };

  const deleteProduct = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({ category: "BEER", stock: 20, price: 0 });
    setIsDialogOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 font-sans selection:bg-indigo-100">
      {/* Abstract Background Decoration */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-blue-100/40 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-indigo-100/40 blur-3xl" />
      </div>

      <div className="mx-auto flex max-w-[1600px] gap-6 px-4 py-6 md:px-8">
        {/* Sidebar */}
        <aside className="sticky top-6 hidden h-[calc(100vh-3rem)] w-64 flex-shrink-0 flex-col gap-6 rounded-2xl border border-white/40 bg-white/70 backdrop-blur-xl p-5 shadow-2xl shadow-indigo-100/20 md:flex transition-all hover:bg-white/80">
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-lg shadow-indigo-600/20">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="text-base font-bold tracking-tight text-slate-800">Soora Admin</div>
          </div>

          <nav className="flex flex-col gap-1.5 text-sm font-medium text-slate-600">
            {moduleLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveView(item.name)}
                  className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-left transition-all active:scale-95 ${isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                    : "hover:bg-indigo-50 hover:text-indigo-700"
                    }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon className={`h-4.5 w-4.5 transition-colors ${isActive ? "text-white" : "group-hover:text-indigo-600"}`} />
                    {item.name}
                  </span>
                  {isActive && <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />}
                </button>
              );
            })}
          </nav>

          <div className="mt-auto space-y-3 rounded-xl bg-slate-50/80 p-4 text-xs font-medium text-slate-600 border border-slate-100">
            <div className="flex items-center gap-2 mb-2 text-slate-900 font-semibold">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              System Status
            </div>
            <div className="flex justify-between items-center bg-white/50 p-1.5 rounded-lg">
              <span>Pricing required</span>
              <span className="bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded text-[10px] font-bold">{needsPricing}</span>
            </div>
            <div className="flex justify-between items-center bg-white/50 p-1.5 rounded-lg">
              <span>Low stock alert</span>
              <span className="bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded text-[10px] font-bold">{lowStock}</span>
            </div>
            <div className="flex justify-between items-center bg-white/50 p-1.5 rounded-lg">
              <span>Hidden items</span>
              <span className="bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded text-[10px] font-bold">{hidden}</span>
            </div>
          </div>

          <Button variant="outline" className="w-full gap-2 border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-colors" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4" /> Back to Store
            </Link>
          </Button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-8 min-w-0">
          <header className="rounded-2xl border border-white/60 bg-white/60 backdrop-blur-md px-8 py-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
                  <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">Control Center</p>
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">{activeView}</h1>
                <p className="text-sm text-slate-500 font-medium">Manage your store operations.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="gap-2 border-slate-200 bg-white/50 hover:bg-white hover:border-indigo-200 hover:text-indigo-600 transition-all shadow-sm" onClick={() => { setSearch(""); setCategory("All"); }}>
                  <RefreshCw className="h-4 w-4" /> Refresh Data
                </Button>
                <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20 shadow-indigo-600/10 transition-all hover:shadow-indigo-600/30" asChild>
                  <Link href="/">
                    <ShoppingBag className="h-4 w-4" /> View Storefront
                  </Link>
                </Button>
              </div>
            </div>
          </header>

          {activeView === "Overview" && (
            <>
              {/* Stats Grid */}
              <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {[
                  { title: "Total Revenue", value: `S$${totalGMV.toFixed(1)}`, icon: ShoppingCart, desc: "+12.5% from last month", color: "blue" },
                  { title: "Total Orders", value: ordersCount, icon: ShoppingBasket, desc: "Pending processing", color: "indigo" },
                  { title: "Avg. Order Value", value: `S$${avgOrderValue.toFixed(1)}`, icon: BarChart3, desc: "+2.4% increase", color: "emerald" },
                  { title: "Active Customers", value: activeUsers, icon: UserCheck, desc: "Currently online", color: "violet" }
                ].map((stat, i) => (
                  <Card key={i} className="group overflow-hidden border-white/60 bg-white/60 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-100/40 hover:border-indigo-100">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                      <CardDescription className="font-medium text-slate-500">{stat.title}</CardDescription>
                      <div className={`rounded-lg p-2 bg-${stat.color}-50 text-${stat.color}-600`}>
                        <stat.icon className="h-4 w-4" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardTitle className="text-3xl font-bold text-slate-900">{stat.value}</CardTitle>
                      <p className="mt-1 text-xs font-medium text-slate-400">{stat.desc}</p>
                    </CardContent>
                    <div className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-${stat.color}-500/0 via-${stat.color}-500/50 to-${stat.color}-500/0 opacity-0 transition-opacity group-hover:opacity-100`} />
                  </Card>
                ))}
              </section>

              {/* Inventory Snapshot */}
              <section className="grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2 border-white/60 bg-white/70 backdrop-blur-md shadow-sm overflow-hidden">
                  <CardHeader className="flex flex-col gap-4 border-b border-slate-100/50 bg-white/40 px-6 py-5 md:flex-row md:items-end md:justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">Inventory Snapshot</CardTitle>
                      <CardDescription>Recent items and stock status.</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader className="bg-slate-50/50">
                        <TableRow className="hover:bg-transparent border-slate-100">
                          <TableHead className="font-semibold text-slate-600">Product Name</TableHead>
                          <TableHead className="hidden md:table-cell font-semibold text-slate-600">Category</TableHead>
                          <TableHead className="font-semibold text-slate-600">Price</TableHead>
                          <TableHead className="font-semibold text-slate-600">Stock</TableHead>
                          <TableHead className="font-semibold text-slate-600">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredInventory.slice(0, 5).map((item) => {
                          const badge = statusToBadge[item.status];
                          return (
                            <TableRow key={item.id} className="border-slate-100 transition-colors hover:bg-indigo-50/30">
                              <TableCell className="font-medium text-slate-900">{item.name}</TableCell>
                              <TableCell className="hidden md:table-cell text-slate-500">{item.category}</TableCell>
                              <TableCell className="font-medium">{item.price > 0 ? `S$${item.price.toFixed(2)}` : "—"}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{item.stock}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className={`
                                    ${badge?.variant === 'default' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : ''}
                                    ${badge?.variant === 'destructive' ? 'bg-rose-50 text-rose-700 border-rose-200' : ''}
                                    ${badge?.variant === 'secondary' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                                    ${badge?.variant === 'outline' ? 'bg-slate-50 text-slate-600 border-slate-200' : ''}
                                    border shadow-sm
                                  `}
                                >
                                  {badge?.label || "Review"}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card className="border-white/60 bg-white/70 backdrop-blur-md shadow-sm h-full">
                    <CardHeader className="border-b border-slate-100/50 pb-4">
                      <CardTitle>Catalog Health</CardTitle>
                      <CardDescription>Overview of inventory status.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      {[
                        { label: "Live Products", value: PRODUCTS.length, color: "bg-emerald-500" },
                        { label: "Pricing Required", value: needsPricing, color: "bg-amber-500" },
                        { label: "Low Stock Items", value: lowStock, color: "bg-rose-500" },
                        { label: "Hidden SKUs", value: hidden, color: "bg-slate-400" },
                        { label: "Total Units", value: totalStock, color: "bg-indigo-500" }
                      ].map((stat, i) => (
                        <div key={i} className="flex items-center justify-between group">
                          <div className="flex items-center gap-3">
                            <div className={`h-2 w-2 rounded-full ${stat.color} ring-2 ring-white shadow-sm`} />
                            <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">{stat.label}</span>
                          </div>
                          <span className="text-sm font-bold text-slate-900">{stat.value}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Recent Orders Short */}
              <section className="grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2 border-white/60 bg-white/70 backdrop-blur-md shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100/50 bg-white/40 px-6 py-5">
                    <div>
                      <CardTitle>Recent Orders</CardTitle>
                      <CardDescription>Latest transactions.</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setActiveView("Orders")} className="text-indigo-600 hover:bg-indigo-50">
                      View All
                    </Button>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader className="bg-slate-50/50">
                        <TableRow className="hover:bg-transparent border-slate-100">
                          <TableHead className="font-semibold text-slate-600">Order ID</TableHead>
                          <TableHead className="font-semibold text-slate-600">Customer</TableHead>
                          <TableHead className="font-semibold text-slate-600">Total</TableHead>
                          <TableHead className="font-semibold text-slate-600">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {MOCK_ORDERS.slice(0, 3).map((order) => {
                          const badge = statusToBadge[order.status];
                          return (
                            <TableRow key={order.id} className="border-slate-100 transition-colors hover:bg-slate-50/50">
                              <TableCell className="font-medium text-indigo-600 group-hover:underline cursor-pointer">{order.id}</TableCell>
                              <TableCell>
                                <div className="flex flex-col">
                                  <span className="font-medium text-slate-900">{order.customer}</span>
                                </div>
                              </TableCell>
                              <TableCell className="font-bold text-slate-900">S${order.total.toFixed(2)}</TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className={`
                                    ${badge?.variant === 'default' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : ''}
                                    ${badge?.variant === 'secondary' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                                    ${badge?.variant === 'outline' ? 'bg-amber-50 text-amber-700 border-amber-200' : ''}
                                    border shadow-sm
                                  `}
                                >
                                  {badge?.label || order.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </section>
            </>
          )}

          {activeView === "Products" && (
            <Card className="border-white/60 bg-white/70 backdrop-blur-md shadow-sm overflow-hidden">
              <CardHeader className="flex flex-col gap-4 border-b border-slate-100/50 bg-white/40 px-6 py-5 md:flex-row md:items-end md:justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">All Products</CardTitle>
                  <CardDescription>Detailed inventory layout.</CardDescription>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Input
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border-slate-200 bg-white/80 focus:bg-white sm:w-64 transition-all"
                  />
                  <div className="flex items-center gap-2">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="h-10 rounded-md border border-slate-200 bg-white/80 px-3 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                    >
                      <option value="All">All Categories</option>
                      {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <Button variant="ghost" size="icon" onClick={() => { setSearch(""); setCategory("All"); }} className="text-slate-400 hover:text-indigo-600 hover:bg-indigo-50">
                      <Loader2 className="h-4 w-4" />
                    </Button>
                    <Button onClick={openAddModal} className="shrink-0 gap-2 bg-indigo-600 text-white hover:bg-indigo-700">
                      <Plus className="h-4 w-4" /> Add Product
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-50/50">
                    <TableRow className="hover:bg-transparent border-slate-100">
                      <TableHead className="font-semibold text-slate-600">Product Name</TableHead>
                      <TableHead className="hidden md:table-cell font-semibold text-slate-600">Category</TableHead>
                      <TableHead className="font-semibold text-slate-600">Price</TableHead>
                      <TableHead className="hidden md:table-cell font-semibold text-slate-600">Margin</TableHead>
                      <TableHead className="font-semibold text-slate-600">Stock</TableHead>
                      <TableHead className="font-semibold text-slate-600">Status</TableHead>
                      <TableHead className="font-semibold text-slate-600">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInventory.map((item) => {
                      const badge = statusToBadge[item.status];
                      return (
                        <TableRow key={item.id} className="border-slate-100 transition-colors hover:bg-indigo-50/30">
                          <TableCell className="font-medium text-slate-900">{item.name}</TableCell>
                          <TableCell className="hidden md:table-cell text-slate-500">{item.category}</TableCell>
                          <TableCell className="font-medium">{item.price > 0 ? `S$${item.price.toFixed(2)}` : "—"}</TableCell>
                          <TableCell className="hidden md:table-cell text-slate-500">{item.margin}%</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{item.stock}</span>
                              <div className="h-1.5 w-16 rounded-full bg-slate-100 overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${item.stock < 12 ? 'bg-rose-400' : 'bg-emerald-400'}`}
                                  style={{ width: `${Math.min(100, (item.stock / 50) * 100)}%` }}
                                />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={`
                                ${badge?.variant === 'default' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : ''}
                                ${badge?.variant === 'destructive' ? 'bg-rose-50 text-rose-700 border-rose-200' : ''}
                                ${badge?.variant === 'secondary' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                                ${badge?.variant === 'outline' ? 'bg-slate-50 text-slate-600 border-slate-200' : ''}
                                border shadow-sm
                              `}
                            >
                              {badge?.label || "Review"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-indigo-600" onClick={() => openEditModal(item)}>
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-rose-600" onClick={() => deleteProduct(item.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
                {filteredInventory.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-sm text-slate-500">
                    <PackageSearch className="h-10 w-10 text-slate-300 mb-2" />
                    No items found matching your filters.
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeView === "Orders" && (
            <Card className="border-white/60 bg-white/70 backdrop-blur-md shadow-sm">
              <CardHeader className="flex flex-col gap-4 border-b border-slate-100/50 bg-white/40 px-6 py-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <CardTitle>Order Management</CardTitle>
                  <CardDescription>Track and manage delivery status.</CardDescription>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button
                    onClick={() => setIsLocationDialogOpen(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Create Order
                  </Button>
                  <Input
                    placeholder="Search Order ID or Customer..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    className="w-full border-slate-200 bg-white/80 focus:bg-white sm:w-64 transition-all"
                  />
                  <Button variant="outline" size="sm" className="gap-2 border-slate-200 hover:border-indigo-300 hover:text-indigo-600">
                    <ArrowUpRight className="h-4 w-4" /> Export
                  </Button>
                </div>
              </CardHeader>
              <div className="px-6 py-4 border-b border-slate-100/50 bg-white/30 overflow-x-auto">
                <div className="flex items-center gap-2">
                  {["All", "Assigning", "Ongoing", "Completed", "Canceled"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setOrderStatus(status)}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${orderStatus === status
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                        : "bg-white text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200"
                        }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-50/50">
                    <TableRow className="hover:bg-transparent border-slate-100">
                      <TableHead className="font-semibold text-slate-600">Order ID</TableHead>
                      <TableHead className="font-semibold text-slate-600">Customer</TableHead>
                      <TableHead className="hidden md:table-cell font-semibold text-slate-600">Channel</TableHead>
                      <TableHead className="hidden md:table-cell font-semibold text-slate-600">Date</TableHead>
                      <TableHead className="font-semibold text-slate-600">Total</TableHead>
                      <TableHead className="font-semibold text-slate-600">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => {
                      const badge = statusToBadge[order.status];
                      return (
                        <TableRow
                          key={order.id}
                          className="border-slate-100 transition-colors hover:bg-slate-50/50 cursor-pointer"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <TableCell className="font-medium text-indigo-600 group-hover:underline">{order.id}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-medium text-slate-900">{order.customer}</span>
                              <span className="text-xs text-slate-400">{order.items} items</span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-transparent text-[10px] uppercase tracking-wide">
                              {order.channel}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-sm text-slate-500">{order.placed}</TableCell>
                          <TableCell className="font-bold text-slate-900">S${order.total.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={`
                                ${badge?.variant === 'default' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : ''}
                                ${badge?.variant === 'secondary' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                                ${badge?.variant === 'destructive' ? 'bg-rose-50 text-rose-700 border-rose-200' : ''}
                                ${badge?.variant === 'outline' ? 'bg-amber-50 text-amber-700 border-amber-200' : ''}
                                border shadow-sm
                              `}
                            >
                              {badge?.label || order.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
                {filteredOrders.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-sm text-slate-500">
                    <ShoppingBasket className="h-10 w-10 text-slate-300 mb-2" />
                    No orders found matching criteria.
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeView === "Users" && (
            <Card className="border-white/60 bg-white/70 backdrop-blur-md shadow-sm">
              <CardHeader className="flex flex-col gap-4 border-b border-slate-100/50 pb-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>View and manage client profiles.</CardDescription>
                </div>
                <Input
                  placeholder="Search Name or Email..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="w-full border-slate-200 bg-white/80 focus:bg-white sm:w-64 transition-all"
                />
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                {filteredUsers.map((user) => {
                  const badge = statusToBadge[user.status];
                  return (
                    <div key={user.id} className="group flex items-center justify-between rounded-xl border border-slate-100 bg-white/50 px-4 py-3 transition-all hover:bg-white hover:shadow-md hover:border-indigo-100 hover:-translate-x-1">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm ring-4 ring-white shadow-sm">
                          {user.name.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-base text-slate-900">{user.name}</span>
                          <span className="text-xs text-slate-500 font-medium">{user.email}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className="text-right">
                          <span className="block font-bold text-sm text-slate-900">S${user.spend.toLocaleString()}</span>
                          <span className="text-[10px] text-slate-400 uppercase tracking-wide">{user.tier} Tier</span>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold 
                          ${user.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : ''}
                          ${user.status === 'Churn Risk' ? 'bg-rose-100 text-rose-700' : ''}
                          ${user.status === 'Invite Sent' ? 'bg-slate-100 text-slate-600' : ''}
                        `}>
                          {user.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
                {filteredUsers.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-sm text-slate-500">
                    <UserCheck className="h-10 w-10 text-slate-300 mb-2" />
                    No users found matching "{userSearch}".
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </main>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md bg-white/90 backdrop-blur-xl border-white/40">
            <DialogHeader>
              <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input
                  id="name"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">Category</Label>
                <select
                  id="category"
                  value={formData.category || ""}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="" disabled>Select Category</option>
                  {CATEGORIES.filter(c => c !== "All").map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">Price</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price || 0}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="stock" className="text-right">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock || 0}
                  onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="image" className="text-right pt-2">Image</Label>
                <div className="col-span-3 space-y-3">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setFormData((prev) => ({ ...prev, image: reader.result as string }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="cursor-pointer file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                  {formData.image && (
                    <div className="relative h-24 w-24 rounded-lg overflow-hidden border border-slate-200 shadow-sm group">
                      <img
                        src={formData.image}
                        alt="Product preview"
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveProduct}>{editingProduct ? "Save Changes" : "Create Product"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {selectedOrder && (
          <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
            <DialogContent className="max-w-3xl bg-white/95 backdrop-blur-xl border-white/40 shadow-2xl p-0 overflow-hidden gap-0">
              <DialogHeader className="p-6 pb-4 border-b border-slate-100/50 bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <DialogTitle className="text-xl font-bold flex items-center gap-2">
                      Order #{selectedOrder.id}
                      <Badge className="ml-2 bg-indigo-600 hover:bg-indigo-700">{selectedOrder.status}</Badge>
                    </DialogTitle>
                    <DialogDescription>
                      Placed on {selectedOrder.placed} by <span className="font-semibold text-slate-700">{selectedOrder.customer}</span>
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                {/* Stripe Payment Section */}
                <div className="p-6 space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Payment Details</h3>
                      <p className="text-xs text-slate-500">Processed via Stripe</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-500">Payment ID</span>
                        <code className="text-xs font-mono bg-white px-2 py-1 rounded border border-slate-200 text-slate-700">
                          {selectedOrder.stripe_payment_id}
                        </code>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-500">Amount</span>
                        <span className="font-bold text-slate-900">S${selectedOrder.total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-500">Status</span>
                        <Badge variant="outline" className={`
                          ${selectedOrder.stripe_status === 'succeeded' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}
                        `}>
                          {selectedOrder.stripe_status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full text-indigo-600 border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700">
                      View on Stripe Dashboard
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Lalamove Delivery Section */}
                <div className="p-6 space-y-6 bg-slate-50/30">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600">
                      <ShoppingCart className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Delivery Tracking</h3>
                      <p className="text-xs text-slate-500">Fulfilled by Lalamove</p>
                    </div>
                  </div>

                  {selectedOrder.lalamove_driver ? (
                    <div className="space-y-4">
                      {/* Driver Card */}
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                        <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center">
                          <Users className="h-6 w-6 text-slate-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-900">{selectedOrder.lalamove_driver.name}</h4>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <span>{selectedOrder.lalamove_driver.plate}</span>
                            <span>•</span>
                            <span>{selectedOrder.lalamove_driver.phone}</span>
                          </div>
                        </div>
                        <a href={`tel:${selectedOrder.lalamove_driver.phone}`} className="p-2 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100">
                          <Users className="h-4 w-4" />
                        </a>
                      </div>

                      {/* Status Timeline Placeholder */}
                      <div className="relative pl-4 space-y-6 pt-2">
                        <div className="absolute left-1.5 top-2 bottom-2 w-0.5 bg-slate-200"></div>

                        <div className="relative flex items-start gap-3">
                          <div className="absolute -left-[5px] mt-1 h-3 w-3 rounded-full bg-emerald-500 ring-4 ring-white"></div>
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-slate-900">{selectedOrder.lalamove_status}</span>
                            <span className="text-xs text-slate-500">Current Status</span>
                          </div>
                        </div>

                        <div className="relative flex items-start gap-3 opacity-50">
                          <div className="absolute -left-[5px] mt-1 h-3 w-3 rounded-full bg-slate-300 ring-4 ring-white"></div>
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-slate-900">Order Placed</span>
                            <span className="text-xs text-slate-500">{selectedOrder.placed}</span>
                          </div>
                        </div>
                      </div>

                      {selectedOrder.lalamove_tracking_url && (
                        <Button className="w-full bg-[#ff6b00] hover:bg-[#e66000] text-white shadow-lg shadow-orange-500/20">
                          Track Delivery Live
                          <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-48 text-center p-4 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                      <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                        <Loader2 className="h-6 w-6 text-slate-400 animate-spin" />
                      </div>
                      <h4 className="font-semibold text-slate-900">Awaiting Assignment</h4>
                      <p className="text-sm text-slate-500 max-w-[200px]">Logicstics provider is currently searching for a nearby driver.</p>
                    </div>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
        {/* Location Picker Dialog */}
        <Dialog open={isLocationDialogOpen} onOpenChange={setIsLocationDialogOpen}>
          <DialogContent className="sm:max-w-[600px] bg-white/95 backdrop-blur-xl border-white/40 p-0 overflow-hidden shadow-2xl gap-0">
            <div className="relative h-[200px] bg-slate-100 w-full overflow-hidden group cursor-crosshair">
              {/* Mock Map Background */}
              <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/103.8198,1.3521,11,0/800x400?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjdGdidXdpYmwwMDJnMnlwa2x4YnNrdCJ9.example')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative">
                  <div className="h-4 w-4 bg-indigo-600 rounded-full shadow-lg ring-4 ring-white animate-bounce"></div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-black/20 blur-sm rounded-full"></div>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold shadow-sm border border-white/50 text-slate-600">
                Singapore
              </div>
            </div>

            <div className="p-6 space-y-6">
              <DialogHeader className="p-0">
                <DialogTitle className="text-xl font-bold text-slate-900">Select Delivery Location</DialogTitle>
                <DialogDescription>
                  Choose where to dispatch this order.
                </DialogDescription>
              </DialogHeader>

              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search for building, street, or postal code..."
                  className="pl-10 h-10 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                />
              </div>

              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Saved Addresses</h4>
                  <div className="flex gap-2">
                    {["Headquarters", "Warehouse A", "Jurong Outlet"].map(loc => (
                      <button key={loc} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 transition-all text-sm font-medium text-slate-600">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recent Locations</h4>
                  <div className="space-y-1">
                    {[
                      { name: "Marina Bay Sands Hotel", address: "10 Bayfront Ave, Singapore 018956" },
                      { name: "Changi Airport T3", address: "65 Airport Blvd, Singapore 819663" },
                      { name: "VivoCity Mall", address: "1 HarbourFront Walk, Singapore 098585" }
                    ].map((loc, idx) => (
                      <button key={idx} className="w-full text-left flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className="mt-0.5 h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                          <History className="h-4 w-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-slate-900 group-hover:text-indigo-700">{loc.name}</span>
                          <span className="text-xs text-slate-500">{loc.address}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter className="pt-2">
                <Button variant="outline" onClick={() => setIsLocationDialogOpen(false)}>Cancel</Button>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Confirm Location</Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
