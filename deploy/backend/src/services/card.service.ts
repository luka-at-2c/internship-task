import httpStatus from "http-status";

import {
  CreateCard,
  createCardQuery,
  deleteCardById,
  getAllCardsQuery,
  getCardById,
  UpdateCard,
  updateCardQuery,
} from "../models/card.model";
import { ApiError } from "../shared/error/ApiError";

export const createCard = async (data: CreateCard) => {
  return createCardQuery(data);
};

export const getAllCards = async () => {
  return getAllCardsQuery();
};

export const updateCard = async (cardId: string, card: UpdateCard) => {
  const existingCard = await getCardById(cardId);

  if (!existingCard) {
    throw new ApiError("This card doesn't exist", httpStatus.BAD_REQUEST);
  }

  return updateCardQuery(cardId, card);
};

export const deleteCard = async (cardId: string) => {
  const existingCard = await getCardById(cardId);

  if (!existingCard) {
    throw new ApiError("This card doesn't exist", httpStatus.BAD_REQUEST);
  }

  return deleteCardById(cardId);
};
