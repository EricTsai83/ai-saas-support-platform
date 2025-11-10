import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import type { StorageActionWriter } from "convex/server";
import { assert } from "convex-helpers";
import { Id } from "../_generated/dataModel";
import { ConvexError } from "convex/values";

const AI_MODELS = {
  image: google.chat("gemini-2.5-flash"),
  pdf: google.chat("gemini-2.5-flash"),
  html: google.chat("gemini-2.5-flash"),
} as const;

const SUPPORTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
] as const;

const SYSTEM_PROMPT = {
  image:
    "You turn images into text. If it is a photo of a document, transcribe it. If it is not a document describe it.",
  pdf: "You transform PDF files into text.",
  html: "You transform content into markdown.",
} as const;

export type ExtractTextContentArgs = {
  storageId: Id<"_storage">;
  filename: string;
  bytes?: ArrayBuffer;
  mediaType: string;
};

export async function extractTextContent(
  ctx: { storage: StorageActionWriter },
  args: ExtractTextContentArgs,
): Promise<string> {
  const { storageId, filename, bytes, mediaType } = args;

  const url = await ctx.storage.getUrl(storageId);

  assert(url, "Failed to get storage URL");

  if (SUPPORTED_IMAGE_TYPES.some((type) => type === mediaType)) {
    const image = await fetch(url);
    return extractImageText(url);
  }

  if (mediaType.toLowerCase().includes("pdf")) {
    return extractPdfText(url, mediaType, filename);
  }

  if (mediaType.toLowerCase().includes("text")) {
    return extractTextFileContent(ctx, storageId, bytes, mediaType);
  }

  throw new Error("Unsupported media type");
}

async function extractTextFileContent(
  ctx: { storage: StorageActionWriter },
  storageId: Id<"_storage">,
  bytes: ArrayBuffer | undefined,
  mediaType: string,
): Promise<string> {
  let arrayBuffer = bytes;

  if (!arrayBuffer) {
    const storageBlob = await ctx.storage.get(storageId);
    assert(storageBlob, "Failed to get file content");
    arrayBuffer = await storageBlob.arrayBuffer();
    assert(arrayBuffer, "Failed to get file content");
  }

  const text = new TextDecoder().decode(arrayBuffer);

  if (mediaType.toLowerCase() !== "text/plain") {
    const result = await generateText({
      model: AI_MODELS.html,
      system: SYSTEM_PROMPT.html,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text },
            {
              type: "text",
              text: "Extract the text and print it in a markdown format without explaining that you'll do so.",
            },
          ],
        },
      ],
    });
    return result.text;
  }

  return text;
}

async function extractPdfText(
  url: string,
  mediaType: string,
  filename: string,
): Promise<string> {
  const result = await generateText({
    model: AI_MODELS.pdf,
    system: SYSTEM_PROMPT.pdf,
    messages: [
      {
        role: "user",
        content: [
          { type: "file", data: new URL(url), mediaType, filename },
          {
            type: "text",
            text: "Extract the text from the PDF and print it without explaining you'll do so.",
          },
        ],
      },
    ],
  });

  return result.text;
}

async function extractImageText(url: string): Promise<string> {
  const result = await generateText({
    model: AI_MODELS.image,
    system: SYSTEM_PROMPT.image,
    messages: [
      {
        role: "user",
        content: [{ type: "image", image: new URL(url) }],
      },
    ],
  });

  return result.text;
}
