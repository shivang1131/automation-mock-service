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
        logger.info("search");
        await handleSerachRequest(payload);
        return res.status(200).json({ message: {ack: { status: "ACK" }}});
      case "select":
        logger.info("select");
        await handleSelectRequest(payload);
        return res.status(200).json({ message: {ack: { status: "ACK" }}});
      case "init":
        logger.info("init");
        await handleInitRequest(payload);
        return res.status(200).json({ message: {ack: { status: "ACK" }}});
      case "confirm":
        logger.info("confirm");
        await handleConfirmRequest(payload);
        return res.status(200).json({ message: {ack: { status: "ACK" }}});
      case "on_search":
        logger.info("on_search");
        await handleOnSearchRequest(payload);
        return res.status(200).json({ message: {ack: { status: "ACK" }}});
      case "on_select":
        logger.info("on_select");
        await handleOnSelectRequest(payload);
        return res.status(200).json({ message: {ack: { status: "ACK" }}});
      case "on_init":
        logger.info("on_init");
        await handleOnInitRequest(payload);
        return res.status(200).json({ message: {ack: { status: "ACK" }}});
        case "on_confirm":
          logger.info("on_confirm");
          await handleOnConfirmRequest(payload);
          return res.status(200).json({ message: {ack: { status: "ACK" }}});
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
        logger.info("search");
        await handleSerachRequest(payload);
        return res.status(200).json({ message: {ack: { status: "ACK" }}});
      case "select":
        logger.info("select");
        await handleSelectRequest(payload);
        return res.status(200).json({ message: {ack: { status: "ACK" }}});
      case "init":
        logger.info("init");
        await handleInitRequest(payload);
        return res.status(200).json({ message: {ack: { status: "ACK" }}});
      case "confirm":
        logger.info("confirm");
        await handleConfirmRequest(payload);
        return res.status(200).json({ message: {ack: { status: "ACK" }}});
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
        logger.info("on_search");
        await handleOnSearchRequest(payload);
        return res.status(200).json({ message: {ack: { status: "ACK" }}});
      case "on_select":
        logger.info("on_select");
        await handleOnSelectRequest(payload);
        return res.status(200).json({ message: {ack: { status: "ACK" }}});
      case "on_init":
        logger.info("on_init");
        await handleOnInitRequest(payload);
        return res.status(200).json({ message: {ack: { status: "ACK" }}});
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
    logger.info("Initiating first search request")
      await initiateFirstSearch(payload)
      return res.status(200).json({ message: {ack: { status: "ACK" }}});
  } catch (e: any) {
    res
      .status(400)
      .json({ error: true, message: e?.message || "Somthing went wrong" });
  }
};

