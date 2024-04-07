import { render } from '@testing-library/react';

import Calculator from './calculator';

describe('CalculatorPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Calculator />);
    expect(baseElement).toBeTruthy();
  });
});
