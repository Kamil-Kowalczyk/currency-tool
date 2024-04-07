import { render } from '@testing-library/react';

import AmountInput from './amount-input';

describe('AmountInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AmountInput />);
    expect(baseElement).toBeTruthy();
  });
});
