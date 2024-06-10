import dbConnect from "@/db/connect";
import Place from "@/db/models/Place";
import { RouteHandlerManager } from "next/dist/server/future/route-handler-managers/route-handler-manager";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (!id) {
    console.log("Error, there is no ID");
    return;
  }

  const place = await Place.findById(id);

  if (!place) {
    return response.status(404).json({ status: "Not found" });
  }

  if (request.method === "PATCH") {
    const updatedPlace = request.body;
    await Place.findByIdAndUpdate(id, updatedPlace),
      response
        .status(200)
        .json({ Status: "You updated the place successfully" });
  }

  if (request.method === "DELETE") {
    await Place.findByIdAndDelete(id),
      response
        .status(200)
        .json({ Status: "You deleted the place successfully" });
  }

  response.status(200).json(place);
}
