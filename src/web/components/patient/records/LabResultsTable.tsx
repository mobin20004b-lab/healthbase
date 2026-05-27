import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/web/components/ui/card';
import { Activity } from 'lucide-react';

export interface LabResult {
    id: string;
    testName: string;
    result: number;
    unit: string;
    minNormal: number;
    maxNormal: number;
    date: string;
}

interface LabResultsTableProps {
    results: LabResult[];
}

export function LabResultsTable({ results }: LabResultsTableProps) {
    return (
        <Card variant="default">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Activity className="w-6 h-6 text-primary" />
                    <CardTitle className="text-xl">Lab Results</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-on-surface">
                        <thead className="text-xs uppercase bg-surface-container text-on-surface-variant">
                            <tr>
                                <th scope="col" className="px-6 py-3 rounded-tl-lg">Test Name</th>
                                <th scope="col" className="px-6 py-3">Date</th>
                                <th scope="col" className="px-6 py-3">Result</th>
                                <th scope="col" className="px-6 py-3 rounded-tr-lg min-w-[200px]">Normal Range (Visual)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((result) => {
                                // Calculate percentage for the visual bar
                                // We'll map the range so that:
                                // [minNormal - padding] to [maxNormal + padding]
                                const range = result.maxNormal - result.minNormal;
                                const padding = range * 0.5; // Add 50% padding on each side

                                const absoluteMin = result.minNormal - padding;
                                const absoluteMax = result.maxNormal + padding;
                                const totalRange = absoluteMax - absoluteMin;

                                // Clamp result between absolute limits to prevent going out of bounds
                                const clampedResult = Math.max(absoluteMin, Math.min(absoluteMax, result.result));
                                const percentage = ((clampedResult - absoluteMin) / totalRange) * 100;

                                // Calculate normal range boundaries as percentages
                                const minNormalPct = ((result.minNormal - absoluteMin) / totalRange) * 100;
                                const maxNormalPct = ((result.maxNormal - absoluteMin) / totalRange) * 100;

                                const isNormal = result.result >= result.minNormal && result.result <= result.maxNormal;

                                return (
                                    <tr key={result.id} className="border-b border-outline-variant/20 hover:bg-surface-container-lowest/50 transition-colors">
                                        <td className="px-6 py-4 font-bold">
                                            {result.testName}
                                        </td>
                                        <td className="px-6 py-4 text-on-surface-variant">
                                            {result.date}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`font-mono font-bold ${isNormal ? 'text-primary' : 'text-error'}`}>
                                                {result.result}
                                            </span>
                                            <span className="text-xs text-on-surface-variant ml-1">{result.unit}</span>
                                        </td>
                                        <td className="px-6 py-4 relative">
                                            <div className="w-full h-2 bg-surface-container-highest rounded-full relative overflow-hidden">
                                                {/* Normal Range (Green) */}
                                                <div
                                                    className="absolute h-full bg-primary/30"
                                                    style={{
                                                        left: `${minNormalPct}%`,
                                                        width: `${maxNormalPct - minNormalPct}%`
                                                    }}
                                                />
                                            </div>
                                            {/* Marker */}
                                            <div
                                                className={`absolute top-[18px] w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] ${isNormal ? 'border-b-primary' : 'border-b-error'} transform -translate-x-1/2 transition-all duration-500`}
                                                style={{ left: `calc(1.5rem + ${percentage}% * (100% - 3rem) / 100)` }}
                                            />
                                            <div className="flex justify-between text-[10px] text-on-surface-variant mt-1 px-1 font-mono">
                                                <span>{result.minNormal}</span>
                                                <span>{result.maxNormal}</span>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}
