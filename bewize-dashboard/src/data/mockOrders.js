const mockOrders = [
  {
    id: 1,
    order_number: "ORD-001",
    customer_name: "John Doe",
    customer_email: "john@example.com",
    total_amount: 299.99,
    discount: 50.00,
    status: "Completed",
    payment_method: "Credit Card",
    date: "2024-03-15",
    items_count: 3,
    plan_type: "Year"
  },
  {
    id: 2,
    order_number: "ORD-002",
    customer_name: "Jane Smith",
    customer_email: "jane@example.com",
    total_amount: 149.50,
    discount: 0.00,
    status: "Processing",
    payment_method: "PayPal",
    date: "2024-03-14",
    items_count: 2,
    plan_type: "Month"
  },
  {
    id: 3,
    order_number: "ORD-003",
    customer_name: "Mike Johnson",
    customer_email: "mike@example.com",
    total_amount: 499.99,
    discount: 100.00,
    status: "Pending",
    payment_method: "Bank Transfer",
    date: "2024-03-13",
    items_count: 5,
    plan_type: "Semester"
  },
  {
    id: 4,
    order_number: "ORD-004",
    customer_name: "Sarah Wilson",
    customer_email: "sarah@example.com",
    total_amount: 199.99,
    discount: 25.00,
    status: "Completed",
    payment_method: "Credit Card",
    date: "2024-03-12",
    items_count: 1,
    plan_type: "Quarter"
  },
  {
    id: 5,
    order_number: "ORD-005",
    customer_name: "David Brown",
    customer_email: "david@example.com",
    total_amount: 349.99,
    discount: 0.00,
    status: "Cancelled",
    payment_method: "PayPal",
    date: "2024-03-11",
    items_count: 4,
    plan_type: "Year"
  }
];

export default mockOrders; 