import React, { useState } from "react";
import Metric from "../components/Metric";
import UsersStates from "../components/Charts/UsersStates";
import OrderTrends from "../components/Charts/OrderTrends";
import TopCustomers from "../components/Charts/TopCustomers";
import CategoriesStates from "../components/Charts/CategoriesStates";
import SubscriptionStates from "../components/Charts/SubscriptionStates";
import { faClipboardList, faShoppingCart, faTag, faUsers, } from "@fortawesome/free-solid-svg-icons";
import DashboardLayout from "../layouts/DashboardLayout";
import { subscriptionData, usersData } from "../data/chartData";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="metrics grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Metric
          title={"Total Utilisateurs"}
          icon={faUsers}
          data={837}
          percentage={0.4}
          className="h-48"
        />
        <Metric
          title={"Total Commandes"}
          icon={faShoppingCart}
          data={1358}
          percentage={0.1}
          className="h-48"
        />
        <Metric
          title={"Total Abonnements"}
          icon={faClipboardList}
          data={1400}
          percentage={-0.7}
          className="h-48"
        />
        <Metric
          title={"Total Remises"}
          icon={faTag}
          data={54879}
          percentage={-0.3}
          className="h-48"
        />
      </div>
      <div className="charts grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
        <UsersStates data={usersData} />
        <SubscriptionStates data={subscriptionData} />
      </div>
      {/* 
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <TopCustomers />
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4">
              <CategoriesStates />
            </div>
          </div>
          */}
      <div className="OrderTrends border rounded-lg shadow-sm my-4 bg-gray-50">
        <OrderTrends className="w-full"></OrderTrends>
      </div>
    </DashboardLayout>
  );
}
