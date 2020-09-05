import Button from '../src/components/Button';
import { render, fireEvent } from '@testing-library/react';

describe('Button test suite', () => {
  it('should render the button', () => {
    const clickHandler = jest.fn();

    const props = {
      text: 'Test',
      bgColor: 'primary',
      click: clickHandler
    };
    const { getByText } = render(<Button {...props} />);
    const ButtonElem = getByText(props.text);

    expect(ButtonElem).toBeTruthy();

    fireEvent.click(ButtonElem);
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
});
