import { Form } from "@/components/ui/form";
import { useCreateEventForm } from "./use-create-event-form";
import { ActionField } from "./fields/field-action";
import { CancelEventField } from "./fields/field-cancel";
import { AccountField } from "./fields/field-account";
import { SecurityField } from "./fields/field-security";
import { QuantityField } from "./fields/field-quantity";
import { TradeEvent } from "@/api/models/positions.model";
import { JSX } from "react";

interface CreateEventFormProps {
  events: TradeEvent[];
  formId: string;
}

export default function CreateEventForm({ events = [], formId }: CreateEventFormProps): JSX.Element {
  const { form, actionType } = useCreateEventForm(formId);

  return (
    <Form {...form}>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <ActionField control={form.control} />

        {(actionType === "BUY" || actionType === "SELL") && (
          <>
            <AccountField control={form.control} />
            <SecurityField control={form.control} />
            <QuantityField control={form.control} />
          </>
        )}

        {actionType === "CANCEL" && (
          <CancelEventField control={form.control} events={events} />
        )}
      </form>
    </Form>
  );
}