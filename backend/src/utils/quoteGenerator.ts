export interface MotivationalQuote {
  quote: string;
  emoji: string;
  category: 'first_payslip' | 'milestone' | 'growth' | 'general';
  authorOrContext: string;
}

export function generateMotivationalQuote(
  salary: number,
  isFirstPayslip: boolean,
  previousSalary?: number
): MotivationalQuote {
  
  const firstPayslipQuotes: MotivationalQuote[] = [
    {
      quote: "🎉 Your first paycheck! This is where legends are born. You've earned this moment.",
      emoji: '🚀',
      category: 'first_payslip',
      authorOrContext: 'Remember this feeling'
    },
    {
      quote: "💰 First payslip unlocked! You've taken the first step to financial independence. That's powerful.",
      emoji: '⚡',
      category: 'first_payslip',
      authorOrContext: 'Your journey starts now'
    },
    {
      quote: "🌟 Your hard work just got validated. First payslip = Proof you belong here. Own it!",
      emoji: '👑',
      category: 'first_payslip',
      authorOrContext: 'Welcome to the real world'
    },
  ];

  const growthQuotes: MotivationalQuote[] = [
    {
      quote: "📈 Look at that growth! Your efforts are paying off. Literally.",
      emoji: '💪',
      category: 'growth',
      authorOrContext: 'Keep that momentum'
    },
    {
      quote: "🎯 Salary increased! You didn't just earn more; you leveled up as a professional.",
      emoji: '✨',
      category: 'growth',
      authorOrContext: 'The grind works'
    },
  ];

  const milestoneQuotes: MotivationalQuote[] = [
    {
      quote: `💎 ${salary.toLocaleString()} earned! That's not just a number—that's your value in the market.`,
      emoji: '🏆',
      category: 'milestone',
      authorOrContext: 'You are valuable'
    },
    {
      quote: "🌠 This paycheck represents countless hours, ideas, and dedication. Well done, you!",
      emoji: '🙌',
      category: 'milestone',
      authorOrContext: 'Take pride in this'
    },
  ];

  const generalQuotes: MotivationalQuote[] = [
    {
      quote: "💼 Another payslip, another proof that you're doing something right. Keep crushing it!",
      emoji: '🔥',
      category: 'general',
      authorOrContext: 'Consistency wins'
    },
    {
      quote: "🎊 You earned this. Every rupee, every penny is a win. Celebrate yourself!",
      emoji: '🌈',
      category: 'general',
      authorOrContext: 'You deserve this'
    },
  ];

  if (isFirstPayslip) {
    return firstPayslipQuotes[Math.floor(Math.random() * firstPayslipQuotes.length)];
  }

  if (previousSalary && salary > previousSalary) {
    return growthQuotes[Math.floor(Math.random() * growthQuotes.length)];
  }

  if (salary > 500000) {
    return milestoneQuotes[Math.floor(Math.random() * milestoneQuotes.length)];
  }

  return generalQuotes[Math.floor(Math.random() * generalQuotes.length)];
}