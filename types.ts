import { LucideIcon } from 'lucide-react';

export enum AppStep {
  IDEA = 0,
  AGENT = 1,
  GOAL = 2,
  DETAILS = 3,
  RESULT = 4,
}

export interface AgentOption {
  id: string;
  label: string;
  description: string;
  iconName: string; // Mapping string to icon in component
}

export interface GoalOption {
  id: string;
  label: string;
  description: string;
  iconName: string;
}

export interface UserInputState {
  idea: string;
  agent: AgentOption | null;
  goal: GoalOption | null;
  audience: string;
  tone: string;
  language: string;
}

export interface GeneratedResult {
  optimizedPrompt: string;
  exampleOutput?: string;
}
