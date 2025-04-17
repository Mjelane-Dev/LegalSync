import { Models } from "node-appwrite";

export interface Clients extends Models.Document {
  userId: string;
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryLawyer: string;
  retainerAgreementStatus: string;
  clientRefrenceNumber: string;
  caseType: string | undefined;
  ongoingLegalProceeding: string | undefined;
  previousLeagalRepresentation: string | undefined;
  pastConvictions: string | undefined;
  identificationType: string | undefined;
  identificationNumber: string | undefined;
  identificationDocument: FormData | undefined;
  privacyConsent: boolean;
}

export interface Appointment extends Models.Document {
  clients: Clients;
  schedule: Date;
  status: Status;
  primaryLawyer: string;
  reason: string;
  note: string;
  userId: string;
  cancellationReason: string | null;
}
