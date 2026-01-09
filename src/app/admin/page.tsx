"use client";

import { useState, useMemo } from "react";
import { 
  Lock, RefreshCw, LayoutDashboard, ShoppingBag, Users, 
  LogOut, Search, MapPin, Phone, ExternalLink, 
  ChevronRight, TrendingUp, AlertCircle 
} from "lucide-react";

type Order = {
  id: string;
  customer: {
    name: string;
    phone: string;
    city: string;
    address: string;
  };
  items: any[];
  amount: number;
  status: string;
  createdAt: string;
};

export default function AdminPage() {

  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  

  const [orders, setOrders] = useState<Order[]>([]);
  const [activeView, setActiveView] = useState<'overview' | 'orders' | 'customers'>('overview');
  const [searchTerm, setSearchTerm] = useState("");


  const fetchOrders = async (pinCode: string = pin) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/orders?pin=${pinCode}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setOrders(data.orders);
        setIsAuthenticated(true);
      } else {
        alert("Invalid PIN");
      }
    } catch (err) {
      alert("Connection Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
  
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    try {
      await fetch('/api/admin/orders', {
        method: 'PATCH',
        body: JSON.stringify({ pin, orderId, status: newStatus }),
      });
    } catch (error) {
      alert("Update failed");
      fetchOrders(); 
    }
  };

  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0);
    const pending = orders.filter(o => o.status === 'pending').length;
    const delivered = orders.filter(o => o.status === 'delivered').length;
    return { totalRevenue, pending, delivered };
  }, [orders]);

  const uniqueCustomers = useMemo(() => {
    const customers = new Map();
    orders.forEach(order => {
      if (!customers.has(order.customer.phone)) {
        customers.set(order.customer.phone, {
          ...order.customer,
          totalSpent: 0,
          orderCount: 0,
          lastOrder: order.createdAt
        });
      }
      const c = customers.get(order.customer.phone);
      c.totalSpent += order.amount;
      c.orderCount += 1;
    });
    return Array.from(customers.values()).sort((a, b) => b.totalSpent - a.totalSpent);
  }, [orders]);

  const filteredOrders = useMemo(() => {
    if (!searchTerm) return orders;
    const lower = searchTerm.toLowerCase();
    return orders.filter(o => 
      o.customer.name.toLowerCase().includes(lower) || 
      o.id.toLowerCase().includes(lower) ||
      o.customer.phone.includes(lower)
    );
  }, [orders, searchTerm]);


  // --- LOGIN VIEW ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
        <form onSubmit={(e) => { e.preventDefault(); fetchOrders(); }} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-gray-500" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Agbedoba Admin</h1>
          <p className="text-sm text-gray-500 mb-6">Enter PIN to access dashboard</p>
          <input 
            type="password" 
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl mb-4 text-center text-2xl tracking-widest font-bold focus:ring-2 focus:ring-orange-500 outline-none"
            placeholder="••••"
            autoFocus
          />
          <button disabled={loading} className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition disabled:opacity-50">
            {loading ? "Verifying..." : "Unlock"}
          </button>
        </form>
      </div>
    );
  }

  // --- DASHBOARD LAYOUT ---
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      
      {/* 1. SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col fixed inset-y-0 z-50">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-900">Agbedoba<span className="text-orange-500">.</span></h1>
          <p className="text-xs text-gray-400 mt-1">Admin Panel v1.0</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <SidebarItem 
            active={activeView === 'overview'} 
            onClick={() => setActiveView('overview')} 
            icon={<LayoutDashboard size={20} />} 
            label="Overview" 
          />
          <SidebarItem 
            active={activeView === 'orders'} 
            onClick={() => setActiveView('orders')} 
            icon={<ShoppingBag size={20} />} 
            label="Orders" 
            badge={stats.pending > 0 ? stats.pending : undefined}
          />
          <SidebarItem 
            active={activeView === 'customers'} 
            onClick={() => setActiveView('customers')} 
            icon={<Users size={20} />} 
            label="Customers" 
          />
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl w-full transition"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto">
        
        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm">
          <span className="font-bold">Agbedoba Admin</span>
          <button onClick={() => setIsAuthenticated(false)}><LogOut size={18}/></button>
        </div>

        {/* --- VIEW: OVERVIEW --- */}
        {activeView === 'overview' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
              <p className="text-gray-500">Welcome back, here is what's happening today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard label="Total Revenue" value={`₦${(stats.totalRevenue / 100).toLocaleString()}`} icon={<TrendingUp className="text-green-600" />} />
              <StatCard label="Pending Orders" value={stats.pending} icon={<AlertCircle className="text-orange-500" />} highlight />
              <StatCard label="Delivered" value={stats.delivered} icon={<ShoppingBag className="text-blue-500" />} />
            </div>

            {/* Recent Orders Preview */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800">Recent Activity</h3>
                <button onClick={() => setActiveView('orders')} className="text-sm text-orange-600 hover:underline flex items-center">View All <ChevronRight size={16}/></button>
              </div>
              <div className="space-y-4">
                {orders.slice(0, 5).map(order => (
                  <div key={order.id} className="flex justify-between items-center border-b border-gray-50 last:border-0 pb-3 last:pb-0">
                    <div>
                      <div className="font-bold text-sm text-gray-900">{order.customer.name}</div>
                      <div className="text-xs text-gray-400">Ordered {order.items.length} items</div>
                    </div>
                    <StatusBadge status={order.status} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- VIEW: ORDERS --- */}
        {activeView === 'orders' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">All Orders</h2>
                <p className="text-gray-500">Manage and track customer orders.</p>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <div className="relative flex-grow">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                   <input 
                     type="text" placeholder="Search..." 
                     className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm w-full md:w-64"
                     value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                   />
                </div>
                <button onClick={() => fetchOrders()} className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"><RefreshCw size={18} className={loading ? 'animate-spin' : ''} /></button>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
               <div className="overflow-x-auto">
                 <table className="w-full text-left text-sm text-gray-600">
                   <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-500 border-b border-gray-100">
                     <tr>
                       <th className="px-6 py-4">Status</th>
                       <th className="px-6 py-4">Customer</th>
                       <th className="px-6 py-4">Items</th>
                       <th className="px-6 py-4">Total</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                     {filteredOrders.map(order => (
                       <tr key={order.id} className="hover:bg-gray-50">
                         <td className="px-6 py-4">
                            <select 
                              value={order.status}
                              onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                              className="bg-transparent font-bold text-xs p-1 rounded border-none focus:ring-0 cursor-pointer"
                            >
                              <option value="pending">🟡 Pending</option>
                              <option value="confirmed">🔵 Confirmed</option>
                              <option value="delivered">🟢 Delivered</option>
                            </select>
                            <div className="text-[10px] text-gray-400 mt-1">{new Date(order.createdAt).toLocaleDateString()}</div>
                         </td>
                         <td className="px-6 py-4">
                            <div className="font-bold text-gray-900">{order.customer.name}</div>
                            <div className="flex items-center gap-1 text-xs mt-1 text-gray-500"><MapPin size={12}/> {order.customer.city}</div>
                            <a href={`https://wa.me/234${order.customer.phone.replace(/^0/, '')}`} target="_blank" className="flex items-center gap-1 text-xs mt-1 text-green-600 font-bold hover:underline"><Phone size={12}/> Chat</a>
                         </td>
                         <td className="px-6 py-4">
                            {order.items.map((item: any, i: number) => (
                              <div key={i} className="text-xs mb-1"><span className="font-bold">x{item.quantity}</span> {item.name}</div>
                            ))}
                         </td>
                         <td className="px-6 py-4 font-bold text-gray-900">₦{(order.amount / 100).toLocaleString()}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
          </div>
        )}

        {/* --- VIEW: CUSTOMERS --- */}
        {activeView === 'customers' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">VIP Customers</h2>
              <p className="text-gray-500">Your top buyers based on order history.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {uniqueCustomers.map((customer, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-start justify-between">
                  <div>
                    <div className="font-bold text-lg text-gray-900">{customer.name}</div>
                    <div className="text-sm text-gray-500 mb-4">{customer.phone}</div>
                    <div className="flex gap-4 text-xs font-medium">
                       <div className="bg-gray-100 px-2 py-1 rounded">
                         <span className="block text-gray-400 uppercase text-[10px]">Orders</span>
                         {customer.orderCount}
                       </div>
                       <div className="bg-green-50 text-green-700 px-2 py-1 rounded">
                         <span className="block text-green-800/50 uppercase text-[10px]">Spent</span>
                         ₦{(customer.totalSpent / 100).toLocaleString()}
                       </div>
                    </div>
                  </div>
                  <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
                    #{i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

// --- SUB-COMPONENTS ---
function SidebarItem({ active, icon, label, onClick, badge }: any) {
  return (
    <button 
      onClick={onClick}
      className={`
        w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition
        ${active ? 'bg-black text-white shadow-lg shadow-black/20' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}
      `}
    >
      <div className="flex items-center gap-3">
        {icon}
        {label}
      </div>
      {badge && <span className="bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{badge}</span>}
    </button>
  );
}

function StatCard({ label, value, icon, highlight }: any) {
  return (
    <div className={`p-6 rounded-2xl border shadow-sm flex items-center gap-4 ${highlight ? 'bg-orange-50 border-orange-100' : 'bg-white border-gray-200'}`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${highlight ? 'bg-white' : 'bg-gray-50'}`}>
        {icon}
      </div>
      <div>
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wide">{label}</div>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    delivered: "bg-green-100 text-green-800",
  };
  return (
    <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${styles[status] || 'bg-gray-100'}`}>
      {status}
    </span>
  )
}