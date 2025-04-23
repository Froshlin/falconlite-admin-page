import {
  UserInfo,
  Notification,
  Stat,
  TransactionDataPoint,
  UserSegmentation,
  TopPlatform,
  SummaryData,
  CardTransactionsData,
  NubanTransactionsData,
  NubanAccountsData,
  Transaction,
  AccountCard,
  Account,
  Card,
  CardCustomer,
  CardTransaction,
  CardDetails,
  CardFilter,
  CustomerFilter,
  TransactionFilter,
  FilterOptions,
  UnverifiedCustomer,
  PndCustomer,
  CustomerDetails
} from '@/types/types';

// I Created this Mock API so you will be able to integrate it well
export const fetchUserInfo = async (): Promise<UserInfo> => {
  // API call
  return { name: 'Jerry' };
};

export const fetchNotification = async (): Promise<Notification> => {
  return { message: 'Falconite just got 5 more users...' };
};

export const fetchStats = async (timeRange: string = 'today'): Promise<Stat[]> => {
  return [
    { image: '/round-chart.png', title: 'Transaction Volume', value: '678,904', change: '30%' },
    { image: '/cash-icon.png', title: 'Total Profits', value: '₦345,000', change: '38%' },
    { image: '/dollar-symbol.png', title: 'Transaction Value', value: '₦2,589,000', change: '38%' },
  ];
};

export const fetchNubanTransactionData = async (): Promise<TransactionDataPoint[]> => {
  return [
    { name: 'Jan', red: 1000, green: 500 },
    { name: 'Feb', red: 1500, green: 700 },
    { name: 'Mar', red: 1200, green: 800 },
    { name: 'Apr', red: 2972, green: 600 },
    { name: 'May', red: 2000, green: 2972 },
    { name: 'Jun', red: 1800, green: 1000 },
  ];
};

export const fetchUserSegmentation = async (): Promise<UserSegmentation[]> => {
  return [
    { name: 'Male', value: 65 },
    { name: 'Female', value: 35 },
  ];
};

export const fetchTopPlatforms = async (): Promise<TopPlatform[]> => {
  return [
    { name: 'Instagram', amount: '₦958,000', percentage: '69%', image: '/instagram.png' },
    { name: 'Netflix', amount: '₦298,000', percentage: '09%', image: '/netflix.png' },
    { name: 'Airbnb', amount: '₦298,000', percentage: '12%', image: '/airbnb.png' },
    { name: 'Netflix', amount: '₦298,000', percentage: '09%', image: '/netflix.png' },
  ];
};

export const fetchSummaryData = async (): Promise<SummaryData> => {
  return {
    transactionLimit: 7,
    amount: {
      value: "281.651k",
      formatted: "₦281,651.61",
      description: "(Two hundred and eighty two thousand six hundred and fifty one naira sixty one kobo)"
    },
    profit: {
      value: "281.651k",
      formatted: "₦281,651.61",
      description: "(Two hundred and eighty two thousand six hundred and fifty one naira sixty one kobo)"
    }
  };
};

export const fetchCardTransactionsData = async (): Promise<CardTransactionsData> => {
  return {
    categories: [
      {
        label: "All",
        count: 3,
        amount: "₦135,847.61",
        charge: "₦1,960.75",
        profit: "₦1,960.75"
      },
      {
        label: "All",
        count: 3,
        amount: "₦135,847.61",
        charge: "₦1,960.75",
        profit: "₦1,960.75"
      },
      {
        label: "All",
        count: 3,
        amount: "₦135,847.61",
        charge: "₦1,960.75",
        profit: "₦1,960.75"
      },
      {
        label: "All",
        count: 3,
        amount: "₦135,847.61",
        charge: "₦1,960.75",
        profit: "₦1,960.75"
      }
    ]
  };
};

export const fetchNubanTransactionsData = async (): Promise<NubanTransactionsData> => {
  return {
    categories: [
      {
        label: "All",
        count: 3,
        amount: "₦135,847.61",
        charge: "₦1,960.75",
        profit: "₦1,960.75"
      },
      {
        label: "Deposits",
        count: 3,
        amount: "₦135,847.61",
        charge: "₦1,960.75",
        profit: "₦1,960.75"
      },
      {
        label: "Payouts",
        count: 3,
        amount: "₦135,847.61",
        charge: "₦1,960.75",
        profit: "₦1,960.75"
      }
    ]
  };
};

export const fetchNubanAccountsData = async (): Promise<NubanAccountsData> => {
  return {
    accounts: 956,
    balance: "₦208,754.74"
  };
};

export const fetchTransactions = async (timeRange: string = 'today'): Promise<Transaction[]> => {
  return [
    { id: "1", image: "/table-image.png", transaction: "Card Topup", amount: "₦30,000", date: "08/04/25 4:30pm", customer: "Onos Emeka", type: "CREDIT", channel: "Card Topup", status: "SUCCESSFUL", },
    { id: "2", image: "/table-image.png", transaction: "Card Topup", amount: "₦30,000", date: "08/04/25 4:30pm", customer: "Onos Emeka", type: "CREDIT", channel: "Card Topup", status: "SUCCESSFUL", },
    { id: "3", image: "/table-image.png", transaction: "Card Topup", amount: "₦30,000", date: "08/04/25 4:30pm", customer: "Onos Emeka", type: "CREDIT", channel: "Card Topup", status: "SUCCESSFUL", },
    { id: "4", image: "/table-image.png", transaction: "Card Topup", amount: "₦30,000", date: "08/04/25 4:30pm", customer: "Onos Emeka", type: "CREDIT", channel: "Card Topup", status: "FAILED", },
    { id: "5", image: "/table-image.png", transaction: "Card Topup", amount: "₦30,000", date: "08/04/25 4:30pm", customer: "Onos Emeka", type: "CREDIT", channel: "Card Topup", status: "FAILED", },
    { id: "6", image: "/table-image.png", transaction: "Card Topup", amount: "₦30,000", date: "08/04/25 4:30pm", customer: "Onos Emeka", type: "CREDIT", channel: "Card Topup", status: "PENDING", },
    { id: "7", image: "/table-image.png", transaction: "Card Topup", amount: "₦30,000", date: "08/04/25 4:30pm", customer: "Onos Emeka", type: "CREDIT", channel: "Card Top", status: "SUCCESSFUL", },
    { id: "8", image: "/table-image.png", transaction: "Card Topup", amount: "₦30,000", date: "08/04/25 4:30pm", customer: "Onos Emeka", type: "CREDIT", channel: "Card Topup", status: "PENDING", },
    { id: "9", image: "/table-image.png", transaction: "Card Topup", amount: "₦30,000", date: "08/04/25 4:30pm", customer: "Onos Emeka", type: "CREDIT", channel: "Card Topup", status: "PENDING", },
    { id: "10", image: "/table-image.png", transaction: "Card Topup", amount: "₦30,000", date: "08/04/25 4:30pm", customer: "Onos Emeka", type: "CREDIT", channel: "Card Topup", status: "PENDING", },
    { id: "11", image: "/table-image.png", transaction: "Card Topup", amount: "₦30,000", date: "08/04/25 4:30pm", customer: "Onos Emeka", type: "CREDIT", channel: "Card Topup", status: "FAILED", },
    { id: "12", image: "/table-image.png", transaction: "Card Topup", amount: "₦30,000", date: "08/04/25 4:30pm", customer: "Onos Emeka", type: "CREDIT", channel: "Card Topup", status: "SUCCESSFUL", },
    { id: "13", image: "/table-image.png", transaction: "Card Topup", amount: "₦30,000", date: "08/04/25 4:30pm", customer: "Onos Emeka", type: "CREDIT", channel: "Card Topup", status: "SUCCESSFUL", },
    { id: "14", image: "/table-image.png", transaction: "Card Topup", amount: "₦30,000", date: "08/04/25 4:30pm", customer: "Onos Emeka", type: "CREDIT", channel: "Card Topup", status: "SUCCESSFUL", },
    { id: "15", image: "/table-image.png", transaction: "Card Topup", amount: "₦30,000", date: "08/04/25 4:30pm", customer: "Onos Emeka", type: "CREDIT", channel: "Card Topup", status: "SUCCESSFUL", },
  ];
};

export const fetchAccountCards = async (currency: string): Promise<AccountCard[]> => {
  if (currency === 'NGN') {
    return [
      { title: "Transaction Volume", value: "₦7,678,904", change: "30%", currency: "NGN", icon: "/volume-icon.png" },
      { title: "NGN Balance", value: "₦678,904", change: "30%", currency: "NGN", icon: "/balance-icon.png" },
      { title: "No of Transactions", value: "1,904", change: "30%", currency: "NGN", icon: "/transactions-icon.png" },
      { title: "NGN Profit", value: "₦374,744", change: "30%", currency: "NGN", icon: "/profit-icon.png" },
    ];
  }

  if (currency === 'USD') {
    return [
      { title: "Transaction Volume", value: "$7,678,904", change: "30%", currency: "USD", icon: "/volume-icon.png" },
      { title: "USD Balance", value: "$678,904", change: "30%", currency: "USD", icon: "/balance-icon.png" },
      { title: "No of Transactions", value: "1,904", change: "30%", currency: "USD", icon: "/transactions-icon.png" },
      { title: "USD Profit", value: "$374,744", change: "30%", currency: "USD", icon: "/profit-icon.png" },
    ];
  }
  if (currency === 'EUR') {
    return [
      { title: "Transaction Volume", value: "€7,678,904", change: "30%", currency: "EUR", icon: "/volume-icon.png" },
      { title: "EUR Balance", value: "€678,904", change: "30%", currency: "EUR", icon: "/balance-icon.png" },
      { title: "No of Transactions", value: "1,904", change: "30%", currency: "EUR", icon: "/transactions-icon.png" },
      { title: "EUR Profit", value: "€374,744", change: "30%", currency: "EUR", icon: "/profit-icon.png" },
    ];
  }
  if (currency === 'GBP') {
    return [
      { title: "Transaction Volume", value: "£7,678,904", change: "30%", currency: "GBP", icon: "/volume-icon.png" },
      { title: "GBP Balance", value: "£678,904", change: "30%", currency: "GBP", icon: "/balance-icon.png" },
      { title: "No of Transactions", value: "1,904", change: "30%", currency: "GBP", icon: "/transactions-icon.png" },
      { title: "GBP Profit", value: "£374,744", change: "30%", currency: "GBP", icon: "/profit-icon.png" },
    ];
  }
  return [];
};

export const fetchAccounts = async (currency: string): Promise<Account[]> => {
  const baseAccounts = [
    { id: "1", accountId: "1762562gwcvF5D36hgg-ACCS", accountName: "Onos Emeka", accountNumber: "701 - 451 - 4834", bankName: "9 Payments", date: "08/04/25 4:30pm" },
    { id: "2", accountId: "1762562gwcvF5D36hgg-ACCS", accountName: "Onos Emeka", accountNumber: "701 - 451 - 4834", bankName: "9 Payments", date: "08/04/25 4:30pm" },
    { id: "3", accountId: "1762562gwcvF5D36hgg-ACCS", accountName: "Onos Emeka", accountNumber: "701 - 451 - 4834", bankName: "9 Payments", date: "08/04/25 4:30pm" },
    { id: "4", accountId: "1762562gwcvF5D36hgg-ACCS", accountName: "Onos Emeka", accountNumber: "701 - 451 - 4834", bankName: "9 Payments", date: "08/04/25 4:30pm" },
    { id: "5", accountId: "1762562gwcvF5D36hgg-ACCS", accountName: "Onos Emeka", accountNumber: "701 - 451 - 4834", bankName: "9 Payments", date: "08/04/25 4:30pm" },
  ];
  return baseAccounts;
};

export const fetchCardStats = async (timeRange: string = 'today'): Promise<Stat[]> => {
  return [
      { image: '/card-volume-icon.png', title: 'Total Card Transaction', value: '638' },
      { image: '/success-icon.png', title: 'Successful Transactions', value: '635' },
      { image: '/failed-icon.png', title: 'Failed Transactions', value: '3' },
  ];
};

export const fetchCards = async (filter: CardFilter = {}): Promise<Card[]> => {
  let cards = [
      { id: "1", cardId: "hvaf4e-42bhb522-bibib-ei773c", balance: "$780,000.67", date: "08/04/25 4:30pm", cardBrand: "mastercard.png", cardType: "LodgeCard", cardNumber: "5242.......6141", status: "Active", fullCardNumber: "52426141" },
      { id: "2", cardId: "hvaf4e-42bhb522-bibib-ei773c", balance: "$780,000.67", date: "08/04/25 4:30pm", cardBrand: "visa.png", cardType: "LodgeCard", cardNumber: "5242.......6141", status: "Active", fullCardNumber: "52426141" },
      { id: "3", cardId: "hvaf4e-42bhb522-bibib-ei773c", balance: "$780,000.67", date: "08/04/25 4:30pm", cardBrand: "visa.png", cardType: "LodgeCard", cardNumber: "5242.......6141", status: "Terminated", fullCardNumber: "52426141" },
      { id: "4", cardId: "hvaf4e-42bhb522-bibib-ei773c", balance: "$780,000.67", date: "08/04/25 4:30pm", cardBrand: "mastercard.png", cardType: "LodgeCard", cardNumber: "5242.......6141", status: "Active", fullCardNumber: "52426141" },
      { id: "5", cardId: "hvaf4e-42bhb522-bibib-ei773c", balance: "$780,000.67", date: "08/04/25 4:30pm", cardBrand: "visa.png", cardType: "LodgeCard", cardNumber: "5242.......6141", status: "Active", fullCardNumber: "52426141" },
      { id: "6", cardId: "hvaf4e-42bhb522-bibib-ei773c", balance: "$780,000.67", date: "08/04/25 4:30pm", cardBrand: "mastercard.png", cardType: "LodgeCard", cardNumber: "5242.......6141", status: "Active", fullCardNumber: "52426141" },
      { id: "7", cardId: "hvaf4e-42bhb522-bibib-ei773c", balance: "$780,000.67", date: "08/04/25 4:30pm", cardBrand: "visa.png", cardType: "LodgeCard", cardNumber: "5242.......6141", status: "Active", fullCardNumber: "52426141" },
  ];

  // Apply filters
  if (filter.dateRange) {
    let dateThreshold: Date;
    const now = new Date("2025-04-18");
    switch (filter.dateRange) {
      case "last-week":
        dateThreshold = new Date(now.setDate(now.getDate() - 7));
        break;
      case "last-month":
        dateThreshold = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case "last-2-month":
        dateThreshold = new Date(now.setMonth(now.getMonth() - 2));
        break;
      case "last-3-month":
        dateThreshold = new Date(now.setMonth(now.getMonth() - 3));
        break;
      default:
        dateThreshold = new Date("1970-01-01");
    }
    cards = cards.filter(card => {
      const cardDate = new Date(card.date);
      return cardDate >= dateThreshold;
    });
  }

  if (filter.startDate && filter.endDate) {
    const start = new Date(filter.startDate);
    const end = new Date(filter.endDate);
    cards = cards.filter(card => {
      const cardDate = new Date(card.date);
      return cardDate >= start && cardDate <= end;
    });
  }

  if (filter.cardId) {
    cards = cards.filter(card => filter.cardId && card.cardId.toLowerCase().includes(filter.cardId.toLowerCase()));
  }

  if (filter.currencyType) {
    cards = cards.filter(card => card.balance.startsWith(
      filter.currencyType === "USD" ? "$" :
      filter.currencyType === "NGN" ? "₦" :
      filter.currencyType === "EUR" ? "€" : "£"
    ));
  }

  if (filter.transactionType) {
    
  }

  return cards;
};

export const fetchCardCustomers = async (timeRange: string = 'today', filter: CustomerFilter = {}): Promise<CardCustomer[]> => {
  let customers = [
      { id: "1", image:"", customerName: "Onos Emeka", country: "US", phoneNo: "070527257", status: "Active" },
      { id: "2", image:"", customerName: "Jane Doe", country: "UK", phoneNo: "070527258", status: "Active" },
      { id: "3", image:"", customerName: "John Smith", country: "CA", phoneNo: "070527259", status: "Inactive" },
      { id: "4", image:"", customerName: "Alice Brown", country: "AU", phoneNo: "070527260", status: "Active" },
      { id: "5", image:"", customerName: "Bob Johnson", country: "US", phoneNo: "070527261", status: "Active" },
      { id: "6", image:"", customerName: "Emma Wilson", country: "UK", phoneNo: "070527262", status: "Inactive" },
      { id: "7", image:"", customerName: "Michael Lee", country: "CA", phoneNo: "070527263", status: "Active" },
  ];

  // Apply timeRange filter
  if (timeRange) {
    let dateThreshold: Date;
    const now = new Date("2025-04-18");
    switch (timeRange) {
      case "yesterday":
        dateThreshold = new Date(now.setDate(now.getDate() - 1));
        break;
      case "today":
        dateThreshold = new Date(now.setDate(now.getDate()));
        break;
      case "this-week":
        dateThreshold = new Date(now.setDate(now.getDate() - 7));
        break;
      case "this-month":
        dateThreshold = new Date(now.setMonth(now.getMonth() - 1));
        break;
      default:
        dateThreshold = new Date("1970-01-01");
    }
    
  }

  // Apply modal filters
  if (filter.dateRange) {
    let dateThreshold: Date;
    const now = new Date("2025-04-18");
    switch (filter.dateRange) {
      case "last-week":
        dateThreshold = new Date(now.setDate(now.getDate() - 7));
        break;
      case "last-month":
        dateThreshold = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case "last-2-month":
        dateThreshold = new Date(now.setMonth(now.getMonth() - 2));
        break;
      case "last-3-month":
        dateThreshold = new Date(now.setMonth(now.getMonth() - 3));
        break;
      default:
        dateThreshold = new Date("1970-01-01");
    }
    
  }

  if (filter.startDate && filter.endDate) {
    const start = new Date(filter.startDate);
    const end = new Date(filter.endDate);
    
  }

  if (filter.firstName) {
    customers = customers.filter(customer =>
      filter.firstName && customer.customerName.toLowerCase().split(' ')[0].includes(filter.firstName.toLowerCase())
    );
  }

  if (filter.lastName) {
    customers = customers.filter(customer =>
      customer.customerName.toLowerCase().split(' ').slice(-1)[0].includes((filter.lastName ?? '').toLowerCase())
    );
  }

  if (filter.email) {
    
  }

  return customers;
};

const parseCustomDate = (dateStr: string): Date => {
  const [datePart, timePart] = dateStr.split(' ');
  const [month, day, year] = datePart.split('/').map(Number);
  const [hourMinute, period] = timePart.match(/(\d+:\d+)(am|pm)/i)!.slice(1);
  let [hour, minute] = hourMinute.split(':').map(Number);

  // Adjust hour for AM/PM
  if (period.toLowerCase() === 'pm' && hour !== 12) {
    hour += 12;
  } else if (period.toLowerCase() === 'am' && hour === 12) {
    hour = 0;
  }

  const fullYear = year < 100 ? 2000 + year : year;

  return new Date(fullYear, month - 1, day, hour, minute);
};

export const fetchCardTransactions = async (timeRange: string = 'today', filter: TransactionFilter = {}): Promise<CardTransaction[]> => {
  let transactions = [
      { id: "1", cardId: "wt788-a72-zv762-gbv2", merchantId: "HUUTAHGCSK", merchantName: "OPENAI", maskedPan: "5242.......6141", amount: "$755", currency: "USD", date: "04/18/25 4:30pm", status: "SUCCESSFUL", fullPan: "52426141" },
      { id: "2", cardId: "wt788-a72-zv762-gbv2", merchantId: "HUUTAHGCSK", merchantName: "OPENAI", maskedPan: "5242.......6141", amount: "$755", currency: "USD", date: "04/18/25 4:30pm", status: "SUCCESSFUL", fullPan: "52426141" },
      { id: "3", cardId: "wt788-a72-zv762-gbv2", merchantId: "HUUTAHGCSK", merchantName: "OPENAI", maskedPan: "5242.......6141", amount: "$755", currency: "USD", date: "04/18/25 4:30pm", status: "SUCCESSFUL", fullPan: "52426141" },
      { id: "4", cardId: "wt788-a72-zv762-gbv2", merchantId: "HUUTAHGCSK", merchantName: "OPENAI", maskedPan: "5242.......6141", amount: "$755", currency: "USD", date: "04/18/25 4:30pm", status: "SUCCESSFUL", fullPan: "52426141" },
      { id: "5", cardId: "wt788-a72-zv762-gbv2", merchantId: "HUUTAHGCSK", merchantName: "OPENAI", maskedPan: "5242.......6141", amount: "-$755", currency: "USD", date: "04/17/25 4:30pm", status: "FAILED", fullPan: "52426141" },
  ];

  // Apply timeRange filter
  if (timeRange) {
    let dateThreshold: Date;
    const now = new Date("2025-04-18");
    switch (timeRange) {
      case "yesterday":
        dateThreshold = new Date(now.setDate(now.getDate() - 1));
        break;
      case "today":
        dateThreshold = new Date(now.setDate(now.getDate()));
        break;
      case "this-week":
        dateThreshold = new Date(now.setDate(now.getDate() - 7));
        break;
      case "this-month":
        dateThreshold = new Date(now.setMonth(now.getMonth() - 1));
        break;
      default:
        dateThreshold = new Date("1970-01-01");
    }
    dateThreshold.setHours(0, 0, 0, 0);
    transactions = transactions.filter(transaction => {
      const transactionDate = parseCustomDate(transaction.date);
      transactionDate.setHours(0, 0, 0, 0);
      return transactionDate >= dateThreshold;
    });
  }

  // Apply modal filters
  if (filter.dateRange) {
    let dateThreshold: Date;
    const now = new Date("2025-04-18");
    switch (filter.dateRange) {
      case "last-week":
        dateThreshold = new Date(now.setDate(now.getDate() - 7));
        break;
      case "last-month":
        dateThreshold = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case "last-2-month":
        dateThreshold = new Date(now.setMonth(now.getMonth() - 2));
        break;
      case "last-3-month":
        dateThreshold = new Date(now.setMonth(now.getMonth() - 3));
        break;
      default:
        dateThreshold = new Date("1970-01-01");
    }
    dateThreshold.setHours(0, 0, 0, 0);
    transactions = transactions.filter(transaction => {
      const transactionDate = parseCustomDate(transaction.date);
      transactionDate.setHours(0, 0, 0, 0);
      return transactionDate >= dateThreshold;
    });
  }

  if (filter.startDate && filter.endDate) {
    const start = new Date(filter.startDate);
    const end = new Date(filter.endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    transactions = transactions.filter(transaction => {
      const transactionDate = parseCustomDate(transaction.date);
      return transactionDate >= start && transactionDate <= end;
    });
  }

  if (filter.cardId) {
    transactions = transactions.filter(transaction =>
      filter.cardId && transaction.cardId.toLowerCase().includes(filter.cardId.toLowerCase())
    );
  }

  if (filter.currencyType) {
    transactions = transactions.filter(transaction =>
      transaction.currency === filter.currencyType
    );
  }

  if (filter.status) {
    transactions = transactions.filter(transaction =>
      filter.status && transaction.status.toLowerCase() === filter.status.toLowerCase()
    );
  }

  if (filter.negativeBalance) {
    transactions = transactions.filter(transaction =>
      filter.negativeBalance === "Yes" ? transaction.amount.startsWith("-") : !transaction.amount.startsWith("-")
    );
  }

  return transactions;
};

export const fetchCardNotification = async (): Promise<Notification> => {
  return { message: 'Dennis just created a dollar card' };
};

export const fetchCustomerNotification = async (): Promise<Notification> => {
  return { message: 'Dennis just signed up' };
};

export const fetchCardDetails = async (cardId: string): Promise<CardDetails> => {
  return {
    amountLimit: "$780,000",
    availableBalance: "$537,000",
    usageLimit: "-",
    status: "Active",
    expiration: "0876",
    expirationDate: "09/04/28",
    cardType: "LodgeCard",
    cardBrand: "MasterCard",
    physical: "No",
    dateCreated: "09/04/28",
    purchaseType: "99",
    cardClass: "CommercialCredit",
    maskedPan: "556537******5127",
    sequenceNumber: "-",
    cardId: "77412751AJ-W6IG-23ACS",
    cardGuid: "456fshqwq-t23v63t-its",
    lifetimeWindow: "-",
    orderNumber: "FFT753-526v7d78-23vdcwe2",
    cancelled: "No",
    cancelledDate: "-",
    terminated: "No",
    terminatedDate: "-",
    blockedBy: "-",
    deactivationDate: "-",
    midWhitelist: "-",
    customerBlacklist: "qwt7238gyql-zuf7d0-a5zu78",
  };
};

export const fetchTransactionsByCardId = async (cardId: string): Promise<CardTransaction[]> => {
  return [
    { id: "1", cardId: "hvaf4e-42bhb522-bibib-ei773c", merchantId: "HUUTAHGCSK", merchantName: "OPENAI", maskedPan: "5242.......6141", amount: "$755", currency: "USD", date: "08/04/25 4:30pm", status: "SUCCESSFUL", fullPan: "52426141" },
    { id: "2", cardId: "hvaf4e-42bhb522-bibib-ei773c", merchantId: "HUUTAHGCSK", merchantName: "OPENAI", maskedPan: "5242.......6141", amount: "$755", currency: "USD", date: "08/04/25 4:30pm", status: "SUCCESSFUL", fullPan: "52426141" },
    { id: "3", cardId: "hvaf4e-42bhb522-bibib-ei773c", merchantId: "HUUTAHGCSK", merchantName: "OPENAI", maskedPan: "5242.......6141", amount: "$755", currency: "USD", date: "08/04/25 4:30pm", status: "SUCCESSFUL", fullPan: "52426141" },
    { id: "4", cardId: "hvaf4e-42bhb522-bibib-ei773c", merchantId: "HUUTAHGCSK", merchantName: "OPENAI", maskedPan: "5242.......6141", amount: "$755", currency: "USD", date: "08/04/25 4:30pm", status: "SUCCESSFUL", fullPan: "52426141" },
    { id: "5", cardId: "hvaf4e-42bhb522-bibib-ei773c", merchantId: "HUUTAHGCSK", merchantName: "OPENAI", maskedPan: "5242.......6141", amount: "$755", currency: "USD", date: "08/04/25 4:30pm", status: "SUCCESSFUL", fullPan: "52426141" },
    { id: "6", cardId: "hvaf4e-42bhb522-bibib-ei773c", merchantId: "HUUTAHGCSK", merchantName: "OPENAI", maskedPan: "5242.......6141", amount: "$755", currency: "USD", date: "08/04/25 4:30pm", status: "SUCCESSFUL", fullPan: "52426141" },
    { id: "7", cardId: "hvaf4e-42bhb522-bibib-ei773c", merchantId: "HUUTAHGCSK", merchantName: "OPENAI", maskedPan: "5242.......6141", amount: "$755", currency: "USD", date: "08/04/25 4:30pm", status: "SUCCESSFUL", fullPan: "52426141" },
  ];
};

export const deleteCard = async (cardId: string): Promise<void> => {
  console.log(`Card with ID ${cardId} deleted successfully`);
};

export const fetchFilterOptions = async (): Promise<FilterOptions> => {
  return {
    currencyTypes: ["USD", "NGN", "EUR", "GBP"],
    transactionTypes: ["CREDIT", "DEBIT"]
  };
};


export const fetchVerifiedCustomers = async (timeRange: string = 'today', filter: CustomerFilter = {}): Promise<CardCustomer[]> => {
  const baseCustomers = [
    {
      id: "1",
      image: "/customer-image.png",
      customerName: "Onos Emeka",
      country: "US",
      phoneNo: "070527257",
      status: "SUCCESSFUL",
      role: "User",
      age: 30,
      gender: "M",
      date: "04/18/25 4:30pm",
      email: "onos.emeka@example.com",
    },
    {
      id: "2",
      image: "/customer-image.png",
      customerName: "Jane Doe",
      country: "UK",
      phoneNo: "070527258",
      status: "SUCCESSFUL",
      role: "Admin",
      age: 28,
      gender: "F",
      date: "04/18/25 4:30pm",
      email: "jane.doe@example.com",
    },
    {
      id: "3",
      image: "/customer-image.png",
      customerName: "John Smith",
      country: "CA",
      phoneNo: "070527259",
      status: "FAILED",
      role: "User",
      age: 35,
      gender: "M",
      date: "04/18/25 4:30pm",
      email: "john.smith@example.com",
    },
  ];

  // Generated 57 customers based on the base customers
  let customers: CardCustomer[] = [];
  for (let i = 0; i < 57; i++) {
    const baseCustomer = baseCustomers[i % baseCustomers.length];
    customers.push({
      ...baseCustomer,
      id: (i + 1).toString(),
      phoneNo: `0705272${57 + i}`,
      gender: i % 2 === 0 ? "M" : "F",
      age: baseCustomer.age + (i % 5),
    });
  }

  // Apply timeRange filter
  if (timeRange) {
    let dateThreshold: Date;
    const now = new Date("2025-04-18");
    switch (timeRange) {
      case "yesterday":
        dateThreshold = new Date(now.setDate(now.getDate() - 1));
        break;
      case "today":
        dateThreshold = new Date(now.setDate(now.getDate()));
        break;
      case "this-week":
        dateThreshold = new Date(now.setDate(now.getDate() - 7));
        break;
      case "this-month":
        dateThreshold = new Date(now.setMonth(now.getMonth() - 1));
        break;
      default:
        dateThreshold = new Date("1970-01-01");
    }
    dateThreshold.setHours(0, 0, 0, 0);
    customers = customers.filter(customer => {
      if (!customer.date) return true;
      const customerDate = parseCustomDate(customer.date);
      customerDate.setHours(0, 0, 0, 0);
      return customerDate >= dateThreshold;
    });
  }

  // Apply modal filters
  if (filter.dateRange) {
    let dateThreshold: Date;
    const now = new Date("2025-04-18");
    switch (filter.dateRange) {
      case "last-week":
        dateThreshold = new Date(now.setDate(now.getDate() - 7));
        break;
      case "last-month":
        dateThreshold = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case "last-2-month":
        dateThreshold = new Date(now.setMonth(now.getMonth() - 2));
        break;
      case "last-3-month":
        dateThreshold = new Date(now.setMonth(now.getMonth() - 3));
        break;
      default:
        dateThreshold = new Date("1970-01-01");
    }
    dateThreshold.setHours(0, 0, 0, 0);
    customers = customers.filter(customer => {
      if (!customer.date) return true;
      const customerDate = parseCustomDate(customer.date);
      customerDate.setHours(0, 0, 0, 0);
      return customerDate >= dateThreshold;
    });
  }

  if (filter.startDate && filter.endDate) {
    const start = new Date(filter.startDate);
    const end = new Date(filter.endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    customers = customers.filter(customer => {
      if (!customer.date) return true;
      const customerDate = parseCustomDate(customer.date);
      return customerDate >= start && customerDate <= end;
    });
  }

  if (filter.firstName) {
    customers = customers.filter(customer =>
      filter.firstName && customer.customerName.toLowerCase().split(' ')[0].includes(filter.firstName.toLowerCase())
    );
  }

  if (filter.lastName) {
    customers = customers.filter(customer =>
      customer.customerName.toLowerCase().split(' ').slice(-1)[0].includes((filter.lastName ?? '').toLowerCase())
    );
  }

  if (filter.email) {
    customers = customers.filter(customer =>
      customer.email?.toLowerCase().includes(filter.email!.toLowerCase()) || false
    );
  }

  return customers;
};

export const fetchUnverifiedCustomers = async (timeRange: string = 'today', filter: CustomerFilter = {}): Promise<UnverifiedCustomer[]> => {
  const baseCustomers = [
    {
      id: "ID-497VURGF-55H9F-5F5B8F9BSYF",
      email: "onueemeka@gmail.com",
      date: "08/04/25 4:30pm",
    },
    {
      id: "ID-497VURGF-55H9F-5F5B8F9BSYG",
      email: "jane.doe@gmail.com",
      date: "08/04/25 4:30pm",
    },
    {
      id: "ID-497VURGF-55H9F-5F5B8F9BSYH",
      email: "john.smith@gmail.com",
      date: "08/04/25 4:30pm",
    },
  ];

  // Generate 112 customers by repeating the base customers
  let customers: UnverifiedCustomer[] = [];
  for (let i = 0; i < 112; i++) {
    const baseCustomer = baseCustomers[i % baseCustomers.length];
    customers.push({
      ...baseCustomer,
      id: `ID-497VURGF-55H9F-5F5B8F9BSY${String.fromCharCode(70 + i)}`,
    });
  }

  // Apply timeRange filter
  if (timeRange) {
    let dateThreshold: Date;
    const now = new Date("2025-04-18");
    switch (timeRange) {
      case "yesterday":
        dateThreshold = new Date(now.setDate(now.getDate() - 1));
        break;
      case "today":
        dateThreshold = new Date(now.setDate(now.getDate()));
        break;
      case "this-week":
        dateThreshold = new Date(now.setDate(now.getDate() - 7));
        break;
      case "this-month":
        dateThreshold = new Date(now.setMonth(now.getMonth() - 1));
        break;
      default:
        dateThreshold = new Date("1970-01-01");
    }
    dateThreshold.setHours(0, 0, 0, 0);
    customers = customers.filter(customer => {
      if (!customer.date) return true;
      const customerDate = parseCustomDate(customer.date);
      customerDate.setHours(0, 0, 0, 0);
      return customerDate >= dateThreshold;
    });
  }

  // Apply modal filters
  if (filter.dateRange) {
    let dateThreshold: Date;
    const now = new Date("2025-04-18");
    switch (filter.dateRange) {
      case "last-week":
        dateThreshold = new Date(now.setDate(now.getDate() - 7));
        break;
      case "last-month":
        dateThreshold = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case "last-2-month":
        dateThreshold = new Date(now.setMonth(now.getMonth() - 2));
        break;
      case "last-3-month":
        dateThreshold = new Date(now.setMonth(now.getMonth() - 3));
        break;
      default:
        dateThreshold = new Date("1970-01-01");
    }
    dateThreshold.setHours(0, 0, 0, 0);
    customers = customers.filter(customer => {
      if (!customer.date) return true;
      const customerDate = parseCustomDate(customer.date);
      customerDate.setHours(0, 0, 0, 0);
      return customerDate >= dateThreshold;
    });
  }

  if (filter.startDate && filter.endDate) {
    const start = new Date(filter.startDate);
    const end = new Date(filter.endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    customers = customers.filter(customer => {
      if (!customer.date) return true;
      const customerDate = parseCustomDate(customer.date);
      return customerDate >= start && customerDate <= end;
    });
  }

  if (filter.email) {
    customers = customers.filter(customer =>
      customer.email?.toLowerCase().includes(filter.email!.toLowerCase()) || false
    );
  }

  return customers;
};

export const fetchUnverifiedCustomerNotification = async (): Promise<Notification> => {
  return { message: 'Dennis just created an account' };
};

export const fetchPndCustomers = async (timeRange: string = 'today', filter: CustomerFilter = {}): Promise<PndCustomer[]> => {
  const baseCustomers = [
    {
      id: "ID-497VURGF-55H9F-5F5B8F9BSYF",
      email: "onueemeka@gmail.com",
      date: "08/04/25 4:30pm",
    },
  ];

  let customers: PndCustomer[] = [];
  for (let i = 0; i < 7; i++) {
    const baseCustomer = baseCustomers[0];
    customers.push({
      ...baseCustomer,
      id: `ID-497VURGF-55H9F-5F5B8F9BSY${String.fromCharCode(70 + i)}`,
    });
  }

  // Apply timeRange filter
  if (timeRange) {
    let dateThreshold: Date;
    const now = new Date("2025-04-18");
    switch (timeRange) {
      case "yesterday":
        dateThreshold = new Date(now.setDate(now.getDate() - 1));
        break;
      case "today":
        dateThreshold = new Date(now.setDate(now.getDate()));
        break;
      case "this-week":
        dateThreshold = new Date(now.setDate(now.getDate() - 7));
        break;
      case "this-month":
        dateThreshold = new Date(now.setMonth(now.getMonth() - 1));
        break;
      default:
        dateThreshold = new Date("1970-01-01");
    }
    dateThreshold.setHours(0, 0, 0, 0);
    customers = customers.filter(customer => {
      if (!customer.date) return true;
      const customerDate = parseCustomDate(customer.date);
      customerDate.setHours(0, 0, 0, 0);
      return customerDate >= dateThreshold;
    });
  }

  // Apply modal filters
  if (filter.dateRange) {
    let dateThreshold: Date;
    const now = new Date("2025-04-18");
    switch (filter.dateRange) {
      case "last-week":
        dateThreshold = new Date(now.setDate(now.getDate() - 7));
        break;
      case "last-month":
        dateThreshold = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case "last-2-month":
        dateThreshold = new Date(now.setMonth(now.getMonth() - 2));
        break;
      case "last-3-month":
        dateThreshold = new Date(now.setMonth(now.getMonth() - 3));
        break;
      default:
        dateThreshold = new Date("1970-01-01");
    }
    dateThreshold.setHours(0, 0, 0, 0);
    customers = customers.filter(customer => {
      if (!customer.date) return true;
      const customerDate = parseCustomDate(customer.date);
      customerDate.setHours(0, 0, 0, 0);
      return customerDate >= dateThreshold;
    });
  }

  if (filter.startDate && filter.endDate) {
    const start = new Date(filter.startDate);
    const end = new Date(filter.endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    customers = customers.filter(customer => {
      if (!customer.date) return true;
      const customerDate = parseCustomDate(customer.date);
      return customerDate >= start && customerDate <= end;
    });
  }

  if (filter.email) {
    customers = customers.filter(customer =>
      customer.email?.toLowerCase().includes(filter.email!.toLowerCase()) || false
    );
  }

  return customers;
};

export const fetchPndCustomerNotification = async (): Promise<Notification> => {
  return { message: 'Dennis just created an account' };
};

export const fetchCustomerDetails = async (customerId: string): Promise<CustomerDetails> => {
  return {
    customerName: "Onus Emeka",
    email: "onueemeka@gmail.com",
    dateOfBirth: "05/09/2000",
    gender: "M",
    userId: "FAL-WEFU-23-AU776A",
    country: "NIGERIA",
    phoneNumber: "070342765226",
    uniqueId: "UTOEFDFQ7W98244EV",
    bankAccount: "7029892273",
    bankName: "9 Payment Services",
    joinDate: "Wed, Apr 25, 2023"
  };
};

// Add customer to Post-No-Debit list
export const addToPnd = async (customerId: string): Promise<{ success: boolean }> => {
  return { success: true };
};

// Delete customer
export const deleteCustomer = async (customerId: string): Promise<{ success: boolean }> => {
  return { success: true };
};

// Update customer information
export const updateCustomer = async (customerId: string, updatedData: Partial<CardCustomer>): Promise<{ success: boolean }> => {
  return { success: true };
};