import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect } from "react";
import { useEventForm } from "@/context/event-form/use-event-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

export type EventFormData = z.infer<typeof formSchema>;

// ---- schema start ----
const commonFields = {
  ID: z.coerce.number({
    required_error: "Please provide the ID you wish to cancel.",
  }),
};

const buySellSchema = z.object({
  ...commonFields,
  Action: z.enum(["BUY", "SELL"]),
  Security: z.string().min(2, {
    message: "Security must be at least 2 characters.",
  }),
  Quantity: z.coerce.number().int({
    message: "Quantity must be an integer.",
  }),
  Account: z.string().min(2, {
    message: "Account name must be at least 2 characters.",
  }),
});

const cancelSchema = z.object({
  ...commonFields,
  Action: z.literal("CANCEL"),
  Security: z.string().optional(),
  Quantity: z.coerce.number().optional(),
  Account: z.string().optional(),
});

const formSchema = z.discriminatedUnion("Action", [
  buySellSchema,
  cancelSchema,
]);
// ---- schema end ----

export default function CreateEventForm() {
  const { formIds, addForm, registerForm, events } = useEventForm();
  const form = useForm<EventFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ID: 0,
      Action: "BUY",
      Account: "",
      Security: "",
      Quantity: 0,
    },
  });

  // Extend form to include custom functions
  const extendedFormMethods = React.useMemo(() => ({
    ...form, // Spread the default form methods
    triggerValidation: () => {
      return form.trigger();
    },
  }), [form]);

  // when creating a new form, get the ref to the context
  const latestId = formIds[formIds.length - 1];
  useEffect(() => {
    if (latestId !== undefined) {
      registerForm(latestId, extendedFormMethods);
    }
  }, [latestId, addForm, registerForm, extendedFormMethods]);

  const actionType = form.watch("Action"); // Access Action from the form instance

  return (
    <Form {...form}>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        {/* Action Field */}
        <FormField
          control={form.control}
          name="Action"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Action</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  orientation={"horizontal"}
                  className="flex grid-flow-col"
                >
                  <FormItem className="flex items-center">
                    <RadioGroupItem value="BUY" />
                    <FormLabel className="mr-5">Buy</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center">
                    <RadioGroupItem value="SELL" />
                    <FormLabel className="mr-5">Sell</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center">
                    <RadioGroupItem value="CANCEL" />
                    <FormLabel className="mr-5">Cancel</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Account Field */}
        {(actionType === "BUY" || actionType === "SELL") && (
          <FormField
            control={form.control}
            name="Account"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account</FormLabel>
                <FormControl>
                  <Input placeholder="Enter account name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Conditionally render Security Field */}
        {(actionType === "BUY" || actionType === "SELL") && (
          <FormField
            control={form.control}
            name="Security"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Security</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter security ticker symbol"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Conditionally render Quantity Field */}
        {(actionType === "BUY" || actionType === "SELL") && (
          <FormField
            control={form.control}
            name="Quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter quantity"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Conditionally render ID Field */}
        {actionType === "CANCEL" && (
          <FormField
            control={form.control}
            name="ID"
            render={({ field }) => {
              // Use the events from the top-level hook
              return (
                <FormItem>
                  <FormLabel>Event To Cancel</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value?.toString()}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select an Event" />
                      </SelectTrigger>
                      <SelectContent>
                        {events.length > 0 ? (
                          events
                          .filter((event) => event.Action !== "CANCEL")
                          .sort((a, b) => a.ID - b.ID)
                          .map((event) => (
                            <SelectItem key={event.ID} value={event.ID.toString()}>
                              {event.Action} {event.Quantity} units of {event.Security} (ID #{event.ID})
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem disabled value="Empty">
                            No Events Available
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        )}
      </form>
    </Form>
  );
}
