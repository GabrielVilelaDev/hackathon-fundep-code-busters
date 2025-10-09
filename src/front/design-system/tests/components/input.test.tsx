import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from '../../src/components/ui/input'

describe('Input', () => {
  it('renders correctly', () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('handles text input', async () => {
    const user = userEvent.setup()
    render(<Input placeholder="Type here" />)
    
    const input = screen.getByPlaceholderText('Type here')
    await user.type(input, 'Hello World')
    
    expect(input).toHaveValue('Hello World')
  })

  it('can be disabled', () => {
    render(<Input disabled placeholder="Disabled input" />)
    const input = screen.getByPlaceholderText('Disabled input')
    expect(input).toBeDisabled()
  })

  it('accepts different input types', () => {
    const { rerender } = render(<Input type="text" placeholder="text" />)
    expect(screen.getByPlaceholderText('text')).toHaveAttribute('type', 'text')

    rerender(<Input type="email" placeholder="email" />)
    expect(screen.getByPlaceholderText('email')).toHaveAttribute('type', 'email')

    rerender(<Input type="password" placeholder="password" />)
    expect(screen.getByPlaceholderText('password')).toHaveAttribute('type', 'password')
  })

  it('accepts custom className', () => {
    render(<Input className="custom-input" placeholder="custom" />)
    expect(screen.getByPlaceholderText('custom')).toHaveClass('custom-input')
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(<Input ref={ref} placeholder="ref test" />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })
})
