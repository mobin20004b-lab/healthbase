import React from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/web/components/ui/card';
import { FileText } from 'lucide-react';

export interface LabResult {
    id: string;
    testName: string;
    result: number;
    unit: string;
    rangeMin: number;
    rangeMax: number;
    date: string;
}

interface LabResultsTableProps {
    results: LabResult[];
}

export function LabResultsTable({ results }: LabResultsTableProps) {
    const t = useTranslations('PatientRecords');

    return (
        <Card variant="default" className="h-full overflow-hidden">
            <CardHeader className="pb-4 bg-surface-container-low border-b border-outline-variant/20">
                <CardTitle className="flex items-center gap-2">
                    <FileText className="w-6 h-6 text-primary" />
                    {t('labResultsTitle')}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-surface-container-low/50">
                                <th className="p-4 text-sm font-bold text-on-surface-variant uppercase tracking-wider border-b border-outline-variant/20">
                                    {t('testName')}
                                </th>
                                <th className="p-4 text-sm font-bold text-on-surface-variant uppercase tracking-wider border-b border-outline-variant/20">
                                    {t('result')}
                                </th>
                                <th className="p-4 text-sm font-bold text-on-surface-variant uppercase tracking-wider border-b border-outline-variant/20 min-w-[200px]">
                                    {t('normalRange')}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((item) => {
                                // Calculate position for the marker
                                // Ensure marker stays within 0-100% bounds
                                const rangeDiff = item.rangeMax - item.rangeMin;
                                // Expand the visual range slightly beyond min/max so we can see out-of-bounds results
                                const visualMin = item.rangeMin - (rangeDiff * 0.2);
                                const visualMax = item.rangeMax + (rangeDiff * 0.2);
                                const visualDiff = visualMax - visualMin;

                                let percentage = ((item.result - visualMin) / visualDiff) * 100;
                                percentage = Math.max(0, Math.min(100, percentage));

                                // Determine if result is out of bounds
                                const isOutOfBounds = item.result < item.rangeMin || item.result > item.rangeMax;

                                return (
                                    <tr key={item.id} className="border-b border-outline-variant/10 hover:bg-surface-container-lowest transition-colors">
                                        <td className="p-4 text-sm font-bold text-on-surface">
                                            {item.testName}
                                            <div className="text-xs text-on-surface-variant font-medium mt-1">{item.date}</div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`text-sm font-black ${isOutOfBounds ? 'text-error' : 'text-on-surface'}`}>
                                                {item.result} {item.unit}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs text-on-surface-variant w-12 text-right">
                                                    {item.rangeMin}
                                                </span>
                                                <div className="relative flex-1 h-2 bg-surface-container-highest rounded-full overflow-hidden">
                                                    {/* Gradient Bar: Gray -> Green -> Gray */}
                                                    <div
                                                        className="absolute top-0 bottom-0 left-[20%] right-[20%] bg-green-500/80 rounded-full"
                                                    />

                                                    {/* Marker */}
                                                    <div
                                                        className="absolute top-1/2 -translate-y-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-on-surface drop-shadow-sm -translate-x-1/2 transition-all duration-500"
                                                        style={{ left: `${percentage}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs text-on-surface-variant w-12">
                                                    {item.rangeMax}
                                                </span>
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
