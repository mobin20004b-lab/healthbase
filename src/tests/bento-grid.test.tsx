import { describe, it, expect } from 'bun:test';
import React from 'react';
import { render } from '@testing-library/react';
import { BentoGrid, BentoItem } from '@/web/components/ui/bento-grid';

describe('BentoGrid Component', () => {
  it('renders children correctly', () => {
    const { getByTestId } = render(
      <BentoGrid>
        <BentoItem data-testid="item-1">Item 1</BentoItem>
        <BentoItem data-testid="item-2">Item 2</BentoItem>
      </BentoGrid>
    );

    expect(getByTestId('item-1')).toBeTruthy();
    expect(getByTestId('item-2')).toBeTruthy();
  });

  it('applies grid classes to container', () => {
    const { container } = render(
      <BentoGrid className="custom-class">
        <BentoItem>Item</BentoItem>
      </BentoGrid>
    );

    // Check for base grid classes
    const grid = container.firstChild as HTMLElement;
    expect(grid.className).toContain('grid');
    expect(grid.className).toContain('grid-cols-1');
    expect(grid.className).toContain('md:grid-cols-4');
    expect(grid.className).toContain('custom-class');
  });

  it('applies col-span and row-span classes correctly', () => {
    const { getByTestId } = render(
      <BentoGrid>
        <BentoItem data-testid="item-default">Default</BentoItem>
        <BentoItem data-testid="item-col-2" colSpan={2}>Col 2</BentoItem>
        <BentoItem data-testid="item-row-2" rowSpan={2}>Row 2</BentoItem>
        <BentoItem data-testid="item-large" colSpan={4} rowSpan={2}>Large</BentoItem>
      </BentoGrid>
    );

    const defaultItem = getByTestId('item-default');
    expect(defaultItem.className).toContain('md:col-span-1');
    expect(defaultItem.className).toContain('md:row-span-1');

    const col2Item = getByTestId('item-col-2');
    expect(col2Item.className).toContain('md:col-span-2');

    const row2Item = getByTestId('item-row-2');
    expect(row2Item.className).toContain('md:row-span-2');

    const largeItem = getByTestId('item-large');
    expect(largeItem.className).toContain('md:col-span-4');
    expect(largeItem.className).toContain('md:row-span-2');
  });
});
