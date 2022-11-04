import prisma from "@db/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export async function isLoggedIn(req: NextApiRequest, res: NextApiResponse) {
    if (!req.cookies.AUTH_TOKEN) {
        res.status(403).json({message: 'NOT_LOGGED_IN'})
    } 
    const session = await getSessionFromToken(req.cookies.AUTH_TOKEN)
    if (!session) {
        res.status(403).json({message: 'INVALID_TOKEN'})
    } 
    return session
}

export async function checkAdmin(req: NextApiRequest, res: NextApiResponse) {
    if (!req.cookies.AUTH_TOKEN) {
        res.status(403).json({message: 'NOT_LOGGED_IN'})
    } 
    let session = await getSessionFromToken(req.cookies.AUTH_TOKEN) 
    if (!session) {
        res.status(403).json({message: 'INVALID_TOKEN'})
    }
    if (!session?.user.admin) {
        res.status(403).json({message: 'NOT_ADMIN'})
    }
}


export function validateForFields(req: NextApiRequest, res: NextApiResponse, ...fields: string[]) {
    let flag = true
    fields.forEach(field => {
        if (!(field in req.body)) {
            flag = false
        }
    })
    if (!flag) {
        res.status(400).json({error: 'BAD_REQUEST'})
    }
}


export async function getSessionFromToken(token: string | undefined) {
    let session = await prisma.session.findFirst({
        where: {id: token},
        include: {
            user: {
                select: {
                    id: true,
                    email: true,
                    admin: true
                }
            }
        }
    })
    return session
}