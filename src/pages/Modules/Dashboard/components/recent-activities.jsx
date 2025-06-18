import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const RecentActivities = ({ title, activities, type, maxItems = 5 }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "users":
        return "👤";
      case "enterprises":
        return "🏢";
      case "employees":
        return "👷";
      case "products":
        return "📦";
      default:
        return "📋";
    }
  };

  const getActivityTitle = (activity, type) => {
    switch (type) {
      case "users":
        return activity.username || activity.email;
      case "enterprises":
        return activity.name;
      case "employees":
        return activity.name;
      case "products":
        return activity.name;
      default:
        return activity.name || activity.title;
    }
  };

  const getActivitySubtitle = (activity, type) => {
    switch (type) {
      case "users":
        return activity.email;
      case "enterprises":
        return activity.location || "No location";
      case "employees":
        return activity.department || "No department";
      case "products":
        return activity.category || "No category";
      default:
        return "";
    }
  };

  if (!activities || activities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">No recent activities</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.slice(0, maxItems).map((activity, index) => (
            <div
              key={activity.id || index}
              className="flex items-center space-x-4"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">
                  {getActivityIcon(type)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {getActivityTitle(activity, type)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {getActivitySubtitle(activity, type)}
                </p>
              </div>
              <div className="text-xs text-muted-foreground">
                {formatDate(activity.created_at)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
