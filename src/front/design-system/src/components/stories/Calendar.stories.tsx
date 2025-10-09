import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Calendar } from "../ui/calendar";

const CalendarWrapper = (args: any) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return <Calendar selected={date} onSelect={setDate} {...args} />;
};

const meta = {
  title: "UI/Calendar",
  component: CalendarWrapper,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} satisfies Meta<typeof CalendarWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};

export const WithoutSelection: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>();
    return <Calendar selected={date} onSelect={setDate} />;
  }
};

export const DisabledDates: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>();
    const disabledDates = [
      new Date(2025, 9, 10),
      new Date(2025, 9, 15),
      new Date(2025, 9, 20)
    ];

    return (
      <Calendar selected={date} onSelect={setDate} disabled={disabledDates} />
    );
  }
};

export const WithMinMaxDate: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>();
    const today = new Date();
    const maxDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);

    return (
      <Calendar
        selected={date}
        onSelect={setDate}
        disabled={(date) => date < today || date > maxDate}
      />
    );
  }
};

export const MultipleMonths: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>();
    return <Calendar selected={date} onSelect={setDate} numberOfMonths={2} />;
  }
};

export const WithFooter: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>();
    return (
      <div className="flex flex-col gap-2">
        <Calendar selected={date} onSelect={setDate} />
        <div className="text-center text-sm text-muted-foreground">
          {date ? date.toLocaleDateString("pt-BR") : "Selecione uma data"}
        </div>
      </div>
    );
  }
};
