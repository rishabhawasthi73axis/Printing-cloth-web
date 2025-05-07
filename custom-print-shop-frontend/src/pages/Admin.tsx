
import React, { useState } from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Users, Package, ShoppingBag, Settings, PlusCircle } from "lucide-react";
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminProducts from '@/components/admin/AdminProducts';
import AdminOrders from '@/components/admin/AdminOrders';
import AdminSettings from '@/components/admin/AdminSettings';
import AdminCategories from '@/components/admin/AdminCategories';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-grow flex">
        <SidebarProvider>
          <div className="flex w-full min-h-[calc(100vh)]">
            <Sidebar>
              <SidebarContent>
                <div className="p-4">
                  <h1 className="text-2xl font-bold text-primary mb-4">Admin Panel</h1>
                </div>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeTab === "dashboard"}
                      onClick={() => setActiveTab("dashboard")}
                      tooltip="Dashboard"
                    >
                      <Users />
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
                      isActive={activeTab === "categories"}
                      onClick={() => setActiveTab("categories")}
                      tooltip="Categories"
                    >
                      <PlusCircle />
                      <span>Categories</span>
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
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeTab === "settings"}
                      onClick={() => setActiveTab("settings")}
                      tooltip="Settings"
                    >
                      <Settings />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarContent>
            </Sidebar>
            
            <div className="flex-1 p-6 overflow-auto">
              <div className="max-w-7xl mx-auto">
                {activeTab === "dashboard" && <AdminDashboard />}
                {activeTab === "products" && <AdminProducts />}
                {activeTab === "categories" && <AdminCategories />}
                {activeTab === "orders" && <AdminOrders />}
                {activeTab === "settings" && <AdminSettings />}
              </div>
            </div>
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
};

export default Admin;