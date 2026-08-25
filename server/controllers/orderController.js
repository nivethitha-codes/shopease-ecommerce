import Order from "../models/Order.js";

// @desc  Create new order
// @route POST /api/orders
export const addOrderItems = async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: "No order items" });
  }

  const order = new Order({
    orderItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
};

// @desc  Get logged in user's orders
// @route GET /api/orders/myorders
export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
};

// @desc  Get order by ID
// @route GET /api/orders/:id
export const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
};

// @desc  Update order to paid
// @route PUT /api/orders/:id/pay
export const updateOrderToPaid = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
};

// @desc  Get all orders (Admin)
// @route GET /api/orders
export const getOrders = async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
};

// @desc  Update order status/delivered (Admin)
// @route PUT /api/orders/:id/status
export const updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.status = req.body.status || order.status;
    if (req.body.status === "Delivered") {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    }
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
};