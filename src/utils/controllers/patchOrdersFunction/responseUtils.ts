import { Response } from 'express';

function SendSuccessResponse(result: boolean, res: Response) {
  if (result) {
    res.status(200).json({
      status: 'success',
      message: 'Operación completada correctamente',
      data: result, // Puedes incluir información adicional si es necesario
    });
  }
}

export { SendSuccessResponse };
