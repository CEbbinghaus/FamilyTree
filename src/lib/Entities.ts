export enum DateTimeAccuracy {
    Exact,
    Month,
    Year,
    Decade
}

export interface DateTime {
    Accuracy: DateTimeAccuracy;
    Date: Date;
}

export interface Person {
    FirstName: string;
    LastName: string;
    MiddleName: string;

    Born: DateTime;
    Death: DateTime | "present"
}