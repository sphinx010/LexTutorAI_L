import React from "react";

export interface DottedArrowProps {
    direction?: "left" | "right";
    className?: string;
    gradient?: boolean;
}

export default function DottedArrow({
    direction = "right",
    className = "",
    gradient = false,
}: DottedArrowProps) {
    const dots = [];
    const rows = 15;
    const dotsPerRow = 4;
    const middleRow = Math.floor(rows / 2); // 7

    // Mathematical spacing mapped strictly to the 15-row sheared chevron design
    const stepX = 6.2;
    const stepY = 6.2;

    const totalWidth = 10 * stepX; // max gridX is 10
    const totalHeight = (rows - 1) * stepY;

    // Center the fully expanded SVG shape precisely within the 100x100 viewBox
    const startX = (100 - totalWidth) / 2;
    const startY = (100 - totalHeight) / 2;

    for (let r = 0; r < rows; r++) {
        // 0 shift at the middle, linearly pushing left as we move towards top/bottom
        const distFromCenter = Math.abs(r - middleRow);
        const rowXOffset = middleRow - distFromCenter;

        for (let c = 0; c < dotsPerRow; c++) {
            // Logical X position mapping
            const gridX = rowXOffset + c;

            const cx = startX + gridX * stepX;
            const cy = startY + r * stepY;

            // The radii monotonically grow larger as they move toward the point of the arrow on the right
            const minRadius = 1.0;
            const maxRadius = 3.2;
            const radius = minRadius + (gridX / 10) * (maxRadius - minRadius);

            dots.push(<circle key={`${r}-${c}`} cx={cx} cy={cy} r={radius} />);
        }
    }

    const gradientId = React.useId();

    return (
        <svg
            viewBox="0 0 100 100"
            className={`shrink-0 transition-transform duration-300 ease-in-out ${direction === "left" ? "rotate-180" : ""
                } ${className}`}
            fill={gradient ? `url(#${gradientId})` : "currentColor"}
            xmlns="http://www.w3.org/2000/svg"
        >
            {gradient && (
                <defs>
                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#daafc3" />
                        <stop offset="100%" stopColor="#62bfd0" />
                    </linearGradient>
                </defs>
            )}
            {dots}
        </svg>
    );
}
