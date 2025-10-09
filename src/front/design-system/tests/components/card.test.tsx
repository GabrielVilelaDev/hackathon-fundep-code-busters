import { render, screen } from '@testing-library/react'
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '../../src/components/ui/card'

describe('Card', () => {
  it('renders correctly', () => {
    render(
      <Card data-testid="card">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>Card Content</CardContent>
        <CardFooter>Card Footer</CardFooter>
      </Card>
    )

    expect(screen.getByTestId('card')).toBeInTheDocument()
    expect(screen.getByText('Card Title')).toBeInTheDocument()
    expect(screen.getByText('Card Description')).toBeInTheDocument()
    expect(screen.getByText('Card Content')).toBeInTheDocument()
    expect(screen.getByText('Card Footer')).toBeInTheDocument()
  })

  it('applies correct styling classes', () => {
    render(
      <Card data-testid="card">
        <CardHeader data-testid="header">
          <CardTitle data-testid="title">Title</CardTitle>
          <CardDescription data-testid="description">Description</CardDescription>
        </CardHeader>
        <CardContent data-testid="content">Content</CardContent>
        <CardFooter data-testid="footer">Footer</CardFooter>
      </Card>
    )

    expect(screen.getByTestId('card')).toHaveClass('rounded-lg', 'border', 'bg-card')
    expect(screen.getByTestId('header')).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'p-6')
    expect(screen.getByTestId('title')).toHaveClass('text-2xl', 'font-semibold')
    expect(screen.getByTestId('description')).toHaveClass('text-sm', 'text-muted-foreground')
    expect(screen.getByTestId('content')).toHaveClass('p-6', 'pt-0')
    expect(screen.getByTestId('footer')).toHaveClass('flex', 'items-center', 'p-6', 'pt-0')
  })

  it('accepts custom className', () => {
    render(
      <Card className="custom-card" data-testid="card">
        <CardHeader className="custom-header">
          <CardTitle className="custom-title">Title</CardTitle>
        </CardHeader>
      </Card>
    )

    expect(screen.getByTestId('card')).toHaveClass('custom-card')
  })

  it('can render without all subcomponents', () => {
    render(
      <Card data-testid="card">
        <CardContent>Just content</CardContent>
      </Card>
    )

    expect(screen.getByTestId('card')).toBeInTheDocument()
    expect(screen.getByText('Just content')).toBeInTheDocument()
  })
})
