import { z } from "zod";

const supplierSchema = z.object({
  Supplier_nit: z
    .number({
      required_error: "El NIT es obligatorio",
      invalid_type_error: "El NIT debe ser un número válido",
    })
    .positive({
      message: "La NIT debe ser un número positivo y válido",
    }),

  Supplier_name: z
    .string()
    .min(2, { message: "La razón social debe tener al menos 2 caracteres" })
    .regex(/^[a-zA-Z0-9\s]+$/, {
      message: "Solo se permiten caracteres alfanuméricos y espacios",
    }),

  Supplier_contactInfo: z.string().min(2, {
    message: "El nombre de contacto debe tener al menos 2 caracteres",
  }),

  Supplier_email: z
    .string({
      required_error: "El correo es obligatorio",
      invalid_type_error: "El correo debe ser un texto",
    })
    .email("Ingrese un correo válido"),

  Supplier_phoneNumber: z
    .string({
      required_error: "El número de teléfono es obligatorio",
      invalid_type_error: "El número de teléfono debe ser un texto",
    })
    .regex(/^\+?[0-9]{7,15}$/, "Ingrese un número de teléfono válido"),

  Supplier_city: z
    .string({
      required_error: "La ciudad es obligatoria",
      invalid_type_error: "La ciudad debe ser un texto válido",
    })
    .min(2, "La ciudad debe tener al menos 2 caracteres"),

  Supplier_address: z
    .string({
      required_error: "La dirección es obligatoria",
      invalid_type_error: "Ingrese un texto válido",
    })
    .min(2, { message: "Ingrese una dirección válida" }),
});

export default supplierSchema;
