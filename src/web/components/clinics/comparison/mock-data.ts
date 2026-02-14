
// Helper for deterministic random numbers based on a string seed
function stringToHash(string: string) {
    let hash = 0;
    if (string.length === 0) return hash;
    for (let i = 0; i < string.length; i++) {
        const char = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
}

export function getClinicComparisonDetails(clinicId: string) {
    const hash = stringToHash(clinicId);

    // Availability Logic
    const availabilityOptions = ['Tomorrow', 'In 2 days', 'Next Week', 'In 2 weeks', 'In 3 weeks'];
    const availability = availabilityOptions[hash % availabilityOptions.length];

    // Wait Time Logic (10 to 60 mins)
    const waitTime = 10 + (hash % 51);

    // Cost Range Logic ($50 - $200 base)
    const costMin = 50 + (hash % 100);
    const costMax = costMin + 50 + (hash % 50);

    return {
        availability,
        waitTime,
        costRange: `$${costMin} - $${costMax}`
    };
}
