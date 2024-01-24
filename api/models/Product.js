import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    brand: { type: String },
    model: { type: String },
    price: { type: Number, required: true },
    inStock: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Product', ProductSchema);
