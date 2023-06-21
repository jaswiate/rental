import { Rental, RentalModel } from "../models/rental";

function daysBetween(earlierDate: Date, laterDate: Date): number {
    return (laterDate.getTime() - earlierDate.getTime()) / (1000 * 3600 * 24);
}

function calculateFine(currentDate: Date, dueDate: Date): number {
    const dailyFine = 0.2;
    const overdueDays = daysBetween(currentDate, dueDate);
    return Math.round(dailyFine * overdueDays);
}

export async function calculateFines(): Promise<void> {
    console.log("calculating...");
    try {
        const currentDate: Date = new Date();

        const overdueRentals: Rental[] = await RentalModel.find();

        for (const rental of overdueRentals) {
            if (rental.isPending || !rental.dueDate || !rental.borrowDate)
                continue;

            const overdueDays = daysBetween(rental.dueDate, currentDate);
            if (overdueDays <= 0) continue;

            const fineAmount: number = calculateFine(
                rental.dueDate,
                currentDate
            );

            rental.fine = fineAmount;
            await rental.save();
        }
        console.log("Fines calculated for overdue rentals.");
    } catch (error) {
        console.error("An error occurred while calculating fines:", error);
    }
}
