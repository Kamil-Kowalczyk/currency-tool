import { render } from '@testing-library/react';

import RatesPage from './rates-page';

describe('RatesPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RatesPage />);
    expect(baseElement).toBeTruthy();
  });
});
