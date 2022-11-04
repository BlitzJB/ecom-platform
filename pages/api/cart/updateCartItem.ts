import { isLoggedIn, validateForFields } from "../(utils)/funcs";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@db/prisma";


export default async (req: NextApiRequest, res: NextApiResponse) => {

    validateForFields(req, res, 'productId', 'toUpdate')
    await isLoggedIn(req, res)

    const result = await prisma.cartItem.update({
        where: {
            id: req.body.id
        },
        data: req.body.toUpdate
    })

    res.status(200).json(result)
}