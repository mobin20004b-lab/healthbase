
export function getClinicComparisonDetails(clinicId: string) {
    // Simple hash function to generate deterministic data from ID
    const hash = clinicId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

    const availabilityOptions = ['Tomorrow', 'In 2 days', 'Next Week', 'In 2 weeks'];
    const availability = availabilityOptions[hash % availabilityOptions.length];

    // Wait time in minutes (10 - 60)
    const waitTime = 10 + (hash % 51); // 0-50 + 10 = 10-60

    // Cost range ($50 - $200 approx)
    const costMin = 50 + (hash % 100);
    const costMax = costMin + 50 + (hash % 50);

    return {
        availability,
        waitTime,
        costRange: `$${costMin} - $${costMax}`
    };
}
