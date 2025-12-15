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
        const roulette = await fetch(`${process.env.NODE_ENV === 'production' ? `https://roulette-tau-plum.vercel.app` : 'http://localhost:3000'}/api/roulette`, {
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
    const [showResult, setShowResult] = useState(false);

    const handleSpin = async (): Promise<string> => {

        const response = await fetch('/api/winner', { method: 'POST' });
        const data: Prize = await response.json();

        return data.prize;
    };

    const handleResult = (prize: Prize) => {
        setResult(prize);
        setTimeout(() => {
            setShowResult(true);
        }, 500);
    };

    return (
        <div style={{
            position: 'relative',
            minHeight: '100vh',
            background: `
       
         url('/background.png') center/cover fixed
      `,
            // Ou use uma imagem local: 
            // background: `
            //   linear-gradient(135deg, rgba(102, 126, 234, 0.85) 0%, rgba(118, 75, 162, 0.85) 100%),
            //   url('/images/background.jpg') center/cover fixed
            // `,
        }}>
            <Roulette
                prizes={roulette}
                onSpin={handleSpin}
                onResult={handleResult}
            />

            {showResult && result && (
                <>
                    {/* Overlay escuro de fundo */}
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        zIndex: 999,
                        animation: 'fadeIn 0.3s ease-out'
                    }} onClick={() => setShowResult(false)} />

                    {/* Modal de resultado */}
                    <div style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: 'linear-gradient(135deg, #35044b 0%, #55076a 100%)',
                        padding: '3rem 4rem',
                        borderRadius: '30px',
                        boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
                        zIndex: 1000,
                        textAlign: 'center',
                        border: '6px solid #5e0b71',
                        backdropFilter: 'blur(15px)',
                        animation: 'popIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                        minWidth: '500px',
                        maxWidth: '90vw',
                        overflow: 'visible'
                    }}>
                        {/* Folhas decorativas - canto superior esquerdo */}
                        <div style={{
                            position: 'absolute',
                            top: '-30px',
                            left: '-30px',
                            fontSize: '4rem',
                            transform: 'rotate(-45deg)',
                            opacity: 0.7,
                            animation: 'float 3s ease-in-out infinite'
                        }}>🍃</div>

                        {/* Folhas decorativas - canto superior direito */}
                        <div style={{
                            position: 'absolute',
                            top: '-25px',
                            right: '-25px',
                            fontSize: '3.5rem',
                            transform: 'rotate(45deg)',
                            opacity: 0.7,
                            animation: 'float 3s ease-in-out infinite 0.5s'
                        }}>🌿</div>

                        {/* Folhas decorativas - canto inferior esquerdo */}
                        <div style={{
                            position: 'absolute',
                            bottom: '-20px',
                            left: '20px',
                            fontSize: '3rem',
                            transform: 'rotate(15deg)',
                            opacity: 0.7,
                            animation: 'float 3s ease-in-out infinite 1s'
                        }}>🍀</div>

                        {/* Folhas decorativas - canto inferior direito */}
                        <div style={{
                            position: 'absolute',
                            bottom: '-25px',
                            right: '30px',
                            fontSize: '3.5rem',
                            transform: 'rotate(-30deg)',
                            opacity: 0.7,
                            animation: 'float 3s ease-in-out infinite 1.5s'
                        }}>🌱</div>

                        {/* Folhas decorativas flutuantes ao redor */}
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '-40px',
                            fontSize: '2.5rem',
                            opacity: 0.6,
                            animation: 'float 4s ease-in-out infinite 0.3s'
                        }}>🍃</div>

                        <div style={{
                            position: 'absolute',
                            top: '30%',
                            right: '-35px',
                            fontSize: '2.5rem',
                            opacity: 0.6,
                            animation: 'float 4s ease-in-out infinite 0.8s'
                        }}>🌿</div>

                        <h2 style={{
                            margin: 0,
                            color: '#fff',
                            fontSize: '3rem',
                            textShadow: '3px 3px 6px rgba(0,0,0,0.5)',
                            fontWeight: '900',
                            letterSpacing: '2px',
                            marginBottom: '1rem'
                        }}>
                            PARABÉNS, VOCÊ GANHOU!
                        </h2>

                        {/* Imagem animada do prêmio */}
                        {result.imagem && (
                            <div style={{
                                marginBottom: '2rem',
                                animation: 'bounce 1s ease-in-out infinite'
                            }}>
                                <img
                                    src={result.logo}
                                    alt={result.nome}
                                    style={{
                                        width: '200px',
                                        height: '200px',
                                        objectFit: 'cover',
                                        borderRadius: '20px',
                                        border: '5px solid #5e0b71',
                                        boxShadow: '0 15px 35px rgba(74, 124, 44, 0.6)',
                                        display: 'block',
                                        margin: '0 auto'
                                    }}
                                />
                            </div>
                        )}

                        {/* Nome do prêmio */}
                        <div style={{
                            background: 'rgba(127, 190, 59, 0.2)',
                            padding: '1.5rem 1rem',
                            borderRadius: '15px',
                            marginBottom: '2rem',
                            border: '2px solid #610d73'
                        }}>
                            <p style={{
                                margin: 0,
                                color: '#B8E986',
                                fontSize: '2rem',
                                fontWeight: 'bold',
                                textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                                textTransform: 'uppercase'
                            }}>
                                {result.nome}
                            </p>
                        </div>

                        {/* Botão de fechar */}
                        <button
                            onClick={() => setShowResult(false)}
                            style={{
                                padding: '1rem 3rem',
                                background: 'linear-gradient(135deg, #7FBE3B 0%, #9FD65A 100%)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '30px',
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 6px 15px rgba(127, 190, 59, 0.4)',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.05)';
                                e.currentTarget.style.boxShadow = '0 8px 20px rgba(127, 190, 59, 0.6)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = '0 6px 15px rgba(127, 190, 59, 0.4)';
                            }}
                        >
                            Continuar
                        </button>
                    </div>
                </>
            )}

            <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes popIn {
          from {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0;
          }
          to {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
        </div>
    );
}