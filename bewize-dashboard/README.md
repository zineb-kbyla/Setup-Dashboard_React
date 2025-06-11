# Backend Data Requirements

#### Page: Dashboard
- `GET /api/dashboard/metrics`
  - Response:
    - `totalUsers` (**number**)
    - `totalOrders` (**number**)
    - `totalSubscriptions` (**number**)
    - `totalDiscounts` (**number**)
- `GET /api/dashboard/charts`
  - Response:
    - `usersData` (**array**)
    - `subscriptionData` (**array**)
    - `yearlyOrderStats` (**array**)

#### Page: Users
- `GET /api/users`
  - Query Parameters:
    - `page` (**number**)
    - `rowsPerPage` (**number**)
  - Response:
    - `users` (**array**)
      - `name` (**string**)
      - `email` (**string**)
      - `gender` (**string**)
      - `device_type` (**string**)
      - `level_id` (**number**)
    - `totalUsers` (**number**)

#### Page: Orders
- `GET /api/orders`
  - Response:
    - `orders` (**array**)
      - `orderId` (**string**)
      - `customerId` (**string**)
      - `status` (**string**)
      - `total` (**number**)
      - `date` (**string**)
      - `items` (**array**)

#### Page: Payments
- `GET /api/payments`
  - Response:
    - `payments` (**array**)
      - `paymentId` (**string**)
      - `orderId` (**string**)
      - `amount` (**number**)
      - `status` (**string**)
      - `date` (**string**)
      - `method` (**string**)

#### Page: Subscriptions
- `GET /api/subscriptions`
  - Response:
    - `subscriptions` (**array**)
      - `subscriptionId` (**string**)
      - `userId` (**string**)
      - `plan` (**string**)
      - `status` (**string**)
      - `startDate` (**string**)
      - `endDate` (**string**)
      - `renewalDate` (**string**)
- `PUT /api/subscriptions/:subscriptionId`
  - Request Body:
    - `plan` (**string**, optional)
    - `status` (**string**, optional)
    - `startDate` (**string**, optional)
    - `endDate` (**string**, optional)
  - Response:
    - `subscription` (**object**)
      - `subscriptionId` (**string**)
      - `userId` (**string**)
      - `plan` (**string**)
      - `status` (**string**)
      - `startDate` (**string**)
      - `endDate` (**string**)
      - `renewalDate` (**string**)
- `DELETE /api/subscriptions/:subscriptionId`
  - Response:
    - `success` (**boolean**)
    - `message` (**string**)

#### Page: Discounts
- `GET /api/discounts`
  - Response:
    - `discounts` (**array**)
      - `code` (**string**)
      - `type` (**string**)
      - `value` (**number**)
      - `startDate` (**string**)
      - `endDate` (**string**)
      - `usageLimit` (**number**)
      - `usageCount` (**number**)
      - `status` (**string**)
- `PUT /api/discounts/:code`
  - Request Body:
    - `type` (**string**, optional)
    - `value` (**number**, optional)
    - `startDate` (**string**, optional)
    - `endDate` (**string**, optional)
    - `usageLimit` (**number**, optional)
    - `status` (**string**, optional)
  - Response:
    - `discount` (**object**)
      - `code` (**string**)
      - `type` (**string**)
      - `value` (**number**)
      - `startDate` (**string**)
      - `endDate` (**string**)
      - `usageLimit` (**number**)
      - `usageCount` (**number**)
      - `status` (**string**)
- `DELETE /api/discounts/:code`
  - Response:
    - `success` (**boolean**)
    - `message` (**string**)