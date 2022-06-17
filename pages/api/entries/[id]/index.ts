import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { EntryModel, IEntry } from "../../../../models";

type Data =
  | {
      message: string;
    }
  | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  /*  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "invalid id " + id });
  } */

  switch (req.method) {
    case "PUT":
      return updateEntry(req, res);
    case "GET":
      return getEntry(req, res);
    default:
      return res.status(400).json({ message: "Endpoint not found" });
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  try {
    await db.connect();

    const entryToUpdate = await EntryModel.findById(id);

    if (!entryToUpdate) {
      await db.disconnect();
      return res.status(400).json({ message: "Entry not found!" });
    }

    const {
      description = entryToUpdate.description,
      status = entryToUpdate.status,
    } = req.body;

    const updatedEntry = await EntryModel.findByIdAndUpdate(
      id,
      { description, status },
      { runValidators: true, new: true }
    );

    await db.disconnect();

    res.status(200).json(updatedEntry!);
  } catch (error) {
    await db.disconnect();

    console.log(error);

    res.status(400).json({ message: "Validation failed!" });
  }
};

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  try {
    await db.connect();

    const entryByID = await EntryModel.findById(id);

    if (!entryByID) {
      await db.disconnect();
      res.status(400).json({ message: "Entry not found" });
    }

    await db.disconnect();

    res.status(200).json(entryByID!);
  } catch (error) {
    db.disconnect();

    console.log(error);

    res.status(400).json({ message: "" });
  }
};
