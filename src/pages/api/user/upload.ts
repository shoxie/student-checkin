import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import formidable, { IncomingForm } from "formidable";
import path from "path";
import prisma from "@/Utils/prisma";

const savePDFFile = (
  tempPath: string,
  destinationPath: string
): Promise<void> => {
  console.log("destinationPath", destinationPath);
  return new Promise((resolve, reject) => {
    fs.readFile(tempPath, (error, fileData) => {
      if (error) {
        reject(error);
        return;
      }

      fs.writeFile(destinationPath, fileData, async (error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  });
};

const uploadPDFFile = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const form = new IncomingForm();
  // return res.status(200);
  form.parse(req, async (error: any, fields: any, files: any) => {
    if (error) {
      console.log("error", error);
      res.status(400).json({ error: "Invalid request" });
      return;
    }
    
    const pdfFile = files?.pdfFile[0];
    console.log('fields', fields)
    console.log('files', files)

    if (!pdfFile || Array.isArray(pdfFile)) {
      res.status(400).json({ error: "No PDF file found" });
      return;
    }

    // Get the temporary path of the uploaded file
    const tempPath = pdfFile.filepath;

    // Generate a unique file name for saving in the public/static folder
    const fileName = `${Date.now()}-${pdfFile.originalFilename}`;

    // Define the destination path where the file will be saved
    const destinationPath = process.cwd() + `\\public\\static\\${fileName}`;
    // const destinationPath = path.join(process.cwd(), 'public', 'static', fileName);

    try {
      await savePDFFile(tempPath, destinationPath);
      const record = await prisma.assignment.create({
        data: {
          userId: fields.userId[0],
          classMaterialId: fields.classMaterialId[0],
          isMarked: false,
          fileName
        }
      })
      const data = await prisma.assignment.findFirst({
        where: {
          userId: fields.userId[0],
          classMaterialId: fields.classMaterialId[0],
        },
        include: {
          user: true,
          classMaterial: true
        }
      })
      res.status(200).json({ data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  // return res.status(200);
};

export default uploadPDFFile;

export const config = {
  api: {
    bodyParser: false,
  },
};
