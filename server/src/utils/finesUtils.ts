import { Rental, RentalModel } from "../models/rental";

function calculateFine(currentDate: Date, dueDate: Date): number {
    const dailyFine = 0.2;
    const overdueDays =
        (currentDate.getTime() - dueDate.getTime()) / (1000 * 3600 * 24);
    return dailyFine * overdueDays;
}

export async function calculateFines(): Promise<void> {
    try {
        const currentDate: Date = new Date();

        const overdueRentals: Rental[] = await RentalModel.find({
            dueDate: { $lt: currentDate },
            fine: { $exists: false },
        });

        for (const rental of overdueRentals) {
            const fineAmount: number = calculateFine(
                currentDate,
                rental.dueDate
            );

            rental.fine = fineAmount;
            await rental.save();
        }
        console.log("Fines calculated for overdue rentals.");
    } catch (error) {
        console.error("An error occurred while calculating fines:", error);
    }
}
