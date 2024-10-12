import type { Response } from "express";

export interface customResponse extends Response {
	customSend?: (data: any) => void;
}
