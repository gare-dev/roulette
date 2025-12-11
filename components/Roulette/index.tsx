'use client';

import React, { useState, useRef } from 'react';
import styles from '@/styles/roulette.module.scss';
import { Prize, RouletteProps } from '@/types/types';

const Roulette: React.FC<RouletteProps> = ({ prizes, onSpin, onResult }) => {
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const wheelRef = useRef<HTMLDivElement>(null);

    // Calcular os ângulos de cada segmento
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
        '#FF8ED4',
        '#7FDBFF',
    ];

    const handleSpin = async () => {
        if (isSpinning) return;

        setIsSpinning(true);

        try {
            // Chamar a API
            const winningPrizeId = await onSpin();

            const winningSegment = segments.find(
                (seg) => seg.prize === winningPrizeId
            );

            if (!winningSegment) {
                console.error('Prêmio não encontrado:', winningPrizeId);
                setIsSpinning(false);
                return;
            }

            const segmentSize = winningSegment.endAngle - winningSegment.startAngle;
            const random = Math.random();
            const edgeBias = random < 0.5 ? -0.35 - (random * 0.15) : 0.35 + ((random - 0.5) * 0.15);
            const randomOffset = edgeBias * segmentSize;
            const targetAngle = 360 - winningSegment.centerAngle + randomOffset;

            const currentRotationNormalized = rotation % 360;

            const extraSpins = 10 * 360;

            const finalRotation = rotation - currentRotationNormalized + extraSpins + targetAngle;

            setRotation(finalRotation);

            setTimeout(() => {
                setIsSpinning(false);
                if (onResult) {
                    onResult(winningSegment);
                }
            }, 6000);

        } catch (error) {
            console.error('Erro ao girar roleta:', error);
            setIsSpinning(false);
        }
    };

    return (
        <div className={styles.rouletteContainer}>
            <div className={styles.indicator}>
                <svg
                    width="100"
                    height="80"
                    viewBox="0 0 100 80"
                    className={styles.arrowSvg}
                    style={{ transform: 'rotate(180deg)' }}
                >
                    <defs>
                        {/* Gradiente para ponta metálica */}
                        <linearGradient id="metalTip" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#A9A9A9" />
                            <stop offset="25%" stopColor="#C0C0C0" />
                            <stop offset="50%" stopColor="#E8E8E8" />
                            <stop offset="75%" stopColor="#C0C0C0" />
                            <stop offset="100%" stopColor="#808080" />
                        </linearGradient>

                        {/* Gradiente vertical para profundidade da ponta */}
                        <linearGradient id="metalDepth" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#E8E8E8" />
                            <stop offset="50%" stopColor="#C0C0C0" />
                            <stop offset="100%" stopColor="#808080" />
                        </linearGradient>

                        {/* Sombra */}
                        <filter id="arrowShadow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
                            <feOffset dx="0" dy="6" result="offsetblur" />
                            <feComponentTransfer>
                                <feFuncA type="linear" slope="0.6" />
                            </feComponentTransfer>
                            <feMerge>
                                <feMergeNode />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>

                        {/* Brilho metálico */}
                        <filter id="metalGlow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    <g filter="url(#arrowShadow)">
                        {/* Ponta de metal - sombra base */}
                        <path
                            d="M 50 5 L 85 65 L 15 65 Z"
                            fill="#000"
                            opacity="0.2"
                        />

                        {/* Ponta de metal - lado esquerdo com profundidade */}
                        <path
                            d="M 50 10 L 18 63 L 50 63 Z"
                            fill="url(#metalDepth)"
                            stroke="#505050"
                            strokeWidth="2"
                        />

                        {/* Ponta de metal - lado direito com profundidade */}
                        <path
                            d="M 50 10 L 82 63 L 50 63 Z"
                            fill="url(#metalTip)"
                            stroke="#505050"
                            strokeWidth="2"
                        />

                        {/* Linha central da ponta para 3D */}
                        <line
                            x1="50"
                            y1="10"
                            x2="50"
                            y2="63"
                            stroke="#303030"
                            strokeWidth="1.5"
                        />

                        {/* Brilho intenso na ponta esquerda */}
                        <path
                            d="M 50 12 L 25 55 L 42 60 Z"
                            fill="rgba(255,255,255,0.5)"
                        />

                        {/* Brilho na ponta direita */}
                        <path
                            d="M 50 12 L 75 55 L 58 60 Z"
                            fill="rgba(255,255,255,0.3)"
                        />

                        {/* Detalhe afiado no topo */}
                        <path
                            d="M 50 10 L 58 28 L 42 28 Z"
                            fill="rgba(255,255,255,0.7)"
                        />

                        {/* Serrilhas na ponta (detalhes) */}
                        <path
                            d="M 35 45 L 30 48 L 32 50"
                            stroke="#303030"
                            strokeWidth="1"
                            fill="none"
                        />
                        <path
                            d="M 65 45 L 70 48 L 68 50"
                            stroke="#303030"
                            strokeWidth="1"
                            fill="none"
                        />

                        {/* Sombra lateral esquerda */}
                        <path
                            d="M 50 10 L 18 63 L 30 63 Z"
                            fill="rgba(0, 0, 0, 0.15)"
                        />

                        {/* Sombra lateral direita */}
                        <path
                            d="M 50 10 L 82 63 L 70 63 Z"
                            fill="rgba(0, 0, 0, 0.25)"
                        />
                    </g>

                    {/* Brilho metálico ao redor da ponta */}
                    <g filter="url(#metalGlow)" opacity="0.5">
                        <path
                            d="M 50 10 L 82 63 L 18 63 Z"
                            fill="#E8E8E8"
                        />
                    </g>
                </svg>
            </div>

            <div className={styles.wheelWrapper}>
                <div
                    ref={wheelRef}
                    className={`${styles.wheel} ${isSpinning ? styles.spinning : ''}`}
                    style={{
                        transform: `rotate(${rotation}deg)`,
                        transition: isSpinning
                            ? 'transform 6s cubic-bezier(0.25, 0.1, 0.25, 1)'
                            : 'none',
                    }}
                >
                    <svg viewBox="0 0 200 200" className={styles.wheelSvg}>
                        <defs>
                            {/* Criar padrões de imagem para cada segmento que tem imagem */}
                            {segments.map((segment, index) => {
                                if (segment.imagem) {
                                    return (
                                        <pattern
                                            key={`pattern-${index}`}
                                            id={`image-pattern-${index}`}
                                            x="0"
                                            y="0"
                                            width="1"
                                            height="1"
                                            patternContentUnits="objectBoundingBox"
                                        >
                                            <image
                                                href={segment.imagem}
                                                x="0"
                                                y="0"
                                                width="1"
                                                height="1"
                                                preserveAspectRatio="xMidYMid slice"
                                            />
                                        </pattern>
                                    );
                                }
                                return null;
                            })}

                            {/* Gradiente para overlay nas imagens */}
                            <linearGradient id="overlayGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="rgba(0,0,0,0.3)" />
                                <stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
                            </linearGradient>

                            {/* Gradiente para efeito 3D */}
                            <radialGradient id="wheelGradient">
                                <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
                                <stop offset="100%" stopColor="rgba(0,0,0,0.2)" />
                            </radialGradient>
                        </defs>

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

                            // Calcular posição do texto
                            const textAngle = (segment.centerAngle - 90) * (Math.PI / 180);
                            const textRadius = 70;
                            const textX = 100 + textRadius * Math.cos(textAngle);
                            const textY = 100 + textRadius * Math.sin(textAngle);

                            return (
                                <g key={index}>
                                    {/* ⭐ AQUI:  Segmento com IMAGEM DE FUNDO ou cor sólida */}
                                    <path
                                        d={pathData}
                                        fill={segment.imagem ? `url(#image-pattern-${index})` : colors[index % colors.length]}
                                        stroke="#fff"
                                        strokeWidth="3"
                                    />

                                    {/* Overlay escuro sobre a imagem para melhor legibilidade do texto */}
                                    {segment.imagem && (
                                        <path
                                            d={pathData}
                                            fill="url(#overlayGradient)"
                                        />
                                    )}

                                    {/* Efeito de brilho 3D */}
                                    <path
                                        d={pathData}
                                        fill="url(#wheelGradient)"
                                        opacity="0.3"
                                    />

                                    {/* Texto do prêmio */}
                                    <g transform={`rotate(${segment.centerAngle}, ${textX}, ${textY})`}>
                                        {/* Fundo semi-transparente atrás do texto para legibilidade */}
                                        <rect
                                            x={textX - 25}
                                            y={textY - 10}
                                            width="50"
                                            height="20"
                                            fill="rgba(0,0,0,0)"
                                            rx="5"
                                        />
                                        <text
                                            x={textX}
                                            y={textY}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                            fill="#fff"
                                            fontSize="8"
                                            fontWeight="bold"
                                            className={styles.prizeText}
                                        >
                                            {segment.nome}
                                        </text>
                                    </g>
                                </g>
                            );
                        })}
                    </svg>

                    {/* Borda decorativa externa */}
                    <div className={styles.wheelBorder}></div>
                </div>

                {/* Botão Central */}
                <button
                    className={`${styles.spinButton} ${isSpinning ? styles.spinning : ''}`}
                    onClick={handleSpin}
                    disabled={isSpinning}
                >
                    <div className={styles.buttonContent}>
                        {isSpinning ? (
                            <>
                                <div className={styles.spinner}></div>
                                <span className={styles.buttonText}>GIRANDO</span>
                            </>
                        ) : (
                            <>
                                <div className={styles.playIcon}>▶</div>
                                <span className={styles.buttonText}>GIRAR</span>
                            </>
                        )}
                    </div>
                </button>
            </div>
        </div>
    );
};

export default Roulette;