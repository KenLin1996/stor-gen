import Story from "../models/story.js";
import { StatusCodes } from "http-status-codes";
import validator from "validator";

export const create = async (req, res) => {
  try {
    req.body.image = req.file.path;
    const result = await Story.create({
      mainAuthor: req.user._id,
      // supportAuthor: req.body.supportAuthor,
      title: req.body.title,
      chapterName: req.body.chapterName,
      totalWordCount: req.body.totalWordCount,
      content: [
        {
          author: req.body.author,
          content: req.body.content,
          chapterName: req.body.chapterName,
          voteCount: req.body.voteCount,
          parent: req.body.parent,
          main: req.body.main,
        },
      ],
      category: req.body.category,
      chapterLabels: req.body.chapterLabels,
      state: req.body.state,
      show: req.body.show,
      image: req.body.image,
      voteTime: req.body.voteTime,
      views: req.body.views,
      collectionNum: req.body.collectionNum,
      followNum: req.body.followNum,
      totalVotes: req.body.totalVotes,
    });
    res.status(StatusCodes.OK).json({
      success: true,
      message: "",
      result,
    });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      const key = Object.keys(error.errors)[0];
      const message = error.errors[key].message;
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message,
      });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "未知錯誤",
      });
    }
  }
};

export const getAll = async (req, res) => {
  try {
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder || "desc";
    const itemsPerPage = req.query.itemsPerPage * 1 || 10;
    const page = req.query.page * 1 || 1;

    // 只查詢所需的字段
    const data = await Story.find({})
      .select(
        "title state show collectionNum followNum totalVotes image author category"
      ) // 只選取這些字段
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage);

    const total = await Story.estimatedDocumentCount();
    res.status(StatusCodes.OK).json({
      success: true,
      message: "",
      result: {
        data,
        total,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "未知錯誤",
    });
  }
};

export const edit = async (req, res) => {
  try {
    if (!validator.isMongoId(req.params.id)) throw new Error("ID");
    req.body.image = req.file?.path;
    await Story.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
    }).orFail(new Error("NOT FOUND"));

    res.status(StatusCodes.OK).json({
      success: true,
      message: "",
    });
  } catch (error) {
    console.log(error);
    if (error.name === "CastError" || error.message === "ID") {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "故事 ID 格式錯誤",
      });
    } else if (error.message === "NOT FOUND") {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "查無故事",
      });
    } else if (error.name === "ValidationError") {
      const key = Object.keys(error.errors)[0];
      const message = error.errors[key].message;
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message,
      });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "未知錯誤",
      });
    }
  }
};

export const get = async (req, res) => {
  try {
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder || "desc";
    const itemsPerPage = req.query.itemsPerPage * 1 || 10;
    const page = req.query.page * 1 || 1;

    // 只查詢所需的字段
    const data = await Story.find({ show: true })
      .select(
        "title state show collectionNum followNum totalVotes image category mainAuthor latestContent chapterLabels totalWordCount content chapterName"
      ) // 只選取這些字段
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage);

    const total = await Story.estimatedDocumentCount();
    res.status(StatusCodes.OK).json({
      success: true,
      message: "",
      result: {
        data,
        total,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "未知錯誤",
    });
  }
};

export const getId = async (req, res) => {
  try {
    if (!validator.isMongoId(req.params.id)) throw new Error("ID");

    const result = await Story.findById(req.params.id).orFail(
      new Error("NOT FOUND")
    );

    res.status(StatusCodes.OK).json({
      success: true,
      message: "",
      result,
    });
  } catch (error) {
    if (error.name === "CastError" || error.message === "ID") {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "故事 ID 格式錯誤",
      });
    } else if (error.message === "NOT FOUND") {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "查無故事",
      });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "未知錯誤",
      });
    }
  }
};

export const deleteId = async (req, res) => {
  try {
    // 使用 validator.isMongoId 來驗證請求參數中的故事 ID 是否符合  ObjectId 格式。如果不符合，會拋出一個 ID 錯誤
    if (!validator.isMongoId(req.params.id)) throw new Error("ID");
    // runValidators: true 確保更新時會執行模型中的驗證規則
    // orFail(new Error('NOT FOUND')) 如果找不到匹配的故事，會拋出一個 NOT FOUND 錯誤
    await Story.findByIdAndDelete(req.params.id).orFail(new Error("NOT FOUND"));

    res.status(StatusCodes.OK).json({
      success: true,
      message: "",
    });
  } catch (error) {
    if (error.name === "CastError" || error.message === "ID") {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "故事 ID 格式錯誤",
      });
    } else if (error.message === "NOT FOUND") {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "查無故事",
      });
    } else if (error.name === "ValidationError") {
      const key = Object.keys(error.errors)[0];
      const message = error.errors[key].message;
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message,
      });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "未知錯誤",
      });
    }
  }
};
