import React from "react";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface ExpenseChartProps {
  data?: {
    month: string;
    amount: number;
    category: string;
  }[];
  categories?: string[];
}

const ExpenseChart = ({
  data = [
    { month: "Jan", amount: 1200, category: "Groceries" },
    { month: "Feb", amount: 1400, category: "Groceries" },
    { month: "Mar", amount: 1100, category: "Groceries" },
    { month: "Jan", amount: 800, category: "Entertainment" },
    { month: "Feb", amount: 600, category: "Entertainment" },
    { month: "Mar", amount: 900, category: "Entertainment" },
  ],
  categories = [
    "All Categories",
    "Groceries",
    "Entertainment",
    "Utilities",
    "Transport",
  ],
}: ExpenseChartProps) => {
  // Calculate max value for chart scaling
  const maxAmount = Math.max(...data.map((item) => item.amount));

  return (
    <Card className="w-full h-[400px] p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Expense Trends</h2>
        <div className="flex gap-4">
          <Select defaultValue="month">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="year">Year</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem
                  key={category}
                  value={category.toLowerCase().replace(" ", "-")}
                >
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="bar" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="bar">Bar Chart</TabsTrigger>
          <TabsTrigger value="line">Line Chart</TabsTrigger>
        </TabsList>

        <TabsContent value="bar" className="h-[280px]">
          <div className="relative h-full">
            <div className="absolute left-0 h-full flex flex-col justify-between text-sm text-gray-500">
              {[...Array(5)].map((_, i) => (
                <span key={i}>${Math.round((maxAmount * (4 - i)) / 4)}</span>
              ))}
            </div>
            <div className="ml-16 h-full flex items-end justify-around">
              {["Jan", "Feb", "Mar"].map((month) => (
                <div key={month} className="flex gap-2 w-20">
                  {categories.slice(1, 3).map((category) => {
                    const monthData = data.find(
                      (d) => d.month === month && d.category === category,
                    );
                    const height = monthData
                      ? (monthData.amount / maxAmount) * 100
                      : 0;
                    return (
                      <div
                        key={`${month}-${category}`}
                        className={`w-8 ${category === "Groceries" ? "bg-blue-500" : "bg-green-500"}`}
                        style={{ height: `${height}%` }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="ml-16 mt-2 flex justify-around text-sm text-gray-500">
              {["Jan", "Feb", "Mar"].map((month) => (
                <span key={month} className="w-20 text-center">
                  {month}
                </span>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="line" className="h-[280px]">
          <div className="flex items-center justify-center h-full text-gray-400">
            Line chart visualization would go here
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center gap-6 mt-4">
        {categories.slice(1, 3).map((category) => (
          <div key={category} className="flex items-center gap-2 mt-5">
            <div
              className={`w-3 h-3 rounded-full ${category === "Groceries" ? "bg-blue-500" : "bg-green-500"}`}
            />
            <span className="text-sm text-gray-600">{category}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ExpenseChart;
