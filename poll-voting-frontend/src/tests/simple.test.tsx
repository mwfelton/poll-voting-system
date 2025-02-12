import { render, screen } from '@testing-library/react';

describe('Simple Test', () => {
  it('renders a simple message', () => {
    render(<div>Hello, world!</div>);
    expect(screen.getByText('Hello, world!')).toBeInTheDocument();
  });
});
