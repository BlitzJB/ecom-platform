import { validateForFields } from "../(utils)/funcs";
import { NextApiRequest, NextApiResponse } from "next";
import { Product } from "@prisma/client";
import prisma from "@db/prisma";

// However, useage of this route should be avoided and 
// be fetched via getServerSideProps as much as possible

export default async (req: NextApiRequest, res: NextApiResponse<Product[]>) => {
    let products = await prisma.product.findMany()
    res.status(200).json(products)
}