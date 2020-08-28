import { APIGatewayProxyResult } from 'aws-lambda';

export default class HttpResponse {
  successResponse(payload: string) {
    return this.httpResponse(payload, 200);
  }

  internalServerError(err: string) {
    return this.httpResponse(err, 500);
  }

  httpResponse(body: string, code = 200): APIGatewayProxyResult {
    return {
      statusCode: code,
      body
    };
  }
}
