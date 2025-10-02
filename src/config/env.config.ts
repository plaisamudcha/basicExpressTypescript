import z from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().min(1).max(65535),
});

// we can use parse and safeParse
// parse will throw an error if validation fails
// const data = envSchema.parse(process.env);
// safeParse will return an object with success and error properties
const { success, data, error } = envSchema.safeParse(process.env);
// if validated failed, success will be false and error will contain the validation errors and data will be undefined
if (!success) {
  console.log(error);
  process.exit(0); // exit the process with a failure code
}

export const envconfig = data; // data is of type { PORT: number }
