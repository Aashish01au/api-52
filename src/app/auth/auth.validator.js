const z = require("zod")

let registerUserSchema = z.object({
    name:z.string().min(3).max(35).nonempty(),
    email:z.string().email().nonempty(),
    role:z.string().regex(/admin|seller|customer/).nonempty(),
    address:z.string().nonempty(),
    phone:z.string().nonempty()
})

let activateUserSchema = z.object({
   password:z.string().nonempty(),
   confirmPassword:z.string().nonempty()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

let loggedInUserSchema = z.object({
    email:z.string().email().nonempty(),
    password:z.string().nonempty()
})

let forgetPasswordSchema = z.object({
    email:z.string().email().nonempty()
})
let resetPasswordSchema = z.object({
    password:z.string().nonempty(),
    confirmPassword:z.string().nonempty()
 }).refine((data) => data.password === data.confirmPassword, {
     message: "Passwords don't match",
     path: ["confirmPassword"],
 });

module.exports = {
    registerUserSchema,
    activateUserSchema,
    forgetPasswordSchema,
    resetPasswordSchema,
    loggedInUserSchema
}