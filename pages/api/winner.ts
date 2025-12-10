// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Prize } from "@/types/types";
import type { NextApiRequest, NextApiResponse } from "next";

// Um endpoint que retornaria o prêmio, agora o critério pra escolher o prêmio teria que ser definido 
// Se fosse criptografado a chave ficaria exposta no front-end, teria que ser de outro jeito. 

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Omit<Prize, "nome" | "tamanho">>,
) {
    const method = req.method

    const functions = {
        POST: () => {
            return res.status(200).json({ prize: 'iphone' });
        }
    }

    return functions[method as keyof typeof functions]();
}
