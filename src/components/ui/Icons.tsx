import {
  Search,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  Home,
  Book,
  BookOpen,
  Code,
  FileCode,
  Layers,
  Database,
  Server,
  Zap,
  Route,
  Rocket,
  Sun,
  Moon,
  Monitor,
  MessageSquare,
  Send,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  ArrowRight,
  Clock,
  Tag,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Heart,
  Star,
  AlertCircle,
  Info,
  CheckCircle,
  XCircle,
  Loader2,
  Settings,
  User,
  LogOut,
  type LucideIcon,
} from 'lucide-react';

export type IconName = 
  | 'search' | 'menu' | 'x' | 'chevronRight' | 'chevronDown' | 'chevronLeft'
  | 'home' | 'book' | 'bookOpen' | 'code' | 'fileCode' | 'layers' | 'database'
  | 'server' | 'zap' | 'route' | 'rocket' | 'sun' | 'moon' | 'monitor'
  | 'messageSquare' | 'send' | 'sparkles' | 'externalLink' | 'copy' | 'check'
  | 'thumbsUp' | 'thumbsDown' | 'arrowRight' | 'clock' | 'tag' | 'github'
  | 'twitter' | 'linkedin' | 'mail' | 'heart' | 'star' | 'alertCircle'
  | 'info' | 'checkCircle' | 'xCircle' | 'loader' | 'settings' | 'user' | 'logOut';

const iconMap: Record<IconName, LucideIcon> = {
  search: Search,
  menu: Menu,
  x: X,
  chevronRight: ChevronRight,
  chevronDown: ChevronDown,
  chevronLeft: ChevronLeft,
  home: Home,
  book: Book,
  bookOpen: BookOpen,
  code: Code,
  fileCode: FileCode,
  layers: Layers,
  database: Database,
  server: Server,
  zap: Zap,
  route: Route,
  rocket: Rocket,
  sun: Sun,
  moon: Moon,
  monitor: Monitor,
  messageSquare: MessageSquare,
  send: Send,
  sparkles: Sparkles,
  externalLink: ExternalLink,
  copy: Copy,
  check: Check,
  thumbsUp: ThumbsUp,
  thumbsDown: ThumbsDown,
  arrowRight: ArrowRight,
  clock: Clock,
  tag: Tag,
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  mail: Mail,
  heart: Heart,
  star: Star,
  alertCircle: AlertCircle,
  info: Info,
  checkCircle: CheckCircle,
  xCircle: XCircle,
  loader: Loader2,
  settings: Settings,
  user: User,
  logOut: LogOut,
};

// Map doc section icons to lucide icons
const sectionIconMap: Record<string, IconName> = {
  rocket: 'rocket',
  route: 'route',
  layers: 'layers',
  database: 'database',
  zap: 'zap',
  server: 'server',
};

interface IconProps {
  name: IconName | string;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 20, className }: IconProps) {
  // Check if it's a section icon
  const mappedName = sectionIconMap[name] || name;
  const LucideIcon = iconMap[mappedName as IconName];
  
  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }
  
  return <LucideIcon size={size} className={className} />;
}

// Export individual icons for direct import
export {
  Search,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  Home,
  Book,
  BookOpen,
  Code,
  FileCode,
  Layers,
  Database,
  Server,
  Zap,
  Route,
  Rocket,
  Sun,
  Moon,
  Monitor,
  MessageSquare,
  Send,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  ArrowRight,
  Clock,
  Tag,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Heart,
  Star,
  AlertCircle,
  Info,
  CheckCircle,
  XCircle,
  Loader2,
  Settings,
  User,
  LogOut,
};
