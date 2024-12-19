import { Request, Response } from "express";
import handleSerachRequest from "../services/search";
import handleSelectRequest from "../services/select";
import handleInitRequest from "../services/init";
import handleConfirmRequest from "../services/confirm";
import handleOnSearchRequest from "../services/on_search";
import handleOnSelectRequest from "../services/on_select"
import handleOnInitRequest from "../services/on_init"
import initiateFirstSearch from "../services/first_search"
import handleOnConfirmRequest from "../services/on_confirm";
import logger from "../utils/logger";

export const handleRequest = async(req:Request, res: Response): Promise<any> => {
  try{
    const action = req.params.action;
    const payload = req.body;
    switch (action) {
      case "search":
        await handleSerachRequest(payload);
        return res.status(200).json({ status: "success" });
      case "select":
        await handleSelectRequest(payload);
        return res.status(200).json({ status: "success" });
      case "init":
        await handleInitRequest(payload);
        return res.status(200).json({ status: "success" });
      case "confirm":
        await handleConfirmRequest(payload);
        return res.status(200).json({ status: "success" });
      case "on_search":
        await handleOnSearchRequest(payload);
        return res.status(200).json({ status: "success" });
      case "on_select":
        await handleOnSelectRequest(payload);
        return res.status(200).json({ status: "success" });
      case "on_init":
        await handleOnInitRequest(payload);
        return res.status(200).json({ status: "success" });
      case "on_confirm":
        await handleOnConfirmRequest(payload);
        return res.status(200).json({ status: "success" });
      default:
        throw new Error(`Invalid request type ${action}`);
    }
  }
  catch (e: any) {
    logger.error("Error in handleRequest", e);
    res
      .status(400)
      .json({ error: true, message: e?.message || "Somthing went wrong" });
  }
}
export const handleBAPRequest = async (req: Request, res: Response): Promise<any> => {
  try {
    const action = req.params.action;
    const payload = req.body;
    switch (action) {
      case "search":
        await handleSerachRequest(payload);
        return res.status(200).json({ status: "success" });
      case "select":
        await handleSelectRequest(payload);
        return res.status(200).json({ status: "success" });
      case "init":
        await handleInitRequest(payload);
        return res.status(200).json({ status: "success" });
      case "confirm":
        await handleConfirmRequest(payload);
        return res.status(200).json({ status: "success" });
      default:
        throw new Error(`Invalid request type ${action}`);
    }
  } catch (e: any) {
    logger.error("Error in handleBAPRequest", e);
    res
      .status(400)
      .json({ error: true, message: e?.message || "Somthing went wrong" });
  }
};

export const handleBPPrequest = async (req: Request, res: Response): Promise<any> => {
  try {
    const action = req.params.action;
    const payload = req.body;
    switch (action) {
      case "on_search":
        await handleOnSearchRequest(payload);
        return res.status(200).json({ status: "success" });
      case "on_select":
        await handleOnSelectRequest(payload);
        return res.status(200).json({ status: "success" });
      case "on_init":
        await handleOnInitRequest(payload);
        return res.status(200).json({ status: "success" });
      default:
        throw new Error(`Invalid request type ${action}`);
    }
  } catch (e: any) {
    logger.error("Error in handleBPPrequest", e);
    res
      .status(400)
      .json({ error: true, message: e?.message || "Somthing went wrong" });
  }
};


export const triggerevent = async (req: Request, res: Response): Promise<any> => {
  try {
    const payload = req.body;
      await initiateFirstSearch(payload)
      return res.status(200).json({ status: "success" });
  } catch (e: any) {
    res
      .status(400)
      .json({ error: true, message: e?.message || "Somthing went wrong" });
  }
};

