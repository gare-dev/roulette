export interface Prize {
    nome: string;
    tamanho: number;
    prize: string;
}

export interface RouletteProps {
    prizes: Prize[];
    onSpin: () => Promise<string>;
    onResult?: (prize: Prize) => void;
}