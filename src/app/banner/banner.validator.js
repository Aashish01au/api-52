const z = require("zod")

let createBannerSchema = z.object({
    title:z.string().min(3).nonempty(),
    link:z.string().url().nonempty(),
    position:z.string().nonempty(),
    status:z.string().regex(/active|inactive/)
})
let updateBannerSchema = z.object({
    title:z.string().min(3).nonempty(),
    link:z.string().url().nonempty(),
    position:z.string().nonempty(),
    status:z.string().regex(/active|inactive/)
})

module.exports = {
    createBannerSchema,
    updateBannerSchema
}

