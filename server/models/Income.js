const { Schema, model } = require("mongoose");

const IncomeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    amount: {
      type: Number,
      required: true,
      trim: true,
      maxLength: 20,
    },
    type: {
      type: String,
      required: true,
      default: "income",
    },
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      maxLength: 80,
      trim: true,
    },
  },
  { timestamps: true },
);

IncomeSchema.index({ title: "text", category: "text", description: "text" });
IncomeSchema.index({ date: 1 });
IncomeSchema.index({ amount: 1 });

module.exports = model("Income", IncomeSchema);
