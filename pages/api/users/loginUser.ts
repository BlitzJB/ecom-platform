import type { NextApiRequest, NextApiResponse } from "next"
import prisma from '@db/prisma'
import { validateForFields } from "../(utils)/funcs"

interface Response {
    token?: string
    error?: string
}


export default async (req: NextApiRequest, res: NextApiResponse<Response>) => {
    let body = req.body

    validateForFields(req, res, 'email', 'password')

    let user = await prisma.user.findFirst({
        where: {
            email: body.email
        }
    })

    if (!user) {
        res.status(403).json({error: 'USER NOT FOUND'})
    }

    if (!(body.password === user?.password)) {
        res.status(403).json({error: 'PASSWORD INCORRECT'})
    }

    let id = user?.id ? user.id : ''

    let session = await prisma.session.create({
        data: {
            for: id,
        }
    })

    res.status(200).json({token: session.id})
}