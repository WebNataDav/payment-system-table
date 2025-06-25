interface MonthlyData {
  income: number;
  activePartners: number;
  plan: {
    income: number;
    activePartners: number;
  };
  fact: {
    income: number;
    activePartners: number;
  };
}

interface AdminData {
  id: number;
  adminId: number;
  adminName: string;
  months: (MonthlyData | null)[];
  year: number;
}

interface FinancialData {
  total: {
    fact: {
      income: number;
      activePartners: number;
    };
    plan: {
      income: number;
      activePartners: number;
    };
  }[];
  table: AdminData[];
}

export { FinancialData };
