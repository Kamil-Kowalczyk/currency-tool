import { render } from '@testing-library/react';

import CurrencySelect from './currency-select';

describe('CurrencySelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CurrencySelect />);
    expect(baseElement).toBeTruthy();
  });
});
