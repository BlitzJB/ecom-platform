import { validateForFields, checkAdmin } from "../(utils)/funcs";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@db/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    checkAdmin(req, res)
    validateForFields(req, res, 'id', 'to_update')

    await prisma.product.update({
        where: {
            id: req.body.id,
        },
        data: req.body.to_update
    })

    res.status(200).json({message: 'ok'})
}