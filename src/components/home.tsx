import React from "react";
import DashboardHeader from "./DashboardHeader";
import ExpenseOverview from "./ExpenseOverview";
import ReceiptUploader from "./ReceiptUploader";
import ExpenseChart from "./ExpenseChart";
import ExpenseList from "./ExpenseList";
import AddExpenseButton from "./AddExpenseButton";

interface HomeProps {
  userName?: string;
  userAvatar?: string;
  expenses?: Array<{
    id: string;
    date: string;
    category: string;
    amount: number;
    description: string;
  }>;
  monthlyBudget?: number;
  currentSpending?: number;
}

const Home = ({
  userName = "John Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  expenses = [
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
  ],
  monthlyBudget = 3000,
  currentSpending = 2345.67,
}: HomeProps) => {
  const [isReceiptUploaderOpen, setIsReceiptUploaderOpen] =
    React.useState(false);

  const handleAddExpense = (expense: {
    amount: number;
    category: string;
    description: string;
  }) => {
    // Handle adding new expense
    console.log("Adding expense:", expense);
  };

  const handleUploadReceipt = (file: File) => {
    // Handle receipt upload
    console.log("Uploading receipt:", file);
    setIsReceiptUploaderOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader
        userName={userName}
        userAvatar={userAvatar}
        onSettingsClick={() => console.log("Settings clicked")}
        onNotificationsClick={() => console.log("Notifications clicked")}
        onProfileClick={() => console.log("Profile clicked")}
        onLogoutClick={() => console.log("Logout clicked")}
      />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <ExpenseOverview
          monthlyBudget={monthlyBudget}
          currentSpending={currentSpending}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ExpenseChart />
          <ExpenseList expenses={expenses} />
        </div>

        <ReceiptUploader
          isOpen={isReceiptUploaderOpen}
          onUpload={handleUploadReceipt}
        />

        <AddExpenseButton onAddExpense={handleAddExpense} />

        <button
          onClick={() => setIsReceiptUploaderOpen(true)}
          className="fixed bottom-24 right-6 bg-white h-14 w-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
        </button>
      </main>
    </div>
  );
};

export default Home;
