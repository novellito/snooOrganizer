import { APIGatewayProxyResult } from 'aws-lambda';

export default class HttpResponse {
  successResponse(payload: string) {
    return this.httpResponse(payload, 200);
  }

  serverError(err: string, code: number) {
    return this.httpResponse(err, code);
  }

  httpResponse(body: string, code = 200): APIGatewayProxyResult {
    return {
      statusCode: code,
      body
    };
  }
}
