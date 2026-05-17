import React, { useState, useEffect } from 'react';

interface ThemeCustomizerProps {
  view: 'landing' | 'admin';
}

const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({ view }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const [landingColors, setLandingColors] = useState({
    '--primary': '#0084FF',
    '--secondary': '#2AC176',
    '--accent': '#FF6B6B',
    '--bg-main': '#FFF8D1',
    '--text-main': '#1A1C1E',
  });

  const [adminColors, setAdminColors] = useState({
    '--primary': '#0D9488', // Professional Teal
    '--bg-main': '#0F172A', // Deep Slate Shell
    '--admin-sidebar': '#1E293B', // Slate Sidebar
    '--admin-header-bg': 'transparent',
    '--admin-footer-bg': 'rgba(0,0,0,0.2)',
    '--admin-topbar-bg': '#ffffff',
    '--admin-content-bg': '#F8FAFC',
    '--accent': '#F43F5E',
    '--text-main': '#F8FAFC',
    '--admin-sidebar-text': '#F8FAFC',
    '--admin-header-text': '#F8FAFC',
    '--admin-footer-text': '#F8FAFC',
    '--admin-topbar-text': '#1E293B',
  });

  const colors = view === 'landing' ? landingColors : adminColors;

  useEffect(() => {
    // Sync colors based on view, fallback to documentElement if element not immediately found
    const syncColors = () => {
      const target = view === 'landing' 
        ? document.documentElement 
        : (document.querySelector('.admin-theme-root') as HTMLElement || document.documentElement);
      
      if (target) {
        Object.entries(colors).forEach(([key, val]) => {
          target.style.setProperty(key, val);
        });
        return true;
      }
      return false;
    };

    if (!syncColors()) {
      requestAnimationFrame(() => {
        syncColors();
      });
    }
  }, [view, colors]);

  const getContrastColor = (hexColor: string) => {
    if (!hexColor || hexColor === 'transparent') return '#ffffff';
    if (hexColor.startsWith('rgba')) return '#ffffff';
    if (hexColor.length < 7) return '#ffffff'; // Fallback for short hex
    
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#000000' : '#ffffff';
  };

  const getLabel = (key: string) => {
    const labelMap: Record<string, string> = {
      '--primary': 'Màu nhấn thương hiệu (Teal/Primary)',
      '--bg-main': 'Nền bao quanh Dashboard (Shell)',
      '--admin-sidebar': 'Nền thanh Menu Sidebar',
      '--admin-header-bg': 'Nền vùng Logo Sidebar',
      '--admin-footer-bg': 'Nền vùng Profile Sidebar',
      '--admin-topbar-bg': 'Nền thanh điều hướng Topbar',
      '--admin-content-bg': 'Nền vùng Workspace chính',
      '--accent': 'Màu nhấn phụ (Accent)',
      '--text-main': 'Màu chữ nội dung chính',
      '--admin-sidebar-text': 'Màu chữ Menu Sidebar',
      '--admin-header-text': 'Màu chữ vùng Logo',
      '--admin-footer-text': 'Màu chữ vùng Profile',
      '--admin-topbar-text': 'Màu chữ thanh Topbar',
    };

    if (view === 'landing') {
      const landingMap: Record<string, string> = {
        '--primary': 'Màu chủ đạo Landing',
        '--secondary': 'Màu phụ Landing',
        '--accent': 'Màu nhấn Landing',
        '--bg-main': 'Nền trang Landing',
        '--text-main': 'Màu chữ Landing',
      };
      return landingMap[key] || key.replace('--', '').replace('-', ' ');
    }

    return labelMap[key] || key.replace('--', '').replace('admin-', '').replace('-', ' ');
  };

  const handleColorChange = (key: string, value: string) => {
    if (view === 'landing') {
      setLandingColors(prev => {
        const next = { ...prev, [key]: value };
        return next;
      });
    } else {
      setAdminColors(prev => {
        const next = { ...prev, [key]: value };
        
        // Auto-contrast logic for specific background keys
        if (key === '--admin-header-bg') {
          next['--admin-header-text'] = getContrastColor(value);
        } else if (key === '--admin-footer-bg') {
          next['--admin-footer-text'] = getContrastColor(value);
        } else if (key === '--admin-topbar-bg') {
          next['--admin-topbar-text'] = getContrastColor(value);
        } else if (key === '--admin-sidebar') {
          next['--admin-sidebar-text'] = getContrastColor(value);
        }
        
        return next;
      });
    }
    
    const target = view === 'landing' ? document.documentElement : document.querySelector('.admin-theme-root') as HTMLElement;
    if (target) {
      target.style.setProperty(key, value);
      
      // Immediate property sync for auto-contrast
      if (key === '--admin-header-bg') {
        target.style.setProperty('--admin-header-text', getContrastColor(value));
      } else if (key === '--admin-footer-bg') {
        target.style.setProperty('--admin-footer-text', getContrastColor(value));
      } else if (key === '--admin-topbar-bg') {
        target.style.setProperty('--admin-topbar-text', getContrastColor(value));
      } else if (key === '--admin-sidebar') {
        target.style.setProperty('--admin-sidebar-text', getContrastColor(value));
      }
    }
  };

  const copyConfig = () => {
    const configString = `/* ${view.toUpperCase()} THEME CONFIG */\n` + 
      Object.entries(colors)
        .map(([key, val]) => `${key}: ${val};`)
        .join('\n');
    navigator.clipboard.writeText(configString);
    alert(`${view === 'landing' ? 'Landing' : 'Admin'} theme configuration copied!`);
  };

  return (
    <div className={`theme-customizer ${isOpen ? 'open' : ''}`}>
      <button 
        className="customizer-toggle glass" 
        onClick={() => setIsOpen(!isOpen)}
        title="Customize Theme"
      >
        🎨
      </button>

      <div className="customizer-panel glass">
        <div className="panel-header">
          <h3>Design Lab - {view === 'landing' ? 'Landing' : 'Admin'}</h3>
          <button onClick={() => setIsOpen(false)}>×</button>
        </div>
        
        <div className="panel-body">
          <p className="hint">
            {view === 'landing' 
              ? 'Tùy chỉnh giao diện trang chủ' 
              : 'Tùy chỉnh giao diện quản trị Admin'}
          </p>
          
          {Object.entries(colors).map(([key, value]) => (
            <div className="color-field" key={key}>
              <label>{getLabel(key)}</label>
              <div className="input-group">
                <input 
                  type="color" 
                  value={value} 
                  onChange={(e) => handleColorChange(key, e.target.value)} 
                />
                <input 
                  type="text" 
                  value={value} 
                  onChange={(e) => handleColorChange(key, e.target.value)} 
                />
              </div>
            </div>
          ))}
        </div>

        <div className="panel-footer">
          <button className="btn-primary" onClick={copyConfig}>Copy Config</button>
        </div>
      </div>
    </div>
  );
};

export default ThemeCustomizer;
