import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'zh' ? 'zh' : 'en') as Language;
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.projects': 'Projects',
    'nav.marketplace': 'Marketplace',
    'nav.sustainability': 'Sustainability',
    'nav.news': 'News & Insights',
    'nav.contact': 'Contact',
    'nav.about': 'About Us',
    'nav.login': 'Log In',
    'nav.dashboard': 'Dashboard',
    'nav.adminPanel': 'Admin Panel',
    'nav.profile': 'Profile',
    'nav.logout': 'Logout',
    
    'hero.title': "Unlock Zambia's Mining Potential",
    'hero.subtitle': "Connect with investors, trade minerals, and build partnerships in Africa's premier mining marketplace.",
    'hero.buy': 'Buy Minerals',
    'hero.sell': 'Sell Minerals',
    
    'stats.projects': 'Active Projects',
    'stats.partners': 'Verified Partners',
    'stats.minerals': 'Minerals Traded',
    'stats.success': 'Success Rate',
    
    'stats.activeProjects': 'Active Projects',
    'stats.verifiedPartners': 'Verified Partners',
    'stats.mineralsTraded': 'Minerals Traded',
    'stats.successRate': 'Success Rate',
    
    'categories.title': 'All Categories',
    'categories.subtitle': 'Browse our comprehensive marketplace for mining minerals, equipment, services, and safety gear',
    'categories.minerals': 'Minerals',
    'categories.minerals.desc': 'Metallic and non-metallic minerals, natural stones',
    'categories.equipment': 'Mining Equipment',
    'categories.equipment.desc': 'Equipment, machinery, and PPE for mining operations',
    'categories.services': 'Mining & Engineering Services',
    'categories.services.desc': 'Professional services for mining operations',
    
    'rfq.title': 'Latest RFQs',
    'rfq.subtitle': 'Recent requests for quotation from verified buyers',
    'rfq.verified': 'Verified',
    'rfq.viewAll': 'View All RFQs',
    
    'video.title': 'Discover Our Impact',
    'video.subtitle': "Watch our latest videos showcasing Zambia's mining potential",
    
    'cta.title': 'Ready to Start Your Mining Journey?',
    'cta.subtitle': 'Join hundreds of successful investors and traders on our platform',
    
    'footer.company': 'Fusion Mining',
    'footer.limited': 'Limited',
    'footer.tagline': 'Your trusted partner for mining investments and mineral trading in Zambia.',
    'footer.quickLinks': 'Quick Links',
    'footer.legal': 'Legal',
    'footer.contact': 'Contact Us',
    'footer.terms': 'Terms of Service',
    'footer.privacy': 'Privacy Policy',
    'footer.disclaimer': 'Disclaimer',
    'footer.copyright': '© 2024 Fusion Mining Limited. All rights reserved.',
    
    'services.title': 'Professional Mining Services & Compliance',
    'services.subtitle': "Your one-stop solution for mineral trading, engineering services, legal compliance, and consulting in Zambia's mining sector",
    'services.requestQuote': 'Contact us',
    'services.viewCompliance': 'View Compliance Guide',
    'services.compliance.title': 'Regulatory Compliance at a Glance',
    'services.ourServices': 'Our Professional Services',
    'services.detailedCompliance': 'Detailed Compliance Requirements',
    'services.detailedCompliance.subtitle': 'Comprehensive regulatory framework for mining operations in Zambia',
    'services.ready': 'Ready to Get Started?',
    'services.ready.subtitle': 'Partner with Fusion Mining Limited for comprehensive mining services, legal compliance, and market access across Zambia and Southern Africa',
    'services.contactTeam': 'Contact Our Team',
    'services.browseMarketplace': 'Browse Marketplace',
    'services.downloadGuide': 'Download Compliance Guide',
  },
  zh: {
    'nav.home': '首页',
    'nav.services': '服务',
    'nav.projects': '项目',
    'nav.marketplace': '市场',
    'nav.sustainability': '可持续发展',
    'nav.news': '新闻资讯',
    'nav.contact': '联系我们',
    'nav.about': '关于我们',
    'nav.login': '登录',
    'nav.dashboard': '仪表板',
    'nav.adminPanel': '管理面板',
    'nav.profile': '个人资料',
    'nav.logout': '登出',
    
    'hero.title': '释放赞比亚的采矿潜力',
    'hero.subtitle': '在非洲顶级采矿市场连接投资者、交易矿物并建立合作伙伴关系。',
    'hero.buy': '购买矿物',
    'hero.sell': '出售矿物',
    
    'stats.projects': '活跃项目',
    'stats.partners': '认证合作伙伴',
    'stats.minerals': '交易矿物',
    'stats.success': '成功率',
    
    'stats.activeProjects': '活跃项目',
    'stats.verifiedPartners': '认证合作伙伴',
    'stats.mineralsTraded': '交易矿物',
    'stats.successRate': '成功率',
    
    'categories.title': '所有类别',
    'categories.subtitle': '浏览我们的综合市场，包括采矿矿物、设备、服务和安全装备',
    'categories.minerals': '矿物',
    'categories.minerals.desc': '金属和非金属矿物、天然石材',
    'categories.equipment': '采矿设备',
    'categories.equipment.desc': '采矿作业的设备、机械和个人防护装备',
    'categories.services': '采矿与工程服务',
    'categories.services.desc': '采矿作业的专业服务',
    
    'rfq.title': '最新询价',
    'rfq.subtitle': '来自认证买家的最新报价请求',
    'rfq.verified': '已认证',
    'rfq.viewAll': '查看所有询价',
    
    'video.title': '发现我们的影响',
    'video.subtitle': '观看我们展示赞比亚采矿潜力的最新视频',
    
    'cta.title': '准备开始您的采矿之旅吗？',
    'cta.subtitle': '加入我们平台上数百名成功的投资者和交易者',
    
    'footer.company': 'Fusion Mining',
    'footer.limited': 'Limited',
    'footer.tagline': '您在赞比亚采矿投资和矿物交易的值得信赖的合作伙伴。',
    'footer.quickLinks': '快速链接',
    'footer.legal': '法律',
    'footer.contact': '联系我们',
    'footer.terms': '服务条款',
    'footer.privacy': '隐私政策',
    'footer.disclaimer': '免责声明',
    'footer.copyright': '© 2024 Fusion Mining Limited. 版权所有。',
    
    'services.title': '专业采矿服务与合规',
    'services.subtitle': '在赞比亚采矿领域提供矿物交易、工程服务、法律合规和咨询的一站式解决方案',
    'services.requestQuote': '联系我们',
    'services.viewCompliance': '查看合规指南',
    'services.compliance.title': '监管合规一览',
    'services.ourServices': '我们的专业服务',
    'services.detailedCompliance': '详细合规要求',
    'services.detailedCompliance.subtitle': '赞比亚采矿作业的综合监管框架',
    'services.ready': '准备开始了吗？',
    'services.ready.subtitle': '与Fusion Mining Limited合作，获取全面的采矿服务、法律合规和赞比亚及南部非洲的市场准入',
    'services.contactTeam': '联系我们的团队',
    'services.browseMarketplace': '浏览市场',
    'services.downloadGuide': '下载合规指南',
  }
};
