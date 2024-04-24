import { render } from '@testing-library/react';

import TextImage from './text-image';

describe('TextImage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TextImage />);
    expect(baseElement).toBeTruthy();
  });
});
