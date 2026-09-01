'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'zh';

type Translations = {
  // Sidebar
  superAdminPortal: string;
  languageLabel: string;
  switchLang: string;
  overview: string;
  knowledgeBase: string;
  userManagement: string;
  bulkPushNotifications: string;
  accountSecurity: string;
  administrator: string;
  logout: string;

  // Header
  systemOverview: string;
  systemOverviewDesc: string;
  refreshOverview: string;

  // Stats
  knowledgeBaseDocs: string;
  viewDocs: string;
  totalCharsIndexed: string;
  platformUsers: string;
  manageUsers: string;
  activeNodeOperators: string;
  stakedYcoin: string;
  anchoredOnBtc: string;
  aiEngineStatus: string;
  liveRagActive: string;
  active: string;
  pending: string;

  // Recent Documents
  recentKbDocs: string;
  viewAll: string;
  inspectContentPayload: string;
  closeInspector: string;
  docId: string;
  totalLength: string;
  fileSize: string;
  uploadedBy: string;

  // Recent Users & Modal
  recentRegisteredUsers: string;
  removeUserAccount: string;
  removeUserDesc: string;
  cancel: string;
  deleteAccount: string;
  confirmLogout: string;
  logoutDesc: string;
};

const translations: Record<Language, Translations> = {
  en: {
    // Sidebar
    superAdminPortal: 'SUPER ADMIN PORTAL',
    languageLabel: 'Language: English',
    switchLang: '切换中文',
    overview: 'Overview',
    knowledgeBase: 'Knowledge Base',
    userManagement: 'User Management',
    bulkPushNotifications: 'Bulk Push Notifications',
    accountSecurity: 'Account & Security',
    administrator: 'YCOIN Administrator',
    logout: 'Logout',

    // Header
    systemOverview: 'System Overview',
    systemOverviewDesc: 'Summary overview of AI knowledge base documents, registered users, active nodes, and AI core health.',
    refreshOverview: 'Refresh Overview',

    // Stats
    knowledgeBaseDocs: 'Knowledge Base Docs',
    viewDocs: 'View Docs',
    totalCharsIndexed: '2.3k total chars indexed',
    platformUsers: 'Platform Users',
    manageUsers: 'Manage Users',
    activeNodeOperators: '0 active node operators',
    stakedYcoin: 'Staked YCOIN',
    anchoredOnBtc: 'Anchored on Bitcoin L1 Proof-of-Work',
    aiEngineStatus: 'AI Engine Status',
    liveRagActive: 'Live Knowledge RAG Active',
    active: 'Active',
    pending: 'Pending',

    // Recent Documents
    recentKbDocs: 'Recent Knowledge Base Documents',
    viewAll: 'View All →',
    inspectContentPayload: 'INSPECT CONTENT PAYLOAD:',
    closeInspector: 'Close Inspector',
    docId: 'Doc ID:',
    totalLength: 'Total Length:',
    fileSize: 'File Size:',
    uploadedBy: 'Uploaded By:',

    // Recent Users & Modal
    recentRegisteredUsers: 'Recent Registered Users',
    removeUserAccount: 'Remove User Account?',
    removeUserDesc: 'Are you sure you want to remove this user account from the YCOIN platform?',
    cancel: 'Cancel',
    deleteAccount: 'Delete Account',
    confirmLogout: 'Confirm Logout',
    logoutDesc: 'Are you sure you want to log out from the YCOIN Admin Portal?',
  },
  zh: {
    // Sidebar
    superAdminPortal: '超级管理员门户',
    languageLabel: '语言: 中文',
    switchLang: 'English',
    overview: '概览',
    knowledgeBase: '知识库',
    userManagement: '用户管理',
    bulkPushNotifications: '批量推送通知',
    accountSecurity: '账户与安全',
    administrator: 'YCOIN 管理员',
    logout: '退出登录',

    // Header
    systemOverview: '系统概览',
    systemOverviewDesc: 'AI知识库文档、注册用户、活动节点和AI核心健康状况的总结概览。',
    refreshOverview: '刷新概览',

    // Stats
    knowledgeBaseDocs: '知识库文档',
    viewDocs: '查看文档',
    totalCharsIndexed: '已索引 2.3k 总字符',
    platformUsers: '平台用户',
    manageUsers: '管理用户',
    activeNodeOperators: '0 个活动节点运算符',
    stakedYcoin: '质押 YCOIN',
    anchoredOnBtc: '锚定在 Bitcoin L1 工作量证明上',
    aiEngineStatus: 'AI 引擎状态',
    liveRagActive: '实时知识 RAG 处于活动状态',
    active: '活动',
    pending: '待处理',

    // Recent Documents
    recentKbDocs: '最近的知识库文档',
    viewAll: '查看全部 →',
    inspectContentPayload: '检查内容有效载荷:',
    closeInspector: '关闭检查器',
    docId: '文档 ID:',
    totalLength: '总长度:',
    fileSize: '文件大小:',
    uploadedBy: '上传者:',

    // Recent Users & Modal
    recentRegisteredUsers: '最近注册的用户',
    removeUserAccount: '删除用户账户？',
    removeUserDesc: '您确定要从 YCOIN 平台删除此用户账户吗？',
    cancel: '取消',
    deleteAccount: '删除账户',
    confirmLogout: '确认退出',
    logoutDesc: '您确定要退出 YCOIN 管理员门户吗？',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'zh' : 'en'));
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
