import React from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Search, Filter, ArrowUpDown } from "lucide-react";

interface Expense {
  id: string;
  date: string;
  category: string;
  amount: number;
  description: string;
}

interface ExpenseListProps {
  expenses?: Expense[];
  onSort?: (field: string) => void;
  onFilter?: (category: string) => void;
}

const defaultExpenses: Expense[] = [
  {
    id: "1",
    date: "2024-03-20",
    category: "Groceries",
    amount: 85.5,
    description: "Weekly grocery shopping",
  },
  {
    id: "2",
    date: "2024-03-19",
    category: "Entertainment",
    amount: 45.0,
    description: "Movie tickets",
  },
  {
    id: "3",
    date: "2024-03-18",
    category: "Utilities",
    amount: 120.75,
    description: "Electricity bill",
  },
];

const categoryColors: Record<string, string> = {
  Groceries: "bg-green-100 text-green-800",
  Entertainment: "bg-purple-100 text-purple-800",
  Utilities: "bg-blue-100 text-blue-800",
  Other: "bg-gray-100 text-gray-800",
};

const ExpenseList: React.FC<ExpenseListProps> = ({
  expenses = defaultExpenses,
  onSort = () => {},
  onFilter = () => {},
}) => {
  return (
    <div className="w-full p-6 space-y-4 bg-white">
      {/* Filters and Search Bar */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center flex-1 gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search expenses..." className="pl-10" />
          </div>
          <Select onValueChange={onFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="groceries">Groceries</SelectItem>
              <SelectItem value="entertainment">Entertainment</SelectItem>
              <SelectItem value="utilities">Utilities</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Expenses List */}
      <Card>
        <div className="divide-y divide-gray-200">
          {/* Header */}
          <div className="grid grid-cols-5 gap-4 p-4 bg-gray-50">
            <Button
              variant="ghost"
              className="flex items-center justify-start font-semibold"
              onClick={() => onSort("date")}
            >
              Date <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              className="flex items-center justify-start font-semibold"
              onClick={() => onSort("category")}
            >
              Category <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              className="flex items-center justify-start font-semibold col-span-2"
              onClick={() => onSort("description")}
            >
              Description <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              className="flex items-center justify-end font-semibold"
              onClick={() => onSort("amount")}
            >
              Amount <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Expense Items */}
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="grid grid-cols-5 gap-4 p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="text-sm text-gray-600">
                {new Date(expense.date).toLocaleDateString()}
              </div>
              <div>
                <Badge
                  className={
                    categoryColors[expense.category] || categoryColors.Other
                  }
                  variant="secondary"
                >
                  {expense.category}
                </Badge>
              </div>
              <div className="col-span-2 text-sm">{expense.description}</div>
              <div className="text-right font-medium">
                ${expense.amount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ExpenseList;
