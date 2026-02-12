export interface ClinicComparisonDetails {
    availability: string;
    availabilityColor: 'green' | 'amber' | 'red';
    costLevel: number; // 1 to 4
    waitTimeScore: number; // 0 to 100
    readmissionRate: 'Low' | 'Medium' | 'High';
    yearsPractice: number;
}

export function getClinicComparisonDetails(clinicId: string): ClinicComparisonDetails {
    // Deterministic mock based on ID hash or similar
    const hash = clinicId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

    const availabilityOptions = [
        { text: 'Tomorrow', color: 'green' as const },
        { text: 'In 3 days', color: 'green' as const },
        { text: 'In 2 weeks', color: 'amber' as const },
        { text: 'In 1 month', color: 'red' as const },
    ];

    const availabilityIndex = hash % availabilityOptions.length;
    const costLevel = (hash % 4) + 1;
    const waitTimeScore = (hash % 40) + 60; // 60-100
    const readmissionRate = ['Low', 'Medium', 'High'][hash % 3] as 'Low' | 'Medium' | 'High';
    const yearsPractice = (hash % 25) + 5; // 5-30 years

    return {
        availability: availabilityOptions[availabilityIndex].text,
        availabilityColor: availabilityOptions[availabilityIndex].color,
        costLevel,
        waitTimeScore,
        readmissionRate,
        yearsPractice
    };
}
