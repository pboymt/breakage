// 
export interface MenuButton {
  activated: boolean;
  title: string;
  accel?: string;
  list: MenuItem[];
}

export type MenuItem = MenuItemDivider | MenuItemNormal | MenuItemSubmenu;

export interface MenuItemDivider {
  role: 'divider';
}

export interface MenuItemNormal {
  role: 'button';
  label: string;
  accel?: string;
  symbol: symbol;
  click: () => void;
}

// export interface MenuItemAccel extends MenuItemNormal {
//   has_accel: true;
//   accel: string;
// }

export interface MenuItemSubmenu {
  role: 'menu';
  label: string;
  submenu: MenuItem[];
}