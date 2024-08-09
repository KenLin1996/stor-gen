import Story from "../models/story.js";
import { StatusCodes } from "http-status-codes";
import validator from "validator";

export const create = async (req, res) => {
  try {
    console.log(req.body.chapterLabels);
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
      img: req.body.img,
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
