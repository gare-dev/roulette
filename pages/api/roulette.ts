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
            nome: '100',
            tamanho: 1,
            prize: '100',
            imagem: '/peixe.png',
            logo: '/peixe_logo.png' // dinheiro
        },
        {
            nome: '2',
            tamanho: 1,
            prize: '2',
            imagem: '/tartaruga.png',
            logo: '/tartaruga_logo.png' // 2
        },
        {
            nome: 'iPhone',
            tamanho: 1,
            prize: 'iphone',
            imagem: '/iphone.png',
            logo: '/iphone_logo.png' // iphone
        },
        {
            nome: '5',
            tamanho: 1,
            prize: '5',
            imagem: '/garca.png',
            logo: '/garca_logo.png' // 5
        },
        {
            nome: '10',
            tamanho: 1,
            prize: '10',
            imagem: '/arara.png',
            logo: '/arara_logo.png' // 10
        },
        {
            nome: '20',
            tamanho: 1,
            prize: '20',
            imagem: '/macaco.png',
            logo: '/macaco_logo.png' // 20
        },
        {
            nome: '50',
            tamanho: 1,
            prize: '50',
            imagem: '/onca.png',
            logo: '/peixe_logo.png' // 50
        },
    ];

    const functions = {
        GET: () => {
            return res.status(200).json({ data: prizes })
        }
    }

    return functions[method as keyof typeof functions]();
}
