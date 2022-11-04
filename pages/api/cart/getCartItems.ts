import { isLoggedIn, validateForFields } from "../(utils)/funcs";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@db/prisma";

// Preferably this endpoint shouldnt be used instead use getServerSideProps

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await isLoggedIn(req, res)
    const result = await prisma.cartItem.findMany({
        where: {
            inCartOf: session?.user.id
        }
    })

    res.status(200).json(result)
}