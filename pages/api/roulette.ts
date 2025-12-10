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
        { nome: 'R$ 10', tamanho: 1, prize: '10' },
        { nome: 'R$ 20', tamanho: 1, prize: '20' },
        { nome: 'iPhone', tamanho: 0.5, prize: 'iphone' },
        { nome: 'R$ 50', tamanho: 1, prize: '50' },
        { nome: 'R$ 100', tamanho: 0.5, prize: '100' },
        { nome: 'Sem Prêmio', tamanho: 2, prize: 'none' },
        { nome: 'R$ 5', tamanho: 1.5, prize: '5' },
        { nome: 'AirPods', tamanho: 0.5, prize: 'airpods' },
    ];

    const functions = {
        GET: () => {
            return res.status(200).json({ data: prizes })
        }
    }

    return functions[method as keyof typeof functions]();
}
