import React from 'react';
import { 
  PenTool, Code2, TrendingUp, GraduationCap, DollarSign, Briefcase, 
  Utensils, Palette, ClipboardList, BookOpen, Scale, Database,
  Share2, Terminal, FileText, MonitorPlay, Mail, Video, Layout,
  PieChart, Book, FileMinus, Brain, Rocket, Lightbulb
} from 'lucide-react';

const icons: Record<string, React.FC<any>> = {
  PenTool, Code2, TrendingUp, GraduationCap, DollarSign, Briefcase, 
  Utensils, Palette, ClipboardList, BookOpen, Scale, Database,
  Share2, Terminal, FileText, MonitorPlay, Mail, Video, Layout,
  PieChart, Book, FileMinus, Brain, Rocket, Lightbulb
};

export const IconRenderer: React.FC<{ name: string; size?: number; className?: string }> = ({ name, size = 24, className }) => {
  const Icon = icons[name] || Lightbulb;
  return <Icon size={size} className={className} />;
};
