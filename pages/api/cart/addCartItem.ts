import { isLoggedIn, validateForFields } from "../(utils)/funcs";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@db/prisma";


export default async (req: NextApiRequest, res: NextApiResponse) => {

    validateForFields(req, res, 'productId')
    const session = await isLoggedIn(req, res)

    const reslt = await prisma.cartItem.create({
        data: {
            inCartOf: session?.user.id ? session.user.id : '',
            productId: req.body.productId
        }
    })

    res.status(200).json(reslt)
}