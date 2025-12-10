'use client';

import React, { useState } from 'react';
import Roulette from '@/components/Roulette/index';
import { Prize } from '@/types/types';
import { GetServerSideProps } from 'next';

type Props = {
    roulette: Prize[] | []
}

// A roleta usando serverside rendering pra pegar os prêmios.

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    try {
        const roulette = await fetch('http://localhost:3000/api/roulette', {
            method: 'GET',
        })

        const data = await roulette.json()

        return {
            props: {
                roulette: data.data
            }
        }
    } catch (error) {
        return {
            props: {
                roulette: []
            }
        }
    }
}

export default function RoulettePage({ roulette }: Props) {
    const [result, setResult] = useState<Prize | null>(null);

    const handleSpin = async (): Promise<string> => {
        const delay = Math.random() * 1500 + 500;

        const response = await fetch('/api/winner', { method: 'POST' });
        const data: Prize = await response.json();

        return data.prize;
    };

    const handleResult = (prize: Prize) => {
        setResult(prize);
        console.log('Prêmio ganho:', prize);
    };

    return (
        <div style={{ position: 'relative' }}>
            <Roulette
                prizes={roulette}
                onSpin={handleSpin}
                onResult={handleResult}
            />

            {result && (
                <div style={{
                    position: 'fixed',
                    bottom: '2rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#fff',
                    padding: '1.5rem 3rem',
                    borderRadius: '10px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                    zIndex: 1000,
                    textAlign: 'center'
                }}>
                    <h2 style={{ margin: 0, color: '#2C3E50' }}>
                        🎉 Você ganhou:  {result.nome}!
                    </h2>
                </div>
            )}
        </div>
    );
}