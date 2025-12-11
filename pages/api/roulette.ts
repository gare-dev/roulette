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
            imagem: 'https://i0.wp.com/zootecniabrasil.com/wp-content/uploads/2022/05/garoupa_446209591.jpg?fit=2500%2C1667&ssl=1' // dinheiro
        },
        {
            nome: 'R$2',
            tamanho: 1,
            prize: '20',
            imagem: 'https://i0.wp.com/zootecniabrasil.com/wp-content/uploads/2024/04/image-11.png?resize=800%2C450&ssl=1' // 2
        },
        {
            nome: 'R$5',
            tamanho: 1,
            prize: '5',
            imagem: 'https://apassarinhologa.com.br/wp-content/uploads/2014/01/Ardea-alba.jpg' // 5
        },
        {
            nome: 'R$10',
            tamanho: 1,
            prize: '10',
            imagem: 'https://www.gov.br/ibama/pt-br/assuntos/noticias/2024/ibama-reintroduz-arara-vermelha-grande-na-mata-atlantica-no-sul-da-ba/2024-07-02_ibama_reintroduz_arara-vermelha-grande_na_mata_atlantica_no_sul_da_ba-1.png' // 10
        },
        {
            nome: 'R$20',
            tamanho: 1,
            prize: '20',
            imagem: 'https://greenbond.com.br/wp-content/uploads/2019/08/mico-leao-dourado-02.jpg' // 20
        },
        {
            nome: 'R$50',
            tamanho: 1,
            prize: '50',
            imagem: 'https://conteudo.imguol.com.br/c/noticias/ca/2022/06/08/onca-gabi-1654709413431_v2_4x3.jpg' // 50
        },

    ];

    const functions = {
        GET: () => {
            return res.status(200).json({ data: prizes })
        }
    }

    return functions[method as keyof typeof functions]();
}
