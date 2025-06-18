import React from "react";
import {
  Users,
  Building2,
  UserCheck,
  Package,
  TrendingUp,
  Activity,
} from "lucide-react";
import { useGetDashboardDataQuery } from "./api/dashboard.api";
import StatsCard from "./components/stats-card";
import RecentActivities from "./components/recent-activities";
import useUserDetails from "@/hooks/useUserDetails";
import ModuleLayouts from "@/layouts/module";

const Dashboard = () => {
  const { data: dashboardData, isLoading, error } = useGetDashboardDataQuery();
  const { data: userDetails } = useUserDetails();

  if (isLoading) {
    return (
      <div className="px-4 py-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-4">
        <div className="text-center">
          <p className="text-muted-foreground">Failed to load dashboard data</p>
        </div>
      </div>
    );
  }

  const data = dashboardData?.data;
  const isAdmin = userDetails?.role_name === "Admin";

  return (
    <ModuleLayouts>
      <div className="px-4 py-4 space-y-6">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {userDetails?.username || "User"}!
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your{" "}
            {isAdmin ? "system" : "enterprise"} today.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {isAdmin ? (
            <>
              <StatsCard
                title="Total Users"
                value={data?.stats?.users || 0}
                icon={Users}
                description="Registered users"
              />
              <StatsCard
                title="Total Enterprises"
                value={data?.stats?.enterprises || 0}
                icon={Building2}
                description="Active enterprises"
              />
              <StatsCard
                title="Total Employees"
                value={data?.stats?.employees || 0}
                icon={UserCheck}
                description="Active employees"
              />
              <StatsCard
                title="Total Products"
                value={data?.stats?.products || 0}
                icon={Package}
                description="Available products"
              />
            </>
          ) : (
            <>
              <StatsCard
                title="Enterprise Users"
                value={data?.stats?.users || 0}
                icon={Users}
                description="Users in your enterprise"
              />
              <StatsCard
                title="Employees"
                value={data?.stats?.employees || 0}
                icon={UserCheck}
                description="Active employees"
              />
              <StatsCard
                title="Products"
                value={data?.stats?.products || 0}
                icon={Package}
                description="Your products"
              />
              <StatsCard
                title="Enterprise Status"
                value={data?.enterprise?.status || "N/A"}
                icon={Building2}
                description={data?.enterprise?.name || "No enterprise"}
              />
            </>
          )}
        </div>

        {/* Recent Activities */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {isAdmin ? (
            <>
              <RecentActivities
                title="Recent Users"
                activities={data?.recentActivities?.users || []}
                type="users"
              />
              <RecentActivities
                title="Recent Enterprises"
                activities={data?.recentActivities?.enterprises || []}
                type="enterprises"
              />
              <RecentActivities
                title="Recent Employees"
                activities={data?.recentActivities?.employees || []}
                type="employees"
              />
              <RecentActivities
                title="Recent Products"
                activities={data?.recentActivities?.products || []}
                type="products"
              />
            </>
          ) : (
            <>
              <RecentActivities
                title="Recent Employees"
                activities={data?.recentActivities?.employees || []}
                type="employees"
              />
              <RecentActivities
                title="Recent Products"
                activities={data?.recentActivities?.products || []}
                type="products"
              />
            </>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="p-4 border rounded-lg">
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span className="text-sm font-medium">Quick Actions</span>
            </div>
            <div className="mt-2 space-y-1">
              <p className="text-xs text-muted-foreground">
                Use the sidebar to navigate to different modules
              </p>
            </div>
          </div>
        </div>
      </div>
    </ModuleLayouts>
  );
};

export default Dashboard;
