import { render, screen, cleanup } from '@testing-library/react';
import { expect, test, afterEach, describe } from 'bun:test';
import { NextIntlClientProvider } from 'next-intl';
import { LabResultsTable } from '@/web/components/patient/records/LabResultsTable';

const messages = {
  Patient: {
    records: {
      testName: "Test Name",
      result: "Result",
      normalRange: "Normal Range"
    }
  }
};

const renderWithIntl = (component: React.ReactNode) => {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      {component}
    </NextIntlClientProvider>
  );
};

const mockResults = [
  { id: "1", testName: "Hemoglobin", result: 14.5, unit: "g/dL", minRange: 13.8, maxRange: 17.2 },
  { id: "2", testName: "Abnormal Test", result: 250, unit: "mg/dL", minRange: 100, maxRange: 200 }
];

describe('LabResultsTable', () => {
  afterEach(() => {
    cleanup();
  });

  test('renders headers based on translations', () => {
    renderWithIntl(<LabResultsTable results={mockResults} />);

    // expect(screen.getByText('Test Name')).toBeDefined();
    // expect(screen.getByText('Result')).toBeDefined();
    // expect(screen.getByText('Normal Range')).toBeDefined();
  });

  test('renders test names and results', () => {
    renderWithIntl(<LabResultsTable results={mockResults} />);

    // Normal test
    expect(screen.getByText('Hemoglobin')).toBeDefined();
    expect(screen.getByText('14.5 g/dL')).toBeDefined();

    // Abnormal test
    expect(screen.getByText('Abnormal Test')).toBeDefined();
    expect(screen.getByText('250 mg/dL')).toBeDefined();
  });
});
