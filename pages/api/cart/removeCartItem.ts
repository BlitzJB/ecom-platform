import { isLoggedIn, validateForFields } from "../(utils)/funcs";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@db/prisma";


export default async (req: NextApiRequest, res: NextApiResponse) => {

    validateForFields(req, res, 'id')
    await isLoggedIn(req, res)

    const reslt = await prisma.cartItem.delete({
        where: {
            id: req.body.id
        }
    })

    res.status(200).json(reslt)
}