'use client';
import { useId, type KeyboardEvent } from 'react';
import { cn } from '@/lib/utils';

export function EventFilter({
  categories,
  active,
  onSelect,
  panelId,
}: {
  categories: { label: string; slug: string; icon?: string }[];
  active: string | null;
  onSelect: (slug: string | null) => void;
  panelId?: string;
}) {
  const tabListId = useId();
  const items = [
    { label: 'Todos', slug: null as string | null, icon: undefined as string | undefined },
    ...categories.map((category) => ({ label: category.label, slug: category.slug, icon: category.icon })),
  ];

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();

    const maxIndex = items.length - 1;
    let nextIndex = index;

    if (event.key === 'ArrowRight') nextIndex = index === maxIndex ? 0 : index + 1;
    if (event.key === 'ArrowLeft') nextIndex = index === 0 ? maxIndex : index - 1;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = maxIndex;

    const nextItem = items[nextIndex];
    onSelect(nextItem.slug);

    const nextTrigger = document.querySelector<HTMLButtonElement>(`[data-events-tab-index="${nextIndex}"]`);
    nextTrigger?.focus();
  }

  return (
    <div className="mb-10 flex justify-center sm:mb-12">
      <div
        role="tablist"
        aria-orientation="horizontal"
        aria-label="Filtrar eventos por categoria"
        id={tabListId}
        className="ui-pill-tabs flex max-w-full justify-start overflow-x-auto px-1 md:justify-center [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, index) => {
          const selected = active === item.slug;
          const tabId = `${tabListId}-tab-${index}`;

          return (
            <button
              key={item.slug ?? 'all'}
              type="button"
              role="tab"
              id={tabId}
              aria-selected={selected}
              aria-controls={panelId}
              data-events-tab-index={index}
              tabIndex={selected ? 0 : -1}
              onClick={() => onSelect(item.slug)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn('ui-pill-tab shrink-0', selected && 'ui-pill-tab-active')}
            >
              {item.icon ? `${item.icon} ${item.label}` : item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
