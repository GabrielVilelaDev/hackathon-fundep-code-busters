import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form";
import { Input } from "../ui/input";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters."
  }),
  email: z.string().email({
    message: "Please enter a valid email address."
  }),
  bio: z.string().max(160).optional()
});

const FormWrapper = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      bio: ""
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    alert(JSON.stringify(values, null, 2));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-[400px]"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="johndoe" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@example.com" type="email" {...field} />
              </FormControl>
              <FormDescription>We'll never share your email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Input placeholder="Tell us about yourself" {...field} />
              </FormControl>
              <FormDescription>Maximum 160 characters.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

const meta = {
  title: "UI/Form",
  component: FormWrapper,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} satisfies Meta<typeof FormWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <FormWrapper />
};

export const WithErrors: Story = {
  render: () => {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "a",
        email: "invalid",
        bio: ""
      }
    });

    return (
      <Form {...form}>
        <form className="space-y-8 w-[400px]">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="john@example.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="button" onClick={() => form.trigger()}>
            Validate
          </Button>
        </form>
      </Form>
    );
  }
};
