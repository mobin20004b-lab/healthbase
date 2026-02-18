
export function getClinicComparisonDetails(clinicId: string) {
    // Simple hash function to generate deterministic numbers from string ID
    const hash = clinicId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

    // Deterministic pseudo-random generator based on hash
    const rand = (mod: number, seedOffset = 0) => ((hash + seedOffset) % mod);

    const availabilityOptions = ["Tomorrow", "In 2 days", "Next week", "In 3 weeks"];
    const nextAvailable = availabilityOptions[rand(availabilityOptions.length)];

    // Generate wait time between 5 and 60 minutes
    const waitTime = 5 + rand(56, 10);

    // Generate cost level 1-4
    const costLevel = 1 + rand(4, 20);

    let costRange = "$50 - $150";
    if (costLevel === 2) costRange = "$100 - $300";
    if (costLevel === 3) costRange = "$250 - $500";
    if (costLevel === 4) costRange = "$500+";

    return {
        nextAvailable,
        waitTime,
        costLevel,
        costRange
    };
}
