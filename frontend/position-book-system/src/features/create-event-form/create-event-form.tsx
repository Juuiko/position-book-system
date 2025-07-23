import { Form } from "@/components/ui/form";
import { useCreateEventForm } from "./use-create-event-form";
import { ActionField } from "./fields/field-action";
import { CancelEventField } from "./fields/field-cancel";
import { AccountField } from "./fields/field-account";
import { SecurityField } from "./fields/field-security";
import { QuantityField } from "./fields/field-quantity";

export default function CreateEventForm() {
  const { form, actionType, events } = useCreateEventForm();

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