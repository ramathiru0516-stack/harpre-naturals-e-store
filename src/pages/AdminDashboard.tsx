import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Navigate } from "react-router-dom";
import { Eye, Package, Users, LogOut } from "lucide-react";

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  payment_method: string;
  status: string;
  total_amount: number;
  created_at: string;
}

interface OrderItem {
  id: string;
  product_name: string;
  quantity: number;
  price: number;
}

const AdminDashboard = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0, revenue: 0 });

  useEffect(() => {
    if (isAdmin) fetchOrders();
  }, [isAdmin]);

  const fetchOrders = async () => {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) {
      setOrders(data);
      setStats({
        total: data.length,
        pending: data.filter(o => o.status === "pending").length,
        completed: data.filter(o => o.status === "completed").length,
        revenue: data.reduce((s, o) => s + Number(o.total_amount), 0),
      });
    }
    setLoadingOrders(false);
  };

  const viewOrder = async (order: Order) => {
    setSelectedOrder(order);
    const { data } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", order.id);
    setOrderItems(data || []);
  };

  const updateStatus = async (orderId: string, status: string) => {
    await supabase.from("orders").update({ status }).eq("id", orderId);
    fetchOrders();
    if (selectedOrder?.id === orderId) {
      setSelectedOrder(prev => prev ? { ...prev, status } : null);
    }
  };

  if (loading) return <div className="container mx-auto px-4 py-16 text-center font-body">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (!isAdmin) return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="font-display text-2xl text-foreground mb-4">Access Denied</h1>
      <p className="font-body text-muted-foreground">You don't have admin privileges.</p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="herb-section-title">Admin Dashboard</h1>
        <button onClick={signOut} className="herb-btn-outline text-sm py-2 px-4 flex items-center gap-2">
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Orders", value: stats.total, icon: Package },
          { label: "Pending", value: stats.pending, icon: Eye },
          { label: "Completed", value: stats.completed, icon: Users },
          { label: "Revenue", value: `₹${stats.revenue}`, icon: Package },
        ].map(s => (
          <div key={s.label} className="herb-card p-4">
            <s.icon className="h-5 w-5 text-muted-foreground mb-2" />
            <p className="font-sans text-2xl font-bold text-foreground">{s.value}</p>
            <p className="font-body text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders List */}
        <div className="lg:col-span-2">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">Orders</h2>
          {loadingOrders ? (
            <p className="font-body text-muted-foreground">Loading orders...</p>
          ) : orders.length === 0 ? (
            <p className="font-body text-muted-foreground">No orders yet.</p>
          ) : (
            <div className="space-y-3">
              {orders.map(order => (
                <div
                  key={order.id}
                  onClick={() => viewOrder(order)}
                  className={`herb-card p-4 cursor-pointer transition-all ${selectedOrder?.id === order.id ? "border-primary" : ""}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display text-sm font-semibold text-foreground">{order.customer_name}</span>
                    <span className={`text-xs font-sans font-medium px-2 py-1 rounded-full ${order.status === "pending" ? "bg-accent/20 text-accent-foreground" : order.status === "completed" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between font-body text-xs text-muted-foreground">
                    <span>₹{order.total_amount} • {order.payment_method}</span>
                    <span>{new Date(order.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Detail */}
        <div>
          {selectedOrder ? (
            <div className="herb-card p-6 sticky top-20">
              <h2 className="font-display text-lg font-semibold text-foreground mb-4">Order Details</h2>
              <div className="space-y-3 font-body text-sm">
                <div><span className="text-muted-foreground">Name:</span> <span className="text-foreground">{selectedOrder.customer_name}</span></div>
                <div><span className="text-muted-foreground">Email:</span> <span className="text-foreground">{selectedOrder.customer_email}</span></div>
                <div><span className="text-muted-foreground">Phone:</span> <span className="text-foreground">{selectedOrder.customer_phone}</span></div>
                <div><span className="text-muted-foreground">Address:</span> <span className="text-foreground">{selectedOrder.customer_address}</span></div>
                <div><span className="text-muted-foreground">Payment:</span> <span className="text-foreground">{selectedOrder.payment_method}</span></div>
                <div><span className="text-muted-foreground">Total:</span> <span className="font-semibold text-foreground">₹{selectedOrder.total_amount}</span></div>

                <h3 className="font-display text-sm font-semibold text-foreground pt-2">Items</h3>
                {orderItems.map(item => (
                  <div key={item.id} className="flex justify-between text-xs">
                    <span>{item.product_name} × {item.quantity}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}

                <div className="flex gap-2 pt-4">
                  <button onClick={() => updateStatus(selectedOrder.id, "confirmed")} className="flex-1 py-2 rounded-lg bg-accent text-accent-foreground font-sans text-xs font-medium">Confirm</button>
                  <button onClick={() => updateStatus(selectedOrder.id, "completed")} className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground font-sans text-xs font-medium">Complete</button>
                  <button onClick={() => updateStatus(selectedOrder.id, "cancelled")} className="flex-1 py-2 rounded-lg bg-destructive text-destructive-foreground font-sans text-xs font-medium">Cancel</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="herb-card p-6 text-center">
              <p className="font-body text-sm text-muted-foreground">Select an order to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
