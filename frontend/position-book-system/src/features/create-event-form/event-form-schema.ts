import { z } from "zod";

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

export const formSchema = z.discriminatedUnion("Action", [
  buySellSchema,
  cancelSchema,
]);

// Export individual schemas if needed elsewhere
export { buySellSchema, cancelSchema };

// Export the inferred TypeScript types
export type FormData = z.infer<typeof formSchema>;
export type BuySellData = z.infer<typeof buySellSchema>;
export type CancelData = z.infer<typeof cancelSchema>;