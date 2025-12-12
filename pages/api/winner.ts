// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Prize } from "@/types/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Omit<Prize, "nome" | "tamanho">>,
) {
    const method = req.method

    const prizes = ['2', '5', '10', '20', '50', '100', 'iphone']

    const functions = {
        POST: () => {
            return res.status(200).json({ prize: prizes[Math.floor(Math.random() * prizes.length)] });
        }
    }

    return functions[method as keyof typeof functions]();
}
