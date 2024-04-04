import { render } from '@testing-library/react';

import CalculatorPage from './calculator-page';

describe('CalculatorPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CalculatorPage />);
    expect(baseElement).toBeTruthy();
  });
});
