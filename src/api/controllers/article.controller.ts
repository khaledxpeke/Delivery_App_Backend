import articleModel from "../models/article.model";
import { Controller, Delete, Get, Post, Route, Tags } from "tsoa";
@Route("/article")
@Tags("Articles")
export class ArticleController extends Controller {

  async addArticle(data: any): Promise<any> {
    const result = await articleModel.create(data);
    return {
      error: null,
      data: result,
    };
  }
  @Delete('/{id}')
  async deleteArticle(id: any): Promise<any> {
    const result = await articleModel.findByIdAndDelete(id);
    return {
      error: null,
      data: result,
    };
  }
  @Get('/')
  async getAllArticles(): Promise<any> {
    const result = await articleModel.find({});
    return {
      error: null,
      data: result,
    };
  }
  @Get('/{id}')
  async getArticleById(id: any): Promise<any> {
    const result = await articleModel.findById(id);
    return {
      error: null,
      data: result,
    };
  }
}
