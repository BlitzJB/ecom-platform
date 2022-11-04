import { checkAdmin, validateForFields } from "../(utils)/funcs";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@db/prisma";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    checkAdmin(req, res)
    validateForFields(req, res, 'id')
    await prisma.product.delete({
        where: {
            id: req.body.id
        }
    })
    res.status(200).json({message: 'ok'})
}