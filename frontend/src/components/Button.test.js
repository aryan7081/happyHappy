import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders with label', () => {
    render(<Button label="Click me" />);
    expect(
      screen.getByRole('button', { name: /click me/i })
    ).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Button label="Test" className="custom-class" />);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('custom-class');
  });
});
