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

  // Header & Page Titles
  systemOverview: string;
  systemOverviewDesc: string;
  refreshOverview: string;
  userManagementDesc: string;
  bulkPushSystemTitle: string;
  bulkPushSystemDesc: string;
  refreshFeed: string;
  systemSettingsTitle: string;
  systemSettingsDesc: string;

  // Stats & Badges
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
  suspended: string;
  all: string;

  // User Management
  totalPlatformUsers: string;
  activeValidators: string;
  totalStakedYcoin: string;
  searchUserPlaceholder: string;
  tableUser: string;
  tableRole: string;
  tableStatus: string;
  tableStakedSY: string;
  tableJoined: string;
  tableActions: string;

  // Bulk Push Notification
  composeTitle: string;
  composeDesc: string;
  pushCategory: string;
  alertsCategory: string;
  discoverCategory: string;
  notificationTitleLabel: string;
  notificationTitlePlaceholder: string;
  pushMessageLabel: string;
  pushMessagePlaceholder: string;
  broadcastNowButton: string;
  livePreviewTitle: string;
  livePreviewBadge: string;
  livePreviewDesc: string;
  justNow: string;
  sampleTitlePlaceholder: string;
  sampleMessagePlaceholder: string;
  targetLabel: string;
  targetValue: string;
  viewAlertButton: string;
  estimatedReachTitle: string;
  estimatedReachDesc: string;
  reachPercent: string;
  historyTitle: string;
  historyDesc: string;
  broadcastsCount: string;
  tableCategoryUrgency: string;
  tableTitleContent: string;
  tableTargetAudience: string;
  tableRecipients: string;
  tableSentDate: string;
  tableAction: string;

  // Account & Security / Legal Editor
  legalEditorTitle: string;
  legalEditorDesc: string;
  termsOfService: string;
  privacyPolicy: string;
  editPolicyClauses: string;
  characters: string;
  deleteClearTerms: string;
  savePublishPolicy: string;
  deleteLegalTitle: string;
  deleteAndClear: string;

  // Administrator Details
  adminDetailsTitle: string;
  adminDetailsDesc: string;
  nameLabel: string;
  adminEmailLabel: string;
  emailLocked: string;
  protocolTitleLabel: string;
  bioLabel: string;
  saveProfileDetails: string;
  profilePhotoLabel: string;
  uploadFileHint: string;
  changeAvatarLabel: string;
  roleLabel: string;
  cannotBeChanged: string;
  emailVerificationLabel: string;
  verifiedStatus: string;
  unverifiedStatus: string;

  // Change Password
  changePasswordTitle: string;
  changePasswordDesc: string;
  currentPasswordLabel: string;
  newPasswordLabel: string;
  newPasswordPlaceholder: string;
  confirmNewPasswordLabel: string;
  confirmNewPasswordPlaceholder: string;
  updatePasswordButton: string;

  // Knowledge Base Page & Components
  aiKbManagementTitle: string;
  aiKbManagementDesc: string;
  uploadNewKbDocTitle: string;
  uploadNewKbDocDesc: string;
  documentTitleLabel: string;
  documentTitlePlaceholder: string;
  formatLabel: string;
  knowledgeTextContentLabel: string;
  knowledgeTextContentPlaceholder: string;
  saveKnowledgeEntry: string;
  indexedKbDocsTitle: string;
  indexedKbDocsDesc: string;
  searchDocsPlaceholder: string;
  tableDocTitle: string;
  tableFormat: string;
  tablePayloadSize: string;
  tableIndexedDate: string;
  noIndexedDocsFound: string;

  // Recent Documents & Modals
  recentKbDocs: string;
  viewAll: string;
  inspectContentPayload: string;
  closeInspector: string;
  docId: string;
  totalLength: string;
  fileSize: string;
  uploadedBy: string;
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

    // Header & Page Titles
    systemOverview: 'System Overview',
    systemOverviewDesc: 'Summary overview of AI knowledge base documents, registered users, active nodes, and AI core health.',
    refreshOverview: 'Refresh Overview',
    userManagementDesc: 'Manage user accounts, node operator roles, and status.',
    bulkPushSystemTitle: 'Bulk Push Notification System',
    bulkPushSystemDesc: 'Broadcast real-time push notifications and alerts to Discover and Alert systems across all active users.',
    refreshFeed: 'Refresh Feed',
    systemSettingsTitle: 'System Settings & Legal Policies',
    systemSettingsDesc: 'Manage, edit, publish, or delete Terms of Service and Privacy Policy, and update admin credentials.',

    // Stats & Badges
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
    suspended: 'Suspended',
    all: 'All',

    // User Management
    totalPlatformUsers: 'TOTAL PLATFORM USERS',
    activeValidators: 'ACTIVE VALIDATORS',
    totalStakedYcoin: 'TOTAL STAKED YCOIN',
    searchUserPlaceholder: 'Search name, email, or BTC address...',
    tableUser: 'USER',
    tableRole: 'ROLE',
    tableStatus: 'STATUS',
    tableStakedSY: 'STAKED $Y',
    tableJoined: 'JOINED',
    tableActions: 'ACTIONS',

    // Bulk Push Notification
    composeTitle: 'Compose & Broadcast Push Notification',
    composeDesc: 'Target specific categories (Discover / Alerts) and broadcast instant alerts.',
    pushCategory: 'Push Category',
    alertsCategory: 'Alerts',
    discoverCategory: 'Discover',
    notificationTitleLabel: 'Notification Title *',
    notificationTitlePlaceholder: 'e.g. ⚡ Bitcoin Volatility Trigger: BTC Surges Past $98,000',
    pushMessageLabel: 'Push Notification Message *',
    pushMessagePlaceholder: 'Write your broadcast message content here...',
    broadcastNowButton: 'Broadcast Bulk Push Notification Now',
    livePreviewTitle: 'Live Push Notification Preview',
    livePreviewBadge: 'LIVE PREVIEW',
    livePreviewDesc: 'How this push notification renders inside user terminal feeds & header bell drawers:',
    justNow: 'Just now',
    sampleTitlePlaceholder: '⚡ Sample Push Notification Title...',
    sampleMessagePlaceholder: 'Write your broadcast message content on the left to see live render preview.',
    targetLabel: 'Target:',
    targetValue: 'All Platform Users',
    viewAlertButton: 'View Alert',
    estimatedReachTitle: 'Estimated Broadcast Reach',
    estimatedReachDesc: '4 Active Platform Nodes',
    reachPercent: '100% Reach',
    historyTitle: 'Sent Bulk Notifications Broadcast History',
    historyDesc: 'Review, verify recipient stats, or remove past push broadcast logs.',
    broadcastsCount: '3 Broadcasts',
    tableCategoryUrgency: 'CATEGORY & URGENCY',
    tableTitleContent: 'TITLE & MESSAGE CONTENT',
    tableTargetAudience: 'TARGET AUDIENCE',
    tableRecipients: 'RECIPIENTS',
    tableSentDate: 'SENT DATE',
    tableAction: 'ACTION',

    // Account & Security / Legal Editor
    legalEditorTitle: 'Legal Policies & Terms Editor',
    legalEditorDesc: 'Edit, update, or clear terms of service and privacy policy documents.',
    termsOfService: 'Terms of Service',
    privacyPolicy: 'Privacy Policy',
    editPolicyClauses: 'Edit Policy Clauses & Content',
    characters: 'characters',
    deleteClearTerms: 'Delete & Clear Terms',
    savePublishPolicy: 'Save & Publish Policy',
    deleteLegalTitle: 'Delete Legal Policy?',
    deleteAndClear: 'Delete & Clear',

    // Administrator Details
    adminDetailsTitle: 'Administrator Details',
    adminDetailsDesc: 'Update profile display name and title',
    nameLabel: 'NAME',
    adminEmailLabel: 'ADMIN EMAIL ADDRESS',
    emailLocked: '🔒 Locked (email cannot be modified)',
    protocolTitleLabel: 'Protocol Title',
    bioLabel: 'Bio / Description',
    saveProfileDetails: 'Save Profile Details',
    profilePhotoLabel: 'Profile Photo',
    uploadFileHint: 'Upload JPG, PNG or WEBP format.',
    changeAvatarLabel: 'Change Avatar',
    roleLabel: 'ROLE',
    cannotBeChanged: 'Cannot be changed',
    emailVerificationLabel: 'EMAIL VERIFICATION STATUS',
    verifiedStatus: 'Verified',
    unverifiedStatus: 'Unverified',

    // Change Password
    changePasswordTitle: 'Change Password',
    changePasswordDesc: 'Update account password',
    currentPasswordLabel: 'CURRENT PASSWORD',
    newPasswordLabel: 'NEW PASSWORD',
    newPasswordPlaceholder: 'At least 6 characters',
    confirmNewPasswordLabel: 'CONFIRM NEW PASSWORD',
    confirmNewPasswordPlaceholder: 'Confirm new password',
    updatePasswordButton: 'Update Password',

    // Knowledge Base Page & Components
    aiKbManagementTitle: 'AI Knowledge Base Management',
    aiKbManagementDesc: 'Upload PDF, Word, or text documents to train the AI agent in real-time. Changes reflect instantly.',
    uploadNewKbDocTitle: 'Upload New Knowledge Document',
    uploadNewKbDocDesc: 'Upload PDFs, Word documents, Markdown, or write knowledge entries directly.',
    documentTitleLabel: 'DOCUMENT TITLE',
    documentTitlePlaceholder: 'e.g. YCOIN Tokenomics & Node Rewards',
    formatLabel: 'FORMAT',
    knowledgeTextContentLabel: 'KNOWLEDGE TEXT CONTENT',
    knowledgeTextContentPlaceholder: 'Type or paste markdown content here...',
    saveKnowledgeEntry: 'Save Knowledge Entry',
    indexedKbDocsTitle: 'Indexed Knowledge Documents',
    indexedKbDocsDesc: 'Manage indexed knowledge files.',
    searchDocsPlaceholder: 'Search documents...',
    tableDocTitle: 'DOCUMENT TITLE',
    tableFormat: 'FORMAT',
    tablePayloadSize: 'PAYLOAD SIZE',
    tableIndexedDate: 'INDEXED DATE',
    noIndexedDocsFound: 'No indexed knowledge documents found.',

    // Recent Documents & Modals
    recentKbDocs: 'Recent Knowledge Base Docs',
    viewAll: 'View All →',
    inspectContentPayload: 'Inspect Content Payload:',
    closeInspector: 'Close Inspector',
    docId: 'DOC ID:',
    totalLength: 'TOTAL LENGTH:',
    fileSize: 'FILE SIZE:',
    uploadedBy: 'UPLOADED BY:',
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

    // Header & Page Titles
    systemOverview: '系统概览',
    systemOverviewDesc: 'AI知识库文档、注册用户、活动节点和AI核心健康状况的总结概览。',
    refreshOverview: '刷新概览',
    userManagementDesc: '管理用户账户、节点运算符角色和状态。',
    bulkPushSystemTitle: '批量推送通知系统',
    bulkPushSystemDesc: '向所有活动用户广播实时推送通知和警报到探索与警报系统。',
    refreshFeed: '刷新源',
    systemSettingsTitle: '系统设置与法律政策',
    systemSettingsDesc: '管理、编辑、发布或删除服务条款与隐私政策，并更新管理员凭据。',

    // Stats & Badges
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
    suspended: '已挂起',
    all: '全部',

    // User Management
    totalPlatformUsers: '平台总用户',
    activeValidators: '活动验证者',
    totalStakedYcoin: '总质押 YCOIN',
    searchUserPlaceholder: '搜索姓名、邮箱或 BTC 地址...',
    tableUser: '用户',
    tableRole: '角色',
    tableStatus: '状态',
    tableStakedSY: '质押 $Y',
    tableJoined: '加入时间',
    tableActions: '操作',

    // Bulk Push Notification
    composeTitle: '撰写并广播推送通知',
    composeDesc: '针对特定类别（探索 / 警报）并广播即时警报。',
    pushCategory: '推送类别',
    alertsCategory: '警报',
    discoverCategory: '探索',
    notificationTitleLabel: '通知标题 *',
    notificationTitlePlaceholder: '例如 ⚡ 比特币波动突发：BTC 突破 98,000 美元',
    pushMessageLabel: '推送通知消息 *',
    pushMessagePlaceholder: '在此处编写您的广播消息内容...',
    broadcastNowButton: '立即广播批量推送通知',
    livePreviewTitle: '实时推送通知预览',
    livePreviewBadge: '实时预览',
    livePreviewDesc: '此推送通知如何在用户终端提要和顶部铃铛抽屉中呈现：',
    justNow: '刚刚',
    sampleTitlePlaceholder: '⚡ 示例推送通知标题...',
    sampleMessagePlaceholder: '在左侧编写您的广播消息内容以查看实时渲染预览。',
    targetLabel: '目标:',
    targetValue: '所有平台用户',
    viewAlertButton: '查看警报',
    estimatedReachTitle: '预计广播覆盖范围',
    estimatedReachDesc: '4 个活动平台节点',
    reachPercent: '100% 覆盖率',
    historyTitle: '已发送批量通知广播历史',
    historyDesc: '查看、验证接收者统计数据，或删除过去的推送广播记录。',
    broadcastsCount: '3 个广播',
    tableCategoryUrgency: '类别与紧急程度',
    tableTitleContent: '标题与消息内容',
    tableTargetAudience: '目标受众',
    tableRecipients: '接收者',
    tableSentDate: '发送日期',
    tableAction: '操作',

    // Account & Security / Legal Editor
    legalEditorTitle: '法律政策与条款编辑器',
    legalEditorDesc: '编辑、更新或删除网站服务条款和隐私政策。',
    termsOfService: '服务条款',
    privacyPolicy: '隐私政策',
    editPolicyClauses: '编辑政策内容条款',
    characters: '字符',
    deleteClearTerms: '删除并清空条款',
    savePublishPolicy: '保存并发布政策',
    deleteLegalTitle: '删除法律政策？',
    deleteAndClear: '删除并清空',

    // Administrator Details
    adminDetailsTitle: '管理员详细信息',
    adminDetailsDesc: '更新显示名称和头衔',
    nameLabel: '姓名',
    adminEmailLabel: '管理员邮箱地址',
    emailLocked: '🔒 已锁定（邮箱不能修改）',
    protocolTitleLabel: '协议头衔',
    bioLabel: '简介 / 描述',
    saveProfileDetails: '保存个人资料',
    profilePhotoLabel: '个人资料照片',
    uploadFileHint: '上传 JPG、PNG 或 WEBP 格式。',
    changeAvatarLabel: '更换头像',
    roleLabel: '角色',
    cannotBeChanged: '无法修改',
    emailVerificationLabel: '邮箱验证状态',
    verifiedStatus: '已验证',
    unverifiedStatus: '未验证',

    // Change Password
    changePasswordTitle: '修改密码',
    changePasswordDesc: '更新账户密码',
    currentPasswordLabel: '当前密码',
    newPasswordLabel: '新密码',
    newPasswordPlaceholder: '至少 6 个字符',
    confirmNewPasswordLabel: '确认新密码',
    confirmNewPasswordPlaceholder: '确认新密码',
    updatePasswordButton: '更新密码',

    // Knowledge Base Page & Components
    aiKbManagementTitle: 'AI 知识库管理',
    aiKbManagementDesc: '上传 PDF、Word 或文本文档以实时训练 AI 代理。更改即时生效。',
    uploadNewKbDocTitle: '上传新知识文档',
    uploadNewKbDocDesc: '上传 PDF、Word 文档、Markdown 或直接撰写知识条目。',
    documentTitleLabel: '文档标题',
    documentTitlePlaceholder: '例如 YCOIN 代币经济学与节点奖励',
    formatLabel: '格式',
    knowledgeTextContentLabel: '知识文本内容',
    knowledgeTextContentPlaceholder: '在此处键入或粘贴 markdown 内容...',
    saveKnowledgeEntry: '保存知识条目',
    indexedKbDocsTitle: '已索引的知识文档',
    indexedKbDocsDesc: '管理已索引的知识文件。',
    searchDocsPlaceholder: '搜索文档...',
    tableDocTitle: '文档标题',
    tableFormat: '格式',
    tablePayloadSize: '有效载荷大小',
    tableIndexedDate: '索引日期',
    noIndexedDocsFound: '未找到已索引的知识文档。',

    // Recent Documents & Modals
    recentKbDocs: '最近的知识库文档',
    viewAll: '查看全部 →',
    inspectContentPayload: '检查内容有效载荷:',
    closeInspector: '关闭检查器',
    docId: '文档 ID:',
    totalLength: '总长度:',
    fileSize: '文件大小:',
    uploadedBy: '上传者:',
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
