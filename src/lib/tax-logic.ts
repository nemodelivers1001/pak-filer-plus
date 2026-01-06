
export type TaxYear = '2019' | '2020' | '2021' | '2022' | '2023' | '2024' | '2025' | '2026';

interface TaxSlab {
    limit: number;
    fixed: number;
    rate: number; // percentage (e.g., 5 for 5%)
}

// NOTE: These are simplified representations of the complex tax laws for UI demonstration.
// In a real production finance app, edge cases coverage would be extensive.
export const TAX_SLABS: Record<TaxYear, TaxSlab[]> = {
    '2019': [ // FY 2018-19 (Historical Approx)
        { limit: 400000, fixed: 0, rate: 0 },
        { limit: 800000, fixed: 0, rate: 2 }, // Fixed 1000 or 2000 nominal usually
        { limit: 1200000, fixed: 2000, rate: 5 },
        { limit: 2500000, fixed: 60000, rate: 10 },
        { limit: 4000000, fixed: 190000, rate: 15 },
        { limit: Infinity, fixed: 390000, rate: 20 },
    ],
    '2020': [ // FY 2019-20
        { limit: 600000, fixed: 0, rate: 0 },
        { limit: 1200000, fixed: 0, rate: 5 },
        { limit: 1800000, fixed: 30000, rate: 10 },
        { limit: 2500000, fixed: 90000, rate: 15 },
        { limit: 3500000, fixed: 195000, rate: 17.5 },
        { limit: 5000000, fixed: 370000, rate: 20 },
        { limit: 8000000, fixed: 670000, rate: 22.5 },
        { limit: 12000000, fixed: 1345000, rate: 25 },
        { limit: Infinity, fixed: 2345000, rate: 27.5 },
    ],
    '2021': [ // FY 2020-21 (Same as 2020)
        { limit: 600000, fixed: 0, rate: 0 },
        { limit: 1200000, fixed: 0, rate: 5 },
        { limit: 1800000, fixed: 30000, rate: 10 },
        { limit: 2500000, fixed: 90000, rate: 15 },
        { limit: 3500000, fixed: 195000, rate: 17.5 },
        { limit: 5000000, fixed: 370000, rate: 20 },
        { limit: Infinity, fixed: 670000, rate: 22.5 },
    ],
    '2022': [ // FY 2021-22
        { limit: 600000, fixed: 0, rate: 0 },
        { limit: 1200000, fixed: 0, rate: 5 },
        { limit: 1800000, fixed: 30000, rate: 10 },
        { limit: 2500000, fixed: 90000, rate: 15 },
        { limit: 3500000, fixed: 195000, rate: 17.5 },
        { limit: Infinity, fixed: 370000, rate: 20 },
    ],
    '2023': [ // FY 2022-23 (Revised)
        { limit: 600000, fixed: 0, rate: 0 },
        { limit: 1200000, fixed: 0, rate: 2.5 },
        { limit: 2400000, fixed: 15000, rate: 12.5 },
        { limit: 3600000, fixed: 165000, rate: 22.5 },
        { limit: 6000000, fixed: 435000, rate: 27.5 },
        { limit: Infinity, fixed: 1095000, rate: 35 },
    ],
    '2024': [ // FY 2023-24
        { limit: 600000, fixed: 0, rate: 0 },
        { limit: 1200000, fixed: 0, rate: 2.5 },
        { limit: 2400000, fixed: 15000, rate: 12.5 },
        { limit: 3600000, fixed: 165000, rate: 22.5 },
        { limit: 6000000, fixed: 435000, rate: 27.5 },
        { limit: Infinity, fixed: 1095000, rate: 35 },
    ],
    '2025': [ // FY 2024-25 (Current Enacted)
        { limit: 600000, fixed: 0, rate: 0 },
        { limit: 1200000, fixed: 0, rate: 5 },
        { limit: 2200000, fixed: 30000, rate: 15 },
        { limit: 3200000, fixed: 180000, rate: 25 },
        { limit: 4100000, fixed: 430000, rate: 30 },
        { limit: Infinity, fixed: 700000, rate: 35 },
    ],
    '2026': [ // FY 2025-26 (Projected/Proposed Relief)
        { limit: 600000, fixed: 0, rate: 0 },
        { limit: 1200000, fixed: 0, rate: 1 }, // Proposed Reduction
        { limit: 2200000, fixed: 6000, rate: 11 },
        { limit: 3200000, fixed: 116000, rate: 23 },
        { limit: 4100000, fixed: 346000, rate: 30 },
        { limit: Infinity, fixed: 616000, rate: 35 },
    ]
};

export const calculateTax = (year: TaxYear, annualIncome: number) => {
    const slabs = TAX_SLABS[year];
    let tax = 0;
    let prevLimit = 0;

    for (const slab of slabs) {
        if (annualIncome > prevLimit) {
            if (annualIncome <= slab.limit) {
                // Income falls in this slab
                tax = slab.fixed + ((annualIncome - prevLimit) * (slab.rate / 100));
                return Math.floor(tax);
            } else {
                // Income exceeds this slab, move to next
                prevLimit = slab.limit;
            }
        }
    }
    // If exceeds all defined limits (handled by Infinity usually, but just in case)
    return Math.floor(tax);
};
