
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminOrders from '@/components/admin/AdminOrders';
import AdminProducts from '@/components/admin/AdminProducts';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { useToast } from '@/hooks/use-toast';
import { SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Package, ShoppingBag, PencilLine } from "lucide-react";

const Admin: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <SidebarProvider>
          <div className="flex w-full min-h-[70vh] border rounded-lg overflow-hidden">
            <Sidebar>
              <SidebarContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeTab === "dashboard"}
                      onClick={() => setActiveTab("dashboard")}
                      tooltip="Dashboard"
                    >
                      <PencilLine />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeTab === "products"}
                      onClick={() => setActiveTab("products")}
                      tooltip="Products"
                    >
                      <Package />
                      <span>Products</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeTab === "orders"}
                      onClick={() => setActiveTab("orders")}
                      tooltip="Orders"
                    >
                      <ShoppingBag />
                      <span>Orders</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarContent>
            </Sidebar>
            
            <div className="flex-1 p-6">
              {activeTab === "dashboard" && <AdminDashboard />}
              {activeTab === "products" && <AdminProducts />}
              {activeTab === "orders" && <AdminOrders />}
            </div>
          </div>
        </SidebarProvider>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;