import type { Meta, StoryObj } from '@storybook/react'
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '../src/components/ui/card'
import { Button } from '../src/components/ui/button'

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the card content area.</p>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">Card Footer</p>
      </CardFooter>
    </Card>
  ),
}

export const WithActions: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Enter your details to create an account.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>Form fields would go here...</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Create</Button>
      </CardFooter>
    </Card>
  ),
}

export const ProjectCard: Story = {
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Project Dashboard</CardTitle>
        <CardDescription>Overview of your latest project</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-muted-foreground">75%</span>
          </div>
          <div className="h-2 bg-muted rounded-full">
            <div className="h-full w-3/4 bg-primary rounded-full" />
          </div>
          <div className="flex justify-between pt-2">
            <span className="text-sm text-muted-foreground">12 tasks completed</span>
            <span className="text-sm text-muted-foreground">4 remaining</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  ),
}

export const NotificationCard: Story = {
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start space-x-4">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">New comment on your post</p>
            <p className="text-sm text-muted-foreground">2 minutes ago</p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">Someone liked your photo</p>
            <p className="text-sm text-muted-foreground">1 hour ago</p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">Your project was approved</p>
            <p className="text-sm text-muted-foreground">3 hours ago</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full">Mark all as read</Button>
      </CardFooter>
    </Card>
  ),
}

export const SimpleCard: Story = {
  render: () => (
    <Card className="w-[300px]">
      <CardContent className="pt-6">
        <p className="text-center">A simple card with just content, no header or footer.</p>
      </CardContent>
    </Card>
  ),
}
