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

export const handleRequest = (req:Request, res: Response): any => {
  try{
    const action = req.params.action;
    const payload = req.body;
    switch (action) {
      case "search":
        console.log("search");
        handleSerachRequest(payload);
        return res.status(200).json({ status: "success" });
      case "select":
        console.log("select");
        handleSelectRequest(payload);
        return res.status(200).json({ status: "success" });
      case "init":
        console.log("init");
        handleInitRequest(payload);
        return res.status(200).json({ status: "success" });
      case "confirm":
        console.log("confirm");
        handleConfirmRequest(payload);
        return res.status(200).json({ status: "success" });
      case "on_search":
        console.log("on_search");
        handleOnSearchRequest(payload);
        return res.status(200).json({ status: "success" });
      case "on_select":
        console.log("on_select");
        handleOnSelectRequest(payload);
        return res.status(200).json({ status: "success" });
      case "on_init":
        console.log("on_init");
        handleOnInitRequest(payload);
        return res.status(200).json({ status: "success" });
        case "on_confirm":
          console.log("on_confirm");
          handleOnConfirmRequest(payload);
          return res.status(200).json({ status: "success" });
      default:
        throw new Error(`Invalid request type ${action}`);
    }
  }
  catch (e: any) {
    res
      .status(400)
      .json({ error: true, message: e?.message || "Somthing went wrong" });
  }
}
export const handleBAPRequest = (req: Request, res: Response): any => {
  try {
    const action = req.params.action;
    const payload = req.body;
    switch (action) {
      case "search":
        console.log("search");
        handleSerachRequest(payload);
        return res.status(200).json({ status: "success" });
      case "select":
        console.log("select");
        handleSelectRequest(payload);
        return res.status(200).json({ status: "success" });
      case "init":
        console.log("init");
        handleInitRequest(payload);
        return res.status(200).json({ status: "success" });
      case "confirm":
        console.log("confirm");
        handleConfirmRequest(payload);
        return res.status(200).json({ status: "success" });
      default:
        throw new Error(`Invalid request type ${action}`);
    }
  } catch (e: any) {
    res
      .status(400)
      .json({ error: true, message: e?.message || "Somthing went wrong" });
  }
};

export const handleBPPrequest = (req: Request, res: Response): any => {
  try {
    const action = req.params.action;
    const payload = req.body;
    switch (action) {
      case "on_search":
        console.log("on_search");
        handleOnSearchRequest(payload);
        return res.status(200).json({ status: "success" });
      case "on_select":
        console.log("on_select");
        handleOnSelectRequest(payload);
        return res.status(200).json({ status: "success" });
      case "on_init":
        console.log("on_init");
        handleOnInitRequest(payload);
        return res.status(200).json({ status: "success" });
      default:
        throw new Error(`Invalid request type ${action}`);
    }
  } catch (e: any) {
    res
      .status(400)
      .json({ error: true, message: e?.message || "Somthing went wrong" });
  }
};


export const triggerevent = (req: Request, res: Response): any => {
  try {
    const payload = req.body;
      console.log("Initiating first search request")
      initiateFirstSearch(payload)
      return res.status(200).json({ status: "success" });
  } catch (e: any) {
    res
      .status(400)
      .json({ error: true, message: e?.message || "Somthing went wrong" });
  }
};

