// models/Order.ts
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  orderNumber: { 
    type: String, 
    required: true, 
    unique: true 
  },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    name: String,
    quantity: Number,
    price: Number,
  }],
  totalAmount: { type: Number, required: true },
  shippingAddress: {
    fullName: String,
    address: String,
    city: String,
    province: String,
    postalCode: String,
    phone: String,
  },
  paymentMethod: { 
    type: String, 
    enum: ["paystack", "paypal", "stripe"], 
    required: true 
  },
  paymentReference: String,
  status: { 
    type: String, 
    enum: ["Processing", "Shipped", "Delivered", "Cancelled"], 
    default: "Processing" 
  },
}, { 
  timestamps: true 
});

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
export default Order;