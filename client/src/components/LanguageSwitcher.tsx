import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" data-testid="button-language-switcher">
          <Globe className="h-4 w-4 mr-2" />
          {language === 'en' ? 'English' : '中文'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setLanguage('en')}
          className={language === 'en' ? 'bg-accent' : ''}
          data-testid="menu-item-english"
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage('zh')}
          className={language === 'zh' ? 'bg-accent' : ''}
          data-testid="menu-item-chinese"
        >
          中文 (Chinese)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
