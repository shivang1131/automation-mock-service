import { Request, Response } from "express";
import handleSerachRequest from "../services/search";
import handleSelectRequest from "../services/select";
import handleInitRequest from "../services/init";
import handleConfirmRequest from "../services/confirm";

export const handleRequest = (req: Request, res: Response): any => {
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
