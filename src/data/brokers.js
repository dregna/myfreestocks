const brokers = [
  {
    slug: "robinhood",
    name: "Robinhood",
    score: 84,
    summary:
      "Robinhood streamlines zero-commission trading with a sleek mobile experience and instant access to fractional shares and crypto, making it a go-to starting point for new investors.",
    description:
      "Robinhood focuses on simplicity and speed, helping newer investors trade stocks, ETFs, options, and crypto without platform commissions. Automation features and fractional shares make it easy to build a diversified portfolio on any budget.",
    affiliateLink: "https://robinhood.com/",
    promotion: {
      headline: "Free stock up to $200",
      value: "1 free stock (value up to $200)",
      requirement: "Open an account and link your bank",
      payout: "Stock typically credits within 5 trading days",
    },
    perks: [
      "Commission-free trading on stocks, ETFs, and options",
      "Fractional shares and crypto available",
      "Fast, intuitive app experience",
    ],
  },
  {
    slug: "webull",
    name: "Webull",
    score: 92,
    summary:
      "Webull brings institutional-style charting, options analytics, and extended-hours trading to active DIY investors at zero commissions.",
    description:
      "Webull delivers a pro-level trading platform with rich charting, real-time market data, and extended-hours access. It's built for self-directed investors who want deep analytics without the cost of a traditional brokerage.",
    affiliateLink: "https://www.webull.com/",
    promotion: {
      headline: "Up to 12 free stocks",
      value: "6–12 free stocks ($3–$300 each)",
      requirement: "Deposit $100 within 30 days",
      payout: "Rewards usually land within 10 trading days",
    },
    perks: [
      "Advanced technical analysis tools",
      "Extended-hours trading access",
      "Powerful desktop and mobile apps",
    ],
  },
  {
    slug: "fidelity",
    name: "Fidelity",
    score: 95,
    summary:
      "Fidelity couples industry-leading research with managed portfolios, no-fee index funds, and a client-first approach.",
    description:
      "Fidelity is the gold standard for investors who want sophisticated research, retirement planning, and broad investment choice backed by stellar service.",
    affiliateLink: "https://www.fidelity.com/",
    promotion: {
      headline: "Cash rewards for new deposits",
      value: "Bonuses vary by qualifying deposit",
      requirement: "Transfer eligible assets and maintain balance",
      payout: "Bonuses typically arrive within 10 business days",
    },
    perks: [
      "Industry-leading research and screeners",
      "No-fee Fidelity index funds",
      "Robust planning tools and advisors",
    ],
  },
  {
    slug: "schwab",
    name: "Charles Schwab",
    score: 91,
    summary:
      "Charles Schwab pairs $0 commissions with strong customer service, extensive education, and a full-service branch network.",
    description:
      "Charles Schwab supports investors with a mix of digital tools, in-branch guidance, managed portfolios, and banking solutions. Its low-cost index funds and customer-first approach make it a favorite for long-term planners.",
    affiliateLink: "https://www.schwab.com/",
    promotion: {
      headline: "Transfer bonuses & cash rewards",
      value: "Bonus varies by qualifying deposit",
      requirement: "Meet Schwab transfer thresholds",
      payout: "Rewards typically credit within 45 days",
    },
    perks: [
      "Extensive branch network",
      "Robust education and research",
      "No-fee Schwab index funds",
    ],
  },
];

export default brokers;
