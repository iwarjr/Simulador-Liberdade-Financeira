import { AgentOption, GoalOption } from './types';

export const AGENTS: AgentOption[] = [
  { id: 'copywriter', label: 'Copywriter Senior', description: 'Especialista em textos persuasivos e conversão.', iconName: 'PenTool' },
  { id: 'developer', label: 'Engenheiro de Software', description: 'Especialista em código, arquitetura e lógica.', iconName: 'Code2' },
  { id: 'marketing', label: 'Estrategista de Marketing', description: 'Focado em crescimento, branding e mercado.', iconName: 'TrendingUp' },
  { id: 'educator', label: 'Professor / Educador', description: 'Didática excelente para explicar conceitos complexos.', iconName: 'GraduationCap' },
  { id: 'financier', label: 'Analista Financeiro', description: 'Especialista em investimentos, economia e negócios.', iconName: 'DollarSign' },
  { id: 'consultant', label: 'Consultor de Negócios', description: 'Visão estratégica para otimização de empresas.', iconName: 'Briefcase' },
  { id: 'chef', label: 'Chef de Cozinha', description: 'Criatividade culinária e conhecimento gastronômico.', iconName: 'Utensils' },
  { id: 'designer', label: 'UX/UI Designer', description: 'Focado em experiência do usuário e estética visual.', iconName: 'Palette' },
  { id: 'project_manager', label: 'Gerente de Projetos', description: 'Organização, metodologias ágeis e cronogramas.', iconName: 'ClipboardList' },
  { id: 'storyteller', label: 'Escritor Criativo', description: 'Narrativas envolventes, roteiros e ficção.', iconName: 'BookOpen' },
  { id: 'legal', label: 'Consultor Jurídico', description: 'Análise de contratos, leis e regulamentações.', iconName: 'Scale' },
  { id: 'scientist', label: 'Cientista de Dados', description: 'Análise estatística, machine learning e insights.', iconName: 'Database' },
];

export const GOALS: GoalOption[] = [
  { id: 'social_post', label: 'Post Redes Sociais', description: 'Instagram, LinkedIn, Twitter/X com hashtags.', iconName: 'Share2' },
  { id: 'code', label: 'Código / App', description: 'Snippets, funções, aplicações completas ou scripts.', iconName: 'Terminal' },
  { id: 'article', label: 'Artigo / Blog Post', description: 'Conteúdo longo, SEO otimizado e informativo.', iconName: 'FileText' },
  { id: 'presentation', label: 'Apresentação (Slides)', description: 'Estrutura de tópicos para PowerPoint/Keynote.', iconName: 'MonitorPlay' },
  { id: 'email', label: 'E-mail Marketing', description: 'Sequências de e-mail, newsletters ou cold calls.', iconName: 'Mail' },
  { id: 'script', label: 'Roteiro de Vídeo', description: 'YouTube, TikTok, Reels com indicações visuais.', iconName: 'Video' },
  { id: 'landing_page', label: 'Estrutura Landing Page', description: 'Copywriting e layout para alta conversão.', iconName: 'Layout' },
  { id: 'business_plan', label: 'Plano de Negócios', description: 'Estratégia completa, SWOT e análise de mercado.', iconName: 'PieChart' },
  { id: 'story', label: 'História / Livro', description: 'Enredo, desenvolvimento de personagens e capítulos.', iconName: 'Book' },
  { id: 'summary', label: 'Resumo Executivo', description: 'Síntese de informações complexas para leitura rápida.', iconName: 'FileMinus' },
];

export const TONES = [
  'Profissional e Formal',
  'Amigável e Casual',
  'Persuasivo e Vendedor',
  'Inspirador e Motivacional',
  'Técnico e Detalhado',
  'Humorístico e Divertido',
  'Didático e Claro',
  'Urgente e Direto'
];
