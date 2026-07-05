import type { ReactNode } from 'react'

export function SingleColumnOptionList<T extends string>({ options, value, onSelect, className = '' }: { options: { id: T; content: ReactNode }[]; value?: T; onSelect: (id: T) => void; className?: string }) {
  return <div className={`option-list ${className}`}>{options.map((option) => <button key={option.id} className={`option-button ${value === option.id ? 'selected' : ''}`} onClick={() => onSelect(option.id)}>{option.content}</button>)}</div>
}
