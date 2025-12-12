// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Prize } from "@/types/types";
import type { NextApiRequest, NextApiResponse } from "next";

// Simulação da API retornando a roleta com prêmios diferentes, cada um com um tamanho.
// Isso se ele quiser que a roleta seja alterável

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const method = req.method

    const prizes: Prize[] = [
        {
            nome: 'R$100',
            tamanho: 1,
            prize: '100',
            imagem: '/peixe.png' // dinheiro
        },
        {
            nome: 'R$2',
            tamanho: 1,
            prize: '2',
            imagem: '/tartaruga.png' // 2
        },
        {
            nome: 'iPhone',
            tamanho: 1,
            prize: 'iphone',
            imagem: '/iphone.png' // iphone
        },
        {
            nome: 'R$5',
            tamanho: 1,
            prize: '5',
            imagem: '/garca.png' // 5
        },
        {
            nome: 'R$10',
            tamanho: 1,
            prize: '10',
            imagem: '/arara.png' // 10
        },
        {
            nome: 'R$20',
            tamanho: 1,
            prize: '20',
            imagem: '/macaco.png' // 20
        },
        {
            nome: 'R$50',
            tamanho: 1,
            prize: '50',
            imagem: '/onca.png' // 50
        },
    ];

    const functions = {
        GET: () => {
            return res.status(200).json({ data: prizes })
        }
    }

    return functions[method as keyof typeof functions]();
}
