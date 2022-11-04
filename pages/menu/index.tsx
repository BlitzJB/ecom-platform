import React from "react";
import prisma from "@db/prisma";
import { Product } from "@prisma/client";
import styles from '../../styles/Menu.module.css'
import { addToCart } from '../(apicalls)/funcs'


export async function getStaticProps() {
    const data = await prisma.product.findMany()
    return {
        props: {
            products: data
        }
    }
}



const Menu = async ({ products }: {products: Product[]}) => {
    return (<>
        <div className={styles.product__container}>
            {
                products.map(p => {
                    return (
                        <div>
                            {p.name} | {p.desc} | 
                            <a href={`/menu/${p.id}`}>Link</a> | 
                            <button onClick={async () => {addToCart(p.id)}}>ATC</button>
                        </div>)
                })
            }
        </div>
    </>)
}

export default Menu