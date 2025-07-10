import React, { useMemo } from "react";
import Metric from "../components/Metric";
import UsersStates from "../components/Charts/UsersStates";
import OrderTrends from "../components/Charts/OrderTrends";
import TopCustomers from "../components/Charts/TopCustomers";
import CategoriesStates from "../components/Charts/CategoriesStates";
import SubscriptionStates from "../components/Charts/SubscriptionStates";
import { faClipboardList, faShoppingCart, faTag, faUsers } from "@fortawesome/free-solid-svg-icons";
import DashboardLayout from "../layouts/DashboardLayout";
import { subscriptionData, usersData , yearlyOrderStats, yearlySubscriptionStats } from "../data/chartData";

export default function Dashboard() {

  // Memoize Chart Data
  const memoizedUsersData = useMemo(() => usersData, []);
  const memoizedSubscriptionData = useMemo(() => subscriptionData, []);
  const memoizedOrdersData = useMemo(() => yearlyOrderStats , []);
  const memoizedYearlySubscriptionData = useMemo(() => yearlySubscriptionStats, []);

  const trendsData = useMemo(() => ({
    orders: memoizedOrdersData,
    subscriptions: memoizedYearlySubscriptionData,
  }), [memoizedOrdersData, memoizedYearlySubscriptionData]);

  return (
    <DashboardLayout>
      <div className="metrics grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4">
        <Metric
          title={"Total Utilisateurs"}
          icon={faUsers}
          data={837}
          percentage={0.4}
          className="h-48"
          index={0}
        />
        <Metric
          title={"Total Orders"}
          icon={faShoppingCart}
          data={1358}
          percentage={0.1}
          className="h-48"
          index={1}
        />
        <Metric
          title={"Total Abonnements"}
          icon={faClipboardList}
          data={1400}
          percentage={-0.7}
          className="h-48"
          index={2}
        />
      </div>

      <div className="charts grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
        <div className=" my-4">
          <UsersStates data={memoizedUsersData} />
        </div>
        <div className="my-4">
          <SubscriptionStates data={memoizedSubscriptionData} />
        </div>
      </div>

      <div className="OrderTrends border rounded-lg shadow-sm my-4 bg-gray-50">
        <OrderTrends data={trendsData}  className="w-full" />
      </div>
    </DashboardLayout>
  );
}
