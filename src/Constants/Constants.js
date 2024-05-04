export const octaveBands = [
    { freq: 50, lower: 45, upper: 56 },
    { freq: 63, lower: 57, upper: 70 },
    { freq: 80, lower: 71, upper: 88 },
    { freq: 100, lower: 80, upper: 111 },
    { freq: 125, lower: 112, upper: 140 },
    { freq: 160, lower: 141, upper: 176 },
    { freq: 200, lower: 177, upper: 222 },
    { freq: 250, lower: 223, upper: 280 },
    { freq: 315, lower: 281, upper: 353 },
    { freq: 400, lower: 354, upper: 445 },
    { freq: 500, lower: 446, upper: 561 },
    { freq: 630, lower: 562, upper: 707 },
    { freq: 800, lower: 708, upper: 890 },
    { freq: 1000, lower: 891, upper: 1122 },
    { freq: 1250, lower: 1123, upper: 1414 },
    { freq: 1600, lower: 1415, upper: 1782 },
    { freq: 2000, lower: 1783, upper: 2244 },
    { freq: 2500, lower: 2245, upper: 2828 },
    { freq: 3150, lower: 2829, upper: 3563 },
    { freq: 4000, lower: 3564, upper: 4489 },
    { freq: 5000, lower: 4490, upper: 5657 }
];

export  const densities = [600, 800, 1000, 1200, 1400, 1600, 1800];
export const frequencies = [40000, 39000, 37000, 35000, 33000, 31000, 29000];

export const densityOptions = {
    keramzitMonolite: [
        { range: "1750 < ", K: 1 },
        { range: "1700-1749", K: 1.1 },
        { range: "1500-1650", K: 1.2 },
        { range: "1350-1450", K: 1.3 },
        { range: "1250-1349", K: 1.4 },
    ],
    keramzit: [
        { range: "1550 < ", K: 1 },
        { range: "1500-1549", K: 1.1 },
        { range: "1300-1450", K: 1.2 },
        { range: "1200", K: 1.3 },
        { range: "1100", K: 1.4 },
        { range: "1751 < ", K: 1 },
        { range: "1700-1750", K: 1.1 },
        { range: "1500-1650", K: 1.2 },
        { range: "1350-1450", K: 1.3 },
        { range: "1250", K: 1.4 },
    ],
    perlit: [
        { range: "1500 <", K: 1 },
        { range: "1451-1499", K: 1.1 },
        { range: "1400-1450", K: 1.2 },
        { range: "1300-1350", K: 1.3 },
        { range: "1100-1200", K: 1.4 },
        { range: "950-1000", K: 1.5 },
    ],
    agloporit: [
        { range: "1400 <", K: 1 },
        { range: "1300-1399", K: 1.1 },
        { range: "1100-1200", K: 1.2 },
        { range: "950-1000", K: 1.3 },
        { range: "1500-1800", K: 1.2 },
    ],
    shlakopemz: [
        { range: "1700 <", K: 1 },
        { range: "1600-1699", K: 1.1 },
        { range: "1700-1800", K: 1.2 },
    ],
    light_concretes: [
        { range: "1000", K: 1.5 },
        { range: "800", K: 1.6 },
        { range: "600", K: 1.7 },
    ],
    masonry: [
        { range: "1600 <", K: 1 },
        { range: "1500-1599", K: 1.1 },
        { range: "1200-1400", K: 1.2 },
    ],
    gypsum: [
        { range: "1500 <", K: 1 },
        { range: "1400=1499", K: 1.15 },
        { range: "1300-1399", K: 1.15 },
        { range: "1200-1299", K: 1.25 },
        { range: "1000-1199", K: 1.35 },
        { range: "800-999", K: 1.45 },
    ],
};

export const plasterOptions = {
    gypsum: [
        { range: { start: 1400, end: 9999 }, K: 1 },
        { range: { start: 1300, end: 1399 }, K: 1.15 },
        { range: { start: 1200, end: 1299 }, K: 1.25 },
        { range: { start: 1000, end: 1199 }, K: 1.35 },
        { range: { start: 800, end: 999 }, K: 1.45 },
    ],
    cement: [
        { range: { start: 1751, end: 9999 }, K: 1 },
        { range: { start: 1700, end: 1750 }, K: 1.1 },
        { range: { start: 1500, end: 1650 }, K: 1.2 },
        { range: { start: 1350, end: 1450 }, K: 1.3 },
        { range: { start: 1250, end: 1349 }, K: 1.4 },
    ]
};

