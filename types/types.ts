export interface UserInfo {
    name: string;
}

export interface Notification {
    message: string;
}

export interface Stat {
    image: string;
    title: string;
    value: string;
    change?: string;
}

export interface TransactionDataPoint {
    name: string;
    red: number;
    green: number;
}

export interface TransactionAnalyticsProps {
    transactionData: TransactionDataPoint[];
    title: string;
}

export interface UserSegmentation {
    name: string;
    value: number;
}

export interface TopPlatform {
    name: string;
    amount: string;
    percentage: string;
    image: string;
}

export interface SummaryData {
    transactionLimit: number;
    amount: {
        value: string;
        formatted: string;
        description: string;
    };
    profit: {
        value: string;
        formatted: string;
        description: string;
    };
}

export interface TransactionCategory {
    label: string;
    count: number;
    amount: string;
    charge: string;
    profit: string;
}

export interface CardTransactionsData {
    categories: TransactionCategory[];
}

export interface NubanTransactionsData {
    categories: TransactionCategory[];
}

export interface NubanAccountsData {
    accounts: number;
    balance: string;
}

export interface Transaction {
    id: string;
    transaction: string;
    image: string;
    amount: string;
    date: string;
    customer: string;
    type: string;
    channel: string;
    status: "SUCCESSFUL" | "FAILED" | "PENDING";
}

export interface TransactionTabsProps {
    onTimeRangeChange?: (timeRange: string) => void;
    onFilterChange?: (filter: string) => void;
}

export interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export interface ColumnsDropdownProps {
    itemsPerPage: number;
    onItemsPerPageChange: (items: number) => void;
    totalRows: number;
}

export interface AccountCard {
    title: string;
    value: string;
    change: string;
    currency: string;
    icon: string;
}

export interface Account {
    id: string;
    accountId: string;
    accountName: string;
    accountNumber: string;
    bankName: string;
    date: string;
}

export interface Card {
    id: string;
    cardId: string;
    balance: string;
    date: string;
    cardBrand: string;
    cardType: string;
    cardNumber: string;
    status: string;
    fullCardNumber: string;
}

export interface CardDetails {
    amountLimit: string;
    availableBalance: string;
    usageLimit: string;
    status: string;
    expiration: string;
    expirationDate: string;
    cardType: string;
    cardBrand: string;
    physical: string;
    dateCreated: string;
    purchaseType: string;
    cardClass: string;
    maskedPan: string;
    sequenceNumber: string;
    cardId: string;
    cardGuid: string;
    lifetimeWindow: string;
    orderNumber: string;
    cancelled: string;
    cancelledDate: string;
    terminated: string;
    terminatedDate: string;
    blockedBy: string;
    deactivationDate: string;
    midWhitelist: string;
    customerBlacklist: string;
}

export interface CardCustomer {
    id: string;
    image: string;
    customerName: string;
    country: string;
    phoneNo: string;
    status: string;
    role?: string;
    age?: number;
    gender?: 'M' | 'F';
    date?: string;
    email?: string;
}

export interface CardTransaction {
    id: string;
    cardId: string;
    merchantId: string;
    merchantName: string;
    maskedPan: string;
    amount: string;
    currency: string;
    date: string;
    status: string;
    fullPan: string;
}

export interface CardTableProps {
    cards: Card[];
    currentPage: number;
    itemsPerPage: number;
    onDeleteCard?: (cardId: string) => void;
}

export interface VerifiedCustomerTableProps {
    customers: CardCustomer[];
    currentPage: number;
    itemsPerPage: number;
}

export interface UnverifiedCustomerTableProps {
    customers: UnverifiedCustomer[];
    currentPage: number;
    itemsPerPage: number;
}

export interface CardTransactionTableProps {
    transactions: CardTransaction[];
    currentPage: number;
    itemsPerPage: number;
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export interface CardFilter {
    dateRange?: string;
    startDate?: string;
    endDate?: string;
    cardId?: string;
    currencyType?: string;
    transactionType?: string;
}

export interface CustomerFilter {
    dateRange?: string;
    startDate?: string;
    endDate?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
}

export interface TransactionFilter {
    dateRange?: string;
    startDate?: string;
    endDate?: string;
    cardId?: string;
    currencyType?: string;
    status?: string;
    negativeBalance?: string;
}

export interface FilterOptions {
    currencyTypes: string[];
    transactionTypes: string[];
}

export interface StatusOption {
    value: string;
    label: string;
}

export interface TimeRangeFilterProps {
    timeRange: string;
    setTimeRange: (timeRange: string) => void;
    statusFilter?: string | null;
    setStatusFilter?: (status: string | null) => void;
    statusOptions?: StatusOption[];
    onFilterChange?: (filter: CardFilter) => void;
}

export interface CustomerFilterModalProps {
    timeRange: string;
    setTimeRange: (timeRange: string) => void;
    onFilterChange?: (filter: CustomerFilter) => void;
}

export interface TransactionFilterModalProps {
    timeRange: string;
    setTimeRange: (timeRange: string) => void;
    statusFilter?: string | null;
    setStatusFilter?: (status: string | null) => void;
    statusOptions?: StatusOption[];
    onFilterChange?: (filter: TransactionFilter) => void;
}

export interface UnverifiedCustomer {
    id: string;
    email?: string;
    date?: string
}

export interface PndCustomer {
    id: string;
    email?: string;
    date?: string;
}

export interface PndCustomerTableProps {
    customers: PndCustomer[];
    currentPage: number;
    itemsPerPage: number;
}

export interface CustomerDetails {
    customerName: string;
    email: string;
    dateOfBirth: string;
    gender: string;
    userId: string;
    country: string;
    phoneNumber: string;
    uniqueId: string;
    bankAccount: string;
    bankName: string;
    joinDate: string;
  }
  
  export interface CustomerActionsProps {
    customer: CardCustomer | UnverifiedCustomer | PndCustomer;
    tableType: 'verified' | 'unverified' | 'pnd';
    onCustomerUpdate: () => void;
  }