import { validateForFields, checkAdmin } from "../(utils)/funcs";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@db/prisma";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    checkAdmin(req, res)
    validateForFields(req, res, 'name')

    let body = req.body

    let createdProduct = await prisma.product.create({
        data: {
            name: body.name
        }
    })

    res.status(200).json({
        id: createdProduct.id,
        name: createdProduct.name,
        desc: createdProduct.desc
    })

}