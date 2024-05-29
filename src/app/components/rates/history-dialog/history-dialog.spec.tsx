import { render } from '@testing-library/react';

import HistoryDialog from './history-dialog';

describe('HistoryDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HistoryDialog />);
    expect(baseElement).toBeTruthy();
  });
});
