export interface PrefGroup {
  title: string;
  items?: PrefItem[];
  groups?: PrefGroup[];
}

export type PrefItem = PrefItemStringInput | PrefItemNumberInput | PrefItemBooleanCheckbox | PrefItemStringMultiSelect | PrefItemStringSingleSelect;

export interface PrefItemBase {
  title: string;
  description: string;
  key: string;
  type: 'string' | 'number' | 'boolean' | 'list';
  read?: (raw: string) => unknown;
  write?: (dst: unknown) => string;
  input: 'textbox' | 'single' | 'multiple' | 'checkbox';
  default?: unknown;
}

export interface PrefItemStringInput extends Omit<PrefItemBase, 'read' | 'write' | 'default'> {
  type: 'string';
  input: 'textbox';
}

export interface PrefItemStringSingleSelect extends Omit<PrefItemBase, 'read' | 'write'> {
  type: 'string';
  input: 'single';
  candidate: string[];
  default: string;
}

export interface PrefItemStringMultiSelect extends PrefItemBase {
  type: 'string';
  input: 'multiple';
  candidate: string[];
  default: string[];
  read: (raw: string) => string[];
  write: (dst: string) => string;
}

export interface PrefItemNumberInput extends Omit<PrefItemBase, 'read' | 'write'> {
  type: 'number';
  input: 'textbox';
  default: number;
}

export interface PrefItemBooleanCheckbox extends Omit<PrefItemBase, 'read' | 'write'> {
  type: 'boolean';
  input: 'checkbox';
  default: boolean;
}