import React from 'react';
import { Card } from '@/web/components/ui/card';

// Mock data
const mockLabResults = [
    { id: 1, testName: 'Hemoglobin A1c', result: 5.4, unit: '%', minRange: 4.0, maxRange: 5.6, isNormal: true },
    { id: 2, testName: 'Cholesterol, Total', result: 185, unit: 'mg/dL', minRange: 100, maxRange: 199, isNormal: true },
    { id: 3, testName: 'LDL Cholesterol', result: 110, unit: 'mg/dL', minRange: 0, maxRange: 99, isNormal: false },
    { id: 4, testName: 'HDL Cholesterol', result: 55, unit: 'mg/dL', minRange: 40, maxRange: 60, isNormal: true },
    { id: 5, testName: 'Triglycerides', result: 120, unit: 'mg/dL', minRange: 0, maxRange: 149, isNormal: true },
];

export function LabResultsTable() {
    return (
        <Card variant="outlined" className="overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-on-surface">
                    <thead className="text-xs text-on-surface-variant uppercase bg-surface-container-low border-b border-outline-variant/20">
                        <tr>
                            <th scope="col" className="px-6 py-4 font-bold">Test Name</th>
                            <th scope="col" className="px-6 py-4 font-bold">Result</th>
                            <th scope="col" className="px-6 py-4 font-bold min-w-[200px]">Normal Range</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockLabResults.map((result) => {
                            // Calculate position for visualizer
                            // Let's assume the visualizer shows minRange to maxRange, plus 20% margin on each side
                            const rangeDiff = result.maxRange - result.minRange;
                            const margin = rangeDiff * 0.2 || 1; // Avoid 0

                            const minDisplay = result.minRange - margin;
                            const maxDisplay = result.maxRange + margin;
                            const totalDisplay = maxDisplay - minDisplay;

                            let percentage = ((result.result - minDisplay) / totalDisplay) * 100;
                            // Clamp percentage to 0-100%
                            percentage = Math.max(0, Math.min(100, percentage));

                            return (
                                <tr key={result.id} className="border-b border-outline-variant/10 hover:bg-surface-container-lowest transition-colors">
                                    <td className="px-6 py-4 font-medium text-on-surface">
                                        {result.testName}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className={`font-bold ${result.isNormal ? 'text-on-surface' : 'text-error'}`}>
                                            {result.result} <span className="text-on-surface-variant text-xs font-normal ml-1">{result.unit}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1 w-full max-w-xs relative">
                                             <div className="flex justify-between text-[10px] text-on-surface-variant font-medium px-1">
                                                 <span>{result.minRange}</span>
                                                 <span>{result.maxRange}</span>
                                             </div>
                                            <div className="relative h-2 w-full bg-gradient-to-r from-surface-container-high via-primary-container to-surface-container-high rounded-full overflow-hidden">
                                                {/* Visual Gradient Bar (Grey -> Green -> Grey conceptually, but using theme colors here) */}
                                            </div>
                                            {/* Black triangle marker */}
                                            <div
                                                className="absolute -mt-[2px] w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-on-surface transition-all duration-500"
                                                style={{ left: `calc(${percentage}% - 4px)` }}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}
