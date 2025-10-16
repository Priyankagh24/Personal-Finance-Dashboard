import moment from "moment";

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (name) => {
  if (!name) return "";
  const words = name.split(" ");
  let initials = "";
  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }
  return initials.toUpperCase();
};

export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";
  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
};

// Prepare expense data for bar chart
export const prepareExpenseBarChartData = (data = []) => {
  return data.map((item) => ({
    category: item.category || item.source,
    amount: Number(item.amount),
  }));
};

// Prepare income chart data aggregated by month
export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
  const monthlyMap = {};
  sortedData.forEach((item) => {
    const month = moment(item.date).format("Do MMM");
    if (!monthlyMap[month]) monthlyMap[month] = 0;
    monthlyMap[month] += Number(item.amount) || 0;
  });
  return Object.entries(monthlyMap).map(([month, amount]) => ({ month, amount }));
};

// Prepare expense line chart data
export const prepareExpenseLineChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
  return sortedData.map((item) => ({
    month: moment(item.date).format("Do MMM"),
    amount: Number(item.amount),
    category: item.source || item.category,
  }));
};





