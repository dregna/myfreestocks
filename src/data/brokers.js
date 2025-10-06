export const BROKER_OFFERS = [
  {
    id: "webull",
    name: "Webull",
    headline: "Earn up to 12 free stocks worth as much as $30,600 when you deposit $100",
    summary:
      "Webull leads our rankings for self-directed traders with aggressive equity bonuses and a professional-grade mobile and desktop platform.",
    cta: {
      label: "Claim Webull Bonus",
      href: "https://www.webull.com/",
    },
    offer: {
      value: "12 fractional shares ($36 – $30,600)",
      requirement: "$100 deposit within 10 days of approval",
      payout: "Stock rewards typically settle within 10 trading days",
      expiration: "Promotion reviewed January 2025",
    },
    highlights: [
      "Level 2 market data plus extended-hours access",
      "Options, IRAs, and cash management with 5.0% APY",
      "Paper trading and in-app trading journal",
    ],
    idealFor: ["Active traders", "Mobile-first investors"],
    score: {
      vertical: "broker",
      breakdown: {
        fees: 94,
        features: 88,
        platform: 91,
        support: 76,
      },
    },
    disclaimer:
      "Promotional share values fluctuate with market prices. New U.S. customers only; terms and conditions from Webull Financial LLC apply.",
  },
  {
    id: "robinhood",
    name: "Robinhood",
    headline: "Get up to $200 in free stock slices when you open and fund a brokerage account",
    summary:
      "Robinhood balances low costs with user-friendly automation, making it a popular entry point for new investors seeking fractional share bonuses.",
    cta: {
      label: "Unlock Robinhood Offer",
      href: "https://robinhood.com/",
    },
    offer: {
      value: "Stock rewards up to $200",
      requirement: "$50 initial deposit",
      payout: "Rewards post within 5 trading days after funding",
      expiration: "Promotion reviewed January 2025",
    },
    highlights: [
      "$0 commissions on stocks, ETFs, and options",
      "24-hour market access on select equities",
      "Cash sweep with up to 5.0% APY for Gold members",
    ],
    idealFor: ["Beginner investors", "DIY retirement savers"],
    score: {
      vertical: "broker",
      breakdown: {
        fees: 90,
        features: 82,
        platform: 85,
        support: 72,
      },
    },
    disclaimer:
      "Stock slice values are randomized at the time of distribution. Check Robinhood's latest disclosures for eligibility limitations and tax reporting guidance.",
  },
  {
    id: "fidelity",
    name: "Fidelity",
    headline: "Earn up to $100 cash bonus with qualifying deposits into a new Fidelity brokerage account",
    summary:
      "Fidelity pairs a cash welcome bonus with industry-leading research, zero trade commissions, and award-winning customer support.",
    cta: {
      label: "Explore Fidelity Bonus",
      href: "https://www.fidelity.com/",
    },
    offer: {
      value: "$50 – $100 cash bonus",
      requirement: "$50–$2,500 deposit tier",
      payout: "Cash credit posts within 10 business days",
      expiration: "Promotion reviewed January 2025",
    },
    highlights: [
      "Commissions waived on U.S. stocks, ETFs, and options",
      "Robust retirement planning tools and educational library",
      "24/7 phone, chat, and in-branch support nationwide",
    ],
    idealFor: ["Long-term investors", "Retirement planning"],
    score: {
      vertical: "broker",
      breakdown: {
        fees: 96,
        features: 89,
        platform: 87,
        support: 91,
      },
    },
    disclaimer:
      "Fidelity bonuses require maintaining qualifying assets for 90 days. Consult Fidelity's bonus terms for additional restrictions and taxable implications.",
  },
  {
    id: "sofi",
    name: "SoFi Invest",
    headline: "Get up to $1,000 in stock when you transfer or deposit funds into SoFi Active Invest",
    summary:
      "SoFi Invest rewards new clients with a tiered stock bonus and bundles access to financial planners, cash management, and crypto trading in one app.",
    cta: {
      label: "Start with SoFi",
      href: "https://www.sofi.com/invest/",
    },
    offer: {
      value: "$25 – $1,000 stock bonus",
      requirement: "$100–$100,000 deposit tier",
      payout: "Bonus stock credited within 7 business days",
      expiration: "Promotion reviewed January 2025",
    },
    highlights: [
      "Automated investing with no advisory fees",
      "Goal-based planning sessions with CFP® professionals",
      "Integrated banking with up to 4.60% APY savings",
    ],
    idealFor: ["Hybrid investors", "Holistic financial planning"],
    score: {
      vertical: "broker",
      breakdown: {
        fees: 88,
        features: 80,
        platform: 83,
        support: 78,
      },
    },
    disclaimer:
      "Bonuses are paid in SoFi stock bits and may be rescinded if account balances fall below tier minimums. Review SoFi's promotional terms for the latest criteria.",
  },
];

export default BROKER_OFFERS;
