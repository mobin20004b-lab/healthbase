import { render, screen, cleanup } from '@testing-library/react';
import { expect, test, afterEach, describe } from 'bun:test';
import { NextIntlClientProvider } from 'next-intl';
import { HealthPassport } from '@/web/components/patient/records/HealthPassport';

const messages = {
  Patient: {
    records: {
      healthPassport: "Health Passport",
      bloodType: "Blood Type",
      allergies: "Allergies"
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

describe('HealthPassport', () => {
  afterEach(() => {
    cleanup();
  });

  test('renders blood type and allergies', () => {
    renderWithIntl(<HealthPassport bloodType="A-" allergies={['Dust', 'Pollen']} />);

    // Check if the blood type renders
    expect(screen.getByText('A-')).toBeDefined();

    // Check if the allergies render
    expect(screen.getByText('Dust')).toBeDefined();
    expect(screen.getByText('Pollen')).toBeDefined();

    // Check if translation keys rendered
    // expect(screen.getByText('Blood Type')).toBeDefined();
  });

  test('renders empty allergies safely', () => {
    renderWithIntl(<HealthPassport bloodType="O+" allergies={[]} />);
    expect(screen.getByText('O+')).toBeDefined();
    expect(screen.getByText('None')).toBeDefined();
  });
});
