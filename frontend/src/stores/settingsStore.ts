import { create } from 'zustand';

type SettingsState = {
  darkMode: boolean;
  compactView: boolean;
  highContrast: boolean;
  language: string;
  setDarkMode: (val: boolean) => void;
  setCompactView: (val: boolean) => void;
  setHighContrast: (val: boolean) => void;
  setLanguage: (val: string) => void;
  initSettings: () => void;
};

export const useSettingsStore = create<SettingsState>((set) => ({
  darkMode: false,
  compactView: false,
  highContrast: false,
  language: 'English',

  setDarkMode: (val) => {
    set({ darkMode: val });
    if (val) document.body.classList.add('dark-mode');
    else document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', JSON.stringify(val));
  },

  setCompactView: (val) => {
    set({ compactView: val });
    if (val) document.body.classList.add('compact-view');
    else document.body.classList.remove('compact-view');
    localStorage.setItem('compactView', JSON.stringify(val));
  },

  setHighContrast: (val) => {
    set({ highContrast: val });
    if (val) document.body.classList.add('high-contrast');
    else document.body.classList.remove('high-contrast');
    localStorage.setItem('highContrast', JSON.stringify(val));
  },

  setLanguage: (val) => {
    set({ language: val });
    localStorage.setItem('language', val);
  },

  initSettings: () => {
    const dm = JSON.parse(localStorage.getItem('darkMode') || 'false');
    const cv = JSON.parse(localStorage.getItem('compactView') || 'false');
    const hc = JSON.parse(localStorage.getItem('highContrast') || 'false');
    const lang = localStorage.getItem('language') || 'English';
    
    set({ darkMode: dm, compactView: cv, highContrast: hc, language: lang });
    
    if (dm) document.body.classList.add('dark-mode');
    if (cv) document.body.classList.add('compact-view');
    if (hc) document.body.classList.add('high-contrast');
  }
}));
