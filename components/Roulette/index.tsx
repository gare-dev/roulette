'use client';

import React, { useState, useRef } from 'react';
import styles from '@/styles/roulette.module.scss';
import { RouletteProps } from '@/types/types';

const Roulette: React.FC<RouletteProps> = ({ prizes, onSpin, onResult }) => {
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const wheelRef = useRef<HTMLDivElement>(null);

    const calculateSegments = () => {
        const totalSize = prizes.reduce((sum, prize) => sum + prize.tamanho, 0);
        let currentAngle = 0;

        return prizes.map((prize) => {
            const segmentAngle = (prize.tamanho / totalSize) * 360;
            const segment = {
                ...prize,
                startAngle: currentAngle,
                endAngle: currentAngle + segmentAngle,
                centerAngle: currentAngle + segmentAngle / 2,
            };
            currentAngle += segmentAngle;
            return segment;
        });
    };

    const segments = calculateSegments();

    const colors = [
        '#FF6B6B',
        '#4ECDC4',
        '#45B7D1',
        '#FFA07A',
        '#98D8C8',
        '#F7DC6F',
        '#BB8FCE',
        '#85C1E2',
    ];

    const handleSpin = async () => {
        if (isSpinning) return;

        setIsSpinning(true);

        try {
            const winningPrizeId = await onSpin();

            const winningSegment = segments.find(
                (seg) => seg.prize === winningPrizeId
            );

            if (!winningSegment) {
                console.error('Prêmio não encontrado:', winningPrizeId);
                setIsSpinning(false);
                return;
            }

            const targetAngle = 360 - winningSegment.centerAngle;

            const currentRotationNormalized = rotation % 360;

            const extraSpins = 5 * 360;

            const finalRotation = rotation - currentRotationNormalized + extraSpins + targetAngle;
            setRotation(finalRotation);

            setTimeout(() => {
                setIsSpinning(false);
                if (onResult) {
                    onResult(winningSegment);
                }
            }, 4000);

        } catch (error) {
            console.error('Erro ao girar roleta:', error);
            setIsSpinning(false);
        }
    };

    return (
        <div className={styles.rouletteContainer}>
            <div className={styles.indicator}>▼</div>

            <div
                ref={wheelRef}
                className={`${styles.wheel} ${isSpinning ? styles.spinning : ''}`}
                style={{
                    transform: `rotate(${rotation}deg)`,
                    transition: isSpinning
                        ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)'
                        : 'none',
                }}
            >
                <svg viewBox="0 0 200 200" className={styles.wheelSvg}>
                    {segments.map((segment, index) => {
                        const startAngle = (segment.startAngle - 90) * (Math.PI / 180);
                        const endAngle = (segment.endAngle - 90) * (Math.PI / 180);

                        const x1 = 100 + 100 * Math.cos(startAngle);
                        const y1 = 100 + 100 * Math.sin(startAngle);
                        const x2 = 100 + 100 * Math.cos(endAngle);
                        const y2 = 100 + 100 * Math.sin(endAngle);

                        const largeArcFlag = segment.endAngle - segment.startAngle > 180 ? 1 : 0;

                        const pathData = [
                            `M 100 100`,
                            `L ${x1} ${y1}`,
                            `A 100 100 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                            `Z`,
                        ].join(' ');

                        const textAngle = (segment.centerAngle - 90) * (Math.PI / 180);
                        const textRadius = 70;
                        const textX = 100 + textRadius * Math.cos(textAngle);
                        const textY = 100 + textRadius * Math.sin(textAngle);

                        return (
                            <g key={index}>
                                <path
                                    d={pathData}
                                    fill={colors[index % colors.length]}
                                    stroke="#fff"
                                    strokeWidth="2"
                                />
                                <text
                                    x={textX}
                                    y={textY}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fill="#fff"
                                    fontSize="10"
                                    fontWeight="bold"
                                    transform={`rotate(${segment.centerAngle}, ${textX}, ${textY})`}
                                    className={styles.prizeText}
                                >
                                    {segment.nome}
                                </text>
                            </g>
                        );
                    })}

                    <circle cx="100" cy="100" r="20" fill="#2C3E50" />
                </svg>
            </div>

            <button
                className={styles.spinButton}
                onClick={handleSpin}
                disabled={isSpinning}
            >
                {isSpinning ? 'GIRANDO...' : 'GIRAR'}
            </button>
        </div>
    );
};

export default Roulette;