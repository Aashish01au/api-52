const z = require("zod")

let createBrandSchema = z.object({
    title:z.string().min(3).nonempty(),
    status:z.string().regex(/active|inactive/)
})
let updateBrandSchema = z.object({
    title:z.string().min(3).nonempty(),
    status:z.string().regex(/active|inactive/)
})

module.exports = {
    createBrandSchema,
    updateBrandSchema
}

