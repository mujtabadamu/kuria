import type { StylesConfig } from 'react-select'

export function createSelectStyles<Option>(): StylesConfig<Option, false> {
  return {
    control: (base, state) => ({
      ...base,
      minHeight: 44,
      borderRadius: 'var(--radius-lg)',
      backgroundColor: 'var(--color-surface)',
      borderColor: state.isFocused
        ? 'var(--color-tertiary)'
        : 'color-mix(in srgb, var(--color-secondary) 30%, transparent)',
      boxShadow: state.isFocused ? '0 0 0 1px var(--color-tertiary)' : 'none',
      ':hover': { borderColor: 'var(--color-tertiary)' },
    }),
    valueContainer: (base) => ({ ...base, padding: '2px 12px' }),
    singleValue: (base) => ({ ...base, color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.875rem' }),
    placeholder: (base) => ({ ...base, color: 'var(--color-secondary)' }),
    indicatorSeparator: () => ({ display: 'none' }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: 'var(--color-secondary)',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : undefined,
      ':hover': { color: 'var(--color-primary)' },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      border: '1px solid color-mix(in srgb, var(--color-secondary) 30%, transparent)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
    }),
    menuList: (base) => ({ ...base, backgroundColor: 'var(--color-surface)', padding: 0 }),
    option: (base, state) => ({
      ...base,
      fontSize: '0.875rem',
      fontWeight: 600,
      backgroundColor: state.isSelected
        ? 'var(--color-tertiary)'
        : state.isFocused
          ? 'var(--color-neutral)'
          : 'var(--color-surface)',
      color: state.isSelected ? '#fff' : 'var(--color-primary)',
      cursor: 'pointer',
    }),
  }
}
