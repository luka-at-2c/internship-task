import { callQuery } from "./utils/query";

export type Card = {
  id: string;
  title: string;
  priority: Priority;
  storyPoints: number | null;
  deadline: string | null;
  assignedTo: string | null;
};

export type CreateCard = {
  title: string;
  priority: string;
};

export type UpdateCard = {
  title: string;
  priority: Priority;
  storyPoints: number | null;
  deadline: string | null;
  assignedTo: string | null;
};
export enum Priority {
  low = 0,
  medium = 1,
  high = 2,
}

export const createCardQuery = async (card: CreateCard): Promise<Card> => {
  const insertSQL = `
    INSERT INTO "Card" ("title", "priority", "storyPoints", "deadline", "assignedTo", "createdAt", "updatedAt")
    VALUES ($1, $2, null, null, null, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *
    `;

  const values = [card.title, Priority.medium];

  return callQuery<Card>(insertSQL, values);
};

export const getAllCardsQuery = async (): Promise<Card[]> => {
  const selectSQL = `
    SELECT * FROM "Card";
    `;

  return callQuery<Card[]>(selectSQL, [], true);
};

export const getCardById = async (cardId: string): Promise<Card> => {
  const selectSQL = `
    SELECT * FROM "Card" WHERE "id" = $1;
  `;

  const values = [cardId];

  return callQuery<Card>(selectSQL, values);
};

export const deleteCardById = async (cardId: string) => {
  const deleteSQL = `
    DELETE FROM "Card" WHERE "id" = $1;
    `;

  const values = [cardId];

  return callQuery<Card>(deleteSQL, values);
};

export const updateCardQuery = async (
  cardId: string,
  card: UpdateCard,
): Promise<Card> => {
  const updateSQL = `
    UPDATE "Card"
    SET "title"= $2, "priority"= $3, "storyPoints"= $4, "deadline"= $5, "assignedTo"= $6, "updatedAt" = CURRENT_TIMESTAMP
    WHERE "id"= $1
    RETURNING *
    `;

  const values = [
    cardId,
    card.title,
    card.priority,
    card.storyPoints,
    card.deadline,
    card.assignedTo,
  ];

  return callQuery<Card>(updateSQL, values);
};
