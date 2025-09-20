import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from "@nestjs/common";
import { TodoService } from "./todo.service";
import { JwtGuard } from "../jwt.guard";

@UseGuards(JwtGuard)
@Controller("todos")
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Req() req, @Body() body: { title: string; description: string }) {
    const data = this.todoService.create(
      req.user.sub,
      body.title,
      body.description
    );
    return {
      statusCode: 200,
      data: data,
    };
  }

  @Get()
  findAll(@Req() req) {
    const data = this.todoService.findAll(req.user.sub);
    return {
      statusCode: 200,
      data: data,
    };
  }

  @Get(":id")
  findOne(@Req() req, @Param("id") id: string) {
    const data = this.todoService.findOne(req.user.sub, Number(id));
    return {
      statusCode: 200,
      data: data,
    };
  }

  @Patch(":id")
  update(
    @Req() req,
    @Param("id") id: string,
    @Body() body: { title?: string; description?: string }
  ) {
    const data = this.todoService.update(req.user.sub, Number(id), body);
    return {
      statusCode: 200,
      data: data,
    };
  }

  @Delete(":id")
  remove(@Req() req, @Param("id") id: string) {
    const data = this.todoService.remove(req.user.sub, Number(id));
    return {
      statusCode: 200,
      data: data,
    };
  }
}
