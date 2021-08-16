import { Response } from 'express';

abstract class Controller {
  public response(res: Response, data: any, status = 200, paginator = undefined) {
    if (paginator) {
      /*
      TODO - PAGINATOR
      */
    }

    return res.status(status).json({
      success: true,
      data,
      paginator,
    });
  }
}

export default Controller;
