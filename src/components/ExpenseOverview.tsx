import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { Progress } from "./ui/progress";

interface ExpenseSummary {
  title: string;
  amount: number;
  change: number;
  icon: React.ReactNode;
}

interface ExpenseOverviewProps {
  summaries?: ExpenseSummary[];
  monthlyBudget?: number;
  currentSpending?: number;
}

const defaultSummaries: ExpenseSummary[] = [
  {
    title: "Total Expenses",
    amount: 2345.67,
    change: 12.5,
    icon: <DollarSign className="w-4 h-4" />,
  },
  {
    title: "Monthly Average",
    amount: 1890.32,
    change: -5.2,
    icon: <TrendingUp className="w-4 h-4" />,
  },
  {
    title: "Predicted Next Month",
    amount: 2100.0,
    change: 8.3,
    icon: <AlertTriangle className="w-4 h-4" />,
  },
];

const ExpenseOverview: React.FC<ExpenseOverviewProps> = ({
  summaries = defaultSummaries,
  monthlyBudget = 3000,
  currentSpending = 2345.67,
}) => {
  const spendingPercentage = (currentSpending / monthlyBudget) * 100;

  return (
    <div className="w-full p-6 bg-background">
      <div className="grid gap-4 md:grid-cols-3">
        {summaries.map((summary, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {summary.title}
              </CardTitle>
              {summary.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${summary.amount.toFixed(2)}
              </div>
              <div className="flex items-center space-x-2">
                {summary.change > 0 ? (
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                )}
                <p
                  className={`text-sm ${summary.change > 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {Math.abs(summary.change)}%
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Monthly Budget Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Progress value={spendingPercentage} className="h-2" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${currentSpending.toFixed(2)} spent</span>
              <span>${monthlyBudget.toFixed(2)} budget</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseOverview;
