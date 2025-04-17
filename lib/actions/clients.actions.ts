"use server";

import { ID, InputFile, Query } from "node-appwrite";

import {
  BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  CLIENT_COLLECTION_ID,
  PROJECT_ID,
  databases,
  storage,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";

// CREATE APPWRITE USER
export const createUser = async (user: CreateUserParams) => {
  try {
    console.log("Creating user...", user);
    // Create new user -> https://appwrite.io/docs/references/1.5.x/server-nodejs/users#create
    const newuser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    return parseStringify(newuser);
  } catch (error: any) {
    // Check existing user
    if (error && error?.code === 409) {
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);

      return existingUser.users[0];
    }
    console.error("An error occurred while creating a new user:", error);
  }
};

// GET USER
export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
  }
};

// REGISTER Client
export const registerClient = async ({
  identificationDocument,
  ...client
}: RegisterUserParams) => {
  try {
    // Upload file ->  // https://appwrite.io/docs/references/cloud/client-web/storage#createFile
    let file;
    if (identificationDocument) {
      const inputFile =
        identificationDocument &&
        InputFile.fromBlob(
          identificationDocument?.get("blobFile") as Blob,
          identificationDocument?.get("fileName") as string
        );

      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }
    // Create new Client document -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#createDocument
    const newClient = await databases.createDocument(
      DATABASE_ID!,
      CLIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id ? file.$id : null,
        identificationDocumentUrl: file?.$id
          ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}`
          : null,
        ...client,
      }
    );

    return parseStringify(newClient);
  } catch (error) {
    console.error("An error occurred while creating a new Client:", error);
  }
};

// GET Client
export const getClient = async (userId: string) => {
  try {
    const client = await databases.listDocuments(
      DATABASE_ID!,
      CLIENT_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );
    console.log("client", client);
    return parseStringify(client.documents[0]);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the client details:",
      error
    );
  }
};
