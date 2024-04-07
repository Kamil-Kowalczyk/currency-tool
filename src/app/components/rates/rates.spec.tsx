import { render } from '@testing-library/react';

import Rates from './rates';

describe('RatesPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Rates />);
    expect(baseElement).toBeTruthy();
  });
});
