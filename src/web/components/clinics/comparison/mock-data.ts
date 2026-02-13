
export interface ClinicComparisonDetails {
    availability: string;
    waitTime: number; // in minutes
    cost: string; // $, $$, $$$
}

export function getClinicComparisonDetails(clinicId: string): ClinicComparisonDetails {
    let hash = 0;
    for (let i = 0; i < clinicId.length; i++) {
        hash = clinicId.charCodeAt(i) + ((hash << 5) - hash);
    }

    const availabilityOptions = ["Tomorrow", "In 2 days", "In 3 days", "Next Week"];
    const costOptions = ["$", "$$", "$$$"];

    const availabilityIndex = Math.abs(hash) % availabilityOptions.length;
    const costIndex = Math.abs(hash >> 2) % costOptions.length;
    const waitTime = (Math.abs(hash >> 4) % 45) + 5; // 5 to 50 mins

    return {
        availability: availabilityOptions[availabilityIndex],
        waitTime: waitTime,
        cost: costOptions[costIndex]
    };
}
